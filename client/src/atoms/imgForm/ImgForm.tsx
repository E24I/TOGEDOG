import React from "react";
import {
  ProFileBox,
  ProFileImg,
  UserUnknown,
  PetUnknown,
  FeedUnknown,
} from "./ImgForm.style";
import { ImgFormProps } from "../atomsType";
import { useRecoilValue } from "recoil";
import { darkAtom } from "../../atoms";

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
  const isDark = useRecoilValue(darkAtom);
  return (
    <ProFileBox width={width} height={height} radius={radius} onClick={onClick}>
      {URL ? <ProFileImg src={URL} /> : <UserUnknown isDark={isDark} />}
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
