/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
//피드 작성 컴포넌트
import React, { ChangeEvent, useState, useRef, KeyboardEvent } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import * as C from "./CreatingSpace.Style";
import UploadSpace from "./Upload";

interface CreatingSpaceProps {
  handleInputChange: (
    fieldName: string,
    value: string | boolean | string[],
  ) => void;
  setAttachments: React.Dispatch<
    React.SetStateAction<
      {
        type: string;
        url: string;
        file: File | null;
      }[]
    >
  >;
}

//react-query modules - toolbar제거
const modules = {
  toolbar: false,
};

const CreatingSpace: React.FC<CreatingSpaceProps> = ({
  handleInputChange,
  setAttachments,
}) => {
  const [quillValue, setQuillValue] = useState("");
  const contentRef = useRef<any>();
  const [contentLength, sendContentLength] = useState<number>(0);
  const [alert, setAlert] = useState<string>("");

  //제목 입력칸에서 엔터 누르면 내용 입력칸으로 넘어가게 만든 함수
  const enterToContent = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      contentRef.current.focus();
    }
  };
  //입력한 제목을 검증하여 handleInputChange의 파라미터로 WritingSpace.ts의 postInformation에 전달
  const sendTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = e.target.value.trim();
    const words = trimmedValue.split(/\s+/);
    if (words.length < 2) {
      setAlert("제목은 두 단어 이상으로 작성해야 합니다.");
    } else {
      setAlert("");
      handleInputChange("title", e.target.value);
    }
  };
  //입력한 내용을 handleInputChange의 파라미터로 WritingSpace.ts의 postInformation에 전달
  const sendContent = (editor: string) => {
    handleInputChange("content", editor);
    setQuillValue(editor);
    const p = "</p>";
    //본문 글자 수
    sendContentLength(
      editor
        .replace(/<br>/g, "")
        .replace(/<p>/g, "")
        .replace(new RegExp(p, "g"), "").length,
    );
  };

  return (
    <C.CreateSpace>
      <C.ProfileWrap>
        <C.ProfileImg />
        <C.Username>세계 최강 귀요미 몽자</C.Username>
      </C.ProfileWrap>
      <UploadSpace setAttachments={setAttachments} />
      <C.CreateTitleWrap>
        <C.CreateTitle
          placeholder="제목을 입력하세요"
          onKeyDown={(e) => enterToContent(e)}
          onChange={(e) => sendTitle(e)}
        />
        {alert && <C.Alert>{alert}</C.Alert>}
      </C.CreateTitleWrap>
      <C.CreateContentWrap className="custom-quill-container">
        <ReactQuill
          placeholder="내용을 입력하세요"
          ref={contentRef}
          value={quillValue}
          modules={modules}
          onChange={(editor) => sendContent(editor)}
        />
        <C.TextCount>{contentLength} / 200</C.TextCount>
      </C.CreateContentWrap>
    </C.CreateSpace>
  );
};

export default CreatingSpace;
