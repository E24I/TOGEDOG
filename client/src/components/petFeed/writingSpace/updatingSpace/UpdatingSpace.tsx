import React, { ChangeEvent, useState } from "react";
import * as U from "./UpdatingSpace.Style";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

interface UpdatingSpace {
  handleContentChange: (title: string, content: string) => void;
}

const modules = {
  toolbar: false,
};

const UpdatingSpace: React.FC<UpdatingSpace> = ({ handleContentChange }) => {
  const [quillValue, setQuillValue] = useState(
    "저히 몽자 오늘 애견카페가서 아주 신나게 놀다왔답니당 다들 저히 기여운 몽자 보고 가세요",
  );
  const [title, setTitle] = useState<string>("기존제목");
  const [isContentEdit, setContentEdit] = useState<boolean>(false);
  const [defaultTitleValue, setDefaultTitleValue] = useState<string>(""); //피드 디테일 데이터 받아서 저장
  const [defaultContentValue, setDefaultContentValue] = useState<string>(""); //피드 디테일 데이터 받아서 저장
  const [isTitleEdit, setTitleEdit] = useState<boolean>(false);

  const changeToEditTitle = () => {
    setTitleEdit(true);
  };
  const changeToEditContent = () => {
    setContentEdit(true);
  };
  const updateTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    handleContentChange(title, quillValue);
  };

  const setContent = (editor: string) => {
    setQuillValue(editor);
    handleContentChange(title, quillValue);
  };

  return (
    <U.UpdateSpace>
      <U.FeedOwner>
        <U.FeedOwnerImg />
        <U.IdAndAddress>
          <U.Id>세계 최강 귀요미 몽자</U.Id>
          <U.Address>멍멍 애견 카페</U.Address>
        </U.IdAndAddress>
      </U.FeedOwner>
      <U.FeedItems>
        <U.FeedTitle id="title" onClick={changeToEditTitle}>
          {!isTitleEdit ? (
            <U.DefaultTitle>등록 되었던 제목</U.DefaultTitle>
          ) : (
            <U.EditTitle
              defaultValue="등록 되었던 제목"
              onChange={(e) => updateTitle(e)}
            ></U.EditTitle>
          )}
        </U.FeedTitle>
        <U.FeedContent id="content" onClick={changeToEditContent}>
          {!isContentEdit ? (
            <U.DefaultContent>등록되었던 내용</U.DefaultContent>
          ) : (
            <ReactQuill
              placeholder="내용을 입력하세요"
              style={{ height: "90px", width: "100%" }}
              value={quillValue}
              modules={modules}
              onChange={(editor) => setContent(editor)}
            />
          )}
        </U.FeedContent>
        <U.FeedImages>
          <U.LeftButton />
          <U.Images>
            {/* 피드 이미지 매핑 구간 */}
            <U.Img />
            <U.Img />
            <U.Img />
          </U.Images>
          <U.RightButton />
        </U.FeedImages>
      </U.FeedItems>
    </U.UpdateSpace>
  );
};

export default UpdatingSpace;
