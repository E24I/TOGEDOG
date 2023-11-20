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
                <SideListAddress>주소</SideListAddress>
                <div>
                  <button>♡ 1</button>
                  <button>☆</button>
                </div>
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
`;

export const SideContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 500px;
  height: 100%;
  padding: 10px 20px;
  background-color: white; // none;
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

export const SideSearchBox = styled.div`
  background-color: white;
  border: 1px solid black;
  border-radius: 18px;
  width: 100%;
  height: 60px;
  margin: 10px 0px;
  padding: 0px 10px;
  display: flex;
  justify-content: start;
  align-items: center;
`;
export const SideSearch = styled.input`
  width: 100%;
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
  border: 1px solid black;
  border-radius: 18px;
  width: 60px;
  height: 30px;
  text-align: center;
  padding: 4px;
`;
export const SideLists = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  overflow-y: auto;
`;
export const SideList = styled.li`
  background-color: white;
  border: 1px solid rgb(215, 215, 215);
  border-radius: 8px;
  width: 100%;
  margin-top: 30px;
  padding: 10px;
  display: flex;
  justify-content: start;
  align-items: center;
`;
export const SideListImg = styled.img`
  background-color: rgb(215, 215, 215); //수정
  border: 1px solid rgb(215, 215, 215);
  border-radius: 12px;
  min-width: 195px;
  min-height: 195px;
`;
export const SideListContents = styled.div`
  border: 1px solid black;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;
export const SideListTitle = styled.div`
  border: 1px solid black;
  width: 100%;
`;
export const SideListCategory = styled.span`
  border: 1px solid black;
  width: 100%;
`;
export const SideListAddress = styled.div`
  border: 1px solid black;
  width: 100%;
`;
