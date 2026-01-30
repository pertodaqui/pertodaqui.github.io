import hotelsRioDeJaneiro from "./hotels/rio-de-janeiro-rj";
import hotelsNiteroi from "./hotels/niteroi-rj";
import hotelsTeresopolis from "./hotels/teresopolis-rj";
import hotelsPetropolis from "./hotels/petropolis-rj";
import hotelsMage from "./hotels/mage-rj";

const hotels = [
  ...hotelsRioDeJaneiro,
  ...hotelsNiteroi,
  ...hotelsTeresopolis,
  ...hotelsPetropolis,
  ...hotelsMage
];

export default hotels;
