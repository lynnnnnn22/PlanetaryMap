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

function App() {
  const [variant, setVariant] = useState("basic");
  const [showModeSection, setShowModeSection] = useState(true);

  return (
    <div className="app-root">
      <header className="app-header">
        <h1 className="app-title">Your Personalized Planetary Map</h1>
      </header>

      <div className="app-main">
        {/* LEFT: visualization */}
        <div className="planetary-wrapper">
          <PlanetaryMap data={eventLogMock} variant={variant} />
        </div>

        {/* RIGHT: settings sidebar */}
        <aside className="app-settings-sidebar">
          <h2 className="app-settings-title">View Settings</h2>

          <div className="app-settings-section app-settings-mode">
            {/* Toggle header */}
            <button
              className="mode-toggle-header"
              onClick={() => setShowModeSection((v) => !v)}
            >
              <span>Mode</span>
              <span className={`mode-toggle-icon ${showModeSection ? "open" : ""}`}>
                ▾
              </span>
            </button>

            {showModeSection && (
              <div className="mode-toggle-content">
                {/* Mode buttons */}
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

                {/* Mode description (what you already had) */}
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
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;