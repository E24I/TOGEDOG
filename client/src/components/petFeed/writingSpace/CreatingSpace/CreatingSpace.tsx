import React, { ChangeEvent, useState, useEffect } from "react";
import {
  CreateTitle,
  ProfileWrap,
  ProfileImg,
  AttachmentSpaceContainer,
  AttachedImg,
  AttachedVideo,
  AttachingButton,
  AttachingInput,
  AddButton,
  AttachmentWrap,
  DeleteButton,
  Username,
  FilesCount,
  CreateContent,
  CreateContentWrap,
  TextCount,
  CreateSpace,
} from "./CreatingSpace.Style";

const CreatingSpace: React.FC = () => {
  const [file, setFile] = useState({
    url: "",
    image: false,
    video: false,
  });
  const [files, setFiles] = useState<JSX.Element[]>([]);
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

  useEffect(() => {
    if (file.image) {
      setFiles((prev) => [
        ...prev,
        <AttachedImg key={Date.now()} src={file.url} alt="" />,
      ]);
    } else if (file.video) {
      setFiles((prev) => [
        ...prev,
        <AttachedVideo
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
    <CreateSpace>
      <ProfileWrap>
        <ProfileImg />
        <Username>세계 최강 귀요미 몽자</Username>
      </ProfileWrap>
      <AttachmentSpaceContainer>
        {files.map((file, idx) => {
          return (
            <AttachmentWrap key={idx}>
              {file}
              <DeleteButton onClick={() => deleteImage(idx)} />
            </AttachmentWrap>
          );
        })}
        {files.length < 5 && (
          <>
            <AttachingButton htmlFor="add_file">
              <AddButton />
            </AttachingButton>
            <AttachingInput id="add_file" type="file" onChange={uploadImage} />
          </>
        )}
      </AttachmentSpaceContainer>
      <FilesCount>{files.length}/6</FilesCount>
      <CreateTitle placeholder="제목을 입력하세요" />
      <CreateContentWrap>
        <CreateContent placeholder="내용을 입력하세요" />
        <TextCount>글자수 / 200</TextCount>
      </CreateContentWrap>
    </CreateSpace>
  );
};

export default CreatingSpace;
