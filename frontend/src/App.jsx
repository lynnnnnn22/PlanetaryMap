// App.jsx
import React, { useState } from "react";
import PlanetaryMap from "./PlanetaryMap";
import eventLogMock from "./mockdata/mock_eventlog";
import "./App.css";

const VARIANT_OPTIONS = [
  { value: "basic", label: "Basic" },
  { value: "detailed", label: "Detailed" },
  { value: "aggregated", label: "Aggregated" },
  { value: "minimal", label: "Minimal" }
];

const PLANET_COLOR_OPTIONS = [
  { value: "default", label: "Default (multi-colour)" },
  { value: "warm", label: "Warm" },
  { value: "cool", label: "Cool" },
  { value: "greyscale", label: "Greyscale" }
];

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

function App() {
  const [variant, setVariant] = useState("basic");
  const [showModeSection, setShowModeSection] = useState(true);

  // NEW: section & state for planet colour customization
  const [showPlanetSection, setShowPlanetSection] = useState(true);
  const [planetColorMode, setPlanetColorMode] = useState("default");

  return (
    <div className="app-root">
      <header className="app-header">
        <h1 className="app-title">Your Personalized Planetary Map 🪐</h1>
      </header>

      <div className="app-main">
        {/* LEFT: visualization */}
        <div className="planetary-wrapper">
          <PlanetaryMap
            data={eventLogMock}
            variant={variant}
            // planetColorMode={planetColorMode} // ← pass customization down
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

          {/* PLANET COLOUR SECTION */}
          <SettingsSection
            title="Planet Appearance"
            isOpen={showPlanetSection}
            onToggle={() => setShowPlanetSection((v) => !v)}
          >
            <div>
              <div className="app-settings-label">Planet colours</div>
              <select
                value={planetColorMode}
                onChange={(e) => setPlanetColorMode(e.target.value)}
                className="app-settings-select"
              >
                {PLANET_COLOR_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              <div className="app-settings-description-inner" style={{ marginTop: "0.5rem" }}>
                {planetColorMode === "default" && (
                  <p>Multi-colour palette to clearly distinguish tools.</p>
                )}
                {planetColorMode === "warm" && (
                  <p>Oranges, pinks, and reds for a warm, energetic map.</p>
                )}
                {planetColorMode === "cool" && (
                  <p>Blues and greens for a cooler, calmer look.</p>
                )}
                {planetColorMode === "greyscale" && (
                  <p>Neutral greys so paths and friction stand out more.</p>
                )}
              </div>
            </div>
          </SettingsSection>
        </aside>
      </div>
    </div>
  );
}

export default App;