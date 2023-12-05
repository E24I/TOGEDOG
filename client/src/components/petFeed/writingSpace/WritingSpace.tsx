import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as W from "./WritingSpaces.Style";
import CreatingSpace from "./CreatingSpace/CreatingSpace";
import UpdatingSpace from "./updatingSpace/UpdatingSpace";
import {
  postFeed,
  updateFeed,
  getPresinedUrl,
  uploadToS3,
} from "../../../services/feedService";
import { postInformationType } from "../../../types/feedDataType";

import Map from "./Map";

interface WritingSpaceProps {
  page: string;
}

const WritingSpace: React.FC<WritingSpaceProps> = ({ page }) => {
  const [isFeedPublic, setFeedPublic] = useState<boolean>(false);
  const [isMapAssign, setMapAssign] = useState<boolean>(false);
  const [isMarked, setMark] = useState<boolean>(false);
  // const [location, setLocation] = useState<string>("");

  const [postInformation, setPostInformation] = useState<postInformationType>({
    title: "",
    content: "",
    images: [],
    video: "",
    openYn: isFeedPublic,
    mapYn: isMapAssign,
    address: { x: "", y: "" },
  });

  const [attachments, setAttachments] = useState<
    { url: string; type: string }[]
  >([]);

  const [updateInformation, setUpdateInformation] = useState<{
    title: string;
    content: string;
  }>({ title: "", content: "" });

  const navigator = useNavigate();

  const handleInputChange = (
    fieldName: string,
    value: string | boolean | { x: string; y: string } | string[],
  ) => {
    setPostInformation((prevPostInformation) => {
      if (fieldName === "images" && Array.isArray(value)) {
        return {
          ...prevPostInformation,
          [fieldName]: [...prevPostInformation[fieldName], ...value],
        };
      } else if (fieldName === "video" && typeof value === "string") {
        return { ...prevPostInformation, [fieldName]: value };
      } else {
        return {
          ...prevPostInformation,
          [fieldName]: value,
        };
      }
    });
  };

  const backToPrevPage = () => {
    navigator(-1);
  };

  const feedToggleCheck = () => {
    setFeedPublic((prevIsFeedPublic) => {
      const updatedFeedPublic = !prevIsFeedPublic;
      handleInputChange("openYn", updatedFeedPublic);
      return updatedFeedPublic;
    });
  };

  const mapToggleCheck = () => {
    setMapAssign((prevIsMapAssign) => {
      const updatedMapAssign = !prevIsMapAssign;
      handleInputChange("mapYn", updatedMapAssign);
      return updatedMapAssign;
    });
  };

  const send = (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetElement = e.target as HTMLElement;

    if (targetElement instanceof HTMLElement) {
      if (targetElement.textContent) {
        const textContent = targetElement.textContent;
        if (textContent === "게시") {
          const images: string[] = [];
          attachments.map(
            async (file, idx) =>
              await getPresinedUrl(file.url).then((data) =>
                idx !== 0
                  ? uploadToS3(data, file.url, file.type).then((url) => {
                      images.push(url);
                    })
                  : uploadToS3(data, file.url, file.type).then((url) => {
                      handleInputChange("video", url);
                    }),
              ),
          );
          handleInputChange("images", images);
          postFeed(postInformation);
        } else if (textContent === "완료") {
          updateFeed(updateInformation);
        }
      }
    }
  };

  const handleContentChange = (title: string, content: string) => {
    setUpdateInformation({ title: title, content: content });
  };

  const deleteLocation = () => {
    if (isMarked === true) {
      setMark(false);
      handleInputChange("address", { x: "", y: "" });
    }
  };

  console.log("p", postInformation);
  console.log(updateInformation);

  console.log("a", attachments);

  return (
    <W.CreateFeedContainer>
      <W.FeedTopContainer>
        <W.BackspaceButton onClick={backToPrevPage} />
        <W.PageName>
          {page === "create" ? "새 피드 올리기" : "피드 수정"}
        </W.PageName>
        <W.CreateButton onClick={send}>
          {page === "create" ? "게시" : "완료"}
        </W.CreateButton>
      </W.FeedTopContainer>
      {page === "create" ? (
        <CreatingSpace
          handleInputChange={handleInputChange}
          setAttachments={setAttachments}
        />
      ) : (
        <UpdatingSpace handleContentChange={handleContentChange} />
      )}
      <W.FeedBottomContainer>
        <W.AddressContainer>
          {isMarked === false ? (
            ""
          ) : (
            <>
              <W.CancelBtn onClick={deleteLocation} />
              <W.MarkResult>마킹장소</W.MarkResult>
            </>
          )}
        </W.AddressContainer>
        {page === "create" && (
          <W.Toggles>
            <W.ToggleWrap onClick={() => feedToggleCheck()}>
              피드 공개
              <W.ToggleContainer data={isFeedPublic.toString()}>
                <W.ToggleCircle data={isFeedPublic.toString()} />
              </W.ToggleContainer>
            </W.ToggleWrap>
            <W.ToggleWrap onClick={() => mapToggleCheck()}>
              지도 연동하기
              <W.ToggleContainer data={isMapAssign.toString()}>
                <W.ToggleCircle data={isMapAssign.toString()} />
              </W.ToggleContainer>
            </W.ToggleWrap>
          </W.Toggles>
        )}
      </W.FeedBottomContainer>
      {isMapAssign && (
        <Map handleInputChange={handleInputChange} setMark={setMark} />
      )}
    </W.CreateFeedContainer>
  );
};

export default WritingSpace;
