import React from "react";
import { MarkFalse, MarkTrue } from "./Bookmark.style";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { alertAtom, isLoginAtom } from "../../atoms";

interface OwnProps {
  width: string;
  height: string;
  isBookmark: boolean;
  handleFunc: () => void;
}

const Bookmark: React.FC<OwnProps> = ({
  width,
  height,
  isBookmark,
  handleFunc,
}) => {
  const isLogin = useRecoilValue(isLoginAtom);
  const setAlertModal = useSetRecoilState(alertAtom);
  const handleBookmark = () => {
    if (!isLogin) {
      return setAlertModal("로그인 후 이용해주세요.");
    }
    handleFunc();
  };

  return (
    <>
      {isBookmark ? (
        <MarkTrue width={width} height={height} onClick={handleBookmark} />
      ) : (
        <MarkFalse width={width} height={height} onClick={handleBookmark} />
      )}
    </>
  );
};
export default Bookmark;
