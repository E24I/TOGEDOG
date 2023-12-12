/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable react-hooks/exhaustive-deps */
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
  const [file, setFile] = useState<{
    url: string;
    image: string;
    video: string;
    type: string;
    selectedFile: File | null;
  }>({
    url: "",
    image: "",
    video: "",
    type: "",
    selectedFile: null,
  });
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

  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    const imgLimitedSize = 10 * 1024 * 1024;
    const videoLimitedSize = 100 * 1024 * 1024;
    if (selectedFile) {
      const fileSize = selectedFile.size;

      const imageType = selectedFile.type.includes("image");
      const videoType = selectedFile.type.includes("video");

      if (imageType && fileSize < imgLimitedSize) {
        setFile({
          type: selectedFile.type,
          url: URL.createObjectURL(selectedFile),
          image: selectedFile.type,
          video: "",
          selectedFile: selectedFile,
        });
      } else if (videoType && fileSize < videoLimitedSize) {
        setFile({
          type: selectedFile.type,
          url: URL.createObjectURL(selectedFile),
          image: "",
          video: selectedFile.type,
          selectedFile: selectedFile,
        });
      } else {
        alert("첨부파일이 제한 크기보다 큽니다");
      }
    }
  };
  useEffect(() => {
    if (file.image) {
      setImageFiles((prev) => [
        ...prev,
        { type: file.type, url: file.url, file: file.selectedFile },
      ]);
    } else if (file.video) {
      setVideoFile({ type: file.type, url: file.url, file: file.selectedFile });
    }
  }, [file]);
  useEffect(() => {
    const videoAndImages = [videoFile, ...imageFiles];
    setAttachments(videoAndImages);
  }, [videoFile, imageFiles]);
  const deleteImageFile = (idx?: number) => {
    if (idx !== undefined) {
      setImageFiles((prevFiles) => {
        const newFiles = [...prevFiles];
        newFiles.splice(idx, 1);
        return newFiles;
      });
    }
  };
  const deleteVideoFile = () => {
    setVideoFile({ type: "", url: "", file: null });
  };

  return (
    <>
      <U.AttachmentSpaceContainer>
        영상
        {videoFile.url ? (
          <U.AttachmentWrap>
            <U.AttachedVideo controls src={videoFile.url}></U.AttachedVideo>
            <U.DeleteButton onClick={() => deleteVideoFile()} />
          </U.AttachmentWrap>
        ) : (
          <U.AttachingButton htmlFor="add_video">
            <U.AddButton />
          </U.AttachingButton>
        )}
        <U.AttachingInput
          id="add_video"
          type="file"
          accept="video/*"
          onChange={uploadImage}
        />
      </U.AttachmentSpaceContainer>
      <U.FilesCount>{videoFile ? 1 : 0}/1</U.FilesCount>
      <>
        <U.AttachmentSpaceContainer>
          이미지
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
                <U.AddButton />
              </U.AttachingButton>
              <U.AttachingInput
                id="add_image"
                type="file"
                accept="image/*"
                onChange={uploadImage}
              />
            </>
          )}
        </U.AttachmentSpaceContainer>
        <U.FilesCount>{imageFiles.length}/4</U.FilesCount>
      </>
    </>
  );
};

export default UploadSpace;
