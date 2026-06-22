import { useState } from "react";
import { colors } from "../constants/theme";
import { useWeatherForecast, windVerdict, TRIP_START, TRIP_END } from "../hooks/useWeatherForecast";

const TODAY = new Date().toISOString().slice(0, 10);

function windColor(kn) {
  return windVerdict(kn).color;
}

function precipColor(prob) {
  if (prob < 20) return colors.textMuted;
  if (prob < 50) return "#60A5FA";
  if (prob < 75) return "#3B82F6";
  return "#2563EB";
}

function rainIntensityLabel(mmPerHour) {
  if (mmPerHour < 0.5)  return null;
  if (mmPerHour < 2.5)  return "licht";
  if (mmPerHour < 7.6)  return "matig";
  if (mmPerHour < 50)   return "zwaar";
  return "zeer zwaar";
}

// ── Sub-components ───────────────────────────────────────────────

function DayCard({ day, isSelected, onClick }) {
  const isToday    = day.date === TODAY;
  const { label: windLabel, color: wColor } = windVerdict(day.windKn);
  const hasRain    = day.precipMm > 0;

  const borderColor = isSelected
    ? colors.sky
    : day.isTripDay
    ? "#F59E0B"
    : colors.surfaceBorder;

  const bg = isSelected
    ? `${colors.sky}18`
    : day.isTripDay
    ? "#F59E0B0A"
    : "transparent";

  return (
    <button
      onClick={onClick}
      style={{
        flexShrink: 0,
        width: 70,
        background: bg,
        border: `1.5px solid ${borderColor}`,
        borderRadius: 12,
        padding: "8px 5px 6px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
        transition: "border-color 0.15s, background 0.15s",
      }}
    >
      {/* Weekday */}
      <span style={{
        fontSize: 10, fontWeight: 700, letterSpacing: "0.03em",
        color: isToday ? colors.sky : day.isTripDay ? "#F59E0B" : colors.textMuted,
      }}>
        {isToday ? "Vandaag" : day.weekday}
      </span>

      {/* Date */}
      <span style={{ fontSize: 10, color: colors.textMuted, marginBottom: 3 }}>
        {day.dayMonth}
      </span>

      {/* Weather emoji */}
      <span style={{ fontSize: 24, lineHeight: 1, marginBottom: 4 }}>{day.emoji}</span>

      {/* Temp */}
      <div style={{ display: "flex", gap: 3, marginBottom: 3 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: colors.text }}>{day.tempMax}°</span>
        <span style={{ fontSize: 12, color: colors.textMuted }}>{day.tempMin}°</span>
      </div>

      {/* Wind */}
      <span style={{ fontSize: 10, fontWeight: 700, color: wColor, marginBottom: 2 }}>
        🌬️ {day.windKn}kn
      </span>

      {/* Precip probability */}
      <span style={{ fontSize: 10, fontWeight: 600, color: precipColor(day.precipProb) }}>
        💧 {day.precipProb}%
      </span>

      {/* Rain amount badge */}
      {hasRain && (
        <span style={{
          marginTop: 4,
          background: "#3B82F625",
          color: "#60A5FA",
          borderRadius: 6, padding: "1px 5px",
          fontSize: 9, fontWeight: 700,
        }}>
          {day.precipMm}mm
        </span>
      )}
    </button>
  );
}

