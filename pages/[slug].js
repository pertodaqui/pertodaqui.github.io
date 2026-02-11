import Head from "next/head";
import { useMemo, useEffect, useRef, useState } from "react";
import {
  Bed,
  BeerStein,
  Binoculars,
  Coffee,
  Columns,
  ForkKnife,
  EnvelopeSimple,
  MagnifyingGlass,
  MapPinLine,
  Broom,
  Thermometer,
  Tree,
  Sliders,
  SpinnerGap,
  CheckSquare,
  XCircle
} from "@phosphor-icons/react";
import bars from "../data/bars";
import cafes from "../data/cafes";
import culture from "../data/culture";
import hotels from "../data/hotels";
import parks from "../data/parks";
import restaurants from "../data/restaurants";
import waterfalls from "../data/waterfalls";
import viewpoints from "../data/viewpoints";
import trails from "../data/trails";
import tours from "../data/tours";

const ITEMS_PER_PAGE = 12;

const categories = [
  {
    key: "waterfalls",
    label: "Cachoeiras",
    icon: <Tree size={24} />
  },
  {
    key: "trails",
    label: "Trilhas",
    icon: <MapPinLine size={24} />
  },
  {
    key: "viewpoints",
    label: "Mirantes",
    icon: <Binoculars size={24} />
  },
  {
    key: "parks",
    label: "Parques",
    icon: <Tree size={24} />
  },
  {
    key: "restaurants",
    label: "Restaurantes",
    icon: <ForkKnife size={24} />
  },
  {
    key: "cafes",
    label: "Cafés",
    icon: <Coffee size={24} />
  },
  {
    key: "bars",
    label: "Bares",
    icon: <BeerStein size={24} />
  },
  {
    key: "culture",
    label: "Cultura",
    icon: <Columns size={24} />
  },
  {
    key: "hotels",
    label: "Hospedagens",
    icon: <Bed size={24} />
  },
  {
    key: "tours",
    label: "Passeios",
    icon: <MapPinLine size={24} />
  }
];

const formatLocation = (location) => {
  if (!location) {
    return "";
  }

  const cleaned = location.trim();
  const hyphenMatch = cleaned.match(/([^,]+?)\s*-\s*([A-Z]{2})\b/);

  if (hyphenMatch) {
    return `${hyphenMatch[1].trim()} - ${hyphenMatch[2]}`;
  }

  const parts = cleaned.split(",").map((part) => part.trim());
  if (parts.length >= 2) {
    return `${parts[0]} - ${parts[1]}`;
  }

  return cleaned;
};

