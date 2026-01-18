import parks from "./parks";
import nature from "./nature";

const parksNature = [
  ...parks.map((item) => ({ ...item, id: `parks-${item.id}` })),
  ...nature.map((item) => ({ ...item, id: `nature-${item.id}` }))
];

export default parksNature;
