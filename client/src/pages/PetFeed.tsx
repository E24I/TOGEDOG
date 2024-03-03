import React from "react";
import styled from "styled-components";
import FeedList from "../components/petFeed/FeedList";
import { feedListsType } from "../types/feedDataType";
import { ReactComponent as Pets } from "../assets/images/icons/Pets.svg";
import { useInfiniteGetFeeds } from "../hooks/FeedHook";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../atoms";
import { FeedContainer, Feeds } from "../components/petFeed/Feed.Style";

const PetFeed: React.FC = () => {
  const accesstoken = useRecoilValue(tokenAtom);
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteGetFeeds(accesstoken);
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
