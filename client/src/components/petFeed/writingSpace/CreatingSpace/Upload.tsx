/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable react-hooks/exhaustive-deps */
//피드 작성 - 첨부파일 업로드 컴포넌트
import React, { ChangeEvent, useEffect, useState } from "react";
import * as U from "./Upload.Style";

interface UploadSpaceType {
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

const UploadSpace: React.FC<UploadSpaceType> = ({ setAttachments }) => {
  const [imageFiles, setImageFiles] = useState<
    { type: string; url: string; file: File | null }[]
  >([]);
  const [videoFile, setVideoFile] = useState<{
    type: string;
    url: string;
    file: File | null;
  }>({
    type: "",
    url: "",
    file: null,
  });

  //브라우저에서 파일을 선택하면 일어나는 동작 - 영상과 이미지를 구분하여 각 속성을 상태로 저장
  const uploadFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    const imgLimitedSize = 10 * 1024 * 1024;
    const videoLimitedSize = 50 * 1024 * 1024;
    if (selectedFile) {
      const fileSize = selectedFile.size;
      const imageType = selectedFile.type.includes("image");
      const videoType = selectedFile.type.includes("video");

      console.log(selectedFile);
      if (imageType && fileSize < imgLimitedSize) {
        setImageFiles((prev) => [
          ...prev,
          {
            type: selectedFile.type,
            url: URL.createObjectURL(selectedFile),
            file: selectedFile,
          },
        ]);
      } else if (videoType && fileSize < videoLimitedSize) {
        setVideoFile({
          type: selectedFile.type,
          url: URL.createObjectURL(selectedFile),
          file: selectedFile,
        });
      } else {
        alert("지원하지 않는 형식이거나 첨부파일이 제한 크기보다 큽니다");
      }
    }
  };
  //첨부된 영상과 이미지 파일을 WritingSpace.tsx의 postInformation으로 전달
  useEffect(() => {
    const videoAndImages = [videoFile, ...imageFiles];
    setAttachments(videoAndImages);
  }, [videoFile, imageFiles]);
  //브라우저 상에서 첨부한 이미지 파일 제거
  const deleteImageFile = (idx?: number) => {
    if (idx !== undefined) {
      setImageFiles((prevFiles) => {
        const newFiles = [...prevFiles];
        newFiles.splice(idx, 1);
        return newFiles;
      });
    }
  };
  //브라우저 상에서 첨부한 영상 파일 제거
  const deleteVideoFile = () => {
    setVideoFile({ type: "", url: "", file: null });
  };

  return (
    <U.AttachmentSpaceWrap>
      <U.FilesCount>{videoFile ? 1 : 0}/1</U.FilesCount>
      <U.AttachmentSpaceContainer>
        {videoFile.url ? (
          <U.AttachmentWrap>
            <U.AttachedVideo controls src={videoFile.url}></U.AttachedVideo>
            <U.DeleteButton onClick={() => deleteVideoFile()} />
          </U.AttachmentWrap>
        ) : (
          <U.AttachingButton htmlFor="add_video">
            <U.AddVideoButton />
          </U.AttachingButton>
        )}
        <U.AttachingInput
          id="add_video"
          type="file"
          accept="video/*"
          onChange={uploadFiles}
        />
      </U.AttachmentSpaceContainer>
      <>
        <U.FilesCount>{imageFiles.length}/4</U.FilesCount>
        <U.AttachmentSpaceContainer>
          {imageFiles &&
            imageFiles.map(
              (file, idx) =>
                file.url && (
                  <U.AttachmentWrap key={idx}>
                    <U.AttachedImg src={file.url} alt={`${idx + 1}번째 사진`} />
                    <U.DeleteButton onClick={() => deleteImageFile(idx)} />
                  </U.AttachmentWrap>
                ),
            )}
          {imageFiles.length < 4 && (
            <>
              <U.AttachingButton htmlFor="add_image">
                <U.AddImageButton />
              </U.AttachingButton>
              <U.AttachingInput
                id="add_image"
                type="file"
                accept="image/*"
                onChange={uploadFiles}
              />
            </>
          )}
        </U.AttachmentSpaceContainer>
      </>
    </U.AttachmentSpaceWrap>
  );
};

export default UploadSpace;
