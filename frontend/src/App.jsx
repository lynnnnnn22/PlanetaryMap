// App.jsx
import React, { useMemo, useState } from "react";
import PlanetaryMap from "./PlanetaryMap";
import eventLogMock from "./mockdata/mock_eventlog";
import "./App.css";

const FAKE_NOW = "2025-11-15T11:52:01.000Z";

const VARIANT_OPTIONS = [
  { value: "basic", label: "Basic" },
  { value: "detailed", label: "Detailed" },
  { value: "aggregated", label: "Aggregated" },
  { value: "minimal", label: "Minimal" }
];

// Palette for planets
export const PLANET_PALETTE = [
  "#f97316",
  "#22c55e",
  "#06b6d4",
  "#6366f1",
  "#ec4899",
  "#facc15",
  "#4ade80",
  "#2dd4bf",
  "#38bdf8",
  "#818cf8",
  "#c4b5fd",
  "#f9a8d4",
  "#fb923c",
  "#22c55e",
  "#06b6d4",
  "#a3e635"
];

const TIME_RANGE_OPTIONS = [
  { value: "all", label: "All time" },
  { value: "1", label: "Last 1 hour" },
  { value: "3", label: "Last 3 hours" },
  { value: "6", label: "Last 6 hours" },
  { value: "24", label: "Last 24 hours" }
];

const ORBIT_COUNT = 3; // always draw 3 orbits

// Reusable collapsible section for the sidebar
function SettingsSection({ title, isOpen, onToggle, children }) {
  return (
    <div className="app-settings-section">
      <button className="mode-toggle-header" onClick={onToggle}>
        <span>{title}</span>
        <span className={`mode-toggle-icon ${isOpen ? "open" : ""}`}>▾</span>
      </button>

      {isOpen && <div className="mode-toggle-content">{children}</div>}
    </div>
  );
}

// Helper: compute top planets from the event log (same rule as map)
function getTopPlanetsFromRows(rows, limit = 12) {
  const totals = new Map();

  (rows || []).forEach((row) => {
    if (row.type !== "STATE") return;   // only STATE rows have duration
    if (!row.app) return;

    const prev = totals.get(row.app) || 0;
    totals.set(row.app, prev + (row.duration_sec || 0));
  });

  return Array.from(totals.entries())
    .sort((a, b) => b[1] - a[1]) // most time first
    .slice(0, limit)
    .map(([app]) => app);
}

