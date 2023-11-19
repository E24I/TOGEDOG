import React from "react";
import {
  AlarmButton,
  ChatButton,
  LogoutButton,
  ModalBackGround,
  ModalContainer,
  ModalMenu,
  ModalMenus,
  ModeButton,
  MypageButton,
  SearchButton,
} from "./Modal.Style";

interface ModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ setOpen }) => {
  const modalInfo = [
    { menu: "마이페이지", icon: <MypageButton className="icon" /> },
    { menu: "로그아웃", icon: <LogoutButton className="icon" /> },
    { menu: "메시지", icon: <ChatButton className="icon" /> },
    { menu: "알림설정", icon: <AlarmButton className="icon" /> },
    { menu: "검색", icon: <SearchButton className="icon" /> },
    { menu: "모드전환", icon: <ModeButton className="icon" /> },
  ];

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <ModalContainer>
      <ModalBackGround onClick={closeModal} />
      <ModalMenus>
        {modalInfo.map((info, idx) => {
          return (
            <ModalMenu key={idx}>
              {info.menu}
              {info.icon}
            </ModalMenu>
          );
        })}
      </ModalMenus>
    </ModalContainer>
  );
};

export default Modal;
