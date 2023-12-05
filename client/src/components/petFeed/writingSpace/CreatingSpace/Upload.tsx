/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useEffect, useState } from "react";
import * as U from "./Upload.Style";

interface UploadSpaceType {
  setAttachments: React.Dispatch<
    React.SetStateAction<
      {
        url: string;
        type: string;
      }[]
    >
  >;
}

const UploadSpace: React.FC<UploadSpaceType> = ({ setAttachments }) => {
  const [file, setFile] = useState<{
    url: string;
    image: boolean;
    video: boolean;
  }>({
    url: "",
    image: false,
    video: false,
  });
  const [imageFiles, setImageFiles] = useState<{ url: string; type: string }[]>(
    [],
  );
  const [videoFile, setVideoFile] = useState<{ url: string; type: string }>({
    url: "",
    type: "",
  });
  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    const imgLimitedSize = 10 * 1024 * 1024;
    const videoLimitedSize = 100 * 1024 * 1024;

    if (selectedFile) {
      const fileSize = selectedFile.size;

      const imageType = selectedFile.type.includes("image");
      const videoType = selectedFile.type.includes("video");
      console.log(selectedFile);

      if (imageType && fileSize < imgLimitedSize) {
        setFile({
          url: URL.createObjectURL(selectedFile),
          image: imageType,
          video: false,
        });
      } else if (videoType && fileSize < videoLimitedSize) {
        setFile({
          url: URL.createObjectURL(selectedFile),
          image: false,
          video: videoType,
        });
      } else {
        alert("첨부파일이 제한 크기보다 큽니다");
      }
    }
  };

  useEffect(() => {
    if (file.image) {
      setImageFiles((prev) => [...prev, { url: file.url, type: "file.type" }]);
    } else if (file.video) {
      setVideoFile({ url: file.url, type: "file.type" });
    }
  }, [file]);

  useEffect(() => {
    const videoAndImages = [videoFile, ...imageFiles];
    setAttachments(videoAndImages);
  }, [videoFile, imageFiles]);

  const deleteFile = (idx?: number) => {
    setVideoFile({ url: "", type: "" });
    if (idx !== undefined) {
      setImageFiles((prevFiles) => {
        const newFiles = [...prevFiles];
        newFiles.splice(idx, 1);
        return newFiles;
      });
    }
  };
  return (
    <>
      <U.AttachmentSpaceContainer>
        영상
        {videoFile.url ? (
          <U.AttachmentWrap>
            <U.AttachedVideo controls src={videoFile.url}></U.AttachedVideo>
            <U.DeleteButton onClick={() => deleteFile()} />
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
            imageFiles.map((file, idx) => (
              <U.AttachmentWrap key={idx}>
                <U.AttachedImg src={file.url} alt={`${idx + 1}번째 사진`} />
                <U.DeleteButton onClick={() => deleteFile(idx)} />
              </U.AttachmentWrap>
            ))}
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
