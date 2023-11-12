import React, { useState } from "react";
import {
  BackspaceButton,
  CreateFeedContainer,
  FeedTopContainer,
  CreateButton,
  PageName,
  FeedBottomContainer,
  AddressContainer,
  Toggles,
  ToggleWrap,
  ToggleContainer,
  ToggleCircle,
} from "./WritingSpaces.Style";
import CreatingSpace from "./CreatingSpace/CreatingSpace";
import UpdatingSpace from "./updatingSpace/UpdatingSpace";

interface WritingSpaceProps {
  page: string;
}

const WritingSpace: React.FC<WritingSpaceProps> = ({ page }) => {
  const [isFeedPublic, setFeedPublic] = useState<boolean>(true);
  const [isMapAssign, setMapAssign] = useState<boolean>(true);

  const feedToggleCheck = () => {
    if (isFeedPublic === false) {
      setFeedPublic(true);
    } else {
      setFeedPublic(false);
    }
  };

  const mapToggleCheck = () => {
    if (isMapAssign === false) {
      setMapAssign(true);
    } else {
      setMapAssign(false);
    }
  };
  return (
    <CreateFeedContainer>
      <FeedTopContainer>
        <BackspaceButton />
        <PageName>
          {page === "create" ? "새 피드 올리기" : "피드 수정"}
        </PageName>
        <CreateButton>{page === "create" ? "게시" : "완료"}</CreateButton>
      </FeedTopContainer>
      {page === "create" ? <CreatingSpace /> : <UpdatingSpace />}
      <FeedBottomContainer>
        <AddressContainer></AddressContainer>
        <Toggles>
          <ToggleWrap onClick={() => feedToggleCheck()}>
            피드 숨기기
            <ToggleContainer data={isFeedPublic}>
              <ToggleCircle data={isFeedPublic} />
            </ToggleContainer>
          </ToggleWrap>
          <ToggleWrap onClick={() => mapToggleCheck()}>
            마이 펫 지도에서 숨기기
            <ToggleContainer data={isMapAssign}>
              <ToggleCircle data={isMapAssign} />
            </ToggleContainer>
          </ToggleWrap>
        </Toggles>
      </FeedBottomContainer>
    </CreateFeedContainer>
  );
};

export default WritingSpace;
