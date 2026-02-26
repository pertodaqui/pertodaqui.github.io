export const HERO_SUBTITLES = [
  "Até onde você quer ir hoje? Defina a distância e descubra.",
  "Defina a distância e comece a explorar.",
  "Descubra tesouros escondidos a poucos quilômetros de você.",
  "Selecione a distância e explore o melhor da região.",
  "Encontre experiências únicas em sua região."
];

export function getRandomSubtitle() {
  const randomIndex = Math.floor(Math.random() * HERO_SUBTITLES.length);
  return HERO_SUBTITLES[randomIndex];
}

export function toTitleCase(value) {
  if (typeof value !== "string") return "";
  return value
    .toLocaleLowerCase("pt-BR")
    .split(/(\s+|-)/)
    .map((part) => {
      if (/^\s+$/.test(part) || part === "-") return part;
      const [first = "", ...rest] = Array.from(part);
      return first ? `${first.toLocaleUpperCase("pt-BR")}${rest.join("")}` : part;
    })
    .join("");
}
