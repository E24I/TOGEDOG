/* eslint-disable jsx-a11y/media-has-caption */
import React, { ChangeEvent, useState, useEffect } from "react";
import {
  BackspaceButton,
  CreateFeedContainer,
  FeedTopContainer,
  Title,
  CreateButton,
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
} from "./CreateFeed.Style";

type fileSet = {
  url: string;
  image: boolean;
  video: boolean;
};

const CreateFeed: React.FC = () => {
  const [file, setFile] = useState<fileSet>({
    url: "",
    image: false,
    video: false,
  });
  const [files, setFiles] = useState<JSX.Element[]>([]);

  const uploadImage = (e: ChangeEvent<HTMLInputElement>): void => {
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
    <CreateFeedContainer>
      <FeedTopContainer>
        <BackspaceButton />
        <Title>새 피드 올리기</Title>
        <CreateButton>게시</CreateButton>
      </FeedTopContainer>
      <ProfileWrap>
        <ProfileImg>profile image</ProfileImg>
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
    </CreateFeedContainer>
  );
};

export default CreateFeed;
