import React from "react";
import { useExitRoom } from "../../hooks/ChatHooks";
import { useRecoilState } from "recoil";
import { reportAtom } from "../../atoms";
import { DropDownContainer, DropDownMenu } from "./DropDown.Style";

interface DropDownProps {
  roomId?: number;
}

const DropDown: React.FC<DropDownProps> = ({ roomId }) => {
  const menus = ["채팅방 나가기", "채팅방 신고"];
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
    <DropDownContainer>
      {menus.map((menu, idx) => {
        return (
          <DropDownMenu
            key={idx}
            onMouseDown={() => onClickController(menu, roomId)}
          >
            {menu}
          </DropDownMenu>
        );
      })}
    </DropDownContainer>
  );
};

export default DropDown;