function App() {
  const [variant, setVariant] = useState("basic");
  const [showModeSection, setShowModeSection] = useState(true);

  const [showPlanetSection, setShowPlanetSection] = useState(true);
  const [planetColorOverrides, setPlanetColorOverrides] = useState({});

  const [showOrbitSection, setShowOrbitSection] = useState(true);
  const [appOrbitOverrides, setAppOrbitOverrides] = useState({});

  const [showTimeSection, setShowTimeSection] = useState(true);
  const [timeWindowHours, setTimeWindowHours] = useState(null);

  const filteredData = useMemo(() => {
    // 1. Strip AFK here
    const base = (eventLogMock || []).filter(
      (row) =>
        row.app !== "AFK" &&
        row.from !== "AFK" &&
        row.to !== "AFK"
    );

    // 2. No time filter? return everything
    if (!timeWindowHours || timeWindowHours <= 0) {
      return base;
    }

    // 3. Filter STATE rows by start time; let TRANSITION rows pass through
    // const now = Date.now();
    const now = new Date(FAKE_NOW);
    const cutoff = now - timeWindowHours * 60 * 60 * 1000;

    return base.filter((row) => {
      if (row.type !== "STATE") return true;
      if (!row.start) return true;

      const startTime = new Date(row.start).getTime();
      if (Number.isNaN(startTime)) return true;

      return startTime >= cutoff;
    });
  }, [timeWindowHours]);

  const topPlanets = useMemo(
    () => getTopPlanetsFromRows(filteredData, 12),
    [filteredData]
  );

  const baseColorsByApp = useMemo(() => {
    const map = {};
    topPlanets.forEach((app, idx) => {
      map[app] = PLANET_PALETTE[idx % PLANET_PALETTE.length];
    });
    return map;
  }, [topPlanets]);

  // Final colours actually used in the map (base + overrides)
  const appColors = useMemo(() => {
    const result = { ...baseColorsByApp };
    Object.entries(planetColorOverrides).forEach(([app, color]) => {
      result[app] = color;
    });
    return result;
  }, [baseColorsByApp, planetColorOverrides]);

  // Base orbit per app (no overrides): 3 per orbit → 0,1,2
  const baseOrbitsByApp = useMemo(() => {
    const map = {};
    topPlanets.forEach((app, idx) => {
      map[app] = Math.floor(idx / ORBIT_COUNT); // 0, 1, 2
    });
    return map;
  }, [topPlanets]);

  // Final orbits (base + user overrides)
  const appOrbits = useMemo(() => {
    const result = { ...baseOrbitsByApp };
    Object.entries(appOrbitOverrides).forEach(([app, orbit]) => {
      // clamp to valid range just in case
      const n = Number(orbit);
      if (!Number.isNaN(n) && n >= 0 && n <= 2) {
        result[app] = n;
      }
    });
    return result;
  }, [baseOrbitsByApp, appOrbitOverrides]);

  return (
    <div className="app-root">
      <header className="app-header">
        <h1 className="app-title">Your Personalized Planetary Map 🪐</h1>
      </header>

      <div className="app-main">
        {/* LEFT: visualization */}
        <div className="planetary-wrapper">
          <PlanetaryMap
            data={filteredData}
            variant={variant}
            appColors={appColors}
            appOrbits={appOrbits}
            timeWindowHours={timeWindowHours}
          />
        </div>

        {/* RIGHT: settings sidebar */}
        <aside className="app-settings-sidebar">
          <h2 className="app-settings-title">View Settings</h2>

          {/* MODE SECTION */}
          <SettingsSection
            title="Mode"
            isOpen={showModeSection}
            onToggle={() => setShowModeSection((v) => !v)}
          >
            <div className="app-variant-buttons">
              {VARIANT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={
                    "app-variant-button" +
                    (variant === opt.value ? " app-variant-button--active" : "")
                  }
                  onClick={() => setVariant(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="app-settings-description-inner">
              {variant === "basic" && (
                <>
                  <h3>Basic</h3>
                  <p>
                    A clean overview.
                    Shows transitions between tools as wiggly paths.
                  </p>
                </>
              )}
              {variant === "detailed" && (
                <>
                  <h3>Detailed</h3>
                  <p>
                    A more informative view.
                    Emphasized directionality and sequence of transitions.
                  </p>
                </>
              )}
              {variant === "aggregated" && (
                <>
                  <h3>Aggregated</h3>
                  <p>
                    A summarized view.
                    Combines repeated, directioned transitions into a single, stronger path.
                  </p>
                </>
              )}
              {variant === "minimal" && (
                <>
                  <h3>Minimal</h3>
                  <p>
                    A simplified view.
                    Combines transitions between tool pairs into a single undirected path.
                  </p>
                </>
              )}
            </div>
          </SettingsSection>

          <SettingsSection
            title="Time Range"
            isOpen={showTimeSection}
            onToggle={() => setShowTimeSection((v) => !v)}
          >
            <div className="app-settings-description-inner" style={{ marginTop: "0.5rem" }}>
              <p>
                This filters tool states by their start time.
              </p>
            </div>

            <select
              className="app-time-select"
              value={timeWindowHours === null ? "all" : String(timeWindowHours)}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "all") {
                  setTimeWindowHours(null);
                } else {
                  setTimeWindowHours(Number(val));
                }
              }}
            >
              {TIME_RANGE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </SettingsSection>

          {/* PLANET COLOUR SECTION */}
          <SettingsSection
            title="Planet Appearance"
            isOpen={showPlanetSection}
            onToggle={() => setShowPlanetSection((v) => !v)}
          >
            {/* <div className="app-settings-label">Planet colours</div> */}

            {topPlanets.length === 0 ? (
              <div className="app-settings-description-inner">
                <p>No planets yet — start working to see tools appear here.</p>
              </div>
            ) : (
              <>
                <div className="app-settings-description-inner" style={{ marginBottom: "0.5rem" }}>
                  <p>For personalized planets, please pick a custom colour for each planet.</p>
                </div>
                <div className="app-planet-colors-list">
                  {topPlanets.map((app) => (
                    <div key={app} className="app-planet-color-row">
                      <span className="app-planet-color-label">{app}</span>
                      <input
                        type="color"
                        className="app-settings-color-input"
                        value={appColors[app]}
                        onChange={(e) =>
                          setPlanetColorOverrides((prev) => ({
                            ...prev,
                            [app]: e.target.value
                          }))
                        }
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </SettingsSection>

          <SettingsSection
            title="Tool Importance (Orbits)"
            isOpen={showOrbitSection}
            onToggle={() => setShowOrbitSection((v) => !v)}
          >
            {/* <div className="app-settings-label">Assign tools to orbits</div> */}

            {topPlanets.length === 0 ? (
              <div className="app-settings-description-inner">
                <p>No planets yet — start working to see tools appear here.</p>
              </div>
            ) : (
              <>
                <div className="app-settings-description-inner" style={{ marginBottom: "0.5rem" }}>
                  <p>Move tools between inner, middle, and outer orbits based on your preference. Core tools live on inner orbits, minor or distracting tools live on outer orbits.</p>
                </div>
                <div className="app-orbits-list">
                  {topPlanets.map((app) => {
                    const orbit = appOrbits[app] ?? 0;
                    return (
                      <div key={app} className="app-orbit-row">
                        <span className="app-orbit-label">{app}</span>
                        <select
                          className="app-orbit-select"
                          value={orbit}
                          onChange={(e) =>
                            setAppOrbitOverrides((prev) => ({
                              ...prev,
                              [app]: Number(e.target.value)
                            }))
                          }
                        >
                          <option value={0}>Inner orbit (Core)</option>
                          <option value={1}>Middle orbit</option>
                          <option value={2}>Outer orbit</option>
                        </select>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </SettingsSection>

        </aside>
      </div>
    </div>
  );
}

export default App;