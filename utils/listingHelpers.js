export const normalizeSelectedCategories = (selected, validKeys) => {
  const unique = Array.from(new Set(selected));
  return unique.filter((key) => validKeys.includes(key));
};

export const toggleCategorySelection = (selected, categoryKey) => {
  const next = new Set(selected);
  if (next.has(categoryKey)) {
    next.delete(categoryKey);
  } else {
    next.add(categoryKey);
  }
  return Array.from(next);
};

export const toggleAllCategories = (selected, allKeys) => {
  const normalized = normalizeSelectedCategories(selected, allKeys);
  const isAllSelected = allKeys.every((key) => normalized.includes(key));
  return isAllSelected ? [] : allKeys;
};

export const buildActiveItemsFromCategoryMap = (
  filteredByCategory,
  selectedCategories,
  sortMode = "distance"
) => {
  if (!selectedCategories.length) {
    return [];
  }

  const merged = selectedCategories.flatMap((categoryKey) =>
    (filteredByCategory[categoryKey] || []).map((item) => ({
      ...item,
      categoryKey
    }))
  );

  if (sortMode === "alpha") {
    return merged.sort((a, b) => a.title.localeCompare(b.title));
  }

  return merged.sort((a, b) => a.distanceKm - b.distanceKm);
};

export const buildActiveItemsFromList = (
  items,
  selectedCategories,
  sortMode = "alpha"
) => {
  if (!selectedCategories.length) {
    return [];
  }

  const filtered = items.filter((item) =>
    selectedCategories.includes(item.categoryKey)
  );
  const uniqueByCategoryAndId = Array.from(
    new Map(
      filtered.map((item) => [`${item.categoryKey}::${item.id}`, item])
    ).values()
  );

  if (sortMode === "distance") {
    return uniqueByCategoryAndId.sort((a, b) => {
      const aDistance = Number.isFinite(a.distanceKm)
        ? a.distanceKm
        : Number.MAX_SAFE_INTEGER;
      const bDistance = Number.isFinite(b.distanceKm)
        ? b.distanceKm
        : Number.MAX_SAFE_INTEGER;
      return aDistance - bDistance;
    });
  }

  return uniqueByCategoryAndId.sort((a, b) => a.title.localeCompare(b.title));
};

export const paginateItems = (items, currentPage, perPage) => {
  const start = (currentPage - 1) * perPage;
  return items.slice(start, start + perPage);
};
