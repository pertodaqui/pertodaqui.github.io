// generate-waterfalls.cjs
const fs = require("node:fs");
const path = require("node:path");

const endpoint = "https://query.wikidata.org/sparql";
const OUT_DIR = "saida-json";

// ↓ diminuir ajuda muito a evitar 504
const PAGE_SIZE = 150;

// ↓ limites e “gentileza” com o WDQS
const FETCH_TIMEOUT_MS = 45000;
const MAX_RETRIES = 6;
const BASE_BACKOFF_MS = 1500;
const PAUSE_BETWEEN_PAGES_MS = 250;
const PAUSE_BETWEEN_STATES_MS = 800;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function parseWktPoint(wkt) {
  const m = /Point\(([-\d.]+)\s+([-\d.]+)\)/.exec(wkt || "");
  if (!m) return null;
  return { lng: Number(m[1]), lat: Number(m[2]) };
}

function commonsFileToUrl(fileUrl, width = 900) {
  if (!fileUrl) return null;
  const u = new URL(fileUrl);
  const filename = decodeURIComponent(u.pathname.split("/").pop());
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=${width}`;
}

function normalizeLocation(city, stateName, uf) {
  const parts = [];
  if (city && city !== stateName) parts.push(city);
  parts.push(`${stateName}${uf ? `, ${uf}` : ""}`);
  parts.push("Brasil");
  return parts.join(", ");
}

async function fetchWithTimeout(url, opts, timeoutMs) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...opts, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(t);
  }
}

async function wdqs(query) {
  const url = `${endpoint}?format=json&query=${encodeURIComponent(query)}`;

  let lastErr;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetchWithTimeout(
        url,
        {
          headers: {
            Accept: "application/sparql-results+json",
            "User-Agent": "pertodaqui-waterfalls/1.1 (local script)",
          },
        },
        FETCH_TIMEOUT_MS
      );

      if (res.ok) return await res.json();

      // 429/503/504 são “transientes”
      const transient = [429, 500, 502, 503, 504].includes(res.status);
      const body = await res.text().catch(() => "");
      if (!transient) {
        throw new Error(`WDQS error: ${res.status} ${res.statusText}\n${body.slice(0, 200)}`);
      }

      lastErr = new Error(`WDQS transient ${res.status} ${res.statusText}`);
    } catch (e) {
      // AbortError ou rede também tratamos como transiente
      lastErr = e;
    }

    const backoff = BASE_BACKOFF_MS * Math.pow(2, attempt) + Math.floor(Math.random() * 300);
    console.warn(`WDQS falhou (tentativa ${attempt + 1}/${MAX_RETRIES + 1}). Aguardando ${backoff}ms...`);
    await sleep(backoff);
  }

  throw lastErr;
}

async function listarUFsAtuais() {
  const q = `
SELECT ?ufItem ?ufItemLabel ?iso WHERE {
  ?ufItem wdt:P300 ?iso .
  FILTER(STRSTARTS(?iso, "BR-")) .
  ?ufItem wdt:P17 wd:Q155 .
  SERVICE wikibase:label { bd:serviceParam wikibase:language "pt,en". }
}
ORDER BY ?ufItemLabel
`;
  const data = await wdqs(q);
  return data.results.bindings.map((r) => {
    const iso = r.iso.value; // BR-SP
    const uf = iso.split("-")[1];
    const qid = r.ufItem.value.replace("http://www.wikidata.org/entity/", "");
    return { qid, name: r.ufItemLabel.value, uf };
  });
}

async function buscarCachoeirasNaUF({ qid, name, uf }) {
  let offset = 0;
  let idx = 1;
  const out = [];

  while (true) {
    const q = `
SELECT ?item ?itemLabel ?coord ?image ?desc ?placeLabel WHERE {
  ?item wdt:P31/wdt:P279* wd:Q34038 .
  ?item wdt:P17 wd:Q155 .
  ?item wdt:P131* wd:${qid} .
  ?item wdt:P625 ?coord .

  OPTIONAL { ?item wdt:P18 ?image . }
  OPTIONAL {
    ?item schema:description ?desc .
    FILTER(LANG(?desc) = "pt")
  }
  OPTIONAL { ?item wdt:P131 ?place . }

  SERVICE wikibase:label { bd:serviceParam wikibase:language "pt,en". }
}
ORDER BY STR(?item)
LIMIT ${PAGE_SIZE}
OFFSET ${offset}
`;

    const data = await wdqs(q);
    const rows = data.results.bindings;
    if (!rows.length) break;

    for (const r of rows) {
      const title = r.itemLabel?.value || "Sem nome";
      const meta = r.desc?.value || "Cachoeira";
      const coord = parseWktPoint(r.coord?.value);
      const image = commonsFileToUrl(r.image?.value, 900);
      const place = r.placeLabel?.value || null;

      out.push({
        id: `stay-${idx++}`,
        title,
        meta,
        location: normalizeLocation(place, name, uf),
        image:
          image ||
          "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
        fallbackDistance: 0,
        lat: coord?.lat ?? null,
        lng: coord?.lng ?? null,
      });
    }

    offset += PAGE_SIZE;
    await sleep(PAUSE_BETWEEN_PAGES_MS);

    if (offset > 200000) break;
  }

  return out;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const ufs = await listarUFsAtuais();
  console.log(`UFs atuais encontradas: ${ufs.length}`);

  for (const st of ufs) {
    const filename = path.join(OUT_DIR, `cachoeiras-${st.uf}.json`);
    console.log(`Gerando: ${filename} (${st.name} / ${st.uf})...`);

    const items = await buscarCachoeirasNaUF(st);
    fs.writeFileSync(filename, JSON.stringify(items, null, 2), "utf8");

    console.log(`  -> ${items.length} itens`);
    await sleep(PAUSE_BETWEEN_STATES_MS);
  }

  console.log("Pronto ✅");
}

main().catch((e) => {
  console.error("Erro final:", e);
  process.exit(1);
});