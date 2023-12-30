import React, { useState } from "react";
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
import { isLoginAtom, tokenAtom, memberIdAtom } from "../../atoms";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAlarmSetting: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ setModalOpen, setAlarmSetting }) => {
  const LoginState = useRecoilValue(isLoginAtom);
  const modalInfo = [
    { menu: "마이페이지", icon: <MypageButton className="icon" /> },
    {
      menu: LoginState ? "로그아웃" : "로그인",
      icon: <LogoutButton className="icon" />,
    },
    { menu: "메시지", icon: <ChatButton className="icon" /> },
    { menu: "알림설정", icon: <AlarmButton className="icon" /> },
    { menu: "검색", icon: <SearchButton className="icon" /> },
    { menu: "모드전환", icon: <ModeButton className="icon" /> },
  ];
  const setLoginState = useSetRecoilState(isLoginAtom);
  const setToken = useSetRecoilState(tokenAtom);
  const setMemberId = useSetRecoilState(memberIdAtom);
  const loginState = useRecoilValue(isLoginAtom);
  const memberId = useRecoilValue(memberIdAtom);
  const Logout = () => {
    setLoginState(false);
    setToken("");
    setMemberId(0);
  };
  const navigator = useNavigate();

  const route = (index: number) => {
    switch (index) {
      case 0:
        if (loginState) {
          navigator(`/user/${memberId}`);
        } else {
          alert("로그인이 필요합니다.");
          navigator("/");
        }
        break;
      case 1:
        Logout();
        navigator("/");
        break;
      case 2:
        if (loginState) {
          navigator("/chat");
        } else {
          alert("로그인이 필요합니다.");
          navigator("/");
        }
        break;
      case 3:
        setAlarmSetting(true);
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
      <ModalBackGround onClick={() => setModalOpen(false)} />
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
