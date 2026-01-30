import Head from "next/head";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bed,
  BeerStein,
  Binoculars,
  Coffee,
  Columns,
  ForkKnife,
  EnvelopeSimple,
  House,
  FunnelSimple,
  MagnifyingGlass,
  MapPinLine,
  MapTrifold,
  Broom,
  PlusCircle,
  Thermometer,
  Tree,
  Shield,
  FileText
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
import { getRandomSubtitle } from "../utils/textHelpers";

const EARTH_RADIUS_KM = 6371;
const QUICK_DISTANCES = [1, 5, 10, 25];
const ITEMS_PER_PAGE = 12;

const toRadians = (value) => (value * Math.PI) / 180;

const getDistanceKm = (from, to) => {
  const deltaLat = toRadians(to.lat - from.lat);
  const deltaLng = toRadians(to.lng - from.lng);
  const originLat = toRadians(from.lat);
  const targetLat = toRadians(to.lat);

  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(originLat) * Math.cos(targetLat) * Math.sin(deltaLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_KM * c;
};

const mapDistance = (item, origin) => {
  const distanceKm = getDistanceKm(origin, item);
  return { ...item, distanceKm: Math.round(distanceKm) };
};

const getItemsByDistance = (items, maxDistance, origin) => {
  if (!origin) {
    return [];
  }

  return items
    .map((item) => mapDistance(item, origin))
    .filter((item) => item.distanceKm <= maxDistance);
};

const getMapsUrl = (item) =>
  `https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}`;

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

const categories = [
  {
    key: "waterfalls",
    label: "Cachoeiras",
    icon: (
      <Tree size={24} />
    )
  },
  {
    key: "trails",
    label: "Trilhas",
    icon: (
      <MapPinLine size={24} />
    )
  },
  {
    key: "viewpoints",
    label: "Mirantes",
    icon: (
      <Binoculars size={24} />
    )
  },
  {
    key: "parks",
    label: "Parques",
    icon: (
      <Tree size={24} />
    )
  },
  {
    key: "restaurants",
    label: "Restaurantes",
    icon: (
      <ForkKnife size={24} />
    )
  },
  {
    key: "cafes",
    label: "Cafés",
    icon: (
      <Coffee size={24} />
    )
  },
  {
    key: "bars",
    label: "Bares",
    icon: (
      <BeerStein size={24} />
    )
  },
  {
    key: "culture",
    label: "Cultura",
    icon: (
      <Columns size={24} />
    )
  },
  {
    key: "hotels",
    label: "Hospedagens",
    icon: (
      <Bed size={24} />
    )
  },
  {
    key: "tours",
    label: "Passeios",
    icon: (
      <MapTrifold size={24} />
    )
  }
];

export default function Home() {
  const [distance, setDistance] = useState(80);
  const [userCoords, setUserCoords] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(
    categories.map((category) => category.key)
  );
  const [geoError, setGeoError] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [weatherByCoord, setWeatherByCoord] = useState({});
  const [subtitle, setSubtitle] = useState(
    "Escolha o raio de distância e descubra o que explorar..."
  );
  const filterRef = useRef(null);
  const weatherCacheRef = useRef({});

  const requestLocation = () => {
    if (!("geolocation" in navigator)) {
      setGeoError("Seu navegador não suporta geolocalização.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setGeoError("");
      },
      () => {
        setUserCoords(null);
        setGeoError("Permita a localização para ver opções próximas.");
      }
    );
  };

  useEffect(() => {
    requestLocation();
    setSubtitle(getRandomSubtitle());
  }, []);

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
      filteredViewpoints,
      filteredTrails,
      filteredRestaurants,
      filteredTours
    ]
  );

  const categoriesByKey = useMemo(
    () =>
      categories.reduce((acc, category) => {
        acc[category.key] = category;
        return acc;
      }, {}),
    []
  );

  const activeItems = useMemo(
    () =>
      selectedCategories.flatMap(
        (categoryKey) =>
          (filteredByCategory[categoryKey] || []).map((item) => ({
            ...item,
            categoryKey
          }))
      ).sort((a, b) => a.distanceKm - b.distanceKm),
    [filteredByCategory, selectedCategories]
  );

  const totalPages = Math.max(1, Math.ceil(activeItems.length / ITEMS_PER_PAGE));
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return activeItems.slice(start, start + ITEMS_PER_PAGE);
  }, [activeItems, currentPage]);

  const getCoordKey = (item) => `${item.lat},${item.lng}`;

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
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`;
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) {
        return null;
      }
      const data = await response.json();
      const temp = data?.current_weather?.temperature;
      if (typeof temp === "number") {
        return { key, temp: Math.round(temp) };
      }
      return null;
    };

    Promise.all(pending.map(fetchWeather))
      .then((results) => {
        if (!isMounted) {
          return;
        }
        const next = {};
        results.forEach((result) => {
          if (result) {
            next[result.key] = result.temp;
            weatherCacheRef.current[result.key] = result.temp;
          }
        });
        if (Object.keys(next).length > 0) {
          setWeatherByCoord((prev) => ({ ...prev, ...next }));
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [activeItems]);

  const toggleCategory = (categoryKey) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryKey)
        ? prev.filter((key) => key !== categoryKey)
        : [...prev, categoryKey]
    );
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [distance, selectedCategories, userCoords]);

  return (
    <>
      <Head>
        <title>PertoDaqui - Descubra atividades perto de você</title>
        <meta
          name="description"
          content="Descubra passeios, hospedagens e experiências perto de você."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
                  <FunnelSimple size={16} />
                  Filtrar atividades
                </summary>
                <div className="filter-menu">
                  <span className="filter-menu-title">Categorias</span>
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
                        onChange={() => toggleCategory(category.key)}
                      />
                      <span className="filter-option-icon" aria-hidden="true">
                        {category.icon}
                      </span>
                      <span>{category.label}</span>
                    </label>
                  ))}
                </div>
              </details>
              <a className="cta-home" href="/" aria-label="Página inicial" title="Início">
                <House size={20} weight="bold" />
              </a>
              <a
                className="cta-contact"
                href="mailto:contato@pertodaqui.com"
                aria-label="Enviar email para contato@pertodaqui.com"
                title="contato@pertodaqui.com"
              >
                <EnvelopeSimple size={20} weight="bold" />
              </a>
            </div>
          </div>
        </header>

        <main className="content">
          <section className="hero-card">
            <h1>Descubra atividades perto de você</h1>
            <p>{subtitle}</p>
            <div className="distance-wrap">
              <div
                className="range-wrap"
                style={{
                  "--range-progress": `${((distance - 1) / 89) * 100}%`
                }}
              >
                <input
                  type="range"
                  min="1"
                  max="90"
                  step="1"
                  value={distance}
                  onChange={(event) => setDistance(Number(event.target.value))}
                  aria-label="Raio em quilômetros"
                />
                <output className="range-tooltip">{distance} km</output>
              </div>
            </div>
            <div className="quick-buttons">
              {QUICK_DISTANCES.map((value) => (
                <button
                  key={value}
                  type="button"
                  className={value === distance ? "active" : ""}
                  onClick={() => setDistance(value)}
                >
                  {value} km
                </button>
              ))}
            </div>
            {!userCoords && (
              <div className="location-hint">
                <p>{geoError || "Ative a localização para sugestões próximas."}</p>
                <button type="button" onClick={requestLocation}>
                  Ativar localização
                </button>
              </div>
            )}
          </section>

          <section className="results">
            {activeItems.length > 0 ? (
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
                      <span>{item.distanceKm} km</span>
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
                        <span className="place-temp" title="Temperatura atual">
                          <Thermometer size={16} />
                          <span>
                            {weatherByCoord[getCoordKey(item)] ?? "--"}°C
                          </span>
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-illustration" aria-hidden="true">
                  <MagnifyingGlass size={72} />
                </div>
                <h3>Nada por aqui nesse raio</h3>
                <p>Aumente a distância ou tente outra categoria.</p>
                <div className="empty-actions">
                  <button type="button" onClick={() => setDistance(25)}>
                    <PlusCircle size={18} weight="bold" />
                    Aumentar para 25 km
                  </button>
                  <button
                    type="button"
                    className="ghost"
                    onClick={() => {
                      setDistance(10);
                      setSelectedCategories(["tours"]);
                    }}
                  >
                    <Broom size={18} weight="bold" />
                    Limpar filtros
                  </button>
                </div>
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
                  Descubra atividades perto de você!
                </p>
              </div>

              <nav className="footer-links" aria-label="Links institucionais">
                <button
                  type="button"
                  className="footer-link-button"
                  onClick={() => setIsPrivacyOpen(true)}
                >
                  <Shield size={18} weight="bold" />
                  Politica de privacidade
                </button>
                <button
                  type="button"
                  className="footer-link-button"
                  onClick={() => setIsTermsOpen(true)}
                >
                  <FileText size={18} weight="bold" />
                  Termos de uso
                </button>
                <a href="/contato">
                  <EnvelopeSimple size={18} weight="bold" />
                  Contato
                </a>
              </nav>
            </div>
          </footer>
        </main>
      </div>

      {isPrivacyOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card">
            <div className="modal-header">
              <h2>Política de Privacidade</h2>
              <button
                type="button"
                className="modal-close"
                aria-label="Fechar"
                onClick={() => setIsPrivacyOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-muted">Última atualização: 2026</p>
              <p>
                Esta Política descreve como coletamos, usamos e protegemos suas
                informações ao usar o PertoDaqui.
              </p>
              <h3>Coleta de dados</h3>
              <p>
                Podemos coletar dados de localização (com sua permissão), dados de
                navegação e preferências de filtros para melhorar as sugestões.
              </p>
              <h3>Uso dos dados</h3>
              <p>
                Usamos os dados para personalizar resultados, aprimorar a
                plataforma e fornecer informações relevantes.
              </p>
              <h3>Compartilhamento</h3>
              <p>
                Não vendemos seus dados. Podemos compartilhar informações
                agregadas para fins de análise.
              </p>
              <h3>Seus direitos</h3>
              <p>
                Você pode solicitar acesso, correção ou exclusão de dados pelo
                email contato@pertodaqui.com.
              </p>
            </div>
          </div>
        </div>
      )}

      {isTermsOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card">
            <div className="modal-header">
              <h2>Termos de Uso</h2>
              <button
                type="button"
                className="modal-close"
                aria-label="Fechar"
                onClick={() => setIsTermsOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-muted">Última atualização: 2026</p>
              <p>
                Ao utilizar o PertoDaqui, você concorda com os termos descritos
                abaixo.
              </p>
              <h3>Uso da plataforma</h3>
              <p>
                O PertoDaqui é uma plataforma de descoberta de negócios e
                experiências. Você é responsável pelo uso correto das informações
                apresentadas.
              </p>
              <h3>Conteúdo e disponibilidade</h3>
              <p>
                Trabalhamos para manter os dados atualizados, mas não garantimos
                disponibilidade, preços ou informações de terceiros.
              </p>
              <h3>Conduta</h3>
              <p>
                Não é permitido usar a plataforma para fins ilegais, abusivos ou
                que violem direitos de terceiros.
              </p>
              <h3>Suporte</h3>
              <p>
                Para dúvidas ou suporte, entre em contato pelo email
                contato@pertodaqui.com.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
