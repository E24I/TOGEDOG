import React, { useState } from "react";
import {
  SideList,
  SideListAddress,
  SideListCategory,
  SideListContents,
  SideListNum,
  SideListTitle,
} from "./PetMap.Style";
import FeedDetail from "../petFeed/FeedDetail";

interface OwnProps {
  el: any;
}

const MapFeedItem: React.FC<OwnProps> = ({ el }) => {
  const [isDetail, setDetail] = useState(false);
  const handleMoreReview = (): void => setDetail(!isDetail);

  return (
    <SideList onClick={() => setDetail(true)}>
      <SideListNum>{el}</SideListNum>
      <SideListContents>
        <SideListTitle>
          {22}
          <SideListCategory>{33}</SideListCategory>
        </SideListTitle>
        <SideListAddress>{44}</SideListAddress>
      </SideListContents>
      {isDetail && (
        <FeedDetail feedId={el} handleMoreReview={handleMoreReview} />
      )}
    </SideList>
  );
};

export default MapFeedItem;
