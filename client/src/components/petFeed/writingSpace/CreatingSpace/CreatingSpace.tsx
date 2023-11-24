/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  ChangeEvent,
  useState,
  useEffect,
  useRef,
  KeyboardEvent,
} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

import * as C from "./CreatingSpace.Style";

interface CreatingSpaceProps {
  handleInputChange: (
    fieldName: string,
    value:
      | string
      | boolean
      | { x: string; y: string }
      | { file: string; order: number }[],
  ) => void;
}

const modules = {
  toolbar: false,
};

const CreatingSpace: React.FC<CreatingSpaceProps> = ({ handleInputChange }) => {
  const [file, setFile] = useState({
    url: "",
    image: false,
    video: false,
  });
  const [files, setFiles] = useState<JSX.Element[]>([]);
  const [quillValue, setQuillValue] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const contentRef = useRef<any>();
  const [contentLength, setContentLength] = useState<number>(0);

  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];

    if (selectedFile) {
      const imageType = selectedFile.type.includes("image");
      const videoType = selectedFile.type.includes("video");

      setFile({
        url: URL.createObjectURL(selectedFile),
        image: imageType,
        video: videoType,
      });
    }
  };

  const enterToContent = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      contentRef.current.focus();
    }
  };

  useEffect(() => {
    if (file.image) {
      setFiles((prev) => [
        ...prev,
        <C.AttachedImg key={Date.now()} src={file.url} alt="" />,
      ]);
      // handleInputChange("image", file.url);
    } else if (file.video) {
      setFiles((prev) => [
        ...prev,
        <C.AttachedVideo
          key={Date.now()}
          src={file.url}
          controls
          width="350px"
        />,
      ]);
    }
    console.log("files", files);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const deleteImage = (idx: number) => {
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(idx, 1);
      return newFiles;
    });
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
      <C.AttachmentSpaceContainer>
        {files.map((file, idx) => {
          return (
            <C.AttachmentWrap key={idx}>
              {file}
              <C.DeleteButton onClick={() => deleteImage(idx)} />
            </C.AttachmentWrap>
          );
        })}
        {files.length < 5 && (
          <>
            <C.AttachingButton htmlFor="add_file">
              <C.AddButton />
            </C.AttachingButton>
            <C.AttachingInput
              id="add_file"
              type="file"
              onChange={uploadImage}
            />
          </>
        )}
      </C.AttachmentSpaceContainer>
      <C.FilesCount>{files.length}/6</C.FilesCount>
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
