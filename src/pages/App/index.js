import React, { useState } from "react";
import useDimensions from "react-use-dimensions";
import { Container, ButtonContainer } from "./styles";
import ReactMapGL from "react-map-gl";
import debounce from "lodash/debounce";
import api from "../../services/api";
import Properties from "./components/Properties/index";
import { withRouter, useHistory } from "react-router-dom";
import { logout } from "../../services/auth";
import Button from "./components/Button";


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
  const [properties, setProperties] = useState([]);
  const [stepRef, stepSize] = useDimensions();
  let history = useHistory();

  const debouncedUpdatePropertiesLocalization = debounce(() => updatePropertiesLocalization, 500);

  function updatePropertiesLocalization() {
    loadProperties();
  }

  async function loadProperties() {
    const latitude = viewport.latitude
    const longitude = viewport.longitude

    try {
      const response = await api.get("/properties", {
        params: { latitude, longitude }
      });
      setProperties(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  function handleLogout(e) {
    logout();
    history.push("/");
  }

  function renderActions() {
    return (
      <ButtonContainer>
        <Button color="#222" onClick={handleLogout}>
          <i className="fa fa-times" />
        </Button>
      </ButtonContainer>
    );
  }

  return (
    <Container ref={stepRef}>
      <>
        <ReactMapGL
          width={stepSize.width}
          height={stepSize.height}
          {...viewport}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxApiAccessToken={TOKEN}
          onViewportChange={viewport => setViewport(viewport)}
          onViewStateChange={debouncedUpdatePropertiesLocalization}
        >
          <Properties properties={properties} />
        </ReactMapGL>
        {renderActions()}
      </>
    </Container>
  );
}

export default withRouter(App);