function RainWindow({ w, index }) {
  const intensity = rainIntensityLabel(w.maxMm);
  return (
    <div style={{
      background: "#1D4ED808",
      border: "1px solid #3B82F625",
      borderLeft: "3px solid #3B82F6",
      borderRadius: 8,
      padding: "8px 12px",
      marginBottom: 6,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>
          🕐 {w.startLabel} – {w.endLabel}
        </span>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <Chip color="#60A5FA">{w.durationHours}u</Chip>
          <Chip color="#93C5FD" bold>{w.totalMm} mm</Chip>
          {intensity && (
            <Chip color={intensity === "zwaar" || intensity === "zeer zwaar" ? "#FCA5A5" : "#FCD34D"}>
              {intensity}
            </Chip>
          )}
          {w.maxMm > 0 && (
            <Chip color={colors.textMuted}>max {w.maxMm} mm/u</Chip>
          )}
        </div>
      </div>
    </div>
  );
}

function Chip({ children, color, bold }) {
  return (
    <span style={{
      fontSize: 10, fontWeight: bold ? 700 : 600,
      background: `${color}20`, color,
      borderRadius: 8, padding: "2px 7px",
    }}>
      {children}
    </span>
  );
}

function DayDetail({ day, onClose }) {
  const verdict = windVerdict(day.windKn);
  const hasRain = day.rainWindows.length > 0;

  return (
    <div style={{
      background: colors.surface,
      border: `1px solid ${colors.surfaceBorder}`,
      borderTop: `3px solid ${day.isTripDay ? "#F59E0B" : colors.sky}`,
      borderRadius: "0 0 14px 14px",
      padding: "12px 14px",
      marginTop: -2,
      marginBottom: 14,
    }}>
      {/* Title row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div>
          <span style={{ fontSize: 15, fontWeight: 800, color: colors.text }}>
            {day.emoji} {day.weekday} {day.dayMonth}
          </span>
          {day.isTripDay && (
            <span style={{ marginLeft: 8, fontSize: 10, fontWeight: 700, background: "#F59E0B22", color: "#F59E0B", borderRadius: 8, padding: "2px 7px" }}>
              Kampdag
            </span>
          )}
          <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 1 }}>{day.label}</div>
        </div>
        <button
          onClick={onClose}
          style={{ background: "none", border: "none", color: colors.textMuted, cursor: "pointer", fontSize: 20, lineHeight: 1, padding: "0 2px" }}
          aria-label="Sluiten"
        >
          ×
        </button>
      </div>

      {/* Stats row */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12, paddingBottom: 12, borderBottom: `1px solid ${colors.surfaceBorder}` }}>
        <StatPill emoji="🌡️" label={`${day.tempMax}° / ${day.tempMin}°C`} />
        <StatPill emoji={verdict.emoji} label={`${day.windKn} kn ${day.windDir}`} color={verdict.color} />
        <StatPill emoji="💨" label={`gusts ${day.windGust} kn`} color={verdict.color} />
        <StatPill emoji="💧" label={`${day.precipProb}% kans`} color={precipColor(day.precipProb)} />
      </div>

      {/* Kite verdict */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        background: `${verdict.color}18`, border: `1px solid ${verdict.color}44`,
        borderRadius: 8, padding: "5px 10px", marginBottom: 12, fontSize: 12, fontWeight: 700, color: verdict.color,
      }}>
        {verdict.emoji} Kitewind: {verdict.label}
      </div>

      {/* Rain section */}
      {hasRain ? (
        <>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#60A5FA", marginBottom: 8 }}>
            🌧️ Regenperiodes — {day.precipMm} mm totaal over {day.precipHours}u
          </div>
          {day.rainWindows.map((w, i) => (
            <RainWindow key={i} w={w} index={i} />
          ))}
        </>
      ) : (
        <div style={{ fontSize: 13, color: colors.textMuted, display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 16 }}>✅</span>
          Geen neerslag verwacht
        </div>
      )}
    </div>
  );
}

function StatPill({ emoji, label, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: color || colors.textBody }}>
      <span>{emoji}</span>
      <span>{label}</span>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────

export default function WeatherForecast() {
  const { status, days } = useWeatherForecast();
  const [selectedDate, setSelectedDate] = useState(null);

  const selectedDay = days.find((d) => d.date === selectedDate) ?? null;

  const toggle = (date) =>
    setSelectedDate((prev) => (prev === date ? null : date));

  if (status === "loading") {
    return (
      <div style={{ background: colors.surface, border: `1px solid ${colors.surfaceBorder}`, borderRadius: 14, padding: "14px 16px", marginBottom: 14 }}>
        <span style={{ color: colors.textMuted, fontSize: 13 }}>☁️ Weersvoorspelling laden…</span>
      </div>
    );
  }

  if (status === "error" || !days.length) {
    return (
      <div style={{ background: colors.surface, border: `1px solid ${colors.surfaceBorder}`, borderRadius: 14, padding: "14px 16px", marginBottom: 14 }}>
        <span style={{ color: colors.textMuted, fontSize: 13 }}>
          ☁️ Weerdata niet beschikbaar — check Windguru of Windy
        </span>
      </div>
    );
  }

  const tripDaysInForecast = days.filter((d) => d.isTripDay);

  return (
    <>
      <style>{`
        .wx-strip { scrollbar-width: none; }
        .wx-strip::-webkit-scrollbar { display: none; }
      `}</style>

      <div style={{
        background: colors.surface,
        border: `1px solid ${colors.surfaceBorder}`,
        borderRadius: selectedDate ? "14px 14px 0 0" : 14,
        overflow: "hidden",
        marginBottom: selectedDate ? 0 : 14,
      }}>
        {/* Header */}
        <div style={{
          padding: "11px 14px 8px",
          borderBottom: `1px solid ${colors.surfaceBorder}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ color: colors.text, fontWeight: 700, fontSize: 14 }}>☁️ Weersvoorspelling</span>
          <span style={{ color: colors.textMuted, fontSize: 11 }}>Ringkøbing · {days.length} dagen</span>
        </div>

        {/* Horizontal day strip */}
        <div className="wx-strip" style={{ display: "flex", gap: 6, overflowX: "auto", padding: "10px 10px 8px" }}>
          {days.map((day) => (
            <DayCard
              key={day.date}
              day={day}
              isSelected={day.date === selectedDate}
              onClick={() => toggle(day.date)}
            />
          ))}
        </div>

        {/* Legend */}
        <div style={{ padding: "4px 14px 10px", display: "flex", gap: 16, flexWrap: "wrap" }}>
          {tripDaysInForecast.length > 0 && (
            <LegendDot color="#F59E0B" label="Kampdagen (4–11 jul)" />
          )}
          <LegendDot color={colors.sky} label="Tik dag voor details" />
        </div>
      </div>

      {/* Detail panel — seamlessly connected */}
      {selectedDay && (
        <DayDetail day={selectedDay} onClose={() => setSelectedDate(null)} />
      )}
    </>
  );
}

function LegendDot({ color, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: colors.textMuted }}>
      <span style={{ width: 8, height: 8, background: color, borderRadius: 2, flexShrink: 0 }} />
      {label}
    </div>
  );
}
