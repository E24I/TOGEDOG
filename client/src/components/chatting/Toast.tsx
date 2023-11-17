import React from "react";
import { Menu, ToastContainer } from "./Toast.Style";

interface ToastProps {
  page: string;
}

const Toast: React.FC<ToastProps> = ({ page }) => {
  const menus = ["읽음 처리", "알림 끄기", "채팅방 신고"];

  if (page === "content") {
    menus[0] = "대화방 삭제";
  }

  return (
    <ToastContainer>
      {menus.map((menu, idx) => {
        return <Menu key={idx}>{menu}</Menu>;
      })}
    </ToastContainer>
  );
};
export default Toast;
