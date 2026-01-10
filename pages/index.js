import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
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

const getCafesByDistance = (maxDistance, origin) =>
  getItemsByDistance(cafes, maxDistance, origin);

const getMapsUrl = (item) =>
  `https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}`;

const categories = [
  { key: "tours", label: "Passeios" },
  { key: "hotels", label: "Hospedagens" },
  { key: "nature", label: "Natureza" },
  { key: "parks", label: "Parques" },
  { key: "restaurants", label: "Restaurantes" },
  { key: "cafes", label: "Café" }
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
        </header>

        <section className="distance-band">
          <div className="distance-content">
            <span className="distance-label">{distance}km</span>
            <p>Qual a distância que está querendo percorrer?</p>
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

        <div className="accent-bar" aria-hidden="true" />

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
                {category.label}
              </button>
            ))}
          </div>
        </section>

        {activeCategory === "tours" && (
          <section className="section">
            <h2 className="section-title">
              <span className="title-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="presentation">
                  <path
                    d="M5 20h14M7 18l2-9 6-5 2 5 2 1-2 4-5-1-3 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Passeios
            </h2>
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
            <h2 className="section-title">
              <span className="title-icon" aria-hidden="true">
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
              </span>
              Hospedagens
            </h2>
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
            <h2 className="section-title">
              <span className="title-icon" aria-hidden="true">
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
            </span>
            Natureza
          </h2>
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
            <h2 className="section-title">
              <span className="title-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="presentation">
                  <path
                    d="M4 19V9l8-4 8 4v10M4 19h16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
            </span>
            Parques
          </h2>
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
            <h2 className="section-title">
              <span className="title-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="presentation">
                  <path
                    d="M3 12h18M5 7h14M7 17h10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
            </span>
            Restaurantes
          </h2>
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

        {activeCategory === "cafes" && (
          <section className="section">
            <h2 className="section-title">
              <span className="title-icon" aria-hidden="true">
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
            </span>
            Café
          </h2>
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
