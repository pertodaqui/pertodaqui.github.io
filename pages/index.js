import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import {
  Bed,
  BeerStein,
  Binoculars,
  Coffee,
  Columns,
  ForkKnife,
  MapPinLine,
  MapTrifold,
  SpinnerGap,
  CheckSquare,
  XCircle,
  Broom,
  PlusCircle,
  Thermometer,
  Tree,
  List,
  Moon,
  Sun,
  X
} from "@phosphor-icons/react";
import bars from "../data/bars";
import beaches from "../data/beaches";
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
  buildActiveItemsFromCategoryMap,
  normalizeSelectedCategories,
  paginateItems,
  toggleAllCategories,
  toggleCategorySelection
} from "../utils/listingHelpers";
import {
  formatLocation,
  getItemsByDistance,
  getMapsUrl
} from "../utils/locationHelpers";
import { useWeatherByItems } from "../utils/useWeatherByItems";

const QUICK_DISTANCES = [1, 5, 10, 25];
const ITEMS_PER_PAGE = 9;
const SITE_URL = "https://pertodaqui.com";

const categories = [
  {
    key: "waterfalls",
    label: "Cachoeiras",
    icon: <Tree size={18} />
  },
  {
    key: "beaches",
    label: "Praias",
    icon: <MapPinLine size={18} />
  },
  {
    key: "trails",
    label: "Trilhas",
    icon: <MapPinLine size={18} />
  },
  {
    key: "viewpoints",
    label: "Mirantes",
    icon: <Binoculars size={18} />
  },
  {
    key: "parks",
    label: "Parques",
    icon: <Tree size={18} />
  },
  {
    key: "restaurants",
    label: "Restaurantes",
    icon: <ForkKnife size={18} />
  },
  {
    key: "cafes",
    label: "Cafés",
    icon: <Coffee size={18} />
  },
  {
    key: "bars",
    label: "Bares",
    icon: <BeerStein size={18} />
  },
  {
    key: "culture",
    label: "Cultura",
    icon: <Columns size={18} />
  },
  {
    key: "hotels",
    label: "Hospedagens",
    icon: <Bed size={18} />
  },
  {
    key: "tours",
    label: "Passeios",
    icon: <MapTrifold size={18} />
  }
];

