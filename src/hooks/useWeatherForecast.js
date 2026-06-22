import { useState, useEffect } from "react";

// Camp coordinates (Skaven Strand Put & Take)
const LAT = 55.892;
const LON = 8.364;

const DAILY =
  "weathercode,temperature_2m_max,temperature_2m_min," +
  "precipitation_sum,precipitation_hours,precipitation_probability_max," +
  "wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant";

const ENDPOINT =
  `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}` +
  `&daily=${DAILY}&hourly=precipitation,wind_speed_10m` +
  `&wind_speed_unit=kn&timezone=Europe%2FCopenhagen&forecast_days=16`;

export const TRIP_START = "2026-07-04";
export const TRIP_END   = "2026-07-11";

const DIRS = ["N", "NO", "O", "ZO", "Z", "ZW", "W", "NW"];
const NL_DAYS = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"];

export function weatherEmoji(code) {
  if (code === 0)   return "☀️";
  if (code <= 1)    return "🌤️";
  if (code <= 2)    return "⛅";
  if (code <= 3)    return "☁️";
  if (code <= 48)   return "🌫️";
  if (code <= 55)   return "🌦️";
  if (code <= 65)   return "🌧️";
  if (code <= 77)   return "❄️";
  if (code <= 82)   return "🌦️";
  if (code <= 86)   return "🌨️";
  return "⛈️";
}

export function weatherLabel(code) {
  if (code === 0)   return "Helder";
  if (code <= 1)    return "Overwegend helder";
  if (code <= 2)    return "Halfbewolkt";
  if (code <= 3)    return "Bewolkt";
  if (code <= 48)   return "Mist";
  if (code <= 55)   return "Motregen";
  if (code <= 65)   return "Regen";
  if (code <= 77)   return "Sneeuw";
  if (code <= 82)   return "Buien";
  if (code <= 86)   return "Sneeuwbuien";
  return "Onweer";
}

export function windVerdict(kn) {
  if (kn < 8)    return { label: "Te weinig",    color: "#64748B", emoji: "😴" };
  if (kn < 12)   return { label: "Marginaal",    color: "#F59E0B", emoji: "🌬️" };
  if (kn <= 22)  return { label: "Prima! 🪁",    color: "#34D399", emoji: "🪁" };
  if (kn <= 28)  return { label: "Stevig",        color: "#F97316", emoji: "💨" };
  return           { label: "Gevaarlijk",         color: "#EF4444", emoji: "⚠️" };
}

function windDir(deg) {
  return DIRS[Math.round(deg / 45) % 8];
}

function dayLabels(dateStr) {
  // Use noon to avoid DST edge cases
  const d = new Date(dateStr + "T12:00:00");
  return {
    weekday: NL_DAYS[d.getDay()],
    dayMonth: `${d.getDate()}/${d.getMonth() + 1}`,
  };
}

// Find consecutive hourly rain blocks within a single date
function parseRainWindows(hourlyTimes, hourlyPrecip, date) {
  const hours = [];
  for (let i = 0; i < hourlyTimes.length; i++) {
    if (hourlyTimes[i].startsWith(date)) {
      hours.push({ h: parseInt(hourlyTimes[i].slice(11, 13)), mm: hourlyPrecip[i] ?? 0 });
    }
  }

  const windows = [];
  let cur = null;

  for (const { h, mm } of hours) {
    if (mm >= 0.1) {
      if (!cur) cur = { startH: h, endH: h, totalMm: 0, maxMm: 0, count: 0 };
      cur.endH   = h;
      cur.totalMm += mm;
      cur.maxMm   = Math.max(cur.maxMm, mm);
      cur.count++;
    } else if (cur) {
      windows.push(cur);
      cur = null;
    }
  }
  if (cur) windows.push(cur);

  return windows.map((w) => ({
    startLabel:    `${String(w.startH).padStart(2, "0")}:00`,
    endLabel:      `${String(w.endH + 1).padStart(2, "0")}:00`,
    durationHours: w.count,
    totalMm:       Math.round(w.totalMm * 10) / 10,
    maxMm:         Math.round(w.maxMm   * 10) / 10,
  }));
}

export function useWeatherForecast() {
  const [state, setState] = useState({ status: "loading", days: [] });

  useEffect(() => {
    let active = true;
    fetch(ENDPOINT)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((json) => {
        if (!active) return;
        const d = json.daily;
        const h = json.hourly;

        const days = d.time.map((date, i) => {
          const { weekday, dayMonth } = dayLabels(date);
          return {
            date,
            isTripDay: date >= TRIP_START && date <= TRIP_END,
            weekday,
            dayMonth,
            emoji:       weatherEmoji(d.weathercode[i]),
            label:       weatherLabel(d.weathercode[i]),
            tempMax:     Math.round(d.temperature_2m_max[i]),
            tempMin:     Math.round(d.temperature_2m_min[i]),
            windKn:      Math.round(d.wind_speed_10m_max[i]),
            windGust:    Math.round(d.wind_gusts_10m_max[i]),
            windDir:     windDir(d.wind_direction_10m_dominant[i]),
            precipProb:  d.precipitation_probability_max[i] ?? 0,
            precipMm:    Math.round((d.precipitation_sum[i] || 0) * 10) / 10,
            precipHours: d.precipitation_hours[i] || 0,
            rainWindows: parseRainWindows(h.time, h.precipitation, date),
          };
        });

        setState({ status: "ready", days });
      })
      .catch(() => active && setState({ status: "error", days: [] }));

    return () => { active = false; };
  }, []);

  return state;
}
