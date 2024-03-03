import React from "react";
import { LikeFalse, LikeTrue } from "./Heart.style";
import { alertAtom, isLoginAtom } from "../../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface OwnProps {
  width: string;
  height: string;
  isLike: boolean;
  handleFunc: () => void;
}

const Heart: React.FC<OwnProps> = ({ width, height, isLike, handleFunc }) => {
  const isLogin = useRecoilValue(isLoginAtom);
  const setAlertModal = useSetRecoilState(alertAtom);
  const handleLike = () => {
    if (!isLogin) {
      return setAlertModal("로그인 후 이용해주세요.");
    }
    handleFunc();
  };

  return (
    <>
      {isLike ? (
        <LikeTrue width={width} height={height} onClick={handleLike} />
      ) : (
        <LikeFalse width={width} height={height} onClick={handleLike} />
      )}
    </>
  );
};
export default Heart;
