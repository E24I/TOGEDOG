import React, { useEffect } from "react";

const { kakao } = window;

const KaKaoMap: React.FC = () => {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
  }, []);

  return <div id="map" style={{ width: "500px", height: "400px" }}></div>;
};

export default KaKaoMap;
