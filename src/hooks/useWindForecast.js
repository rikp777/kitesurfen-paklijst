import { useState, useEffect } from "react";
import { KITE_SPOT } from "../constants/theme";

// Open-Meteo is free and needs no API key. The widget degrades gracefully
// (status: "error") when the device is offline, so it never blocks the app.
const ENDPOINT =
  `https://api.open-meteo.com/v1/forecast?latitude=${KITE_SPOT.lat}` +
  `&longitude=${KITE_SPOT.lon}&current=wind_speed_10m,wind_direction_10m,temperature_2m` +
  `&wind_speed_unit=kn&timezone=auto`;

/** Live wind at the kite spot. The whole point: is it worth rigging up? */
export function useWindForecast() {
  const [state, setState] = useState({ status: "loading", data: null });

  useEffect(() => {
    let active = true;
    fetch(ENDPOINT)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((json) => {
        if (!active) return;
        const c = json.current;
        setState({
          status: "ready",
          data: {
            windKn: Math.round(c.wind_speed_10m),
            dir: c.wind_direction_10m,
            temp: Math.round(c.temperature_2m),
          },
        });
      })
      .catch(() => active && setState({ status: "error", data: null }));
    return () => {
      active = false;
    };
  }, []);

  return state;
}

/** Compass bucket for an arrow/label, e.g. 200° -> "ZW". */
export function windDirLabel(deg) {
  const dirs = ["N", "NO", "O", "ZO", "Z", "ZW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8];
}

/** Beginner-friendly verdict on whether the wind is kiteable. */
export function windVerdict(kn) {
  if (kn < 8) return { label: "Te weinig wind", color: "#64748B", emoji: "😴" };
  if (kn < 12) return { label: "Marginaal", color: "#F59E0B", emoji: "🌬️" };
  if (kn <= 22) return { label: "Prima om te kiten!", color: "#34D399", emoji: "🪁" };
  if (kn <= 28) return { label: "Stevig — pas op", color: "#F97316", emoji: "💨" };
  return { label: "Te hard / gevaarlijk", color: "#EF4444", emoji: "⚠️" };
}
