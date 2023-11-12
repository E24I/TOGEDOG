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
  Count,
  PageName,
  Content,
  ContentWrap,
  ContentCount,
  FeedBottomContainer,
  AddressContainer,
  Toggles,
  ToggleWrap,
  ToggleContainer,
  ToggleCircle,
} from "./CreateFeed.Style";

const CreateFeed: React.FC = () => {
  const [file, setFile] = useState({
    url: "",
    image: false,
    video: false,
  });
  const [files, setFiles] = useState<JSX.Element[]>([]);
  const [isFeedPublic, setFeedPublic] = useState<boolean>(true);
  const [isMapAssign, setMapAssign] = useState<boolean>(true);

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

  const feedToggleCheck = () => {
    if (isFeedPublic === false) {
      setFeedPublic(true);
    } else {
      setFeedPublic(false);
    }
  };

  const mapToggleCheck = () => {
    if (isMapAssign === false) {
      setMapAssign(true);
    } else {
      setMapAssign(false);
    }
  };

  return (
    <CreateFeedContainer>
      <FeedTopContainer>
        <BackspaceButton />
        <PageName>새 피드 올리기</PageName>
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
      <Count>{files.length}/6</Count>
      <Title placeholder="제목을 입력하세요" />
      <ContentWrap>
        <Content placeholder="내용을 입력하세요" />
        <ContentCount>글자수 / 200</ContentCount>
      </ContentWrap>
      <FeedBottomContainer>
        <AddressContainer></AddressContainer>
        <Toggles>
          <ToggleWrap onClick={() => feedToggleCheck()}>
            피드 숨기기
            <ToggleContainer data={isFeedPublic}>
              <ToggleCircle data={isFeedPublic} />
            </ToggleContainer>
          </ToggleWrap>
          <ToggleWrap onClick={() => mapToggleCheck()}>
            마이 펫 지도에서 숨기기
            <ToggleContainer data={isMapAssign}>
              <ToggleCircle data={isMapAssign} />
            </ToggleContainer>
          </ToggleWrap>
        </Toggles>
      </FeedBottomContainer>
    </CreateFeedContainer>
  );
};

export default CreateFeed;
