import React from "react";
import { Menu, ToastContainer } from "./Toast.Style";

interface ToastProps {
  component: string;
}

const Toast: React.FC<ToastProps> = ({ component }) => {
  const menus = ["읽음 처리", "알림 끄기", "채팅방 신고"];

  if (component === "content") {
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
