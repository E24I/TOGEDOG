import React from "react";
import styled from "styled-components";

const MapDetail: React.FC = () => {
  const feedData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <PageContainer>
      <MapDetailContainer>
        <BackBtn>←</BackBtn>
        <MapHeader>
          <MapTitle>산들소리수목원</MapTitle>
          <MapAddress>별내동 불암산로 59번길 48 - 31, Namyangju</MapAddress>
          <MapStatus>
            <MapLike>좋아요</MapLike>
            <MapLike>북마크</MapLike>
          </MapStatus>
        </MapHeader>
        <CardHeader>
          <CardFilters>
            <CardFilter>최신순</CardFilter>
            <CardFilter>좋아요순</CardFilter>
          </CardFilters>
          <CardArrange>
            <CardArrangeBtn>리스트</CardArrangeBtn>
            <CardArrangeBtn>바둑판</CardArrangeBtn>
          </CardArrange>
        </CardHeader>
        <FeedCards>
          {feedData.map((el, idx) => (
            <FeedCard key={idx}>
              <FeedCardImg
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1V1m9J8Vo8-_KIgQIsDacd1S9A5kNg3Br0Q&usqp=CAU"
                alt="피드 이미지"
              />
            </FeedCard>
          ))}
        </FeedCards>
        <div>페이지네이션</div>
      </MapDetailContainer>
    </PageContainer>
  );
};

export default MapDetail;

export const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MapDetailContainer = styled.div`
  width: 100%;
  max-width: 1080px;
  padding-top: 50px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BackBtn = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 24px;
  font-weight: 600;
`;

export const MapHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const MapTitle = styled.h1`
  margin: 5px 0px;
`;
export const MapAddress = styled.div`
  margin: 5px 0px;
`;
export const MapStatus = styled.div`
  margin: 5px 0px;
`;
export const MapLike = styled.button`
  margin: 0px 10px;
`;
export const CardHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px;
`;
export const CardFilters = styled.div``;
export const CardFilter = styled.button`
  border: 1px solid black;
  margin: 0px 10px;
`;
export const CardArrange = styled.div``;
export const CardArrangeBtn = styled.button`
  border: 1px solid black;
  margin: 0px 10px;
`;
export const FeedCards = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 200px);
  gap: 20px;
`;
export const FeedCard = styled.li``;
export const FeedCardImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 12px;
  background-size: cover;
  background-repeat: no-repeat;
`;
