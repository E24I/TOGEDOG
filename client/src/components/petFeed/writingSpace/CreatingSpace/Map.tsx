/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from "react";
import { MapContainer, MapInput, Pin } from "./Map.Style";

const Map: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://sgisapi.kostat.go.kr/OpenAPI3/auth/javascriptAuth?consumer_key=${process.env.REACT_APP_SGIS_ID}`;
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);
  });

  //   const map = sop.map("map");

  return (
    <MapContainer>
      <MapInput id="map"></MapInput>
      {/* {map.setView(sop.utmk(953820, 1953437), 9)};<Pin id="divcon"></Pin> */}
    </MapContainer>
  );
};

export default Map;
