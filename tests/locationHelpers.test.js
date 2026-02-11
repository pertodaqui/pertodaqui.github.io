const test = require("node:test");
const assert = require("node:assert/strict");

test("formatLocation normaliza cidade e estado", async () => {
  const { formatLocation } = await import("../utils/locationHelpers.js");

  assert.equal(formatLocation("Taubaté - SP"), "Taubaté - SP");
  assert.equal(formatLocation("Taubaté, SP"), "Taubaté - SP");
  assert.equal(formatLocation("Taubaté"), "Taubaté");
});

test("getLocationSlug remove acentos e gera slug com estado", async () => {
  const { getLocationSlug } = await import("../utils/locationHelpers.js");

  assert.equal(getLocationSlug("Taubaté - SP"), "taubate-sp");
  assert.equal(getLocationSlug("São Bento do Sapucaí - SP"), "sao-bento-do-sapucai-sp");
});

test("getDistanceKm retorna valor esperado aproximado", async () => {
  const { getDistanceKm } = await import("../utils/locationHelpers.js");

  const taubate = { lat: -23.026, lng: -45.555 };
  const campos = { lat: -23.189, lng: -45.884 };
  const distance = getDistanceKm(taubate, campos);

  assert.ok(distance > 30);
  assert.ok(distance < 45);
});

test("getItemsByDistance aplica filtro por raio e adiciona distanceKm", async () => {
  const { getItemsByDistance } = await import("../utils/locationHelpers.js");

  const origin = { lat: -23.026, lng: -45.555 };
  const items = [
    { id: "near", lat: -23.027, lng: -45.556 },
    { id: "far", lat: -22.12, lng: -44.9 }
  ];

  const result = getItemsByDistance(items, 5, origin);

  assert.equal(result.length, 1);
  assert.equal(result[0].id, "near");
  assert.equal(typeof result[0].distanceKm, "number");
});

test("getMapsUrl monta rota para coordenadas do item", async () => {
  const { getMapsUrl } = await import("../utils/locationHelpers.js");

  const url = getMapsUrl({ lat: -23.026, lng: -45.555 });
  assert.equal(
    url,
    "https://www.google.com/maps/dir/?api=1&destination=-23.026,-45.555"
  );
});
