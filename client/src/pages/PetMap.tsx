import React, { useMemo, useRef, useState } from "react";
import { Circle, Map, MapMarker } from "react-kakao-maps-sdk";
import {
  PetMapContainer,
  SetMode,
  SideBottom,
  SideContainer,
  SideList,
  SideListAddress,
  SideListCategory,
  SideListContents,
  SideListNum,
  SideListTitle,
  SideLists,
  SideSearch,
  SideSearchBox,
  SideSortBox,
  SideSortBtn,
} from "../components/petMap/PetMap.Style";
import Toggle from "../atoms/toggle/Toggle";
import styled from "styled-components";
import Pagination from "../atoms/pagination/Pagination";
import { usePetMap } from "../hooks/MapHooks";
import { useRecoilState, useRecoilValue } from "recoil";
import { alertAtom, tokenAtom } from "../atoms";
import FeedDetail from "../components/petFeed/FeedDetail";
import MapFeedItem from "../components/petMap/MapFeedItem";

export type MarkerLocation = {
  lat: number;
  lng: number;
};

export type MyLocation = {
  center: MarkerLocation;
};

const PetMap: React.FC = () => {
  const accesstoken = useRecoilValue(tokenAtom);

  // kakao map api
  const { kakao } = window;
  const mapRef = useRef<any>(null);

  // 검색한 데이터를 저장한 state
  const [isData, setData] = useState<any>([]);
  const getData = (data: any) => setData(data);

  // 검색창 value에 대한 state
  const [searchValue, setSearchValue] = useState<string>("");

  // // 검색 sort에 대한 state
  // const [sort, setSort] = useState<string>("");
  // const list = ["카페", "공원", "식당", "병원", "숙소"];

  // 지도 확대 레벨
  const defaultLevel = 3;
  const [level, setLevel] = useState<number>(defaultLevel);

  // 지도의 중심 좌표, 초기 설정 좌표, 현재 위치 탐색하면 이 값이 바뀜
  const defaultCoordinate = {
    lat: 37.738661630975955,
    lng: 127.04591390005008,
  };
  const [location, setLoacation] = useState<MarkerLocation>(defaultCoordinate);

  // 현재 중앙 좌표 얻기
  const getLocations = () =>
    setLoacation({
      lat: mapRef.current?.getCenter().getLat(),
      lng: mapRef.current?.getCenter().getLng(),
    });

  // // 주소로 변환할 좌표 입력 // 현재 위치의 좌표값을 저장할 상태
  // const [coordinates, setCoordinates] = useState<MyLocation>({
  //   center: defaultCoordinate,
  // });

  // // 현재 중앙 좌표 얻기
  // const getCoordinates = () =>
  //   setCoordinates({
  //     center: {
  //       lat: mapRef.current?.getCenter().getLat(),
  //       lng: mapRef.current?.getCenter().getLng(),
  //     },
  //   });

  // // 현재 좌표의 주소를 저장할 상태
  // const [address, setAddress] = useState<any>(null);

  // // 현재 중앙 좌표의 주소 얻기
  // const getAddress = () => {
  //   // 좌표 -> 주소로 변환해주는 객체
  //   const geocoder = new kakao.maps.services.Geocoder();

  //   // 주소로 변환할 좌표 입력
  //   const coord = new kakao.maps.LatLng(
  //     coordinates.center.lat,
  //     coordinates.center.lng,
  //   );

  //   const callback = function (result: any, status: any) {
  //     if (status === kakao.maps.services.Status.OK) {
  //       setAddress(result[0].address);
  //     }
  //   };
  //   geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  // };

  // 페이지네이션 정보
  const [isPage, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(5);

  // 지도 검색
  const getSearchResult = () => {
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(`${searchValue}`, placesSearchCallBack);
  };

  // Alert 창
  const [alertModal, setAlertModal] = useRecoilState(alertAtom);
  const alertNothig = () => setAlertModal("검색 결과가 존재하지 않습니다.");
  const alertError = () => setAlertModal("검색 결과 중 오류가 발생했습니다.");
  const alertWrite = () => setAlertModal("검색어를 입력해주세요.");

  const placesSearchCallBack = (data: any, status: any, pagination: any) => {
    if (status === kakao.maps.services.Status.OK) {
      getData(data);
      setTotalPage(pagination.last);
      pagination.gotoPage(isPage);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alertNothig();
    } else if (status === kakao.maps.services.Status.ERROR) {
      alertError();
    }
  };

  // 페이지네이션 실행
  const ChangePagination = useMemo(() => {
    searchValue && getSearchResult();
  }, [isPage]);

  // 지도 범위 재설정하기
  const bounds = useMemo(() => {
    if (isData.length > 0) {
      const bounds = new kakao.maps.LatLngBounds();
      isData.forEach((data: any) => {
        bounds.extend(new kakao.maps.LatLng(data.y, data.x));
      });
      if (mapRef.current) mapRef.current.setBounds(bounds);
    }
  }, [isData]);

  // // http가 아닌 https 주소(localhost도 가능)에서 사용 가능함, 현 위치 탐색 기능
  // useEffect(() => {
  //   const successHandler = (response: any): void => {
  //     const { latitude, longitude } = response.coords;
  //     setLoacation({ latitude, longitude });
  //   };

  //   const errorHandler = (error: any): void => {
  //     console.log(error);
  //   };
  //   navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  // }, []);

  // sidebar 열려있는지 유무 state
  const [mapMode, setMapMode] = useState<boolean>(true);
  const handleSidebar = () => {
    setMapMode(!mapMode);
    setData([]);
    setSearchValue("");
  };

  // 펫지도 좌표에 따른 피드 리스트 조회
  const [mapData, setMapData] = useState<any>([]);
  const getMapData = (res: any) => setMapData(res);
  const {
    mutate: petMap,
    isPending,
    isError,
  } = usePetMap(
    {
      wgs84_y: location.lat,
      wgs84_x: location.lng,
      range: level * 2.6,
    },
    accesstoken,
    getMapData,
  );
  console.log("mapData", mapData);

  const getMapFeeds = useMemo(() => {
    if (!mapMode) petMap();
  }, [location, level, mapMode]);

  if (isPending) {
    return <>로딩중입니다.</>;
  }
  if (isError) {
    return <>페이지를 불러오는데 실패했습니다.</>;
  }
  return (
    <PetMapContainer>
      <MapContainer>
        {location && (
          <Map
            // 지도의 중심 좌표
            center={location}
            // 지도 크기
            style={{ width: "100vw", height: "calc(100vh - 80px)" }}
            // 지도 확대 레벨
            level={level}
            ref={mapRef}
            onClick={(_t, mouseEvent) =>
              setLoacation({
                lat: mouseEvent.latLng.getLat(),
                lng: mouseEvent.latLng.getLng(),
              })
            }
            onDragEnd={() => getLocations()}
            onZoomChanged={(map) => setLevel(map.getLevel())}
          >
            {mapMode
              ? isData.length > 0 &&
                isData.map((el: any, idx: number) => (
                  <MapMarker
                    key={idx}
                    position={{
                      lat: parseFloat(el.y),
                      lng: parseFloat(el.x),
                    }}
                    title={el.place_name}
                  />
                ))
              : mapData.length > 0 &&
                mapData.map((el: any, idx: number) => (
                  <MapMarker
                    key={idx}
                    position={{
                      lat: parseFloat(el.wgs84_y),
                      lng: parseFloat(el.wgs84_x),
                    }}
                    title={el.title}
                  />
                ))}
            <PlusLevel onClick={() => setLevel(level - 1)}>+</PlusLevel>
            <MinusLevel onClick={() => setLevel(level + 1)}>-</MinusLevel>
          </Map>
        )}
      </MapContainer>
      <SetMode>
        <Toggle
          isOn={mapMode}
          handleToggleFunc={handleSidebar}
          positive="일반"
          negative="피드"
        />
      </SetMode>
      <SideContainer>
        {mapMode && (
          <SideSearchBox>
            <SideSearch
              placeholder="검색어를 입력하세요."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  if (!searchValue) {
                    return alertWrite();
                  }
                  return getSearchResult();
                }
              }}
            />
          </SideSearchBox>
        )}
        <SideLists>
          {mapMode
            ? isData.map((el: any, idx: number) => (
                <SideList key={idx}>
                  <SideListNum>{idx + 1}</SideListNum>
                  <SideListContents>
                    <SideListTitle>
                      {el.place_name}
                      <SideListCategory>
                        {el.category_group_name}
                      </SideListCategory>
                    </SideListTitle>
                    <SideListAddress>{el.address_name}</SideListAddress>
                  </SideListContents>
                </SideList>
              ))
            : mapData?.map((el: any, idx: number) => (
                <MapFeedItem key={idx} el={el} />
              ))}
        </SideLists>
        {isData.length > 0 && (
          <SideBottom>
            <Pagination
              isPage={isPage}
              totalPage={totalPage}
              handleFunc={(page) => setPage(page)}
            />
          </SideBottom>
        )}
      </SideContainer>
    </PetMapContainer>
  );
};

export default PetMap;

export const MapContainer = styled.div`
  max-width: 100vw;
  max-height: calc(100vh - 80px);
`;

export const LevelBtn = styled.button`
  background-color: white;
  border: 1px solid rgb(215, 215, 215);
  box-shadow: 1px 1px 2px 0.01px rgb(131, 131, 131);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 24px;
  text-align: center;
  font-weight: bold;
  z-index: 20;
`;

export const PlusLevel = styled(LevelBtn)`
  position: absolute;
  bottom: 65px;
  right: 10px;
`;
export const MinusLevel = styled(LevelBtn)`
  position: absolute;
  bottom: 15px;
  right: 10px;
`;
