const EARTH_RADIUS_KM = 6371;

const toRadians = (value) => (value * Math.PI) / 180;

export const getDistanceKm = (from, to) => {
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

export const getItemsByDistance = (items, maxDistance, origin) => {
  if (!origin) {
    return [];
  }

  return items
    .map((item) => ({
      ...item,
      distanceKm: Math.round(getDistanceKm(origin, item))
    }))
    .filter((item) => item.distanceKm <= maxDistance);
};

export const formatLocation = (location) => {
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

export const normalizeText = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export const slugify = (value) =>
  normalizeText(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const getLocationSlug = (location) => {
  const formatted = formatLocation(location);
  const match = formatted.match(/^(.+)\s-\s([A-Z]{2})$/);
  if (match) {
    return `${slugify(match[1])}-${match[2].toLowerCase()}`;
  }
  return slugify(formatted);
};

export const formatSlugTitle = (slug) => {
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

export const getMapsUrl = (item) =>
  `https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}`;
