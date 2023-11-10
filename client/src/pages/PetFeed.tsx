import React, { useState } from "react";
import FeedList from "../components/petFeed/FeedList";
import { feedList } from "../types/feedDataType";
import { feedLists } from "../components/petFeed/FeedDummy";
import { ReactComponent as Pets } from "../assets/images/icons/Pets.svg";
import styled from "styled-components";

const PetFeed: React.FC = () => {
  const [isFeed, setFeed] = useState<feedList[]>(feedLists);
  const [isDetail, setDetail] = useState<boolean>(false);

  const handleMoreReview = (): void => {
    setDetail(true);
  };

  return (
    <FeedContainer>
      <Feeds>
        {isFeed.map((items) => (
          <FeedList
            key={items.feedId}
            items={items}
            handleMoreReview={handleMoreReview}
          />
        ))}
      </Feeds>
      <LoadingContainer>
        <PetLeftFoot />
        <PetRightFoot />
        <PetLeftFoot />
      </LoadingContainer>
    </FeedContainer>
  );
};

export default PetFeed;

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
