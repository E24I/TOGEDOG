import React, { ChangeEvent, useEffect, useState } from "react";
import * as U from "./Upload.Style";
import { deleteS3, uploadToS3 } from "../../../../services/feedService";

interface UploadSpaceType {
  type: string;
}

const UploadSpace: React.FC<UploadSpaceType> = ({ type }) => {
  const [file, setFile] = useState({
    url: "",
    image: false,
    video: false,
  });
  const [imageFiles, setImageFiles] = useState<string[]>([]);
  const [videoFile, setVideoFile] = useState<string>("");
  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];

    if (selectedFile) {
      const imageType = selectedFile.type.includes("image");
      const videoType = selectedFile.type.includes("video");

      if (imageType) {
        setFile({
          url: URL.createObjectURL(selectedFile),
          image: imageType,
          video: false,
        });
        uploadToS3("presinedUrl", `${file.url}/feed`, "image/*");
      } else if (videoType) {
        setFile({
          url: URL.createObjectURL(selectedFile),
          image: false,
          video: videoType,
        });
        uploadToS3("presinedUrl", `${file.url}/feed`, "video/*");
      }
    }
  };
  useEffect(() => {
    if (file.image) {
      setImageFiles((prev) => [...prev, file.url]);
      console.log(file.url);
    } else if (file.video) {
      setVideoFile(file.url);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const deleteFile = (idx?: number) => {
    setVideoFile("");
    if (idx !== undefined) {
      setImageFiles((prevFiles) => {
        const newFiles = [...prevFiles];
        newFiles.splice(idx, 1);
        return newFiles;
      });
    }
    deleteS3();
  };
  return (
    <>
      {type === "image" ? (
        <>
          <U.AttachmentSpaceContainer>
            이미지
            {imageFiles &&
              imageFiles.map((file, idx) => (
                <U.AttachmentWrap key={idx}>
                  <U.AttachedImg src={file} alt={`${idx + 1}번째 사진`} />
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
      ) : (
        <>
          <U.AttachmentSpaceContainer>
            영상
            {videoFile ? (
              <U.AttachmentWrap>
                <U.AttachedVideo controls src={videoFile}></U.AttachedVideo>
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
        </>
      )}
    </>
  );
};

export default UploadSpace;
