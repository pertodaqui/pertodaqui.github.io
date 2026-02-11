const test = require("node:test");
const assert = require("node:assert/strict");

test("normalizeSelectedCategories remove duplicadas e inválidas", async () => {
  const { normalizeSelectedCategories } = await import("../utils/listingHelpers.js");
  const valid = ["a", "b", "c"];

  assert.deepEqual(
    normalizeSelectedCategories(["a", "x", "a", "b"], valid),
    ["a", "b"]
  );
});

test("toggleCategorySelection alterna seleção", async () => {
  const { toggleCategorySelection } = await import("../utils/listingHelpers.js");

  assert.deepEqual(toggleCategorySelection(["a", "b"], "a"), ["b"]);
  assert.deepEqual(toggleCategorySelection(["a"], "b"), ["a", "b"]);
});

test("toggleAllCategories desmarca tudo quando todas estão marcadas", async () => {
  const { toggleAllCategories } = await import("../utils/listingHelpers.js");
  const keys = ["a", "b", "c"];

  assert.deepEqual(toggleAllCategories(["a", "b", "c"], keys), []);
  assert.deepEqual(toggleAllCategories(["a"], keys), keys);
});

test("buildActiveItemsFromCategoryMap agrega e ordena por distância", async () => {
  const { buildActiveItemsFromCategoryMap } = await import("../utils/listingHelpers.js");

  const byCategory = {
    parks: [{ id: "p1", distanceKm: 20, title: "Parque 1" }],
    cafes: [{ id: "c1", distanceKm: 5, title: "Cafe 1" }]
  };
  const result = buildActiveItemsFromCategoryMap(byCategory, ["parks", "cafes"]);

  assert.equal(result.length, 2);
  assert.equal(result[0].id, "c1");
  assert.equal(result[1].categoryKey, "parks");
});

test("buildActiveItemsFromList filtra por categoria e ordena por nome", async () => {
  const { buildActiveItemsFromList } = await import("../utils/listingHelpers.js");

  const items = [
    { id: "2", title: "Zeta", categoryKey: "parks" },
    { id: "1", title: "Alfa", categoryKey: "parks" },
    { id: "3", title: "Beta", categoryKey: "cafes" }
  ];

  const result = buildActiveItemsFromList(items, ["parks"], "alpha");

  assert.deepEqual(
    result.map((item) => item.id),
    ["1", "2"]
  );
});

test("paginateItems retorna fatia correta", async () => {
  const { paginateItems } = await import("../utils/listingHelpers.js");

  const items = Array.from({ length: 10 }, (_, idx) => ({ id: idx + 1 }));
  const page2 = paginateItems(items, 2, 4);

  assert.deepEqual(
    page2.map((item) => item.id),
    [5, 6, 7, 8]
  );
});
