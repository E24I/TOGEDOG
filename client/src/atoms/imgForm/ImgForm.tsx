import React from "react";
import {
  ProFileBox,
  ProFileImg,
  UserUnknown,
  PetUnknown,
  FeedUnknown,
  ProfileUnknown,
} from "./ImgForm.style";
import { ImgFormProps } from "../atomsType";

//프롭스 받아야 하는것

//ProFileBox
//width (px 로 적용)
//height (px 로 적용)
//border-Radius (% 로 적용)

//ProFileImg
//이미지 URL (URL없으면 기본 이미지)
export const UserImgForm: React.FC<ImgFormProps> = ({
  width,
  height,
  radius,
  URL,
  onClick,
}) => {
  return (
    <ProFileBox width={width} height={height} radius={radius} onClick={onClick}>
      {URL ? <ProFileImg src={URL} /> : <UserUnknown />}
    </ProFileBox>
  );
};

export const PetImgForm: React.FC<ImgFormProps> = ({
  width,
  height,
  radius,
  URL,
}) => {
  return (
    <ProFileBox width={width} height={height} radius={radius}>
      {URL ? <ProFileImg src={URL} /> : <PetUnknown />}
    </ProFileBox>
  );
};

export const FeedImgForm: React.FC<ImgFormProps> = ({
  width,
  height,
  radius,
  URL,
}) => {
  return (
    <ProFileBox width={width} height={height} radius={radius}>
      {URL ? <ProFileImg src={URL} /> : <FeedUnknown />}
    </ProFileBox>
  );
};
