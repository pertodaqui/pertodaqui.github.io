import Head from "next/head";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bed,
  Coffee,
  Briefcase,
  ForkKnife,
  EnvelopeSimple,
  House,
  FunnelSimple,
  Leaf,
  MagnifyingGlass,
  MapPinLine,
  MapTrifold,
  Broom,
  PlusCircle,
  Tree
} from "@phosphor-icons/react";
import cafes from "../data/cafes";
import hotels from "../data/hotels";
import nature from "../data/nature";
import parks from "../data/parks";
import restaurants from "../data/restaurants";
import tours from "../data/tours";

const EARTH_RADIUS_KM = 6371;
const QUICK_DISTANCES = [1, 5, 10, 25];

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

const categories = [
  {
    key: "tours",
    label: "Passeios e Guias",
    icon: (
      <MapTrifold size={24} />
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
    key: "nature",
    label: "Natureza",
    icon: (
      <Leaf size={24} />
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
    label: "Café",
    icon: (
      <Coffee size={24} />
    )
  }
];

export default function Home() {
  const [distance, setDistance] = useState(10);
  const [userCoords, setUserCoords] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(["tours"]);
  const [geoError, setGeoError] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);

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
  const filteredNature = useMemo(
    () => getItemsByDistance(nature, distance, userCoords),
    [distance, userCoords]
  );
  const filteredParks = useMemo(
    () => getItemsByDistance(parks, distance, userCoords),
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

  const filteredByCategory = useMemo(
    () => ({
      tours: filteredTours,
      hotels: filteredHotels,
      nature: filteredNature,
      parks: filteredParks,
      restaurants: filteredRestaurants,
      cafes: filteredCafes
    }),
    [
      filteredCafes,
      filteredHotels,
      filteredNature,
      filteredParks,
      filteredRestaurants,
      filteredTours
    ]
  );

  const activeItems = useMemo(
    () =>
      selectedCategories.flatMap(
        (categoryKey) => filteredByCategory[categoryKey] || []
      ),
    [filteredByCategory, selectedCategories]
  );

  const toggleCategory = (categoryKey) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryKey)
        ? prev.filter((key) => key !== categoryKey)
        : [...prev, categoryKey]
    );
  };

  return (
    <>
      <Head>
        <title>PertoDaqui - Descubra perto de você</title>
        <meta
          name="description"
          content="Descubra passeios, hospedagens e experiências perto de você."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="page">
        <header className="site-header">
          <div className="site-header-inner">
            <a href="/" aria-label="Ir para a pagina inicial">
              <img src="/logo.svg" alt="PertoDaqui" className="logo" />
            </a>
            <div className="header-actions">
              <a
                className="cta-link"
                href="https://buy.stripe.com/bJe14mfCd9HB6Zy7P8gYU00"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Divulgue seu negócio"
                title="Divulgue seu negócio"
              >
                <span aria-hidden="true" className="cta-icon">
                  <Briefcase size={20} weight="bold" />
                </span>
                <span className="cta-text">Divulgue seu negócio aqui</span>
              </a>
              <a className="cta-home" href="/" aria-label="Pagina inicial" title="Inicio">
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
            <h1>Descubra o melhor perto de você</h1>
            <p>Ajuste a distância para sua busca.</p>
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
              <details className="filter-dropdown" open={isFilterOpen} ref={filterRef}>
                <summary
                  className="filter-button"
                  onClick={(event) => {
                    event.preventDefault();
                    setIsFilterOpen((prev) => !prev);
                  }}
                >
                  <FunnelSimple size={16} />
                  Filtro
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
                {activeItems.map((item) => (
                  <article className="place-card" key={item.id}>
                    <div className="place-media">
                      <img src={item.image} alt={item.title} loading="lazy" />
                    </div>
                    <div className="place-body">
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.meta}</p>
                      </div>
                      <span className="place-location">{item.location}</span>
                    </div>
                    <div className="place-footer">
                      <span>{item.distanceKm} km</span>
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

          <footer className="site-footer">
            <div className="footer-inner">
              <div className="footer-brand">
                <span className="footer-logo">PertoDaqui</span>
                <p className="footer-slogan">
                  Descubra o melhor perto de voce.
                </p>
              </div>
              <nav className="footer-links" aria-label="Links institucionais">
                <a href="/privacidade">Politica de privacidade</a>
                <a href="/termos">Termos de uso</a>
                <a href="/contato">Contato</a>
              </nav>
              <span className="footer-copy">© 2026 PertoDaqui</span>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
