import Head from "next/head";
import { useRouter } from "next/router";
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
import {
  buildActiveItemsFromList,
  normalizeSelectedCategories,
  paginateItems,
  toggleAllCategories,
  toggleCategorySelection
} from "../utils/listingHelpers";
import {
  formatLocation,
  formatSlugTitle,
  getDistanceKm,
  getLocationSlug,
  getMapsUrl
} from "../utils/locationHelpers";
import { useWeatherByItems } from "../utils/useWeatherByItems";

const ITEMS_PER_PAGE = 9;
const SITE_URL = "https://pertodaqui.com";

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
  const router = useRouter();
  const slugParam = slug || "";
  const categoryKeys = useMemo(
    () => categories.map((category) => category.key),
    []
  );

  const [selectedCategories, setSelectedCategories] = useState(
    categories.map((category) => category.key)
  );
  const [userCoords, setUserCoords] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [openTempKey, setOpenTempKey] = useState(null);
  const filterRef = useRef(null);
  const hasSelectedCategories = selectedCategories.length > 0;
  const allCategoriesSelected = categoryKeys.every((key) =>
    selectedCategories.includes(key)
  );

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
        .map((item) => {
          if (!userCoords || item.lat == null || item.lng == null) {
            return { ...item, categoryKey: category.key, distanceKm: null };
          }
          const distanceKm = Math.round(
            getDistanceKm(userCoords, { lat: item.lat, lng: item.lng })
          );
          return { ...item, categoryKey: category.key, distanceKm };
        })
    );
  }, [itemsByCategory, slugParam, userCoords]);

  const totalItems = itemsByCity.length;
  const activeItems = useMemo(
    () => {
      if (!hasSelectedCategories) return [];
      return buildActiveItemsFromList(itemsByCity, selectedCategories, "alpha");
    },
    [hasSelectedCategories, itemsByCity, selectedCategories]
  );

  const totalPages = Math.max(1, Math.ceil(activeItems.length / ITEMS_PER_PAGE));
  const paginatedItems = useMemo(() => {
    return paginateItems(activeItems, currentPage, ITEMS_PER_PAGE);
  }, [activeItems, currentPage]);

  const { weatherByCoord, weatherStatusByCoord, forecastByCoord, getCoordKey } =
    useWeatherByItems(activeItems);

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
    if (!("geolocation" in navigator)) {
      setUserCoords(null);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      () => {
        setUserCoords(null);
      }
    );
  }, []);

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
    if (!hasSelectedCategories) {
      setOpenTempKey(null);
    }
  }, [hasSelectedCategories]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, slugParam]);

  useEffect(() => {
    if (!router.isReady) return;
    const pageFromQuery = Number(router.query.page);
    if (Number.isInteger(pageFromQuery) && pageFromQuery > 0) {
      setCurrentPage(pageFromQuery);
    } else {
      setCurrentPage(1);
    }
  }, [router.isReady, router.query.page]);

  useEffect(() => {
    if (!router.isReady) return;
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
      return;
    }
    const nextQuery = { ...router.query };
    if (currentPage > 1) {
      nextQuery.page = String(currentPage);
    } else {
      delete nextQuery.page;
    }
    router.replace(
      { pathname: router.pathname, query: nextQuery },
      undefined,
      { shallow: true, scroll: false }
    );
  }, [currentPage, totalPages, router]);

  useEffect(() => {
    setSelectedCategories((prev) => {
      const sanitized = normalizeSelectedCategories(prev, categoryKeys);
      if (
        sanitized.length === prev.length &&
        sanitized.every((key, index) => key === prev[index])
      ) {
        return prev;
      }
      return sanitized;
    });
  }, [categoryKeys]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const locationDisplay = itemsByCity[0]?.location
    ? formatLocation(itemsByCity[0].location)
    : formatSlugTitle(slugParam);
  const baseCityPath = `/o-que-fazer-em-${slugParam}/`;
  const canonicalUrl =
    currentPage > 1
      ? `${SITE_URL}${baseCityPath}?page=${currentPage}`
      : `${SITE_URL}${baseCityPath}`;
  const metaDescription = locationDisplay
    ? `Descubra o que fazer em ${locationDisplay}. Veja ${totalItems} opções com filtros por categoria, como cachoeiras, restaurantes e passeios.`
    : "Descubra o que fazer na sua cidade com filtros por categoria.";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: locationDisplay
      ? `O que fazer em ${locationDisplay}`
      : "O que fazer na cidade",
    itemListElement: itemsByCity.slice(0, 30).map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title
    }))
  };

  return (
    <>
      <Head>
        <title>{`O que fazer em ${locationDisplay} | PertoDaqui`}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`O que fazer em ${locationDisplay}`} />
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
                    Categorias
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
                                toggleCategorySelection(prev, category.key)
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
                          allCategoriesSelected ? "is-clear" : "is-select"
                        }`}
                        onClick={() => {
                          setOpenTempKey(null);
                          setSelectedCategories((prev) =>
                            toggleAllCategories(prev, categoryKeys)
                          );
                        }}
                      >
                        <span className="filter-option-icon" aria-hidden="true">
                          {allCategoriesSelected ? (
                            <XCircle size={20} />
                          ) : (
                            <CheckSquare size={20} />
                          )}
                        </span>
                        <span className="filter-option-label">
                          {allCategoriesSelected ? "Desmarcar tudo" : "Marcar tudo"}
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
            <h1>O que fazer em {locationDisplay}</h1>
            <p>
              Explore {totalItems} lugares imperdíveis em {locationDisplay}. Use
              os filtros para achar seu rolê ideal.
            </p>
          </section>
          <section className="results">
            <h2 className="sr-only">Resultados</h2>
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
                      <span>
                        {typeof item.distanceKm === "number"
                          ? userCoords
                            ? (
                              <>
                                <strong>{item.distanceKm} km de você</strong>
                              </>
                            )
                            : `${item.distanceKm} km`
                          : "-- km"}
                      </span>
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
                            title={
                              weatherStatusByCoord[getCoordKey(item)] === "error"
                                ? "Temperatura indisponível no momento"
                                : "Temperatura atual"
                            }
                            onClick={() => {
                              const key = getCoordKey(item);
                              setOpenTempKey((prev) => (prev === key ? null : key));
                            }}
                          >
                            <Thermometer size={16} />
                            <span>
                              {weatherStatusByCoord[getCoordKey(item)] === "loading"
                                ? "..."
                                : weatherStatusByCoord[getCoordKey(item)] === "error"
                                  ? "N/D"
                                  : `${weatherByCoord[getCoordKey(item)] ?? "--"}°C`}
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
                <h3>Não tem nada nessa cidade.</h3>
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
