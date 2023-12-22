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

interface UpdatingSpace {
  handleUpdatedInfoChange: (title: string, content: string) => void;
  setFeedId: React.Dispatch<React.SetStateAction<number>>;
}

const modules = {
  toolbar: false,
};

const UpdatingSpace: React.FC<UpdatingSpace> = ({
  handleUpdatedInfoChange,
  setFeedId,
}) => {
  const token = useRecoilValue(tokenAtom);

  const { feedId } = useParams();

  const { data, error, isLoading } = useGetFeed(Number(feedId), token);

  const feedData: feedDetailType = data;

  const [title, setTitle] = useState<string>("기존제목");
  const [isContentEdit, setContentEdit] = useState<boolean>(false);
  const [isTitleEdit, setTitleEdit] = useState<boolean>(false);
  const [quillValue, setQuillValue] = useState<feedDetailType["content"]>("");

  useEffect(() => {
    if (!isLoading && !error && feedData) {
      setQuillValue(feedData.content);
      setFeedId(feedData.feedId);
    }
  }, [isLoading, error, feedData]);

  const changeToEditTitle = () => {
    setTitleEdit(true);
  };
  const changeToEditContent = () => {
    setContentEdit(true);
  };
  const updateTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    handleUpdatedInfoChange("title", title);
  };

  const setContent = (editor: string) => {
    setQuillValue(editor);
    handleUpdatedInfoChange("content", quillValue);
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
                <U.EditTitle
                  defaultValue={feedData.title}
                  onChange={(e) => updateTitle(e)}
                ></U.EditTitle>
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
              <U.FeedFiles>
                <U.LeftButton />
                <U.Videos controls>
                  <source src={feedData.videos} />
                  <track />
                </U.Videos>
                <U.Images>
                  {feedData.images.map((image, idx) => {
                    return <U.Img key={idx} src={image} />;
                  })}
                </U.Images>
                <U.RightButton />
              </U.FeedFiles>
            </U.FeedFilesContainer>
          </U.FeedItems>
        </>
      )}
    </U.UpdateSpace>
  );
};

export default UpdatingSpace;
