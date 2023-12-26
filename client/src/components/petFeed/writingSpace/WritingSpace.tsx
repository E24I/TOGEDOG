import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as W from "./WritingSpaces.Style";
import CreatingSpace from "./CreatingSpace/CreatingSpace";
import UpdatingSpace from "./updatingSpace/UpdatingSpace";
import { getPresignedUrl, uploadToS3 } from "../../../services/feedService";
import { postInformationType } from "../../../types/feedDataType";
import Map from "./Map";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../../../atoms";
import { usePostFeed, useUpdateFeed } from "../../../hooks/FeedHook";
import { enrollMapType } from "../../../types/mapType";

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
  const [attachments, setAttachments] = useState<
    { type: string; url: string; file: File | null }[]
  >([]);
  const [enrollMapInfo, setEnrollMapInfo] = useState<enrollMapType>({
    feedId: 0,
    utm_k_x: "",
    utm_k_y: "",
  });
  const [updateInformation, setUpdateInformation] = useState<{
    title: string;
    content: string;
    openYn: boolean;
  }>({ title: "", content: "", openYn: isFeedPublic });
  const [feedId, setFeedId] = useState<number>(0);

  const token = useRecoilValue(tokenAtom);

  const navigator = useNavigate();

  const { mutate: postFeedMutate } = usePostFeed(
    postInformation,
    token,
    isMapAssign,
    enrollMapInfo,
  );
  const { mutate: updateFeedMutate } = useUpdateFeed(
    updateInformation,
    token,
    feedId,
  );

  //변경된 postInformation값을 할당해 줌ㄴ
  const handleInputChange = async (
    fieldName: string,
    value: string | boolean | string[],
  ) => {
    setPostInformation((prevPostInformation) => {
      return {
        ...prevPostInformation,
        [fieldName]: value,
      };
    });
  };
  //좌표값 저장
  const enrollCoordinate = (key: string, value: string | number) => {
    setEnrollMapInfo((prev) => {
      return { ...prev, [key]: value };
    });
  };
  //피드 공개 여부
  const feedToggleCheck = () => {
    setFeedPublic((prevIsFeedPublic) => {
      const updatedFeedPublic = !prevIsFeedPublic;
      handleInputChange("openYn", updatedFeedPublic);
      updateInformation.openYn = updatedFeedPublic;
      return updatedFeedPublic;
    });
  };
  //맵 연동 여부
  const mapToggleCheck = () => {
    setMapAssign((prevIsMapAssign) => {
      const updatedMapAssign = !prevIsMapAssign;
      handleInputChange("mapYn", updatedMapAssign);
      return updatedMapAssign;
    });
  };
  //피드 수정 정보 저장
  const handleUpdatedInfoChange = async (
    fieldName: string,
    value: string | boolean | string[],
  ) => {
    setUpdateInformation((prevUpdateInformation) => {
      return {
        ...prevUpdateInformation,
        [fieldName]: value,
      };
    });
  };
  //선택한 좌표 정보 초기화
  const deleteLocation = () => {
    if (isMarked === true) {
      setMark(false);
      enrollCoordinate("x", "");
      enrollCoordinate("y", "");
    }
  };
  //게시 버튼 눌렀을 때
  const send = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetElement = e.target as HTMLElement;

    if (targetElement.textContent) {
      const textContent = targetElement.textContent;

      if (textContent === "게시") {
        await s3presigned().then(() => postFeedMutate());
      } else if (textContent === "완료") {
        updateFeedMutate();
      }
    }
  };
  //s3 업로드
  const s3presigned = async (): Promise<void> => {
    const images: string[] = [];
    const video: string[] = [];
    const promises = attachments.map(async (file) => {
      if (file.url !== "") {
        const presignedUrl = await getPresignedUrl(file.url.substring(27));
        return await uploadToS3(presignedUrl, file.file, file.type).then(
          (res) => {
            if (res.config.url) {
              const fileUrl = res.config.url.substring(
                0,
                res.config.url.indexOf("?"),
              );
              if (file.type.includes("image")) {
                images.unshift(fileUrl);
              } else {
                video.unshift(fileUrl);
              }
            }
          },
        );
      }
    });
    await Promise.all(promises);
    postInformation.images = images;
    postInformation.videos = video[0];
    return Promise.resolve();
  };

  return (
    <W.CreateFeedContainer>
      <W.FeedTopContainer>
        <W.BackspaceButton onClick={() => navigator(-1)} />
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
        <UpdatingSpace
          handleUpdatedInfoChange={handleUpdatedInfoChange}
          setFeedId={setFeedId}
          setFeedPublic={setFeedPublic}
        />
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
        <W.Toggles>
          <W.ToggleWrap onClick={() => feedToggleCheck()}>
            피드 공개
            <W.ToggleContainer data={isFeedPublic.toString()}>
              <W.ToggleCircle data={isFeedPublic.toString()} />
            </W.ToggleContainer>
          </W.ToggleWrap>
          {page === "create" && (
            <W.ToggleWrap onClick={() => mapToggleCheck()}>
              지도 연동하기
              <W.ToggleContainer data={isMapAssign.toString()}>
                <W.ToggleCircle data={isMapAssign.toString()} />
              </W.ToggleContainer>
            </W.ToggleWrap>
          )}
        </W.Toggles>
      </W.FeedBottomContainer>
      {isMapAssign && (
        <Map enrollCoordinate={enrollCoordinate} setMark={setMark} />
      )}
    </W.CreateFeedContainer>
  );
};

export default WritingSpace;
