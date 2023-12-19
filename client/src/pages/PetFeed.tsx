import React from "react";
import styled from "styled-components";
import FeedList from "../components/petFeed/FeedList";
import { feedListsType } from "../types/feedDataType";
import { ReactComponent as Pets } from "../assets/images/icons/Pets.svg";
import { useGetFeeds } from "../hooks/FeedHook";

const PetFeed: React.FC = () => {
  const { data: feedsData, error, isLoading } = useGetFeeds();
  console.log(feedsData);

  return (
    <>
      {isLoading ? (
        <>로딩중</>
      ) : error ? (
        <>오류</>
      ) : (
        <FeedContainer>
          <Feeds>
            {feedsData.length > 0 &&
              feedsData.map((items: feedListsType) => (
                <FeedList key={items.feedId} items={items} />
              ))}
          </Feeds>
          <LoadingContainer>
            <PetLeftFoot />
            <PetRightFoot />
            <PetLeftFoot />
            {/* <Loadings src={loading} /> */}
          </LoadingContainer>
        </FeedContainer>
      )}
    </>
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
