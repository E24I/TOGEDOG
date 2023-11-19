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

const Header: React.FC = () => {
  const [isRead, setRead] = useState<boolean>(false);
  const [isOpen, setOpen] = useState<boolean>(false);
  const openModal = () => {
    if (isOpen !== false) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const convertToRead = () => {
    if (isRead !== true) {
      setRead(true);
    }
  };

  return (
    <HeaderContainer>
      <Link to="/">
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
      {isOpen && <Modal setOpen={setOpen} />}
    </HeaderContainer>
  );
};

export default Header;