export default function HomeV2() {
  const router = useRouter();
  const categoryKeys = useMemo(() => categories.map((category) => category.key), []);
  const [distance, setDistance] = useState(80);
  const [userCoords, setUserCoords] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(categoryKeys);
  const [geoError, setGeoError] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLocating, setIsLocating] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [theme, setTheme] = useState("winter");
  const [openTempKey, setOpenTempKey] = useState(null);
  const hasSelectedCategories = selectedCategories.length > 0;

  const requestLocation = () => {
    if (!("geolocation" in navigator)) {
      setGeoError("Seu navegador não suporta geolocalização.");
      setIsLocating(false);
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setGeoError("");
        setIsLocating(false);
      },
      () => {
        setUserCoords(null);
        setGeoError("Permita a localização para ver opções próximas.");
        setIsLocating(false);
      }
    );
  };

  useEffect(() => {
    requestLocation();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("v2-theme");
    if (saved === "night" || saved === "winter") {
      setTheme(saved);
    } else if (saved === "dark") {
      setTheme("night");
    } else if (saved === "cupcake") {
      setTheme("winter");
    }
  }, []);

  const filteredTours = useMemo(
    () => getItemsByDistance(tours, distance, userCoords),
    [distance, userCoords]
  );
  const filteredHotels = useMemo(
    () => getItemsByDistance(hotels, distance, userCoords),
    [distance, userCoords]
  );
  const filteredParks = useMemo(
    () => getItemsByDistance(parks, distance, userCoords),
    [distance, userCoords]
  );
  const filteredWaterfalls = useMemo(
    () => getItemsByDistance(waterfalls, distance, userCoords),
    [distance, userCoords]
  );
  const filteredBeaches = useMemo(
    () => getItemsByDistance(beaches, distance, userCoords),
    [distance, userCoords]
  );
  const filteredViewpoints = useMemo(
    () => getItemsByDistance(viewpoints, distance, userCoords),
    [distance, userCoords]
  );
  const filteredTrails = useMemo(
    () => getItemsByDistance(trails, distance, userCoords),
    [distance, userCoords]
  );
  const filteredRestaurants = useMemo(
    () => getItemsByDistance(restaurants, distance, userCoords),
    [distance, userCoords]
  );
  const filteredCafes = useMemo(
    () => getItemsByDistance(cafes, distance, userCoords),
    [distance, userCoords]
  );
  const filteredCulture = useMemo(
    () => getItemsByDistance(culture, distance, userCoords),
    [distance, userCoords]
  );
  const filteredBars = useMemo(
    () => getItemsByDistance(bars, distance, userCoords),
    [distance, userCoords]
  );

  const filteredByCategory = useMemo(
    () => ({
      tours: filteredTours,
      hotels: filteredHotels,
      parks: filteredParks,
      waterfalls: filteredWaterfalls,
      beaches: filteredBeaches,
      viewpoints: filteredViewpoints,
      trails: filteredTrails,
      restaurants: filteredRestaurants,
      cafes: filteredCafes,
      bars: filteredBars,
      culture: filteredCulture
    }),
    [
      filteredBars,
      filteredCafes,
      filteredCulture,
      filteredHotels,
      filteredParks,
      filteredWaterfalls,
      filteredBeaches,
      filteredViewpoints,
      filteredTrails,
      filteredRestaurants,
      filteredTours
    ]
  );

  const activeItems = useMemo(() => {
    if (!hasSelectedCategories) return [];
    return buildActiveItemsFromCategoryMap(filteredByCategory, selectedCategories, "distance");
  }, [filteredByCategory, hasSelectedCategories, selectedCategories]);

  const totalPages = Math.max(1, Math.ceil(activeItems.length / ITEMS_PER_PAGE));
  const paginatedItems = useMemo(
    () => paginateItems(activeItems, currentPage, ITEMS_PER_PAGE),
    [activeItems, currentPage]
  );

  const { weatherByCoord, weatherStatusByCoord, forecastByCoord, getCoordKey } =
    useWeatherByItems(activeItems);

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

  const toggleCategory = (categoryKey) => {
    setSelectedCategories((prev) => toggleCategorySelection(prev, categoryKey));
  };

  const allCategoriesSelected = categoryKeys.every((key) => selectedCategories.includes(key));

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
    setCurrentPage(1);
  }, [distance, selectedCategories, userCoords]);

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
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const canonicalUrl =
    currentPage > 1 ? `${SITE_URL}/?page=${currentPage}` : `${SITE_URL}/`;
  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "winter" ? "night" : "winter";
      if (typeof window !== "undefined") {
        window.localStorage.setItem("v2-theme", next);
      }
      return next;
    });
  };

  return (
    <>
      <Head>
        <title>PertoDaqui - Descubra atividades perto de você</title>
        <meta
          name="description"
          content="Descubra passeios, hospedagens e experiências perto de você."
        />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/daisyui@4.12.24/dist/full.min.css"
        />
      </Head>

      <div data-theme={theme} className="min-h-screen bg-base-200 text-base-content flex flex-col">
        <header
          className="border-b border-base-300 bg-base-100"
          style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}
        >
          <div className="navbar mx-auto w-full max-w-7xl px-4 md:px-8" style={{ minHeight: "108px" }}>
            <div className="navbar-start">
              <a href="/" className="btn btn-ghost px-0 hover:bg-transparent h-full min-h-0 flex items-center">
                <img
                  src={theme === "night" ? "/logo-dark.svg" : "/logo.svg"}
                  alt="PertoDaqui"
                  className="w-auto"
                  style={{ height: "72px" }}
                />
              </a>
            </div>
            <div className="navbar-end gap-2">
              <button
                type="button"
                className="btn btn-ghost btn-circle"
                onClick={toggleTheme}
                aria-label={theme === "winter" ? "Ativar modo escuro" : "Ativar modo claro"}
                title={theme === "winter" ? "Modo escuro" : "Modo claro"}
              >
                {theme === "winter" ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <button
                type="button"
                className="btn btn-primary btn-circle"
                onClick={() => setIsFilterOpen(true)}
                aria-label="Abrir filtros"
                title="Abrir filtros"
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </header>

        {isFilterOpen ? (
          <>
            <button
              type="button"
              className="v2-drawer-backdrop"
              aria-label="Fechar filtros"
              onClick={() => setIsFilterOpen(false)}
            />
            <aside className="v2-drawer-panel" role="dialog" aria-modal="true">
              <div className="v2-drawer-header">
                <strong>Filtros</strong>
                <button
                  type="button"
                  className="btn btn-ghost btn-circle btn-sm"
                  aria-label="Fechar filtros"
                  onClick={() => setIsFilterOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>
              <div className="menu w-full rounded-box border border-base-300 bg-base-100 p-4 shadow-xl">
                <div className="mt-2 grid grid-cols-1 gap-2">
                  {categories.map((category) => (
                    <label
                      key={category.key}
                      className="label cursor-pointer justify-start gap-3 rounded-box border border-base-300 px-3 py-2"
                    >
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm checkbox-primary"
                        checked={selectedCategories.includes(category.key)}
                        onChange={() => toggleCategory(category.key)}
                      />
                      <span className="flex items-center gap-2 text-sm font-medium">
                        {category.icon}
                        {category.label}
                      </span>
                    </label>
                  ))}
                  <button
                    type="button"
                    className="btn btn-sm btn-outline"
                    onClick={() => {
                      setOpenTempKey(null);
                      setSelectedCategories((prev) => toggleAllCategories(prev, categoryKeys));
                    }}
                  >
                    {allCategoriesSelected ? <XCircle size={16} /> : <CheckSquare size={16} />}
                    {allCategoriesSelected ? "Desmarcar tudo" : "Marcar tudo"}
                  </button>
                </div>

                <div className="divider my-3"></div>
                <div className="text-xs font-bold uppercase tracking-wide">Raio de busca</div>
                <div className="mt-2">
                  <input
                    type="range"
                    min="1"
                    max="90"
                    step="1"
                    value={distance}
                    onChange={(event) => setDistance(Number(event.target.value))}
                    aria-label="Raio em quilômetros"
                    className="range range-sm range-primary w-full"
                  />
                  <div className="mt-1 flex justify-between text-xs text-base-content/60">
                    <span>1 km</span>
                    <span>90 km</span>
                  </div>
                  <div className="mt-2 text-sm font-semibold">{distance} km</div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {QUICK_DISTANCES.map((value) => (
                    <button
                      key={value}
                      type="button"
                      className={`btn btn-xs ${value === distance ? "btn-primary" : "btn-outline"}`}
                      onClick={() => setDistance(value)}
                    >
                      {value} km
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </>
        ) : null}

        <main
          className="mx-auto w-full max-w-7xl flex-1 px-4 pb-0 pt-0 md:px-8 md:pb-0"
          style={{ paddingTop: "140px", paddingBottom: "90px" }}
        >
          <section>
            {activeItems.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {paginatedItems.map((item) => (
                  <article className="card border border-base-300 bg-base-100 shadow-sm" key={`${item.id}-${item.categoryKey}`}>
                    <figure className="h-44 overflow-hidden border-b border-base-300">
                      <img src={item.image} alt={item.title} loading="lazy" className="h-full w-full object-cover" />
                    </figure>
                    <div className="card-body gap-3 p-4 v2-card-body">
                      <div>
                        <h2 className="card-title text-base leading-tight">{item.title}</h2>
                        <p className="mt-1 text-sm text-base-content/70">{item.meta}</p>
                      </div>
                      <div className="text-xs font-medium text-base-content/60 v2-card-location">{formatLocation(item.location)}</div>
                      <div className="flex items-center justify-between gap-2 v2-card-footer">
                        <span className="text-sm">
                          <strong>{item.distanceKm} km</strong>
                        </span>
                        <div className="flex items-center gap-2">
                          <a
                            className="btn btn-sm btn-primary btn-square"
                            href={getMapsUrl(item)}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Iniciar rota"
                            title="Iniciar rota"
                          >
                            <MapPinLine size={16} weight="bold" />
                          </a>
                          <div className="relative" data-temp-key={getCoordKey(item)}>
                            <button
                              type="button"
                              className="btn btn-sm btn-ghost"
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
                              <div className="absolute right-0 top-full z-20 mt-2 min-w-52 rounded-box border border-base-300 bg-base-100 p-3 shadow-xl">
                                <strong className="block text-sm">Próximos 5 dias</strong>
                                <div className="mt-2 space-y-1 text-xs">
                                  {(forecastByCoord[getCoordKey(item)] || []).map((day) => (
                                    <div key={`${getCoordKey(item)}-${day.date}`} className="flex items-center justify-between gap-3">
                                      <span>
                                        {new Date(day.date).toLocaleDateString("pt-BR", {
                                          weekday: "short",
                                          day: "2-digit",
                                          month: "2-digit"
                                        })}
                                      </span>
                                      <span>{day.min ?? "--"}°C / {day.max ?? "--"}°C</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : isLocating ? (
              <div className="alert border border-base-300 bg-base-100 shadow-sm">
                <SpinnerGap size={24} className="animate-spin" />
                <div>
                  <h3 className="font-bold">Buscando opções perto de você...</h3>
                  <div className="text-sm">Estamos localizando e organizando as sugestões.</div>
                </div>
              </div>
            ) : geoError ? (
              <div className="card border border-base-300 bg-base-100 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">Não conseguimos acessar sua localização</h3>
                  <p className="text-sm">{geoError}</p>
                  <div className="card-actions">
                    <button type="button" className="btn btn-primary" onClick={requestLocation}>
                      <MapPinLine size={16} />
                      Tentar novamente
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card border border-base-300 bg-base-100 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">Nada por aqui nesse raio</h3>
                  <p className="text-sm">Aumente a distância ou tente outra categoria.</p>
                  <div className="card-actions flex-wrap">
                    <button type="button" className="btn btn-primary" onClick={() => setDistance(25)}>
                      <PlusCircle size={16} />
                      Aumentar para 25 km
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => {
                        setDistance(10);
                        setSelectedCategories(["tours"]);
                      }}
                    >
                      <Broom size={16} />
                      Limpar filtros
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>

          {activeItems.length > ITEMS_PER_PAGE && (
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Anterior
              </button>
              <span className="text-sm font-medium">
                Página {currentPage} de {totalPages}
              </span>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Próxima
              </button>
            </div>
          )}

        </main>
        <footer className="v2-site-footer w-full border-t border-base-300 bg-base-100 py-6">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-8 v2-footer-inner">
            <aside>
              <p className="font-semibold">PertoDaqui © 2026</p>
              <p className="text-sm text-base-content/70">
                Turismo de curta distância para sair do tédio e conhecer o que existe ao seu redor.
              </p>
            </aside>
            <div className="v2-footer-columns text-sm">
              <div className="v2-footer-col">
                <strong className="v2-footer-col-title">SITE</strong>
                <a href="/sobre-nos/" className="link link-hover" onClick={(e) => { e.preventDefault(); window.location.assign("/sobre-nos/"); }}>Sobre nós</a>
                <a href="/parceiros/" className="link link-hover" onClick={(e) => { e.preventDefault(); window.location.assign("/parceiros/"); }}>Parceiros</a>
              </div>
              <div className="v2-footer-col">
                <strong className="v2-footer-col-title">Para empresas</strong>
                <a href="/quais-as-vantagens/" className="link link-hover" onClick={(e) => { e.preventDefault(); window.location.assign("/quais-as-vantagens/"); }}>Quais as vantagens</a>
                <a href="/como-aparecer/" className="link link-hover" onClick={(e) => { e.preventDefault(); window.location.assign("/como-aparecer/"); }}>Como aparecer</a>
              </div>
              <div className="v2-footer-col">
                <strong className="v2-footer-col-title">Ajuda</strong>
                <a href="/privacidade/" className="link link-hover" onClick={(e) => { e.preventDefault(); window.location.assign("/privacidade/"); }}>Política de privacidade</a>
                <a href="/termos/" className="link link-hover" onClick={(e) => { e.preventDefault(); window.location.assign("/termos/"); }}>Termos de uso</a>
                <a href="mailto:contato@pertodaqui.app" className="link link-hover">Contato</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
