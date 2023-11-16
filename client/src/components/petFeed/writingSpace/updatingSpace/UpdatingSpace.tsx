import React, { useState } from "react";
import * as U from "./UpdatingSpace.Style";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

interface UpdatingSpace {
  handleContentChange: (content: string) => void;
}

const modules = {
  toolbar: false,
};

const UpdatingSpace: React.FC<UpdatingSpace> = ({ handleContentChange }) => {
  const [quillValue, setQuillValue] = useState(
    "저히 몽자 오늘 애견카페가서 아주 신나게 놀다왔답니당 다들 저히 기여운 몽자 보고 가세요",
  );
  const [isEdit, setEdit] = useState<boolean>(false);

  const setContent = (editor: string) => {
    setQuillValue(editor);
    handleContentChange(quillValue);
  };

  const changeToEdit = () => {
    setEdit(true);
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
        <U.FeedTitle>애카 가서 신난 몽자</U.FeedTitle>
        <U.FeedContent onClick={changeToEdit}>
          {!isEdit ? (
            <U.DefaultContent>
              저히 몽자 오늘 애견카페가서 아주 신나게 놀다왔답니당 다들 저히
              기여운 몽자 보고 가세요
            </U.DefaultContent>
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
