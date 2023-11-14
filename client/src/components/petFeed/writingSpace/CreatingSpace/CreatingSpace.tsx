import React, { ChangeEvent, useState, useEffect, useRef } from "react";
import * as C from "./CreatingSpace.Style";

interface CreatingSpaceProps {
  handleInputChange: (fieldName: string, value: string | boolean) => void;
}

const CreatingSpace: React.FC<CreatingSpaceProps> = ({ handleInputChange }) => {
  const [file, setFile] = useState({
    url: "",
    image: false,
    video: false,
  });

  const [files, setFiles] = useState<JSX.Element[]>([]);
  const contentRef = useRef<any>();

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

  const enterToContent = (e: KeyboardEvent): void => {
    if (e.key === "Enter") {
      contentRef.current.focus();
    }
    console.log(contentRef);
  };

  useEffect(() => {
    if (file.image) {
      setFiles((prev) => [
        ...prev,
        <C.AttachedImg key={Date.now()} src={file.url} alt="" />,
      ]);
      handleInputChange("image", file.url);
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
  }, [file]);

  const deleteImage = (idx: number) => {
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(idx, 1);
      return newFiles;
    });
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
        onKeyDown={(e) => enterToContent}
      />
      <C.CreateContentWrap>
        <C.CreateContent placeholder="내용을 입력하세요" ref={contentRef} />
        <C.TextCount>글자수 / 200</C.TextCount>
      </C.CreateContentWrap>
    </C.CreateSpace>
  );
};

export default CreatingSpace;
