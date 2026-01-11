import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import bars from "../data/bars";
import cafes from "../data/cafes";
import hotels from "../data/hotels";
import nature from "../data/nature";
import parks from "../data/parks";
import restaurants from "../data/restaurants";
import tours from "../data/tours";

const EARTH_RADIUS_KM = 6371;

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

const getToursByDistance = (maxDistance, origin) =>
  getItemsByDistance(tours, maxDistance, origin);

const getStaysByDistance = (maxDistance, origin) =>
  getItemsByDistance(hotels, maxDistance, origin);

const getNatureByDistance = (maxDistance, origin) =>
  getItemsByDistance(nature, maxDistance, origin);

const getParksByDistance = (maxDistance, origin) =>
  getItemsByDistance(parks, maxDistance, origin);

const getRestaurantsByDistance = (maxDistance, origin) =>
  getItemsByDistance(restaurants, maxDistance, origin);

const getBarsByDistance = (maxDistance, origin) =>
  getItemsByDistance(bars, maxDistance, origin);

const getCafesByDistance = (maxDistance, origin) =>
  getItemsByDistance(cafes, maxDistance, origin);

const getMapsUrl = (item) =>
  `https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}`;

const categories = [
  {
    key: "tours",
    label: "Passeios e Guias",
    icon: "/icons/tours.png"
  },
  {
    key: "hotels",
    label: "Hospedagens",
    icon: "/icons/hotels.png"
  },
  {
    key: "nature",
    label: "Natureza",
    icon: "/icons/nature.png"
  },
  {
    key: "parks",
    label: "Parques",
    icon: "/icons/parks.png"
  },
  {
    key: "restaurants",
    label: "Restaurantes",
    icon: "/icons/restaurants.png"
  },
  {
    key: "bars",
    label: "Bares",
    icon: "/icons/bars.png"
  },
  {
    key: "cafes",
    label: "Café",
    icon: "/icons/cafes.png"
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
    () => getToursByDistance(distance, userCoords),
    [distance, userCoords]
  );
  const filteredStays = useMemo(
    () => getStaysByDistance(distance, userCoords),
    [distance, userCoords]
  );
  const filteredNature = useMemo(
    () => getNatureByDistance(distance, userCoords),
    [distance, userCoords]
  );
  const filteredParks = useMemo(
    () => getParksByDistance(distance, userCoords),
    [distance, userCoords]
  );
  const filteredRestaurants = useMemo(
    () => getRestaurantsByDistance(distance, userCoords),
    [distance, userCoords]
  );
  const filteredBars = useMemo(
    () => getBarsByDistance(distance, userCoords),
    [distance, userCoords]
  );
  const filteredCafes = useMemo(
    () => getCafesByDistance(distance, userCoords),
    [distance, userCoords]
  );
  const getEmptyStateText = (fallbackText) =>
    userCoords
      ? fallbackText
      : "Ative a localização do navegador para ver sugestões próximas.";

  return (
    <>
      <Head>
        <title>PertoDaqui - Descubra perto de você</title>
        <meta
          name="description"
          content="Descubra passeios e hospedagens perto de você com curadoria local."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="page">
        <header className="brand">
          <img src="/logo.svg" alt="PertoDaqui" />
          <a
            className="cta-link"
            href="https://buy.stripe.com/bJe14mfCd9HB6Zy7P8gYU00"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span aria-hidden="true" className="cta-icon">
              <svg viewBox="0 0 24 24" role="presentation">
                <path
                  d="M3 11v2l10 3V8L3 11zm10-3 5 2v4l-5 2m0-8v8M7 16v3m0-14v3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Divulgue seu negócio aqui
          </a>
        </header>

        <div className="band-stack">
          <section className="distance-band">
            <div className="distance-content">
            <p>Até onde você quer ir?</p>
            <input
              type="range"
              min="3"
              max="600"
              step="1"
              value={distance}
              onChange={(event) => setDistance(Number(event.target.value))}
              aria-label="Distância em quilômetros"
              style={{
                "--range-progress": `${((distance - 3) / 597) * 100}%`
              }}
            />
            <div
              className="range-tooltip"
              style={{
                "--range-progress": `${((distance - 3) / 597) * 100}%`
              }}
              data-value={`${distance} km`}
            >
            </div>
              {!userCoords && (
                <div className="location-status">
                  <button type="button" onClick={requestLocation}>
                    Ativar localização
                  </button>
                  {geoError && <span>{geoError}</span>}
                </div>
              )}
            </div>
          </section>

        </div>

        <section className="section">
          <div className="category-tabs">
            {categories.map((category) => (
              <button
                key={category.key}
                type="button"
                className={`category-tab${
                  activeCategory === category.key ? " active" : ""
                }`}
                aria-pressed={activeCategory === category.key}
                onClick={() => setActiveCategory(category.key)}
              >
                <span className="category-icon" aria-hidden="true">
                  <img src={category.icon} alt="" />
                </span>
                {category.label}
              </button>
            ))}
          </div>
        </section>

        {activeCategory === "tours" && (
          <section className="section">
            <div className="grid">
              {filteredTours.map((tour) => (
                <article className="card" key={tour.id}>
                  <div className="card-media">
                    <img src={tour.image} alt={tour.title} loading="lazy" />
                  </div>
                  <div className="card-body">
                    <h3>{tour.title}</h3>
                    <p>{tour.meta}</p>
                    <span className="card-location">{tour.location}</span>
                  </div>
                  <span className="card-distance">{tour.distanceKm} km</span>
                </article>
              ))}
            </div>
            {filteredTours.length === 0 && (
              <p className="empty-state">
                <span className="empty-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="presentation">
                    <path
                      d="M9 9h.01M15 9h.01M8.5 15c1-1 2-1.5 3.5-1.5S14.5 14 15.5 15M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {getEmptyStateText(
                  "Nenhum passeio encontrado nesse raio. Aumente a distância."
                )}
              </p>
            )}
          </section>
        )}

        {activeCategory === "hotels" && (
          <section className="section">
            <div className="grid">
              {filteredStays.map((stay) => (
                <article className="card" key={stay.id}>
                  <div className="card-media">
                    <img src={stay.image} alt={stay.title} loading="lazy" />
                  </div>
                  <div className="card-body">
                    <h3>{stay.title}</h3>
                    <p>{stay.meta}</p>
                    <span className="card-location">{stay.location}</span>
                  </div>
                  <span className="card-distance">{stay.distanceKm} km</span>
                </article>
              ))}
            </div>
            {filteredStays.length === 0 && (
              <p className="empty-state">
                <span className="empty-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="presentation">
                    <path
                      d="M9 9h.01M15 9h.01M8.5 15c1-1 2-1.5 3.5-1.5S14.5 14 15.5 15M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {getEmptyStateText(
                  "Nenhuma hospedagem encontrada nesse raio. Aumente a distância."
                )}
              </p>
            )}
          </section>
        )}

        {activeCategory === "nature" && (
          <section className="section">
            <div className="grid">
              {filteredNature.map((item) => (
                <article className="card" key={item.id}>
                  <div className="card-media">
                    <img src={item.image} alt={item.title} loading="lazy" />
                  </div>
                  <div className="card-body">
                    <h3>{item.title}</h3>
                    <p>{item.meta}</p>
                    <span className="card-location">{item.location}</span>
                  </div>
                  <div className="card-footer">
                    <span className="card-distance">{item.distanceKm} km</span>
                    <a
                      className="card-link"
                      href={getMapsUrl(item)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Iniciar rota
                    </a>
                  </div>
                </article>
              ))}
          </div>
          {filteredNature.length === 0 && (
            <p className="empty-state">
              <span className="empty-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="presentation">
                  <path
                    d="M9 9h.01M15 9h.01M8.5 15c1-1 2-1.5 3.5-1.5S14.5 14 15.5 15M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              {getEmptyStateText(
                "Nenhuma opção de natureza nesse raio. Aumente a distância."
              )}
            </p>
          )}
          </section>
        )}

        {activeCategory === "parks" && (
          <section className="section">
            <div className="grid">
            {filteredParks.map((item) => (
              <article className="card" key={item.id}>
                <div className="card-media">
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>
                  <div className="card-body">
                    <h3>{item.title}</h3>
                    <p>{item.meta}</p>
                    <span className="card-location">{item.location}</span>
                  </div>
                  <div className="card-footer">
                    <span className="card-distance">{item.distanceKm} km</span>
                    <a
                      className="card-link"
                      href={getMapsUrl(item)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Iniciar rota
                    </a>
                  </div>
                </article>
              ))}
            </div>
            {filteredParks.length === 0 && (
              <p className="empty-state">
                <span className="empty-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="presentation">
                    <path
                      d="M9 9h.01M15 9h.01M8.5 15c1-1 2-1.5 3.5-1.5S14.5 14 15.5 15M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {getEmptyStateText(
                  "Nenhum parque nesse raio. Aumente a distância."
                )}
              </p>
            )}
          </section>
        )}

        {activeCategory === "restaurants" && (
          <section className="section">
            <div className="grid">
              {filteredRestaurants.map((item) => (
                <article className="card" key={item.id}>
                  <div className="card-media">
                    <img src={item.image} alt={item.title} loading="lazy" />
                  </div>
                  <div className="card-body">
                    <h3>{item.title}</h3>
                    <p>{item.meta}</p>
                    <span className="card-location">{item.location}</span>
                  </div>
                  <div className="card-footer">
                    <span className="card-distance">{item.distanceKm} km</span>
                    <a
                      className="card-link"
                      href={getMapsUrl(item)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Iniciar rota
                    </a>
                  </div>
                </article>
              ))}
            </div>
            {filteredRestaurants.length === 0 && (
              <p className="empty-state">
                <span className="empty-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="presentation">
                    <path
                      d="M9 9h.01M15 9h.01M8.5 15c1-1 2-1.5 3.5-1.5S14.5 14 15.5 15M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {getEmptyStateText(
                  "Nenhum restaurante nesse raio. Aumente a distância."
                )}
              </p>
            )}
          </section>
        )}

        {activeCategory === "bars" && (
          <section className="section">
            <div className="grid">
              {filteredBars.map((item) => (
                <article className="card" key={item.id}>
                  <div className="card-media">
                    <img src={item.image} alt={item.title} loading="lazy" />
                  </div>
                  <div className="card-body">
                    <h3>{item.title}</h3>
                    <p>{item.meta}</p>
                    <span className="card-location">{item.location}</span>
                  </div>
                  <div className="card-footer">
                    <span className="card-distance">{item.distanceKm} km</span>
                    <a
                      className="card-link"
                      href={getMapsUrl(item)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Iniciar rota
                    </a>
                  </div>
                </article>
              ))}
            </div>
            {filteredBars.length === 0 && (
              <p className="empty-state">
                <span className="empty-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="presentation">
                    <path
                      d="M9 9h.01M15 9h.01M8.5 15c1-1 2-1.5 3.5-1.5S14.5 14 15.5 15M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {getEmptyStateText("Nenhum bar nesse raio. Aumente a distância.")}
              </p>
            )}
          </section>
        )}

        {activeCategory === "cafes" && (
          <section className="section">
            <div className="grid">
              {filteredCafes.map((item) => (
                <article className="card" key={item.id}>
                  <div className="card-media">
                    <img src={item.image} alt={item.title} loading="lazy" />
                  </div>
                  <div className="card-body">
                    <h3>{item.title}</h3>
                    <p>{item.meta}</p>
                    <span className="card-location">{item.location}</span>
                  </div>
                  <div className="card-footer">
                    <span className="card-distance">{item.distanceKm} km</span>
                    <a
                      className="card-link"
                      href={getMapsUrl(item)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Iniciar rota
                    </a>
                  </div>
                </article>
              ))}
            </div>
            {filteredCafes.length === 0 && (
              <p className="empty-state">
                <span className="empty-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="presentation">
                    <path
                      d="M9 9h.01M15 9h.01M8.5 15c1-1 2-1.5 3.5-1.5S14.5 14 15.5 15M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {getEmptyStateText(
                  "Nenhum café nesse raio. Aumente a distância."
                )}
              </p>
            )}
          </section>
        )}
      </div>
    </>
  );
}
