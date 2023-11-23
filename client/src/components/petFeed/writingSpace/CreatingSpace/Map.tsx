/* eslint-disable @typescript-eslint/ban-ts-comment */

import React, { useState, useEffect } from "react";
import { MapContainer, MapInput, Marker } from "./Map.Style";

interface MapProps {
  handleInputChange: (
    fieldName: string,
    value: string | boolean | string[],
  ) => void;
}

const Map: React.FC<MapProps> = ({ handleInputChange }) => {
  const [xcor, setXcor] = useState<string>("");
  const [ycor, setYcor] = useState<string>("");
  const [xOffset, setXOffset] = useState<number>(0);
  const [yOffset, setYOffset] = useState<number>(0);

  useEffect(() => {
    const { sop } = window;
    const map = sop.map("map");
    map.setView(sop.utmk(953820, 1953437), 9);
    map.on("click", function (e: any) {
      setTimeout(function () {
        setXcor(e.utmk.x);
        setYcor(e.utmk.y);
        setXOffset(e.containerPoint.x);
        setYOffset(e.containerPoint.y);
      }, 200);
    });
  }, []);

  const sendCord = () => {
    handleInputChange("address", [xcor, ycor]);
  };

  return (
    <MapContainer>
      <MapInput
        id="map"
        style={{
          width: "calc(100% - 20px)",
          height: "480px",
          margin: "0px auto",
        }}
        onClick={sendCord}
      >
        <Marker xOffset={xOffset} yOffset={yOffset} />
        {/* 지도가 렌더링될 위치 */}
      </MapInput>
    </MapContainer>
  );
};

export default Map;
