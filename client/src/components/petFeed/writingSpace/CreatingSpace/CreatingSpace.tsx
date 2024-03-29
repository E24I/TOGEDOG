/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
//피드 작성 컴포넌트
import React, {
  ChangeEvent,
  useState,
  useRef,
  KeyboardEvent,
  useEffect,
} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import * as C from "./CreatingSpace.Style";
import UserName from "../../../chatting/UserName";
import { useRecoilValue } from "recoil";
import { memberIdAtom } from "../../../../atoms";
import UserImage from "../../../chatting/UserImage";

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
  contentLength: number;
  setContentLength: React.Dispatch<React.SetStateAction<number>>;
}

//react-query modules - toolbar제거
const modules = {
  toolbar: false,
};

const CreatingSpace: React.FC<CreatingSpaceProps> = ({
  handleInputChange,
  contentLength,
  setContentLength,
}) => {
  const [quillValue, setQuillValue] = useState("");
  const quillRef = useRef<any>();
  const [alert, setAlert] = useState<string>("");
  const myMemberId = useRecoilValue(memberIdAtom);

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();

      quill.root.addEventListener("mousedown", () => {
        quillRef.current.focus();
      });
    }
  }, []);

  //제목 입력칸에서 엔터 누르면 내용 입력칸으로 넘어가게 만든 함수
  const enterToContent = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      quillRef.current.focus();
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
    const p = "</p>";
    //본문 글자 수
    const textLength = editor
      .replace(/<br>/g, "")
      .replace(/<p>/g, "")
      .replace(new RegExp(p, "g"), "").length;
    if (textLength <= 200) {
      handleInputChange("content", editor);
      setQuillValue(editor);
    }
    setContentLength(textLength);
  };

  return (
    <C.CreateSpace>
      <C.ProfileWrap>
        <UserImage id={myMemberId} page="create" />
        <UserName id={myMemberId} page="create" />
      </C.ProfileWrap>
      <C.CreateTitleWrap>
        <C.Title>제목</C.Title>
        <C.CreateTitle
          placeholder="제목을 입력하세요"
          onKeyDown={(e) => enterToContent(e)}
          onChange={(e) => sendTitle(e)}
        />
        {alert && <C.Alert>{alert}</C.Alert>}
      </C.CreateTitleWrap>
      <C.CreateContentWrap className="custom-quill-container">
        <C.Content length={contentLength}>
          내용 (<span>{contentLength}</span>/200)
        </C.Content>
        <ReactQuill
          placeholder="내용을 입력하세요"
          ref={quillRef}
          value={quillValue}
          modules={modules}
          onChange={(editor) => sendContent(editor)}
        />
      </C.CreateContentWrap>
    </C.CreateSpace>
  );
};

export default CreatingSpace;
