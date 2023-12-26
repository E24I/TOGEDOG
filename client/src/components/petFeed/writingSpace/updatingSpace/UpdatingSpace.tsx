/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useEffect, useState } from "react";
import * as U from "./UpdatingSpace.Style";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useGetFeed } from "../../../../hooks/FeedHook";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../../../../atoms";
import { feedDetailType } from "../../../../types/feedDataType";
import { Alert } from "../CreatingSpace/CreatingSpace.Style";

interface UpdatingSpace {
  handleUpdatedInfoChange: (
    fieldName: string,
    value: string | boolean | string[],
  ) => void;
  setFeedId: React.Dispatch<React.SetStateAction<number>>;
  setFeedPublic: React.Dispatch<React.SetStateAction<boolean>>;
}

//react-query modules - toolbar제거
const modules = {
  toolbar: false,
};

const UpdatingSpace: React.FC<UpdatingSpace> = ({
  handleUpdatedInfoChange,
  setFeedId,
  setFeedPublic,
}) => {
  const token = useRecoilValue(tokenAtom);
  const { feedId } = useParams();
  const { data, error, isLoading } = useGetFeed(Number(feedId), token);
  const feedData: feedDetailType = data;

  const [isContentEdit, setContentEdit] = useState<boolean>(false);
  const [isTitleEdit, setTitleEdit] = useState<boolean>(false);
  const [quillValue, setQuillValue] = useState<feedDetailType["content"]>("");
  const [alert, setAlert] = useState<string>("");

  //피드 수정 시 마운트 되자 마자 초기값(제목, 내용)설정과 feedId를 WritingSpace.tsx로 전달
  useEffect(() => {
    if (!isLoading && !error && feedData) {
      handleUpdatedInfoChange("title", feedData.title);
      handleUpdatedInfoChange("content", feedData.content);
      handleUpdatedInfoChange("openYn", true);
      setFeedPublic(true);
      setQuillValue(feedData.content);
      setFeedId(feedData.feedId);
    }
  }, [isLoading, error, feedData]);
  //제목 편집 ui로 변경
  const changeToEditTitle = () => {
    setTitleEdit(true);
  };
  //본문 편집 ui로 변경
  const changeToEditContent = () => {
    setContentEdit(true);
  };
  //수정한 제목을 WritingSpace.tsx로 전달
  const updateTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = e.target.value.trim();
    const words = trimmedValue.split(/\s+/);
    if (words.length < 2) {
      setAlert("제목은 두 단어 이상으로 작성해야 합니다.");
    } else {
      setAlert("");
      handleUpdatedInfoChange("title", e.target.value);
    }
  };
  //수정한 본문을 WritingSpace로 전달
  const setContent = (editor: string) => {
    setQuillValue(editor);
    handleUpdatedInfoChange("content", editor);
  };

  return (
    <U.UpdateSpace>
      {isLoading ? (
        <>Loading Data...</>
      ) : error ? (
        <>Error</>
      ) : (
        <>
          <U.FeedOwner>
            <U.FeedOwnerImg />
            <U.IdAndAddress>
              <U.Id>{feedData.member.nickname}</U.Id>
              <U.Address>위치정보</U.Address>
            </U.IdAndAddress>
          </U.FeedOwner>
          <U.FeedItems>
            <U.FeedTitle id="title" onClick={changeToEditTitle}>
              {!isTitleEdit ? (
                <U.DefaultTitle>{feedData.title}</U.DefaultTitle>
              ) : (
                <>
                  <U.EditTitle
                    defaultValue={feedData.title}
                    onChange={(e) => updateTitle(e)}
                  />
                  {alert && <Alert>{alert}</Alert>}
                </>
              )}
            </U.FeedTitle>
            <U.FeedContent id="content" onClick={changeToEditContent}>
              {!isContentEdit ? (
                <U.DefaultContent>
                  <ReactQuill value={quillValue} modules={modules} />
                </U.DefaultContent>
              ) : (
                <ReactQuill
                  style={{ height: "90px", width: "100%" }}
                  value={quillValue}
                  modules={modules}
                  onChange={(editor) => setContent(editor)}
                />
              )}
            </U.FeedContent>
            <U.FeedFilesContainer>
              <U.LeftButton />
              <U.FeedFiles>
                {feedData.videos && (
                  <U.Videos controls>
                    <source src={feedData.videos} />
                    <track />
                  </U.Videos>
                )}
                {feedData.images &&
                  feedData.images.map((image, idx) => {
                    return <U.Img key={idx} src={image} />;
                  })}
              </U.FeedFiles>
              <U.RightButton />
            </U.FeedFilesContainer>
          </U.FeedItems>
        </>
      )}
    </U.UpdateSpace>
  );
};

export default UpdatingSpace;
