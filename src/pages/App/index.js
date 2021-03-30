import React, { useState } from "react";
import useDimensions from "react-use-dimensions";
import { Container } from "./styles";
import ReactMapGL from "react-map-gl";

const TOKEN =
  "pk.eyJ1IjoiY29zdGFmYWNjaGluaSIsImEiOiJja212Nm1rcW0wMjUyMnBxcG8zYWV4aThqIn0.XyyoWkd5OHcUZPfSQpiDzg";

function App() {
  const [viewport, setViewport] = useState({
    latitude: -27.2108001,
    longitude: -49.6446024,
    zoom: 12.8,
    bearing: 0,
    pitch: 0
  });

  const [stepRef, stepSize] = useDimensions();

  return (
    <Container ref={stepRef}>
      <ReactMapGL
        width={stepSize.width}
        height={stepSize.height}
        {...viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={TOKEN}
        onViewportChange={viewport => setViewport(viewport)}
      />
    </Container>
  );
}

export default App;
