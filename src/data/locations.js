// Map data for the Ringkøbing Fjord area (West Jutland, Denmark) where the
// Ripstar kitecamp is based. The camp itself is glamping on the fjord; its
// pin is indicative — check your booking for the exact address.
//
// category drives the marker colour & legend. Coordinates are approximate but
// good enough to find each spot; every location also links out to a real map.

export const FJORD_CENTER = { lat: 56.02, lon: 8.18, zoom: 11 };

export const locationCategories = {
  camp: { label: "Kitecamp", color: "#0EA5E9" },
  kite: { label: "Kitespot", color: "#34D399" },
  sight: { label: "Bezienswaardigheid", color: "#F59E0B" },
  food: { label: "Eten & gezellig", color: "#EC4899" },
  nature: { label: "Natuur & strand", color: "#10B981" },
};

const mapsLink = (lat, lon, name) =>
  `https://www.google.com/maps/search/?api=1&query=${lat},${lon}(${encodeURIComponent(name)})`;

const make = (loc) => ({ ...loc, maps: mapsLink(loc.lat, loc.lon, loc.name) });

export const locations = [
  make({
    id: "camp",
    name: "Ripstar Kitecamp",
    emoji: "🏕️",
    category: "camp",
    lat: 56.02,
    lon: 8.22,
    desc: "Glamping aan het Ringkøbing Fjord: lodges, tipi's, sauna, zwembad & vuurplaats. (Locatie bij benadering — check je boeking.)",
  }),
  make({
    id: "fjord",
    name: "Ringkøbing Fjord — lesspot",
    emoji: "🪁",
    category: "kite",
    lat: 56.0,
    lon: 8.15,
    desc: "Vlak, ondiep water waar je overal kunt staan. Noord-Europa's beste beginnersspot, ~62% van de zomer genoeg wind.",
  }),
  make({
    id: "lyngvig",
    name: "Lyngvig Fyr (vuurtoren)",
    emoji: "🗼",
    category: "sight",
    lat: 56.0497,
    lon: 8.1186,
    desc: "Beklim 228 treden voor uitzicht over de Noordzee, het fjord en de duinen. Toppertje bij zonsondergang.",
  }),
  make({
    id: "hvidesande",
    name: "Hvide Sande haven",
    emoji: "🐟",
    category: "food",
    lat: 55.9989,
    lon: 8.1264,
    desc: "Gezellig vissersstadje met water aan twee kanten. Verse vish & friet bij de sluis en de haven.",
  }),
  make({
    id: "ringkobing",
    name: "Ringkøbing stadje",
    emoji: "🏘️",
    category: "food",
    lat: 56.0939,
    lon: 8.2446,
    desc: "Oude steegjes, terrasjes en ijs. Leuk voor een avondje shoppen en uit eten.",
  }),
  make({
    id: "sondervig",
    name: "Søndervig strand",
    emoji: "🏖️",
    category: "nature",
    lat: 56.1156,
    lon: 8.1186,
    desc: "Breed Noordzeestrand met duinen. Mooi voor een strandwandeling op een windstille dag.",
  }),
  make({
    id: "kabelpark",
    name: "Kabelparken Hvide Sande",
    emoji: "🏄",
    category: "kite",
    lat: 56.0061,
    lon: 8.1356,
    desc: "Wakeboarden & waterski aan de kabelbaan — leuke afwisseling als de kitewind wegvalt.",
  }),
  make({
    id: "abelines",
    name: "Abelines Gaard",
    emoji: "🏚️",
    category: "sight",
    lat: 56.0436,
    lon: 8.1242,
    desc: "Authentieke klitgaard (duinboerderij) — een kijkje in het oude West-Jutlandse leven.",
  }),
  make({
    id: "tipperne",
    name: "Tipperne vogelreservaat",
    emoji: "🦅",
    category: "nature",
    lat: 55.8786,
    lon: 8.22,
    desc: "Natuurreservaat aan de zuidkant van het fjord met een rijke vogelpopulatie.",
  }),
  make({
    id: "borkhavn",
    name: "Bork Havn",
    emoji: "⛵",
    category: "kite",
    lat: 55.8542,
    lon: 8.2719,
    desc: "Bekende kitespot in de zuidhoek van het fjord, plus een Viking-haven om te bezoeken.",
  }),
];
