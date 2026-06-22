import { useState, useEffect } from "react";

const LAT = 55.892;
const LON = 8.364;
const ENDPOINT =
  `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}` +
  `&daily=sunrise,sunset&timezone=Europe%2FCopenhagen&forecast_days=16`;

function parseTime(isoStr) {
  return isoStr ? isoStr.slice(11, 16) : null;
}

function diffHM(rise, set) {
  if (!rise || !set) return null;
  const [rh, rm] = rise.split(":").map(Number);
  const [sh, sm] = set.split(":").map(Number);
  const totalMin = (sh * 60 + sm) - (rh * 60 + rm);
  if (totalMin <= 0) return null;
  return `${Math.floor(totalMin / 60)}u ${totalMin % 60}m`;
}

export function useRiseSet() {
  const [state, setState] = useState({ status: "loading", today: null });

  useEffect(() => {
    let active = true;
    fetch(ENDPOINT)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((json) => {
        if (!active) return;
        const today = new Date().toISOString().slice(0, 10);
        const idx = json.daily.time.findIndex((d) => d === today);
        if (idx < 0) { setState({ status: "ready", today: null }); return; }
        const rise = parseTime(json.daily.sunrise[idx]);
        const set  = parseTime(json.daily.sunset[idx]);
        setState({ status: "ready", today: { rise, set, daylight: diffHM(rise, set) } });
      })
      .catch(() => active && setState({ status: "error", today: null }));
    return () => { active = false; };
  }, []);

  return state;
}
