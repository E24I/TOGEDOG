import React, { useState } from "react";
import styled from "styled-components";
import Pagination from "../atoms/pagination/Pagination";

type DetailSort = {
  filter: string;
  sort: string;
};

const MapDetail: React.FC = () => {
  const feedData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [isSort, setSort] = useState<DetailSort>({
    filter: "new",
    sort: "card",
  });
  const [isPage, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(10);
  const handleChangePage = (page: number) => {
    setPage(page);
    console.log(page);
  };

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
            <CardArrangeBtn
              onClick={() => setSort({ ...isSort, sort: "list" })}
            >
              리스트
            </CardArrangeBtn>
            <CardArrangeBtn
              onClick={() => setSort({ ...isSort, sort: "card" })}
            >
              바둑판
            </CardArrangeBtn>
          </CardArrange>
        </CardHeader>
        {isSort.sort === "card" ? (
          <DetailCards>
            {feedData.map((el, idx) => (
              <DetailCard key={idx}>
                <DetailCardImg
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1V1m9J8Vo8-_KIgQIsDacd1S9A5kNg3Br0Q&usqp=CAU"
                  alt="피드 이미지"
                />
              </DetailCard>
            ))}
          </DetailCards>
        ) : (
          <DetailLists>
            {feedData.map((el, idx) => (
              <DetailList key={idx}>
                <DetailListImg
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1V1m9J8Vo8-_KIgQIsDacd1S9A5kNg3Br0Q&usqp=CAU"
                  alt="피드 이미지"
                />
                <DetailListContents>
                  <DetailListTitle>
                    산들소리수목원 방문 후기
                    <DetailListTime>· 35분 전</DetailListTime>
                  </DetailListTitle>
                  <DetailListContent>
                    오늘은~ 산들소리수목원에 방문해보았어요~ 여기 물 좋고 공기
                    좋고 너무 너무 좋네여~ 나중에 꼭 한번씩 놀러오세요! 여기에
                    먹거리도 많고, 아이들 놀기에도 좋아서 오기 딱 좋아요! 또
                    앉아서 쉴 곳도 많아서 편하네요
                  </DetailListContent>
                </DetailListContents>
                <DetailListStatus>
                  <DetailListLike>좋아요</DetailListLike>
                  <DetailListMark>북마크</DetailListMark>
                </DetailListStatus>
              </DetailList>
            ))}
          </DetailLists>
        )}
        <Pagination
          isPage={isPage}
          totalPage={totalPage}
          handleFunc={handleChangePage}
        />
      </MapDetailContainer>
    </PageContainer>
  );
};

export default MapDetail;

export const PageContainer = styled.div`
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
  padding: 30px 0px;
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

export const DetailCards = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 200px);
  gap: 20px;
`;
export const DetailCard = styled.li``;
export const DetailCardImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 12px;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const DetailLists = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 500px);
  column-gap: 60px;
  row-gap: 30px;
`;
export const DetailList = styled.li`
  display: flex;
  justify-content: start;
  align-items: center;
`;
export const DetailListImg = styled.img`
  min-width: 90px;
  height: 90px;
  margin-right: 10px;
  border-radius: 50%;
  background-size: cover;
  background-repeat: no-repeat;
`;
export const DetailListContents = styled.div`
  margin-right: 5px;
`;
export const DetailListTitle = styled.div`
  padding: 5px 0px;
  font-weight: 600;
`;
export const DetailListContent = styled.div`
  width: 100%;
  max-width: 340px;
  padding: 10px 0px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const DetailListTime = styled.span`
  color: rgb(150, 150, 150);
`;
export const DetailListStatus = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const DetailListLike = styled.button``;
export const DetailListMark = styled.button``;
