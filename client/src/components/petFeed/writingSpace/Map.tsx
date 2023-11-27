/* eslint-disable @typescript-eslint/ban-ts-comment */

import React, { useState, useEffect } from "react";
import { MapContainer, MapInput, Marker } from "./Map.Style";

interface MapProps {
  handleInputChange: (
    fieldName: string,
    value: string | boolean | { x: string; y: string } | string[],
  ) => void;
  setMark: React.Dispatch<React.SetStateAction<boolean>>;
}

const Map: React.FC<MapProps> = ({ handleInputChange, setMark }) => {
  const [xcoor, setXcoor] = useState<string>("");
  const [ycoor, setYcoor] = useState<string>("");
  const [xOffset, setXOffset] = useState<number>(0);
  const [yOffset, setYOffset] = useState<number>(0);
  const [display, setDisplay] = useState<boolean>(true);

  useEffect(() => {
    const { sop } = window;
    const map = sop.map("map");
    map.setView(sop.utmk(953820, 1953437), 9);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    map.on("click", function (e: any) {
      setDisplay(true);
      setXcoor(e.utmk.x);
      setYcoor(e.utmk.y);
      setXOffset(e.containerPoint.x);
      setYOffset(e.containerPoint.y);
      console.log(e);
    });
    map.on("drag", function () {
      setDisplay(false);
      setXcoor("");
      setYcoor("");
    });
  }, []);

  const sendCord = () => {
    handleInputChange("address", { x: xcoor, y: ycoor });
    setMark(true);
  };

  const onBlurHandler = () => {
    setXcoor("");
    setYcoor("");
    setDisplay(false);
  };

  return (
    <MapContainer>
      <MapInput id="map" onBlur={onBlurHandler} onClick={sendCord}>
        {display && <Marker xoffset={xOffset} yoffset={yOffset} />}
        {/* 지도가 렌더링될 위치 */}
      </MapInput>
    </MapContainer>
  );
};

export default Map;
