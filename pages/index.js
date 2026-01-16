import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
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
      <svg viewBox="0 0 24 24" role="presentation">
        <path
          d="M6 20h12M7.5 17.5l2-8 5-4 2 4 2 1-2 3.5-4-1-2.5 4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
  {
    key: "hotels",
    label: "Hospedagens",
    icon: (
      <svg viewBox="0 0 24 24" role="presentation">
        <path
          d="M4 19V9l8-4 8 4v10M9 19v-5h6v5M4 19h16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
  {
    key: "nature",
    label: "Natureza",
    icon: (
      <svg viewBox="0 0 24 24" role="presentation">
        <path
          d="M12 3l2 4 4 .5-3 3 1 4.5-4-2-4 2 1-4.5-3-3 4-.5 2-4z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
  {
    key: "parks",
    label: "Parques",
    icon: (
      <svg viewBox="0 0 24 24" role="presentation">
        <path
          d="M4 19h16M8 19v-6M16 19v-6M6 13l6-7 6 7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
  {
    key: "restaurants",
    label: "Restaurantes",
    icon: (
      <svg viewBox="0 0 24 24" role="presentation">
        <path
          d="M4 6h16M6 6v12M10 6v12M14 6v12M18 6v12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    )
  },
  {
    key: "cafes",
    label: "Café",
    icon: (
      <svg viewBox="0 0 24 24" role="presentation">
        <path
          d="M5 8h10a4 4 0 0 1 0 8H5V8zM15 8h2a3 3 0 0 1 0 6h-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
];

export default function Home() {
  const [distance, setDistance] = useState(10);
  const [userCoords, setUserCoords] = useState(null);
  const [activeCategory, setActiveCategory] = useState("tours");
  const [geoError, setGeoError] = useState("");

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

  const activeItems = useMemo(() => {
    switch (activeCategory) {
      case "hotels":
        return filteredHotels;
      case "nature":
        return filteredNature;
      case "parks":
        return filteredParks;
      case "restaurants":
        return filteredRestaurants;
      case "cafes":
        return filteredCafes;
      default:
        return filteredTours;
    }
  }, [
    activeCategory,
    filteredCafes,
    filteredHotels,
    filteredNature,
    filteredParks,
    filteredRestaurants,
    filteredTours
  ]);

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
            <img src="/logo.svg" alt="PertoDaqui" className="logo" />
          <a
            className="cta-link"
            href="https://buy.stripe.com/bJe14mfCd9HB6Zy7P8gYU00"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Divulgue seu negócio"
            title="Divulgue seu negócio"
          >
            <span aria-hidden="true" className="cta-icon">
              <img src="/icons/business.svg" alt="" />
            </span>
            <span className="cta-text">Divulgue seu negócio aqui</span>
          </a>
          </div>
        </header>

        <main className="content">
          <section className="hero-card">
            <h1>Descubra o melhor perto de você</h1>
            <p>Ajuste a distância para sua busca.</p>
            <div className="distance-wrap">
              <span className="distance-label">Raio: {distance} km</span>
              <input
                type="range"
                min="1"
                max="90"
                step="1"
                value={distance}
                onChange={(event) => setDistance(Number(event.target.value))}
                aria-label="Raio em quilômetros"
                style={{
                  "--range-progress": `${((distance - 1) / 89) * 100}%`
                }}
              />
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

          <section className="category-grid">
            {categories.map((category) => (
              <button
                key={category.key}
                type="button"
                className={`category-card${
                  activeCategory === category.key ? " active" : ""
                }`}
                onClick={() => setActiveCategory(category.key)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-label">{category.label}</span>
              </button>
            ))}
          </section>

          <div className="divider" aria-hidden="true" />

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
                        <svg viewBox="0 0 24 24" role="presentation">
                          <path
                            d="M12 2c-3.3 0-6 2.7-6 6 0 4.1 6 12 6 12s6-7.9 6-12c0-3.3-2.7-6-6-6zm0 8.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 5.5 12 5.5s2.5 1.1 2.5 2.5S13.4 10.5 12 10.5z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-illustration" aria-hidden="true">
                  <svg viewBox="0 0 160 120" role="presentation">
                    <path
                      d="M12 88l36-34 40 20 36-26 24 40-28 12-52 2-36-8-20-6z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="96"
                      cy="48"
                      r="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                    <path
                      d="M108 60l18 18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h3>Nada por aqui nesse raio</h3>
                <p>Aumente a distância ou tente outra categoria.</p>
                <div className="empty-actions">
                  <button type="button" onClick={() => setDistance(25)}>
                    Aumentar para 25 km
                  </button>
                  <button
                    type="button"
                    className="ghost"
                    onClick={() => {
                      setDistance(10);
                      setActiveCategory("tours");
                    }}
                  >
                    Limpar filtros
                  </button>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
}
