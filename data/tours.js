import toursRioDeJaneiro from "./tours/rio-de-janeiro-rj";
import toursNiteroi from "./tours/niteroi-rj";
import toursPetropolis from "./tours/petropolis-rj";
import toursMarica from "./tours/marica-rj";

const tours = [
  ...toursRioDeJaneiro,
  ...toursNiteroi,
  ...toursPetropolis,
  ...toursMarica
];

export default tours;
