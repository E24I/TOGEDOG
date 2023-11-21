import React, { useState } from "react";
import KaKaoMap from "../components/petMap/KaKaoMap";
import styled from "styled-components";

const PetMap: React.FC = () => {
  const [sort, setSort] = useState<string>("");

  return (
    <PetMapContainer>
      <KaKaoMap />
      <SideContainer>
        <SideSearchBox>
          <SideSearch placeholder="검색어를 입력하세요." />
        </SideSearchBox>
        <SideSortBox>
          <SideSortBtn>전체</SideSortBtn>
          <SideSortBtn>카페</SideSortBtn>
          <SideSortBtn>공원</SideSortBtn>
          <SideSortBtn>식당</SideSortBtn>
          <SideSortBtn>병원</SideSortBtn>
          <SideSortBtn>숙소</SideSortBtn>
        </SideSortBox>
        <SideLists>
          {[1, 2, 3, 4, 5, 6].map((el, idx) => (
            <SideList key={idx}>
              <SideListImg src="" alt="장소 이미지" />
              <SideListContents>
                <SideListTitle>
                  장소이름
                  <SideListCategory>카테고리</SideListCategory>
                </SideListTitle>
                <SideListAddress>
                  별내동 불암산로 59번길 48-31, Namyangju
                </SideListAddress>
                <SideListStatus>
                  <button>좋아요</button>
                  <button>북마크</button>
                </SideListStatus>
              </SideListContents>
            </SideList>
          ))}
        </SideLists>
      </SideContainer>
    </PetMapContainer>
  );
};

export default PetMap;

export const PetMapContainer = styled.div`
  position: relative;
  width: 100vw;
  height: calc(100vh - 80px);
`;

export const SideContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 530px;
  height: 100%;
  padding: 10px 20px;
  background-color: none; // none;
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

export const SideSearchBox = styled.div`
  background-color: white;
  border: 1px solid rgb(215, 215, 215);
  box-shadow: 1px 1px 2px 0.01px rgb(131, 131, 131);
  border-radius: 24px;
  width: 100%;
  height: 50px;
  margin: 5px 0px;
  padding: 0px 20px;
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const SideSearch = styled.input`
  width: 100%;
  font-size: 16px;
  font-weight: bold;
`;

export const SideSortBox = styled.div`
  width: 100%;
  margin: 10px 0px 0px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SideSortBtn = styled.button`
  background-color: white;
  border: 1px solid rgb(215, 215, 215);
  box-shadow: 1px 1px 2px 0.01px rgb(131, 131, 131);
  border-radius: 18px;
  width: 68px; // 추후 padding으로 수정
  height: 30px;
  padding: 4px;
  text-align: center;
  font-weight: bold;
`;

export const SideLists = styled.ul`
  width: 100%;
  height: calc(100vh - 140px);
  margin-top: 20px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px; // 스크롤바의 너비
  }
  &::-webkit-scrollbar-thumb {
    height: 30%; //스크롤바의 길이
    background: rgb(215, 215, 215); // 스크롤바의 색상
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: none; //스크롤바 뒷 배경 색상
  }
`;

export const SideList = styled.li`
  background-color: white;
  border: 1px solid rgb(215, 215, 215);
  box-shadow: 2px 2px 8px 0.01px rgb(131, 131, 131);
  border-radius: 12px;
  width: 98%;
  margin-bottom: 30px;
  padding: 15px;
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const SideListImg = styled.img`
  background-color: rgb(215, 215, 215); //수정
  border: 1px solid rgb(215, 215, 215);
  border-radius: 12px;
  min-width: 190px;
  min-height: 190px;
`;

export const SideListContents = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

export const SideListTitle = styled.div`
  width: 100%;
  padding: 5px 0px;
  font-weight: bold;
`;

export const SideListCategory = styled.span`
  width: 100%;
  padding-left: 10px;
  color: rgb(119, 119, 119);
  font-size: 12px;
`;

export const SideListAddress = styled.div`
  width: 100%;
  height: 130px;
  padding: 5px 0px;
  color: rgb(119, 119, 119);
`;

export const SideListStatus = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: end;
  align-items: center;
`;
