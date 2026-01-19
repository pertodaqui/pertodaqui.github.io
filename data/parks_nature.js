import parks from "./parks";
import nature from "./nature";
import parksNatureItems from "./parks_nature_items";

const parksNature = [
  ...parks.map((item) => ({ ...item, id: `parks-${item.id}` })),
  ...nature.map((item) => ({ ...item, id: `nature-${item.id}` })),
  ...parksNatureItems
];

export default parksNature;
