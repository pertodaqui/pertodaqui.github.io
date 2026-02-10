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
  FileText,
  Sliders
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
  const [forecastByCoord, setForecastByCoord] = useState({});
  const [subtitle, setSubtitle] = useState(
    "Escolha o raio de distância e descubra o que explorar..."
  );
  const filterRef = useRef(null);
  const weatherCacheRef = useRef({});
  const [openTempKey, setOpenTempKey] = useState(null);

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
                  <Sliders size={18} weight="bold" />
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
                  <div className="filter-menu-divider"></div>
                  <span className="filter-menu-title">Raio de busca</span>
                  <div className="filter-distance-wrap">
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
                  <div className="filter-quick-distances">
                    {QUICK_DISTANCES.map((value) => (
                      <button
                        key={value}
                        type="button"
                        className={`quick-distance-btn${value === distance ? " active" : ""}`}
                        onClick={() => setDistance(value)}
                      >
                        {value} km
                      </button>
                    ))}
                  </div>
                </div>
              </details>
              <a className="cta-home" href="/" aria-label="Página inicial" title="Início">
                <House size={20} weight="bold" />
              </a>
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
                        <div
                          className="place-temp-wrap"
                          data-temp-key={getCoordKey(item)}
                        >
                          <button
                            type="button"
                            className="place-temp"
                            title="Temperatura atual"
                            onClick={() => {
                              const key = getCoordKey(item);
                              setOpenTempKey((prev) =>
                                prev === key ? null : key
                              );
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
                <a className="footer-link-button" href="/contato">
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
                O PertoDaqui ("nós", "nosso" ou "nos") opera a plataforma PertoDaqui. Esta página informa sua política de privacidade e explica como coletamos, usamos, mantemos e protegemos suas informações ao usar nosso serviço.
              </p>

              <h3>1. Dados que Coletamos</h3>
              <p>
                Coletamos dados de forma direta e indireta para fornecer e melhorar nossa plataforma:
              </p>
              <ul style={{marginLeft: '20px', lineHeight: '1.8'}}>
                <li><strong>Dados de Localização:</strong> Com sua permissão explícita, coletamos sua localização atual para fornecer sugestões personalizadas de atividades próximas.</li>
                <li><strong>Dados de Navegação:</strong> Registramos quais categorias você visualiza, filtros aplicados, itens que você clica e tempo gasto na plataforma.</li>
                <li><strong>Preferências:</strong> Armazenamos localmente suas preferências de filtros e distância selecionada.</li>
                <li><strong>Dados do Dispositivo:</strong> Informações sobre seu navegador, sistema operacional e tipo de dispositivo para otimizar a experiência.</li>
                <li><strong>Dados Climáticos:</strong> Coletamos dados de temperatura de APIs públicas baseados em coordenadas geográficas.</li>
              </ul>

              <h3>2. Como Usamos Seus Dados</h3>
              <p>Usamos as informações coletadas para:</p>
              <ul style={{marginLeft: '20px', lineHeight: '1.8'}}>
                <li>Personalizar recomendações de atividades com base em sua localização e preferências</li>
                <li>Exibir informações climáticas relevantes para os locais consultados</li>
                <li>Melhorar a funcionalidade, performance e segurança da plataforma</li>
                <li>Entender padrões de uso para aprimorar a experiência</li>
                <li>Enviar atualizações importantes ou mudanças em nossa política (quando aplicável)</li>
                <li>Proteger contra fraude e atividades maliciosas</li>
              </ul>

              <h3>3. Base Legal para Processamento</h3>
              <p>
                Processamos seus dados com base no seu consentimento. Para dados de localização, solicitamos permissão explícita do seu navegador. Você pode retirar seu consentimento a qualquer momento nas configurações do seu dispositivo.
              </p>

              <h3>4. Armazenamento de Dados Locais</h3>
              <p>
                Utilizamos tecnologia de Service Worker e armazenamento local do navegador para guardar suas preferências, o histórico de filtros e dados em cache. Esses dados permanecem exclusivamente em seu dispositivo e não são transmitidos aos nossos servidores.
              </p>

              <h3>5. APIs e Serviços de Terceiros</h3>
              <p>
                Utilizamos APIs públicas de terceiros para fornecer funcionalidades:
              </p>
              <ul style={{marginLeft: '20px', lineHeight: '1.8'}}>
                <li><strong>Open-Meteo API:</strong> Para dados climáticos. Sujeita à <a href="https://open-meteo.com/en/terms" target="_blank" rel="noreferrer" style={{color: 'var(--pd-blue)', textDecoration: 'none'}}>política de privacidade do Open-Meteo</a></li>
                <li><strong>Google Maps:</strong> Para gerar rotas. Sujeita à <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" style={{color: 'var(--pd-blue)', textDecoration: 'none'}}>política de privacidade do Google</a></li>
                <li><strong>Google Analytics:</strong> Para análise anônima de uso. Saiba mais na <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" style={{color: 'var(--pd-blue)', textDecoration: 'none'}}>política de privacidade do Google Analytics</a></li>
              </ul>

              <h3>6. Compartilhamento de Dados</h3>
              <p>
                <strong>Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros</strong> para fins de marketing. Podemos compartilhar:
              </p>
              <ul style={{marginLeft: '20px', lineHeight: '1.8'}}>
                <li>Informações agregadas e anonimizadas para análise de tendências</li>
                <li>Dados quando exigido por lei ou para proteger direitos legais</li>
                <li>Informações necessárias para operar serviços integrados (como Google Maps)</li>
              </ul>

              <h3>7. Retenção de Dados</h3>
              <p>
                Os dados de localização são processados apenas durante sua sessão ativa. Preferências e histórico de navegação são mantidos localmente em seu dispositivo indefinidamente até que você limpe o armazenamento do navegador. Logs de servidor (quando aplicável) são retidos por 90 dias.
              </p>

              <h3>8. Segurança</h3>
              <p>
                Implementamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, alteração ou divulgação. A plataforma utiliza conexões HTTPS seguras. No entanto, nenhuma transmissão pela internet é 100% segura.
              </p>

              <h3>9. Seus Direitos</h3>
              <p>Você tem o direito de:</p>
              <ul style={{marginLeft: '20px', lineHeight: '1.8'}}>
                <li>Acessar os dados que você forneceu</li>
                <li>Corrigir informações imprecisas</li>
                <li>Solicitar exclusão de seus dados</li>
                <li>Revogar consentimento de localização a qualquer momento</li>
                <li>Obter uma cópia dos seus dados em formato portável</li>
                <li>Receber informações sobre como seus dados são processados</li>
              </ul>
              <p>
                Para exercer qualquer desses direitos, entre em contato conosco em <strong>contato@pertodaqui.app</strong>.
              </p>

              <h3>10. Cookies e Tecnologias Similares</h3>
              <p>
                Utilizamos cookies e similar technologies para melhorar sua experiência. Cookies essenciais são necessários para o funcionamento da plataforma. Você pode desabilitar cookies em suas configurações de navegador, embora isso possa afetar algumas funcionalidades.
              </p>

              <h3>11. Privacidade de Menores</h3>
              <p>
                O PertoDaqui não é direcionado a menores de 13 anos. Não coletamos informações de menores knowingly. Se descobrirmos que coletamos dados de um menor, eliminaremos esses dados imediatamente.
              </p>

              <h3>12. Alterações a Esta Política</h3>
              <p>
                Reservamo-nos o direito de modificar esta Política a qualquer momento. Alterações significativas serão comunicadas com 30 dias de antecedência. Seu uso contínuo da plataforma após alterações constitui aceitação.
              </p>

              <h3>13. Contato</h3>
              <p>
                Para dúvidas sobre esta Política de Privacidade ou práticas de privacidade do PertoDaqui, entre em contato conosco através do e-mail <b>contato@pertodaqui.app</b>
              </p>
              <ul style={{marginLeft: '20px', lineHeight: '1.8'}}>
              </ul>
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
                Bem-vindo ao PertoDaqui. Ao acessar e usar esta plataforma, você concorda em cumprir integralmente estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não utilize o serviço.
              </p>

              <h3>1. Descrição do Serviço</h3>
              <p>
                O PertoDaqui é uma plataforma web baseada em localização que ajuda usuários a descobrir atividades, experiências e estabelecimentos (restaurantes, hotéis, passeios, etc.) próximos à sua localização atual. A plataforma integra informações de terceiros e dados de APIs públicas.
              </p>

              <h3>2. Elegibilidade</h3>
              <p>
                Você deve ter pelo menos 13 anos de idade para usar o PertoDaqui. Se você é menor de idade, deve ter consentimento de seus pais ou responsável legal. Ao usar a plataforma, você confirma que atende a esses requisitos.
              </p>

              <h3>3. Concessão de Licença</h3>
              <p>
                Concedemos a você uma licença limitada, não exclusiva e não transferível para acessar e usar a plataforma PertoDaqui para fins pessoais e não comerciais. Você não pode modificar, traduzir, adaptar ou criar trabalhos derivados.
              </p>

              <h3>4. Uso Aceitável</h3>
              <p>
                Você concorda em não:
              </p>
              <ul style={{marginLeft: '20px', lineHeight: '1.8'}}>
                <li>Usar a plataforma para qualquer atividade ilegal ou prejudicial</li>
                <li>Acessar ou interferir com dados ou sistemas que não lhe pertencem</li>
                <li>Fazer spam, harassment ou publicar conteúdo ofensivo</li>
                <li>Usar bots, crawlers ou ferramentas automatizadas sem autorização</li>
                <li>Contornar medidas de segurança ou restrições técnicas</li>
                <li>Comercializar dados coletados da plataforma</li>
                <li>Violar qualquer lei, regulamento ou direito de terceiros</li>
              </ul>

              <h3>5. Precisão do Conteúdo</h3>
              <p>
                A plataforma PertoDaqui fornece informações sobre estabelecimentos e atividades de terceiros. Embora nos esforçemos para manter os dados precisos e atualizados, <strong>não garantimos a exatidão, completude ou atualidade de todas as informações</strong>. As informações incluem:
              </p>
              <ul style={{marginLeft: '20px', lineHeight: '1.8'}}>
                <li>Nomes e localizações de estabelecimentos</li>
                <li>Imagens e descrições</li>
                <li>Horários de funcionamento e contato</li>
                <li>Dados climáticos fornecidos por APIs públicas</li>
              </ul>
              <p>
                Verificar informações críticas diretamente com os estabelecimentos é recomendado.
              </p>

              <h3>6. Isenção de Responsabilidade</h3>
              <p>
                <strong>O SERVIÇO É FORNECIDO "COMO ESTÁ" E "CONFORME DISPONÍVEL".</strong> O PertoDaqui não faz representações ou garantias de nenhum tipo, expressas ou implícitas. Especificamente:
              </p>
              <ul style={{marginLeft: '20px', lineHeight: '1.8'}}>
                <li>Não garantimos disponibilidade contínua ou livre de erros</li>
                <li>Não garantimos compatibilidade com seu dispositivo ou navegador</li>
                <li>Não somos responsáveis por perdas de dados ou alterações</li>
                <li>Não garantimos que a plataforma atenderá suas necessidades específicas</li>
              </ul>

              <h3>7. Limitação de Responsabilidade</h3>
              <p>
                Em nenhuma circunstância o PertoDaqui será responsável por danos diretos, indiretos, incidentais, consequentes, especiais ou punitivos decorrentes de:
              </p>
              <ul style={{marginLeft: '20px', lineHeight: '1.8'}}>
                <li>Uso ou impossibilidade de usar a plataforma</li>
                <li>Dados imprecisos ou informações desatualizadas</li>
                <li>Decisões tomadas com base em informações da plataforma</li>
                <li>Acesso não autorizado a dados ou sistemas</li>
                <li>Interrupções ou eliminação de conteúdo</li>
              </ul>

              <h3>8. Direitos de Propriedade Intelectual</h3>
              <p>
                O PertoDaqui e seu conteúdo original (design, funcionalidades, código) são propriedade intelectual nossa. Você não pode copiar, reproduzir ou distribuir sem permissão explícita. Dados de estabelecimentos são propriedade de seus respectivos donos.
              </p>

              <h3>9. Integração com Terceiros</h3>
              <p>
                O PertoDaqui integra serviços de terceiros:
              </p>
              <ul style={{marginLeft: '20px', lineHeight: '1.8'}}>
                <li><strong>Google Maps:</strong> Para dados de localização e rotas</li>
                <li><strong>Open-Meteo:</strong> Para dados climáticos públicos</li>
                <li><strong>Google Analytics:</strong> Para análise anônima</li>
              </ul>
              <p>
                Você também concorda com os Termos de Serviço desses provedores ao usar o PertoDaqui.
              </p>

              <h3>10. Consentimento para Localização</h3>
              <p>
                A plataforma funciona melhor com permissão de localização. Sua localização nunca é armazenada em servidores; é processada apenas durante sua sessão ativa no navegador. Você pode revogar essa permissão a qualquer momento nas configurações do seu dispositivo.
              </p>

              <h3>11. Modificação do Serviço</h3>
              <p>
                Reservamo-nos o direito de modificar, suspender ou descontinuar qualquer parte do PertoDaqui a qualquer momento. Não seremos responsáveis por qualquer modificação ou descontinuação.
              </p>

              <h3>12. Violação de Direitos Autorais</h3>
              <p>
                Se você acredita que seus direitos autorais foram violados, notifique-nos em <strong>contato@pertodaqui.app</strong> com:
              </p>
              <ul style={{marginLeft: '20px', lineHeight: '1.8'}}>
                <li>Descrição detalhada do trabalho protegido</li>
                <li>Localização do conteúdo na plataforma</li>
                <li>Declaração jurada de boa fé</li>
                <li>Seus dados de contato completos</li>
              </ul>

              <h3>13. Terminação de Acesso</h3>
              <p>
                Podemos encerrar ou suspender seu acesso ao PertoDaqui sem aviso prévio se você violar estes Termos, participar de atividades ilegais ou prejudicar a plataforma.
              </p>

              <h3>14. Indenização</h3>
              <p>
                Você concorda em defender, indenizar e manter harmônico o PertoDaqui contra quaisquer reclamações, perdas, custos e despesas (incluindo honorários advocatícios) decorrentes de:
              </p>
              <ul style={{marginLeft: '20px', lineHeight: '1.8'}}>
                <li>Sua violação destes Termos</li>
                <li>Seu uso inadequado da plataforma</li>
                <li>Violação de direitos de terceiros</li>
              </ul>

              <h3>15. Jurisdição e Lei Aplicável</h3>
              <p>
                Estes Termos são regidos pelas leis aplicáveis. Qualquer disputa será resolvida em tribunais competentes no Brasil.
              </p>

              <h3>16. Alterações aos Termos</h3>
              <p>
                Podemos atualizar estes Termos periodicamente. Alterações significativas serão comunicadas com 30 dias de antecedência. Seu uso contínuo significa aceitação das alterações.
              </p>

              <h3>17. Divisibilidade</h3>
              <p>
                Se qualquer parte destes Termos for inválida ou inaplicável, as demais disposições permanecerão em vigor.
              </p>

              <h3>18. Acordo Integral</h3>
              <p>
                Estes Termos, juntamente com nossa Política de Privacidade, constituem o acordo integral entre você e o PertoDaqui, substituindo qualquer acordo anterior.
              </p>

              <h3>19. Contato</h3>
              <p>
                Para questões sobre estes termos entre em contato conosco através do e-mail <b>contato@pertodaqui.app</b>
              </p>
              <ul style={{marginLeft: '20px', lineHeight: '1.8'}}>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
