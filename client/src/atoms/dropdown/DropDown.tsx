import React from "react";
import { Menu, DropDownContainer } from "./DropDown.Style";
import { useExitRoom } from "../../hooks/ChatHooks";
import { useRecoilState } from "recoil";
import { reportAtom } from "../../atoms";

interface DropDownProps {
  component?: string;
  roomId?: number;
}

const DropDown: React.FC<DropDownProps> = ({ component, roomId }) => {
  const menus = ["채팅방 나가기", "알림 끄기", "채팅방 신고"];
  const { mutate: exitRoom } = useExitRoom(roomId);
  const [reportModal, setReportModal] = useRecoilState(reportAtom);

  const onClickController = (menu: string, chatRoomId: number | undefined) => {
    if (menu === "채팅방 나가기") {
      exitRoom();
    } else if (menu === "채팅방 신고") {
      setReportModal({ ...reportModal, sort: "chat", chatRoomId: chatRoomId });
    }
  };

  return (
    <DropDownContainer data={component}>
      {menus.map((menu, idx) => {
        return (
          <Menu key={idx} onMouseDown={() => onClickController(menu, roomId)}>
            {menu}
          </Menu>
        );
      })}
    </DropDownContainer>
  );
};

export default DropDown;
