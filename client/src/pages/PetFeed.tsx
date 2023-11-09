import React, { useState } from "react";
import FeedList from "../components/petFeed/FeedList";
import { feedList } from "../types/feedDataType";
import { feedLists } from "../components/petFeed/FeedDummy";
import { ReactComponent as Pets } from "../assets/images/icons/Pets.svg";

const PetFeed: React.FC = () => {
  const [isFeed, setFeed] = useState<feedList[]>(feedLists);

  return (
    <div>
      <ul>
        {isFeed.map((items) => (
          <FeedList key={items.feedId} items={items} />
        ))}
      </ul>
      <div>
        <Pets />
        <Pets />
        <Pets />
      </div>
    </div>
  );
};

export default PetFeed;
