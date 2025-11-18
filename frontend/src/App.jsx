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

          <div className="app-settings-section">
            <p className="app-settings-label">Mode</p>
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
          </div>

          <div className="app-settings-section app-settings-description">
            {variant === "basic" && (
              <>
                <h3>Basic</h3>
                <p>
                  Shows individual transitions between tools as wiggly paths.
                  Planet size = time spent.
                </p>
              </>
            )}
            {variant === "detailed" && (
              <>
                <h3>Detailed</h3>
                <p>
                  Emphasizes friction using path color and thickness, useful for
                  spotting moments of struggle.
                </p>
              </>
            )}
            {variant === "aggregated" && (
              <>
                <h3>Aggregated</h3>
                <p>
                  Combines repeated transitions between the same tools into a
                  single, stronger path.
                </p>
              </>
            )}
            {variant === "minimal" && (
              <>
                <h3>Minimal</h3>
                <p>
                  Strips away labels and wiggles to show only thick, undirected
                  lines between frequently paired tools.
                </p>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;