import React, { useEffect, useRef, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";

export type MarkerLocation = {
  latitude: number;
  longitude: number;
};

export type MyLocation = {
  center: MarkerLocation;
};

const KaKaoMap: React.FC = () => {
  const { kakao } = window;
  const mapRef = useRef<any>(null);
  const [level, setLevel] = useState<number>(3);
  const [location, setLoacation] = useState<MarkerLocation | null>({
    latitude: 37,
    longitude: 127,
  });
  const [coordinates, setCoordinates] = useState<MyLocation>({
    center: {
      latitude: 37,
      longitude: 127,
    },
  }); // 현재 위치의 좌표값을 저장할 상태
  const [address, setAddress] = useState<any | null>(null); // 현재 좌표의 주소를 저장할 상태
  const [position, setPosition] = useState<any | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler); // 성공시 successHandler, 실패시 errorHandler 함수가 실행된다.
  }, []);


  const successHandler = (response: any): void => {
    console.log(response); // coords: GeolocationCoordinates {latitude: 위도, longitude: 경도, …} timestamp: 1673446873903
    const { latitude, longitude } = response.coords;
    setLoacation({ latitude, longitude });
  };

  const errorHandler = (error: any): void => {
    console.log(error);
  };

  const getCoordinates = () => {
    const map = mapRef.current;

    setCoordinates({
      center: {
        latitude: map.getCenter().getLat(),
        longitude: map.getCenter().getLng(),
      },
    });
  };

  const getAddress = () => {
    // latitude: number, longitude: number
    const geocoder = new kakao.maps.services.Geocoder(); // 좌표 -> 주소로 변환해주는 객체
    const coord = new kakao.maps.LatLng(
      coordinates.center.latitude,
      coordinates.center.longitude,
    ); // 주소로 변환할 좌표 입력
    const callback = function (result: any, status: any) {
      if (status === kakao.maps.services.Status.OK) {
        setAddress(result[0].address);
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  };

  // console.log("address", address);

  return (
    <div>
      {location && (
        <Map
          center={{ lat: location.latitude, lng: location.longitude }} // 지도의 중심 좌표
          style={{ width: "100vw", height: "100vh" }} // 지도 크기
          level={level} // 지도 확대 레벨
          ref={mapRef}
          onClick={(_t, mouseEvent) =>
            setPosition({
              lat: mouseEvent.latLng.getLat(),
              lng: mouseEvent.latLng.getLng(),
            })
          }
        >
          {position && <MapMarker position={position} />}
          <MapMarker
            position={{ lat: location.latitude, lng: location.longitude }}
          ></MapMarker>
          <PlusLevel onClick={() => setLevel(level + 1)}>-</PlusLevel>
          <MinusLevel onClick={() => setLevel(level - 1)}>+</MinusLevel>
          <button onClick={getCoordinates}>현재 위치 좌표 얻기</button>
          <button onClick={getAddress}>현재 좌표의 주소 얻기</button>
        </Map>
      )}
      {coordinates && (
        <div>
          현재 위치의 좌표는..
          <p>위도 : {coordinates.center.latitude}</p>
          <p>경도 : {coordinates.center.longitude}</p>
        </div>
      )}
      {address && (
        <div>
          현재 좌표의 주소는..
          <p>address_name: {address.address_name}</p>
          <p>region_1depth_name: {address.region_1depth_name}</p>
          <p>region_2depth_name: {address.region_2depth_name}</p>
          <p>region_3depth_name: {address.region_3depth_name}</p>
        </div>
      )}
      {position && (
        <p>
          {"클릭한 위치의 위도는 " +
            position.lat +
            " 이고, 경도는 " +
            position.lng +
            " 입니다"}
        </p>
      )}
    </div>
  );
};

export default KaKaoMap;

// map => key, image{{src, size}}, position, title

export const LevelBtn = styled.button`
  width: 100px;
  height: 50px;
  font-size: 24px;
  border: 1px solid black;
  border-radius: 18px;
`;

export const PlusLevel = styled(LevelBtn)``;
export const MinusLevel = styled(LevelBtn)``;
