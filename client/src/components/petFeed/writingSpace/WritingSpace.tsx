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
import { enrollMap } from "../../../services/mapService";

interface WritingSpaceProps {
  page: string;
}

const WritingSpace: React.FC<WritingSpaceProps> = ({ page }) => {
  const [isFeedPublic, setFeedPublic] = useState<boolean>(false);
  const [isMapAssign, setMapAssign] = useState<boolean>(false);
  const [isMarked, setMark] = useState<boolean>(false);
  const [postInformation, setPostInformation] = useState<postInformationType>({
    title: "",
    images: [],
    videos: "",
    content: "",
    addMap: isMapAssign,
    openYn: isFeedPublic,
  });

  const [coordinate, setCoordinate] = useState<{ x: string; y: string }>({
    x: "",
    y: "",
  });

  const [attachments, setAttachments] = useState<
    { type: string; url: string; file: File | null }[]
  >([]);

  const [enrollMapInfo, setEnrollMapInfo] = useState<{
    feedId: number;
    utm_k_x: string;
    utm_k_y: string;
  }>({ feedId: 0, utm_k_x: "", utm_k_y: "" });

  const [updateInformation, setUpdateInformation] = useState<{
    title: string;
    content: string;
  }>({ title: "", content: "" });

  const navigator = useNavigate();

  const handleInputChange = (
    fieldName: string,
    value: string | boolean | string[],
  ) => {
    setPostInformation((prevPostInformation) => {
      if (fieldName === "images" && Array.isArray(value)) {
        return {
          ...prevPostInformation,
          [fieldName]: [...value],
        };
      } else if (fieldName === "videos" && typeof value === "string") {
        return { ...prevPostInformation, [fieldName]: value };
      } else {
        return {
          ...prevPostInformation,
          [fieldName]: value,
        };
      }
    });
  };

  const enrollCoordinate = (key: string, value: string) => {
    setCoordinate((prev) => {
      return { ...prev, [key]: value };
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

  console.log(attachments);

  const send = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetElement = e.target as HTMLElement;

    if (targetElement instanceof HTMLElement) {
      if (targetElement.textContent) {
        const textContent = targetElement.textContent;
        if (textContent === "게시") {
          const images: string[] = [];
          await Promise.all(
            attachments.map(async (file) => {
              if (file.url !== "") {
                const presignedUrl = await getPresinedUrl(
                  file.url.substring(27),
                );
                const response = await uploadToS3(
                  presignedUrl,
                  file.file,
                  file.type,
                );

                if (file.type.includes("image") && response.config.url) {
                  images.push(
                    response.config.url.substring(
                      0,
                      response.config.url.indexOf("?"),
                    ),
                  );
                } else if (response.config.url) {
                  handleInputChange(
                    "videos",
                    response.config.url.substring(
                      0,
                      response.config.url.indexOf("?"),
                    ),
                  );
                }
              }
            }),
          );

          handleInputChange("images", images);

          postFeed(postInformation)
            .then(
              (data) =>
                data &&
                setEnrollMapInfo({
                  feedId: Number(data.headers.location.substr(7)),
                  utm_k_x: coordinate.x,
                  utm_k_y: coordinate.y,
                }),
            )
            .then(() => enrollMap(enrollMapInfo))
            .then((data) => data && navigator(`feeds/${data.mapContentId}`));
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
      enrollCoordinate("x", "");
      enrollCoordinate("y", "");
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
        <Map enrollCoordinate={enrollCoordinate} setMark={setMark} />
      )}
    </W.CreateFeedContainer>
  );
};

export default WritingSpace;