const normalizeText = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const slugify = (value) =>
  normalizeText(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const getLocationSlug = (location) => {
  const formatted = formatLocation(location);
  const match = formatted.match(/^(.+)\s-\s([A-Z]{2})$/);
  if (match) {
    return `${slugify(match[1])}-${match[2].toLowerCase()}`;
  }
  return slugify(formatted);
};

const formatSlugTitle = (slug) => {
  if (!slug) return "";
  const parts = slug.split("-");
  if (parts.length === 1) {
    return parts[0];
  }
  const state = parts[parts.length - 1].toUpperCase();
  const city = parts.slice(0, -1).join(" ");
  const cityTitle = city
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return `${cityTitle} - ${state}`;
};

const getMapsUrl = (item) =>
  `https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}`;

const PREFIX = "o-que-fazer-em-";
const allItems = [
  ...bars,
  ...cafes,
  ...culture,
  ...hotels,
  ...parks,
  ...restaurants,
  ...waterfalls,
  ...viewpoints,
  ...trails,
  ...tours
];

export async function getStaticPaths() {
  const slugs = Array.from(
    new Set(
      allItems
        .map((item) => getLocationSlug(item.location))
        .filter((slug) => slug)
    )
  );
  return {
    paths: slugs.map((slug) => ({ params: { slug: `${PREFIX}${slug}` } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const raw = typeof params?.slug === "string" ? params.slug : "";
  if (!raw.startsWith(PREFIX)) {
    return { notFound: true };
  }
  return {
    props: {
      slug: raw.replace(PREFIX, "")
    }
  };
}

export default function CityPage({ slug }) {
  const slugParam = slug || "";

  const [selectedCategories, setSelectedCategories] = useState(
    categories.map((category) => category.key)
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [weatherByCoord, setWeatherByCoord] = useState({});
  const [forecastByCoord, setForecastByCoord] = useState({});
  const [openTempKey, setOpenTempKey] = useState(null);
  const filterRef = useRef(null);
  const weatherCacheRef = useRef({});

  const categoriesByKey = useMemo(
    () =>
      categories.reduce((acc, category) => {
        acc[category.key] = category;
        return acc;
      }, {}),
    []
  );

  const itemsByCategory = useMemo(
    () => ({
      tours,
      hotels,
      parks,
      waterfalls,
      viewpoints,
      trails,
      restaurants,
      cafes,
      bars,
      culture
    }),
    []
  );

  const itemsByCity = useMemo(() => {
    if (!slugParam) {
      return [];
    }
    return categories.flatMap((category) =>
      (itemsByCategory[category.key] || [])
        .filter((item) => getLocationSlug(item.location) === slugParam)
        .map((item) => ({ ...item, categoryKey: category.key }))
    );
  }, [itemsByCategory, slugParam]);

  const totalItems = itemsByCity.length;
  const activeItems = useMemo(
    () =>
      itemsByCity
        .filter((item) => selectedCategories.includes(item.categoryKey))
        .sort((a, b) => a.title.localeCompare(b.title)),
    [itemsByCity, selectedCategories]
  );

  const totalPages = Math.max(1, Math.ceil(activeItems.length / ITEMS_PER_PAGE));
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return activeItems.slice(start, start + ITEMS_PER_PAGE);
  }, [activeItems, currentPage]);

  const getCoordKey = (item) => `${item.lat},${item.lng}`;

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!filterRef.current) {
        return;
      }
      if (!filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const pending = activeItems
      .filter((item) => item.lat != null && item.lng != null)
      .map((item) => ({
        key: getCoordKey(item),
        lat: item.lat,
        lng: item.lng
      }))
      .filter(({ key }) => weatherCacheRef.current[key] === undefined);

    if (pending.length === 0) {
      return () => {
        controller.abort();
      };
    }

    pending.forEach(({ key }) => {
      weatherCacheRef.current[key] = "loading";
    });

    const fetchWeather = async ({ key, lat, lng }) => {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&forecast_days=5&timezone=auto`;
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) {
        return null;
      }
      const data = await response.json();
      const timezone =
        typeof data?.timezone === "string" ? data.timezone : "America/Sao_Paulo";
      const todayStr = new Intl.DateTimeFormat("en-CA", {
        timeZone: timezone
      }).format(new Date());
      const temp = data?.current_weather?.temperature;
      const daily = data?.daily;
      const dates = Array.isArray(daily?.time) ? daily.time : [];
      const maxes = Array.isArray(daily?.temperature_2m_max)
        ? daily.temperature_2m_max
        : [];
      const mins = Array.isArray(daily?.temperature_2m_min)
        ? daily.temperature_2m_min
        : [];
      const forecast = dates
        .map((date, index) => ({
          date,
          max: typeof maxes[index] === "number" ? Math.round(maxes[index]) : null,
          min: typeof mins[index] === "number" ? Math.round(mins[index]) : null
        }))
        .filter((entry) => entry.date >= todayStr)
        .slice(0, 5);
      if (typeof temp === "number") {
        return { key, temp: Math.round(temp), forecast };
      }
      return { key, temp: null, forecast };
    };

    Promise.all(pending.map(fetchWeather))
      .then((results) => {
        if (!isMounted) {
          return;
        }
        const next = {};
        const nextForecast = {};
        results.forEach((result) => {
          if (result) {
            if (typeof result.temp === "number") {
              next[result.key] = result.temp;
            }
            if (Array.isArray(result.forecast)) {
              nextForecast[result.key] = result.forecast;
            }
            weatherCacheRef.current[result.key] = {
              temp: result.temp,
              forecast: result.forecast
            };
          }
        });
        if (Object.keys(next).length > 0) {
          setWeatherByCoord((prev) => ({ ...prev, ...next }));
        }
        if (Object.keys(nextForecast).length > 0) {
          setForecastByCoord((prev) => ({ ...prev, ...nextForecast }));
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [activeItems]);

  useEffect(() => {
    if (!openTempKey) {
      return;
    }
    const handleOutsideClick = (event) => {
      const wrapper = event.target.closest("[data-temp-key]");
      if (!wrapper || wrapper.dataset.tempKey !== openTempKey) {
        setOpenTempKey(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openTempKey]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, slugParam]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const locationTitle = formatSlugTitle(slugParam);
  const metaDescription = locationTitle
    ? `Descubra o que fazer em ${locationTitle}. Veja ${totalItems} opções com filtros por categoria, como cachoeiras, restaurantes e passeios.`
    : "Descubra o que fazer na sua cidade com filtros por categoria.";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: locationTitle ? `O que fazer em ${locationTitle}` : "O que fazer na cidade",
    itemListElement: itemsByCity.slice(0, 30).map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title
    }))
  };

  return (
    <>
      <Head>
        <title>{`O que fazer em ${locationTitle} | PertoDaqui`}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={`O que fazer em ${locationTitle}`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="page">
        <header className="site-header">
          <div className="site-header-inner">
            <a href="/" aria-label="Ir para a página inicial">
              <img src="/logo.svg" alt="PertoDaqui" className="logo" />
            </a>
            <div className="header-actions">
              <details className="filter-dropdown" open={isFilterOpen} ref={filterRef}>
                <summary
                  className="filter-button"
                  onClick={(event) => {
                    event.preventDefault();
                    setIsFilterOpen((prev) => !prev);
                  }}
                >
                  <Sliders size={18} weight="bold" />
                  Filtrar categorias
                </summary>
                <div className="filter-menu">
                  <button
                    type="button"
                    className="filter-category-toggle"
                    aria-expanded={isCategoryOpen}
                    onClick={() => setIsCategoryOpen((prev) => !prev)}
                  >
                    <MagnifyingGlass size={18} weight="bold" aria-hidden="true" />
                    Quais atividades?
                  </button>
                  {isCategoryOpen ? (
                    <div className="filter-category-list">
                      {categories.map((category) => (
                        <label
                          key={category.key}
                          className={`filter-option${
                            selectedCategories.includes(category.key) ? " active" : ""
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category.key)}
                            onChange={() =>
                              setSelectedCategories((prev) =>
                                prev.includes(category.key)
                                  ? prev.filter((key) => key !== category.key)
                                  : [...prev, category.key]
                              )
                            }
                          />
                          <span className="filter-option-icon" aria-hidden="true">
                            {category.icon}
                          </span>
                          <span className="filter-option-label">{category.label}</span>
                        </label>
                      ))}
                      <button
                        type="button"
                        className={`filter-option filter-clear-all ${
                          selectedCategories.length === categories.length
                            ? "is-clear"
                            : "is-select"
                        }`}
                        onClick={() =>
                          setSelectedCategories((prev) =>
                            prev.length === categories.length
                              ? []
                              : categories.map((category) => category.key)
                          )
                        }
                      >
                        <span className="filter-option-icon" aria-hidden="true">
                          {selectedCategories.length === categories.length ? (
                            <XCircle size={20} />
                          ) : (
                            <CheckSquare size={20} />
                          )}
                        </span>
                        <span className="filter-option-label">
                          {selectedCategories.length === categories.length
                            ? "Desmarcar tudo"
                            : "Marcar tudo"}
                        </span>
                      </button>
                    </div>
                  ) : null}
                </div>
              </details>
              <a
                className="cta-contact"
                href="mailto:contato@pertodaqui.app"
                aria-label="Enviar email para contato@pertodaqui.app"
                title="contato@pertodaqui.app"
              >
                <EnvelopeSimple size={20} weight="bold" />
              </a>
            </div>
          </div>
        </header>

        <main className="content">
          <section className="city-hero">
            <h1>O que fazer em {locationTitle}</h1>
            <p>
              Encontre {totalItems} opções para explorar em {locationTitle}. Use
              os filtros para ver cachoeiras, trilhas, restaurantes, bares e
              muito mais.
            </p>
          </section>
          <section className="results">
            {!slugParam ? (
              <div className="empty-state loading-state">
                <div className="loading-spinner" aria-hidden="true">
                  <SpinnerGap size={72} weight="bold" />
                </div>
                <h3>Carregando a cidade...</h3>
                <p>Preparando as opções para você.</p>
              </div>
            ) : activeItems.length > 0 ? (
              <div className="cards-grid">
                {paginatedItems.map((item) => (
                  <article className="place-card" key={`${item.id}-${item.categoryKey}`}>
                    <div className="place-media">
                      <img src={item.image} alt={item.title} loading="lazy" />
                    </div>
                    <div className="place-body">
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.meta}</p>
                      </div>
                      <span className="place-location">
                        {formatLocation(item.location)}
                      </span>
                    </div>
                    <div className="place-footer">
                      <span>{locationTitle}</span>
                      <div className="place-actions">
                        <span
                          className="place-badge"
                          title={categoriesByKey[item.categoryKey]?.label}
                          aria-label={categoriesByKey[item.categoryKey]?.label}
                        >
                          {categoriesByKey[item.categoryKey]?.icon}
                        </span>
                        <a
                          className="route-link"
                          href={getMapsUrl(item)}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Iniciar rota"
                          title="Iniciar rota"
                        >
                          <MapPinLine size={18} />
                        </a>
                        <div className="place-temp-wrap" data-temp-key={getCoordKey(item)}>
                          <button
                            type="button"
                            className="place-temp"
                            title="Temperatura atual"
                            onClick={() => {
                              const key = getCoordKey(item);
                              setOpenTempKey((prev) => (prev === key ? null : key));
                            }}
                          >
                            <Thermometer size={16} />
                            <span>
                              {weatherByCoord[getCoordKey(item)] ?? "--"}°C
                            </span>
                          </button>
                          {openTempKey === getCoordKey(item) && (
                            <div className="temp-tooltip" role="dialog">
                              <strong>Próximos 5 dias</strong>
                              <div className="temp-tooltip-list">
                                {(forecastByCoord[getCoordKey(item)] || []).map(
                                  (day) => (
                                    <div
                                      key={`${getCoordKey(item)}-${day.date}`}
                                      className="temp-tooltip-row"
                                    >
                                      <span>
                                        {new Date(day.date).toLocaleDateString(
                                          "pt-BR",
                                          {
                                            weekday: "short",
                                            day: "2-digit",
                                            month: "2-digit"
                                          }
                                        )}
                                      </span>
                                      <span>
                                        {day.min ?? "--"}°C / {day.max ?? "--"}°C
                                      </span>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-illustration" aria-hidden="true">
                  <Broom size={72} />
                </div>
                <h3>Nada encontrado em {locationTitle}</h3>
                <p>Tente outra cidade ou ajuste as categorias.</p>
              </div>
            )}
          </section>

          {activeItems.length > ITEMS_PER_PAGE && (
            <div className="pagination">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Anterior
              </button>
              <span>
                Página {currentPage} de {totalPages}
              </span>
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
              >
                Próxima
              </button>
            </div>
          )}

          <footer className="site-footer">
            <div className="footer-inner">
              <div className="footer-brand">
                <span className="footer-logo">PertoDaqui © 2026</span>
                <p className="footer-slogan">
                  Turismo de curta distância para sair do tédio e conhecer o que
                  existe ao seu redor.
                </p>
              </div>

              <nav className="footer-links" aria-label="Links institucionais">
                <a className="footer-link-button" href="/privacidade">
                  Política de privacidade
                </a>
                <a className="footer-link-button" href="/termos">
                  Termos de uso
                </a>
                <a
                  className="footer-link-button"
                  href="mailto:contato@pertodaqui.app"
                >
                  Contato
                </a>
              </nav>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
