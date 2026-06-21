import { colors } from "../constants/theme";
import { schedule, scheduleNote, scheduleTypeColor } from "../data/schedule";

/** Vertical timeline of a typical kitecamp day. Pure presentation of data. */
export default function DaySchedule() {
  return (
    <div>
      <div style={{ background: colors.surface, border: `1px solid ${colors.surfaceBorder}`, borderRadius: 14, padding: "14px 16px", marginBottom: 16 }}>
        <div style={{ color: colors.text, fontWeight: 700, fontSize: 15, marginBottom: 4 }}>📅 Zo ziet een dag eruit</div>
        <div style={{ color: colors.textMuted, fontSize: 13, lineHeight: 1.5 }}>{scheduleNote}</div>
      </div>

      <div style={{ position: "relative", paddingLeft: 4 }}>
        {schedule.map((slot, i) => {
          const accent = scheduleTypeColor[slot.type] || colors.sky;
          const isLast = i === schedule.length - 1;
          return (
            <div key={slot.id} style={{ display: "flex", gap: 12 }}>
              {/* timeline rail */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 44, flexShrink: 0 }}>
                <span style={{ color: colors.textBody, fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{slot.time}</span>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: accent + "22", border: `2px solid ${accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
                  {slot.emoji}
                </div>
                {!isLast && <div style={{ flex: 1, width: 2, background: colors.surfaceBorder, marginTop: 2, minHeight: 18 }} />}
              </div>

              {/* card */}
              <div style={{ flex: 1, background: colors.surface, border: `1px solid ${colors.surfaceBorder}`, borderLeft: `3px solid ${accent}`, borderRadius: 12, padding: "10px 14px", marginBottom: 12 }}>
                <div style={{ color: colors.text, fontWeight: 700, fontSize: 14 }}>{slot.title}</div>
                <div style={{ color: colors.textMuted, fontSize: 12.5, lineHeight: 1.5, marginTop: 2 }}>{slot.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
