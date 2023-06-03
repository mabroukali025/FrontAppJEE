import React, { useState, useEffect } from "react";
import axios from "axios";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { useParams } from "react-router-dom";
import { Card } from "antd";

const customizeMap = {
  width: "50%",
  height: "53%",
};

const infoContainerStyle = {
  padding: "16px",
};

const MapRest= ({ google }) => {
  const [coords, setCoords] = useState([]);
  const [initialCenter, setInitialCenter] = useState({
    lat: 31.6665735,
    lng: -7.9754785,
  });
  const [restoInfo, setRestoInfo] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/api/restaurants/${id}`)
      .then((response) => {
        const data = response.data;

        // Check if data has latitude and longitude properties
        if (data.latitude && data.longitude) {
          const coordinates = {
            lat: data.longitude,
            lng: data.latitude,
          };
          setCoords([coordinates]);
          setInitialCenter(coordinates);

        } else {
          // Handle the case when data does not have the expected properties
          console.error("Invalid data structure:", data);
        }

        setRestoInfo(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const drawMarker = () => {
    return coords.map((coord, i) => {
      const { lat, lng } = coord;

      return (
        <Marker
          key={i}
          id={i}
          position={{
            lat: lat,
            lng: lng,
          }}
          onClick={() => console.log("Event Handler Called")}
        />
      );
    });
  };

  return (
    <div>
      <h1>Restaurant Details</h1>
      <div style={{ display: "flex" }}>
        <div style={{ marginLeft: 10, marginRight: 10, flex: 1 }}>
          <Map
            google={google}
            style={customizeMap}
            zoom={10}
            initialCenter={initialCenter}
          >
            {drawMarker()}
          </Map>
        </div>
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyCsA6hQ1C8D6IIeB_r2WDEEgPelvpUWIf8&amp;region=MA",
})(MapRest);