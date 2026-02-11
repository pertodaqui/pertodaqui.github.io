import { useEffect, useRef, useState } from "react";

const getCoordKey = (item) => `${item.lat},${item.lng}`;

export function useWeatherByItems(activeItems) {
  const [weatherByCoord, setWeatherByCoord] = useState({});
  const [weatherStatusByCoord, setWeatherStatusByCoord] = useState({});
  const [forecastByCoord, setForecastByCoord] = useState({});
  const weatherCacheRef = useRef({});

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

    setWeatherStatusByCoord((prev) => {
      const next = { ...prev };
      pending.forEach(({ key }) => {
        next[key] = "loading";
      });
      return next;
    });

    const fetchWeather = async ({ key, lat, lng }) => {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&forecast_days=5&timezone=auto`;
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          return { key, error: true };
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
          return { key, temp: Math.round(temp), forecast, status: "ok" };
        }
        return { key, temp: null, forecast, status: "unavailable" };
      } catch {
        return { key, error: true };
      }
    };

    Promise.all(pending.map(fetchWeather))
      .then((results) => {
        if (!isMounted) {
          return;
        }
        const next = {};
        const nextForecast = {};
        const nextStatus = {};
        results.forEach((result) => {
          if (!result) return;
          if (result.error) {
            nextStatus[result.key] = "error";
            weatherCacheRef.current[result.key] = { temp: null, forecast: [] };
            return;
          }
          if (typeof result.temp === "number") {
            next[result.key] = result.temp;
          }
          if (Array.isArray(result.forecast)) {
            nextForecast[result.key] = result.forecast;
          }
          nextStatus[result.key] = result.status || "ok";
          weatherCacheRef.current[result.key] = {
            temp: result.temp,
            forecast: result.forecast
          };
        });
        if (Object.keys(next).length > 0) {
          setWeatherByCoord((prev) => ({ ...prev, ...next }));
        }
        if (Object.keys(nextForecast).length > 0) {
          setForecastByCoord((prev) => ({ ...prev, ...nextForecast }));
        }
        if (Object.keys(nextStatus).length > 0) {
          setWeatherStatusByCoord((prev) => ({ ...prev, ...nextStatus }));
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [activeItems]);

  return {
    weatherByCoord,
    weatherStatusByCoord,
    forecastByCoord,
    getCoordKey
  };
}
