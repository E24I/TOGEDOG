import styled from "styled-components";

export const PetMapContainer = styled.div`
  position: relative;
  width: 100vw;
  height: calc(100vh - 80px);
`;

export const SideContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 530px;
  height: 100%;
  padding: 10px 20px;
  background-color: none;
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
  margin-bottom: 25px;
  padding: 15px;
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const SideFeedList = styled.li`
  background-color: white;
  border: 1px solid rgb(215, 215, 215);
  box-shadow: 2px 2px 8px 0.01px rgb(131, 131, 131);
  border-radius: 12px;
  width: 98%;
  margin-bottom: 25px;
  padding: 18px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  &:hover {
    box-shadow: 2px 2px 8px 0.02px rgb(79, 79, 79);
  }
`;

export const SideListHeader = styled.div``;

export const SideListNum = styled.span`
  padding: 0px 20px;
  font-weight: 600;
`;

export const SideListContents = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

export const SideListTitle = styled.div`
  width: 100%;
  padding: 5px 0px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SideListCategory = styled.span`
  width: 100%;
  padding-left: 10px;
  color: rgb(119, 119, 119);
  font-size: 12px;
`;

export const SideListAddress = styled.div`
  width: 100%;
  padding: 5px 0px;
  color: rgb(119, 119, 119);
`;

export const SideListContent = styled.div`
  width: 100%;
  padding: 5px 0px;
  color: rgb(119, 119, 119);
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SideMedia = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: start;
`;

export const SideImageBox = styled.div`
  position: relative;
  border-radius: 12px;
  width: 48%;
  aspect-ratio: 1/1;
`;

export const SideImage = styled.img`
  border-radius: 12px;
  width: 48%;
  aspect-ratio: 1/1;
`;

export const SideNoneImage = styled.img`
  background-position: center;
  border-radius: 12px;
  width: 100%;
  height: 100%;
`;

export const SideImageCover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgb(215, 215, 215, 50%);
  border-radius: 12px;
  width: 100%;
  aspect-ratio: 1/1;
`;

export const SetMode = styled.div`
  position: fixed;
  top: 95px;
  right: 10px;
  z-index: 10;
`;

export const SideBottom = styled.div`
  background-color: white;
  border: 1px solid rgb(215, 215, 215);
  box-shadow: 2px 2px 8px 0.01px rgb(131, 131, 131);
  border-radius: 12px;
  width: 98%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
