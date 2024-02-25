import React, { useEffect, useMemo, useRef, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import {
  PetMapContainer,
  Search,
  SearchBtn,
  MapMode,
  SideContainer,
  ResultList,
  ResultAddress,
  ResultCategory,
  ResultContents,
  ResultOrder,
  ResultTitle,
  ResultLists,
  SearchInput,
  SearchBox,
  SearchInputBtn,
  SearchCloseBtn,
  SearchSection,
  ResultSection,
  ResultMsg,
  SearchContainer,
  PageSection,
  LeftPageBtn,
  RightPageBtn,
  SideCloseBtn,
  SideOpenBtn,
  MapToggle,
  MapToggleBtn,
  MapToggleContent,
  SetMode,
} from "../components/petMap/PetMap.Style";
import styled from "styled-components";
import { usePetMap } from "../hooks/MapHooks";
import { useRecoilState, useRecoilValue } from "recoil";
import { alertAtom, tokenAtom } from "../atoms";
import MapFeedItem from "../components/petMap/MapFeedItem";
import {
  MapFeedContainer,
  MapFeedHeader,
  MapFeedMsg,
  MapFeeds,
} from "../components/petMap/MapFeed.style";
import MarkerIconG from "./../assets/images/icons/MarkerIconG.svg";
import MarkerIconY from "./../assets/images/icons/MarkerIconY.svg";

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
  const [totalCount, setTotalCount] = useState(0);

  // 지도 검색
  const getSearchResult = () => {
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(`${searchValue}`, placesSearchCallBack);
  };
  const handleSearch = () => {
    if (!searchValue) {
      return alertWrite();
    }
    return getSearchResult();
  };

  // Alert 창
  const [alertModal, setAlertModal] = useRecoilState(alertAtom);
  const alertNothig = () => setAlertModal("검색 결과가 존재하지 않습니다.");
  const alertError = () => setAlertModal("검색 결과 중 오류가 발생했습니다.");
  const alertWrite = () => setAlertModal("검색어를 입력해주세요.");

  const placesSearchCallBack = (data: any, status: any, pagination: any) => {
    if (status === kakao.maps.services.Status.OK) {
      getData(data);
      pagination.gotoPage(isPage);
      setTotalPage(pagination.last);
      setTotalCount(pagination.totalCount);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alertNothig();
    } else if (status === kakao.maps.services.Status.ERROR) {
      alertError();
    }
  };

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

  const sideRef = useRef<any>(null);
  const [sideOpen, setSideOpen] = useState(true);
  const [mapMode, setMapMode] = useState(true);
  const [mapData, setMapData] = useState<any>([]);
  const [searchInput, setSearchInput] = useState(false);

  // 펫지도 좌표에 따른 피드 리스트 조회
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

  // SearchInput 창 열고 닫기
  const handleOpenSearch = () => {
    if (searchInput) {
      setSearchInput(false);
      sideRef.current.style.transform = "translateY(-200%)";
    } else {
      setSearchInput(true);
      sideRef.current.style.transform = "translateY(0%)";
    }
  };
  useEffect(() => {
    sideRef.current.style.transform = "translateY(-200%)";
  }, []);

  // SideContainer 열고 닫기
  const handleOpenSide = () => {
    if (sideOpen) {
      setSideOpen(false);
      sideRef.current.style.transform = "translateX(-100%)";
    } else {
      setSideOpen(true);
      sideRef.current.style.transform = "translateX(0%)";
    }
  };

  // Page 변경하기
  const handlePrevPage = () => {
    if (isPage > 1) setPage(isPage - 1);
  };

  const handleNextPage = () => {
    if (isPage < totalPage) setPage(isPage + 1);
  };

  // mapMode 변경
  const handleToggle = () => {
    if (mapMode) {
      sideRef.current.style.transform = "translateY(0%)";
      setMapMode(false);
      setSearchInput(true);
      setSearchValue("");
      setData([]);
    } else {
      setMapMode(true);
      setSearchInput(false);
      setMapData([]);
    }
  };

  const setRef = useRef<any>(null);
  const toggleRef = useRef<any>(null);
  const [modeBtn, setModeBtn] = useState(false);
  const handleOpenToggle = () => {
    let reset;
    if (modeBtn) {
      setModeBtn(false);
      setRef.current.style.transform = "rotate(0deg)";
      toggleRef.current.style.transform = "translateX(120%)";
      clearTimeout(reset);
    } else {
      setModeBtn(true);
      setRef.current.style.transform = "rotate(390deg)";
      toggleRef.current.style.transform = "translateX(0%)";
      reset = setTimeout(() => {
        setModeBtn(false);
        setRef.current.style.transform = "rotate(0deg)";
        toggleRef.current.style.transform = "translateX(120%)";
      }, 3000);
    }
  };
  useEffect(() => {
    toggleRef.current.style.transform = "translateX(120%)";
  }, []);

  // 페이지네이션 실행
  useMemo(() => {
    searchValue && getSearchResult();
  }, [isPage]);

  // 지도 범위 재설정하기
  useMemo(() => {
    if (mapMode && isData.length > 0) {
      const bounds = new kakao.maps.LatLngBounds();
      isData.forEach((data: any) => {
        bounds.extend(new kakao.maps.LatLng(data.y, data.x));
      });
      if (mapRef.current) mapRef.current.setBounds(bounds);
    }
  }, [isData]);

  // 펫 맵 피드 data 불러오기
  useMemo(() => {
    if (!mapMode) petMap();
  }, [location, level, mapMode]);

  if (isError) {
    return <>페이지를 불러오는데 실패했습니다.</>;
  }
  return (
    <PetMapContainer>
      <MapContainer>
        {location && (
          <Map
            ref={mapRef}
            center={location}
            style={{ width: "100vw", height: "calc(100vh - 70px)" }}
            level={level}
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
                    image={{
                      src: MarkerIconG,
                      size: {
                        width: 40,
                        height: 40,
                      },
                    }}
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
                    image={{
                      src: MarkerIconY,
                      size: {
                        width: 40,
                        height: 40,
                      },
                    }}
                  />
                ))}
            <PlusLevel onClick={() => setLevel(level - 1)}>+</PlusLevel>
            <MinusLevel onClick={() => setLevel(level + 1)}>-</MinusLevel>
          </Map>
        )}
      </MapContainer>

      <SetMode ref={setRef} onClick={handleOpenToggle} />

      <MapMode ref={toggleRef}>
        <MapToggle mapMode={mapMode} onClick={handleToggle}>
          <MapToggleContent>
            {mapMode ? "위치검색" : "근처피드"}
          </MapToggleContent>
          <MapToggleBtn />
        </MapToggle>
      </MapMode>

      {!searchInput && (
        <SearchBtn onClick={handleOpenSearch}>
          <Search />
        </SearchBtn>
      )}

      <SideContainer mapMode={mapMode} ref={sideRef}>
        {mapMode ? (
          <SearchContainer>
            <SearchSection>
              <SearchBox>
                <SearchInput
                  placeholder="장소, 주소로 검색"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                />
                <SearchInputBtn onClick={handleSearch} />
              </SearchBox>
              {!isData.length && (
                <SearchCloseBtn onClick={handleOpenSearch}>
                  &times;
                </SearchCloseBtn>
              )}
            </SearchSection>
            {isData.length > 0 && (
              <ResultSection>
                <ResultMsg>
                  <span>
                    {`"${searchValue}"(으)로 검색한 결과입니다.(${totalCount}개)`}
                  </span>
                  <PageSection>
                    <LeftPageBtn onClick={handlePrevPage} />
                    <span>{`${isPage}/${totalPage}`}</span>
                    <RightPageBtn onClick={handleNextPage} />
                  </PageSection>
                </ResultMsg>
                <ResultLists>
                  {isData.map((data: any, idx: number) => (
                    <ResultList key={idx}>
                      <ResultOrder>{idx + 1}</ResultOrder>
                      <ResultContents>
                        <ResultTitle>
                          <span>{data.place_name}</span>
                          <ResultCategory>
                            {data.category_group_name}
                          </ResultCategory>
                        </ResultTitle>
                        <ResultAddress>{data.address_name}</ResultAddress>
                      </ResultContents>
                    </ResultList>
                  ))}
                </ResultLists>
              </ResultSection>
            )}
          </SearchContainer>
        ) : (
          <MapFeedContainer>
            <MapFeedMsg>{`지도 중심으로부터 일정 거리에 존재하는 게시글 입니다.`}</MapFeedMsg>
            <MapFeedHeader>{`총 ${mapData.length}개의 게시글`}</MapFeedHeader>
            <MapFeeds>
              {mapData?.map((el: any, idx: number) => (
                <MapFeedItem key={idx} el={el} />
              ))}
            </MapFeeds>
          </MapFeedContainer>
        )}

        {(isData.length > 0 || mapData.length > 0) &&
          (sideOpen ? (
            <SideCloseBtn mapMode={mapMode} onClick={handleOpenSide} />
          ) : (
            <SideOpenBtn mapMode={mapMode} onClick={handleOpenSide} />
          ))}
      </SideContainer>
    </PetMapContainer>
  );
};

export default PetMap;

export const MapContainer = styled.div`
  width: 100%;
  max-height: 100%;
`;

export const LevelBtn = styled.button`
  background-color: rgb(73, 73, 73);
  box-shadow: 1px 1px 2px 0.01px rgb(131, 131, 131);
  width: 33px;
  height: 33px;
  color: rgb(248, 210, 89);
  font-size: 24px;
  text-align: center;
  font-weight: bold;
  z-index: 20;
`;

export const PlusLevel = styled(LevelBtn)`
  border-radius: 8px 8px 0 0;
  position: absolute;
  bottom: 57px;
  right: 14px;
`;
export const MinusLevel = styled(LevelBtn)`
  border-radius: 0 0 8px 8px;
  position: absolute;
  bottom: 14px;
  right: 14px;
`;
