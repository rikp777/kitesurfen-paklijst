import { useState, lazy, Suspense } from "react";
import { font, colors } from "./constants/theme";
import { useToast } from "./hooks/useToast";

import Toast from "./components/Toast";
import BottomNav from "./components/BottomNav";
import PageHero from "./components/PageHero";
import WindWidget from "./components/WindWidget";
import DaySchedule from "./components/DaySchedule";
import PackingView from "./views/PackingView";

// The map pulls in Leaflet — load it only when the Kaart tab is opened.
const MapView = lazy(() => import("./components/MapView"));

const pageWrap = { maxWidth: 480, margin: "-32px auto 0", padding: "0 16px", position: "relative", zIndex: 1 };

/**
 * Top-level shell: owns the active tab and the shared toast, and renders the
 * matching view. Each tab is a self-contained view; App stays thin.
 */
export default function App() {
  const [tab, setTab] = useState("pack");
  const { toast, showToast } = useToast();

  return (
    <div style={{ fontFamily: font, background: colors.bg, minHeight: "100vh", paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 72px)" }}>
      <Toast message={toast} />

      {tab === "pack" && <PackingView showToast={showToast} />}

      {tab === "day" && (
        <>
          <PageHero eyebrow="🪁 Ripstar · Denemarken" title="Dagindeling" subtitle="Beginnerscamp aan het Ringkøbing Fjord">
            <WindWidget />
          </PageHero>
          <div style={pageWrap}>
            <DaySchedule />
          </div>
        </>
      )}

      {tab === "map" && (
        <>
          <PageHero eyebrow="🪁 Ripstar · West-Jutland" title="Kaart & uitjes" subtitle="Waar het kamp ligt + leuke plekken in de buurt" />
          <div style={pageWrap}>
            <Suspense fallback={<p style={{ color: colors.textMuted, textAlign: "center", padding: 40 }}>🗺️ Kaart laden…</p>}>
              <MapView />
            </Suspense>
          </div>
        </>
      )}

      <BottomNav active={tab} onChange={setTab} />
    </div>
  );
}
