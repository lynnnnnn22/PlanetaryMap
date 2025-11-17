import React from "react";
import PlanetaryMap from "./PlanetaryMap";
import eventLogMock from "./mockdata/mock_eventlog";
import "./App.css";

function App() {
  return (
    <div className="app-root">
      <h1 className="app-title">Planetary Map (Mock Data)</h1>
      <div className="planetary-wrapper">
        <PlanetaryMap data={eventLogMock} />
      </div>
    </div>
  );
}

export default App;
