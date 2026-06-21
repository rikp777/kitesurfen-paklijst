// A realistic sample day at the Ripstar Denmark beginner kitecamp, based on
// Ripstar's described rhythm (healthy breakfast & coffee at the bar → lessons
// & water activities by day → 3-course dinner → evening clinic/sauna/fire).
// Exact times depend on the WIND, so this is a guide, not a fixed timetable —
// "alles is optioneel, op jouw tempo".
//
// type drives the colour accent: kite | food | free | evening | rest

export const scheduleNote =
  "Voorbeelddag — alles is optioneel en draait om de wind. De instructeurs " +
  "plannen de lessen op het beste moment van de dag. Jouw kamp = jouw tempo. 🤙";

export const schedule = [
  {
    id: "sch1",
    time: "08:00",
    title: "Opstaan & ontbijt aan de bar",
    desc: "Gezond ontbijt met verse koffie. Check de windvoorspelling voor vandaag.",
    emoji: "🍳",
    type: "food",
  },
  {
    id: "sch2",
    time: "09:30",
    title: "Briefing & theorie",
    desc: "Veiligheid, windvenster en materiaal. Bij weinig wind een verdiepende theorie-sessie.",
    emoji: "📋",
    type: "kite",
  },
  {
    id: "sch3",
    time: "10:00",
    title: "Kitesurfles — sessie 1",
    desc: "Les op jouw niveau op het ondiepe Ringkøbing Fjord. Begin met kite control & bodydrag.",
    emoji: "🪁",
    type: "kite",
  },
  {
    id: "sch4",
    time: "12:30",
    title: "Lunch",
    desc: "Even bijtanken bij het kamp.",
    emoji: "🥪",
    type: "food",
  },
  {
    id: "sch5",
    time: "13:30",
    title: "Vrije tijd & activiteiten",
    desc: "SUP, slackline, volleybal of de slip 'n slide. Of ontdek de omgeving (zie de kaart).",
    emoji: "🏐",
    type: "free",
  },
  {
    id: "sch6",
    time: "15:00",
    title: "Kitesurfles — sessie 2",
    desc: "Tweede watersessie wanneer de wind het beste is. Waterstart oefenen!",
    emoji: "🌊",
    type: "kite",
  },
  {
    id: "sch7",
    time: "17:30",
    title: "Relaxen: sauna & vuurplaats",
    desc: "Nieuwe sauna, buitenzwembad en eigen vuurplaats. Spieren ontspannen na het kiten.",
    emoji: "🔥",
    type: "rest",
  },
  {
    id: "sch8",
    time: "19:00",
    title: "3-gangen diner",
    desc: "Samen eten met de groep — inbegrepen bij jouw camp met catering.",
    emoji: "🍽️",
    type: "food",
  },
  {
    id: "sch9",
    time: "20:30",
    title: "Avondprogramma",
    desc: "Theorie-avond over wind & forecasts, een line-trim clinic of yoga.",
    emoji: "📚",
    type: "evening",
  },
  {
    id: "sch10",
    time: "22:00",
    title: "Borrel bij het kampvuur",
    desc: "Naptellen onder de Deense sterren of chillen in je lodge/tipi.",
    emoji: "✨",
    type: "evening",
  },
];

// Accent colour per activity type (kept here so the component stays dumb).
export const scheduleTypeColor = {
  kite: "#0EA5E9",
  food: "#10B981",
  free: "#F59E0B",
  rest: "#8B5CF6",
  evening: "#6366F1",
};
