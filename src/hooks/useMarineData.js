import { useState, useEffect } from "react";

const LAT = 55.892;
const LON = 8.364;
// Uses Open-Meteo Marine API (free, no key) for sea surface temperature
const ENDPOINT =
  `https://marine-api.open-meteo.com/v1/marine?latitude=${LAT}&longitude=${LON}` +
  `&daily=sea_surface_temperature_max&timezone=Europe%2FCopenhagen&forecast_days=16`;

const TRIP_START = "2026-07-04";
const TRIP_END   = "2026-07-11";

export function useMarineData() {
  const [state, setState] = useState({ status: "loading", todayTemp: null, tripAvg: null });

  useEffect(() => {
    let active = true;
    fetch(ENDPOINT)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((json) => {
        if (!active) return;
        const times  = json.daily.time;
        const temps  = json.daily.sea_surface_temperature_max;
        const today  = new Date().toISOString().slice(0, 10);

        const todayIdx = times.findIndex((t) => t === today);
        const todayTemp = todayIdx >= 0 && temps[todayIdx] != null
          ? Math.round(temps[todayIdx] * 10) / 10
          : null;

        const tripVals = times
          .map((t, i) => ({ t, v: temps[i] }))
          .filter(({ t, v }) => t >= TRIP_START && t <= TRIP_END && v != null)
          .map(({ v }) => v);

        const tripAvg = tripVals.length
          ? Math.round((tripVals.reduce((a, b) => a + b, 0) / tripVals.length) * 10) / 10
          : null;

        setState({ status: "ready", todayTemp, tripAvg });
      })
      .catch(() => active && setState({ status: "error", todayTemp: null, tripAvg: null }));
    return () => { active = false; };
  }, []);

  return state;
}
