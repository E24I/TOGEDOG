import React, { MouseEvent } from "react";
import { Menu, DropDownContainer } from "./DropDown.Style";
import { useExitRoom } from "../../hooks/ChatHooks";

interface DropDownProps {
  component: string;
  roomId?: number;
}

const DropDown: React.FC<DropDownProps> = ({ component, roomId }) => {
  const menus = ["채팅방 나가기", "알림 끄기", "채팅방 신고"];
  const { mutate: exitRoom } = useExitRoom(roomId);

  if (component === "content") {
    menus[0] = "대화방 삭제";
  }

  const onClickController = (menu: string) => {
    if (menu === "채팅방 나가기") {
      exitRoom();
    }
  };

  return (
    <DropDownContainer data={component}>
      {menus.map((menu, idx) => {
        return (
          <Menu key={idx} onMouseDown={() => onClickController(menu)}>
            {menu}
          </Menu>
        );
      })}
    </DropDownContainer>
  );
};

export default DropDown;
