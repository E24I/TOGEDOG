import React from "react";
import { Menu, DropDownContainer } from "./DropDown.Style";

interface DropDownProps {
  component: string;
}

const DropDown: React.FC<DropDownProps> = ({ component }) => {
  const menus = ["읽음 처리", "알림 끄기", "채팅방 신고"];

  if (component === "content") {
    menus[0] = "대화방 삭제";
  }

  return (
    <DropDownContainer>
      {menus.map((menu, idx) => {
        return <Menu key={idx}>{menu}</Menu>;
      })}
    </DropDownContainer>
  );
};
export default DropDown;
