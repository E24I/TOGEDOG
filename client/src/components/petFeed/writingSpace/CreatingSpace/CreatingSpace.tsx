/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useState, useRef, KeyboardEvent } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import * as C from "./CreatingSpace.Style";
import UploadSpace from "./Upload";

interface CreatingSpaceProps {
  handleInputChange: (
    fieldName: string,
    value: string | boolean | { x: string; y: string } | string[],
  ) => void;
}

const modules = {
  toolbar: false,
};

const CreatingSpace: React.FC<CreatingSpaceProps> = ({ handleInputChange }) => {
  const [quillValue, setQuillValue] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const contentRef = useRef<any>();
  const [contentLength, setContentLength] = useState<number>(0);

  const enterToContent = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      contentRef.current.focus();
    }
  };

  const setTitle = (e: ChangeEvent<HTMLInputElement>) => {
    handleInputChange("title", e.target.value);
  };

  const setContent = (editor: string) => {
    handleInputChange("content", editor);
    setQuillValue(editor);
    // setContentLength(editor.length);
    const p = "</p>";
    setContentLength(
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
      <UploadSpace type="video" />
      <UploadSpace type="image" />
      <C.CreateTitle
        placeholder="제목을 입력하세요"
        onKeyDown={(e) => enterToContent(e)}
        onChange={(e) => setTitle(e)}
      />
      <C.CreateContentWrap>
        <ReactQuill
          placeholder="내용을 입력하세요"
          style={{ height: "90px", width: "100%" }}
          ref={contentRef}
          value={quillValue}
          modules={modules}
          onChange={(editor) => setContent(editor)}
        />
        <C.TextCount>{contentLength} / 200</C.TextCount>
      </C.CreateContentWrap>
    </C.CreateSpace>
  );
};

export default CreatingSpace;
