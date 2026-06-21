// Central design tokens — single source of truth for colors & storage keys.
// Keeping these here (instead of scattered hex codes) means restyling or
// adding a category is an open-for-extension change, not a hunt-and-replace.

export const colors = {
  bg: "#0C1A2E",
  surface: "#172033",
  surfaceBorder: "#1E2F47",
  border: "#334155",
  text: "#F1F5F9",
  textBody: "#CBD5E1",
  textMuted: "#64748B",
  textDim: "#475569",
  sky: "#0EA5E9",
  skyDeep: "#0369A1",
  accentLight: "#7DD3FC",
  accentSofter: "#BAE6FD",
  success: "#34D399",
  successText: "#34D399",
  danger: "#EF4444",
  dangerSoft: "#FCA5A5",
};

export const font = "'Segoe UI', system-ui, sans-serif";

export const STORAGE_KEYS = {
  checked: "kite_paklijst_v1",
  photos: "kite_paklijst_photos_v1",
  outfits: "kite_paklijst_outfits_v1",
};

// Representative kite spot used for the wind forecast widget:
// Hvide Sande / Ringkøbing Fjord, a classic West-Jutland beginner spot.
export const KITE_SPOT = {
  name: "Hvide Sande, DK",
  lat: 56.0,
  lon: 8.13,
};
