import React, { useState } from "react";
import {
  MiddleButtonContainer,
  HeaderContainer,
  NotificationsContainer,
  Logo,
  MainButtonStyle,
  MapButtonStyle,
  CreateFeedButtonStyle,
  RedPointStyle,
  NotificationsStyle,
  ProfileStyle,
} from "./Header.Style";

import { Link } from "react-router-dom";
import Modal from "../modal/Modal";
import Alarm from "../alarm/Alarm";
import { useRecoilValue } from "recoil";
import { isLoginAtom } from "../../atoms";
const Header: React.FC = () => {
  const loginState = useRecoilValue(isLoginAtom);
  const [isRead, setRead] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const openModal = () => {
    if (isModalOpen !== false) {
      setModalOpen(false);
    } else {
      setRead(false);
      setModalOpen(true);
    }
  };

  const convertToRead = () => {
    if (isRead !== true) {
      setModalOpen(false);
      setRead(true);
    } else {
      setRead(false);
    }
  };

  return (
    <HeaderContainer>
      <Link to={loginState ? "/feeds" : "/"}>
        <Logo />
      </Link>

      <MiddleButtonContainer>
        <Link to="/feeds">
          <MainButtonStyle />
        </Link>
        <Link to="/petmap">
          <MapButtonStyle />
        </Link>
        <Link to="/create">
          <CreateFeedButtonStyle />
        </Link>

        <NotificationsContainer onClick={convertToRead}>
          {isRead === false ? <RedPointStyle /> : <NotificationsStyle />}
        </NotificationsContainer>
      </MiddleButtonContainer>
      <ProfileStyle onClick={openModal} />
      {isModalOpen && <Modal setModalOpen={setModalOpen} />}
      {isRead && <Alarm setRead={setRead} />}
    </HeaderContainer>
  );
};

export default Header;
