import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as W from "./WritingSpaces.Style";
import CreatingSpace from "./CreatingSpace/CreatingSpace";
import UpdatingSpace from "./updatingSpace/UpdatingSpace";
import { postFeed } from "../../../services/feedService";
import { postInformationType } from "../../../types/feedDataType";

interface WritingSpaceProps {
  page: string;
}

const WritingSpace: React.FC<WritingSpaceProps> = ({ page }) => {
  const [isFeedPublic, setFeedPublic] = useState<boolean>(true);
  const [isMapAssign, setMapAssign] = useState<boolean>(true);

  const [postInformation, setPostInformation] = useState<postInformationType>({
    title: "",
    image: "",
    video: "",
    content: "",
    state: isFeedPublic,
    map: isMapAssign,
    address: "",
  });

  const navigator = useNavigate();

  const backToPrevPage = () => {
    navigator(-1);
  };

  const feedToggleCheck = () => {
    if (isFeedPublic === false) {
      setFeedPublic(true);
    } else {
      setFeedPublic(false);
    }
    handleInputChange("state", isFeedPublic);
  };

  const mapToggleCheck = () => {
    if (isMapAssign === false) {
      setMapAssign(true);
    } else {
      setMapAssign(false);
    }
    handleInputChange("map", isMapAssign);
  };

  const post = () => {
    postFeed(postInformation);
  };

  const handleInputChange = (fieldName: string, value: string | boolean) => {
    setPostInformation(() => ({
      ...postInformation,
      [fieldName]: value,
    }));
  };

  console.log(postInformation);

  return (
    <W.CreateFeedContainer>
      <W.FeedTopContainer>
        <W.BackspaceButton onClick={backToPrevPage} />
        <W.PageName>
          {page === "create" ? "새 피드 올리기" : "피드 수정"}
        </W.PageName>
        <W.CreateButton onClick={post}>
          {page === "create" ? "게시" : "완료"}
        </W.CreateButton>
      </W.FeedTopContainer>
      {page === "create" ? (
        <CreatingSpace handleInputChange={handleInputChange} />
      ) : (
        <UpdatingSpace />
      )}
      <W.FeedBottomContainer>
        <W.AddressContainer></W.AddressContainer>
        <W.Toggles>
          <W.ToggleWrap onClick={() => feedToggleCheck()}>
            피드 숨기기
            <W.ToggleContainer data={isFeedPublic}>
              <W.ToggleCircle data={isFeedPublic} />
            </W.ToggleContainer>
          </W.ToggleWrap>
          <W.ToggleWrap onClick={() => mapToggleCheck()}>
            마이 펫 지도에서 숨기기
            <W.ToggleContainer data={isMapAssign}>
              <W.ToggleCircle data={isMapAssign} />
            </W.ToggleContainer>
          </W.ToggleWrap>
        </W.Toggles>
      </W.FeedBottomContainer>
    </W.CreateFeedContainer>
  );
};

export default WritingSpace;