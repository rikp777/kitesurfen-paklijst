import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { colors } from "../constants/theme";
import { locations, locationCategories, FJORD_CENTER } from "../data/locations";

// Build an emoji "pin" as a div icon — avoids Leaflet's bundler-unfriendly
// default marker images entirely.
function pinIcon(emoji, color) {
  return L.divIcon({
    className: "kite-pin",
    html: `<div style="
      width:30px;height:30px;border-radius:50% 50% 50% 0;
      background:${color};transform:rotate(-45deg);
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 2px 6px rgba(0,0,0,.4);border:2px solid #fff;">
      <span style="transform:rotate(45deg);font-size:15px;line-height:1">${emoji}</span>
    </div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 28],
    popupAnchor: [0, -28],
  });
}

/**
 * Leaflet map of the kitecamp area with one marker per location, plus a
 * legend and tappable cards that fly to each spot. Tiles come from free
 * OpenStreetMap; if offline, the cards & external links still work.
 */
export default function MapView() {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, { scrollWheelZoom: false }).setView(
      [FJORD_CENTER.lat, FJORD_CENTER.lon],
      FJORD_CENTER.zoom
    );
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
      maxZoom: 18,
    }).addTo(map);

    const bounds = [];
    locations.forEach((loc) => {
      const color = locationCategories[loc.category].color;
      const marker = L.marker([loc.lat, loc.lon], { icon: pinIcon(loc.emoji, color) }).addTo(map);
      marker.bindPopup(
        `<strong>${loc.emoji} ${loc.name}</strong><br/>${loc.desc}<br/>` +
          `<a href="${loc.maps}" target="_blank" rel="noopener">Open in Maps ↗</a>`
      );
      markersRef.current[loc.id] = marker;
      bounds.push([loc.lat, loc.lon]);
    });
    if (bounds.length) map.fitBounds(bounds, { padding: [30, 30] });

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = {};
    };
  }, []);

  const flyTo = (loc) => {
    const map = mapRef.current;
    if (!map) return;
    map.flyTo([loc.lat, loc.lon], 13, { duration: 0.6 });
    markersRef.current[loc.id]?.openPopup();
    map.getContainer().scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <div style={{ background: colors.surface, border: `1px solid ${colors.surfaceBorder}`, borderRadius: 14, padding: "14px 16px", marginBottom: 14 }}>
        <div style={{ color: colors.text, fontWeight: 700, fontSize: 15, marginBottom: 4 }}>🗺️ Ringkøbing Fjord & omgeving</div>
        <div style={{ color: colors.textMuted, fontSize: 13, lineHeight: 1.5 }}>
          Het kitecamp ligt aan het fjord in West-Jutland. Tik een plek aan om er naartoe te vliegen of in je kaart-app te openen.
        </div>
      </div>

      <div
        ref={containerRef}
        style={{ height: 320, borderRadius: 14, overflow: "hidden", border: `1px solid ${colors.surfaceBorder}`, marginBottom: 14, background: colors.surface }}
      />

      {/* Legend */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
        {Object.values(locationCategories).map((c) => (
          <span key={c.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: colors.textBody }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: c.color }} />
            {c.label}
          </span>
        ))}
      </div>

      {/* Location cards */}
      {locations.map((loc) => {
        const color = locationCategories[loc.category].color;
        return (
          <div key={loc.id} style={{ background: colors.surface, border: `1px solid ${colors.surfaceBorder}`, borderLeft: `3px solid ${color}`, borderRadius: 12, padding: "10px 14px", marginBottom: 10, display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ fontSize: 22, lineHeight: 1.2 }}>{loc.emoji}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: colors.text, fontWeight: 700, fontSize: 14 }}>{loc.name}</div>
              <div style={{ color: colors.textMuted, fontSize: 12.5, lineHeight: 1.5, marginTop: 2 }}>{loc.desc}</div>
              <div style={{ display: "flex", gap: 14, marginTop: 8 }}>
                <button onClick={() => flyTo(loc)} style={{ background: "none", border: "none", color, fontSize: 12, fontWeight: 700, cursor: "pointer", padding: 0 }}>
                  📍 Toon op kaart
                </button>
                <a href={loc.maps} target="_blank" rel="noopener noreferrer" style={{ color: colors.textBody, fontSize: 12, fontWeight: 600, textDecoration: "none" }}>
                  Open in Maps ↗
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
