import React, { ChangeEvent } from "react";
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
import { useNavigate } from "react-router-dom";

interface ModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ setModalOpen }) => {
  const modalInfo = [
    { menu: "마이페이지", icon: <MypageButton className="icon" /> },
    { menu: "로그아웃", icon: <LogoutButton className="icon" /> },
    { menu: "메시지", icon: <ChatButton className="icon" /> },
    { menu: "알림설정", icon: <AlarmButton className="icon" /> },
    { menu: "검색", icon: <SearchButton className="icon" /> },
    { menu: "모드전환", icon: <ModeButton className="icon" /> },
  ];

  const navigator = useNavigate();

  const closeModal = () => {
    setModalOpen(false);
  };

  const route = (index: number) => {
    switch (index) {
      case 0:
        navigator("/mypage");
        break;
      case 1:
        navigator("/");
        break;
      case 2:
        navigator("/chat");
        break;
      case 3:
        navigator("/set/alarm");
        break;
      case 4:
        navigator("/search");
        break;
      case 5:
        "";
    }
    setModalOpen(false);
  };

  return (
    <ModalContainer>
      <ModalBackGround onClick={closeModal} />
      <ModalMenus>
        {modalInfo.map((info, idx) => {
          return (
            <ModalMenu key={idx} onClick={() => route(idx)}>
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
