import React from "react";
import styled from "styled-components";
import FeedList from "../components/petFeed/FeedList";
import { feedListsType } from "../types/feedDataType";
import { ReactComponent as Pets } from "../assets/images/icons/Pets.svg";
import { useInfiniteGetFeeds } from "../hooks/FeedHook";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

const PetFeed: React.FC = () => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteGetFeeds();
  const feedsData = data?.pages.flat();

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  if (isLoading) {
    return <>로딩중입니다.</>;
  }
  if (isError) {
    return <>페이지를 불러오는데 실패했습니다.</>;
  }
  return (
    <FeedContainer>
      {feedsData && feedsData.length > 0 && (
        <Feeds>
          {feedsData?.map((items: feedListsType) => (
            <FeedList key={items.feedId} items={items} />
          ))}
          <div ref={setTarget} />
        </Feeds>
      )}
    </FeedContainer>
  );
};

export default PetFeed;

export const Loadings = styled.img``;

export const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Feeds = styled.ul`
  width: 100%;
  max-width: 1170px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

export const LoadingContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

export const PetLeftFoot = styled(Pets)`
  width: 30px;
  height: 30px;
  margin-right: 15px;
`;

export const PetRightFoot = styled(Pets)`
  width: 30px;
  height: 30px;
  margin-left: 15px;
`;
