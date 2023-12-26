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
import SetAlarm from "../alarm/SetAlarm";

const Header: React.FC = () => {
  const [isRead, setRead] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isAlarmSetting, setAlarmSetting] = useState<boolean>(false);

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
      {isModalOpen && (
        <Modal setModalOpen={setModalOpen} setAlarmSetting={setAlarmSetting} />
      )}
      {isRead && <Alarm setRead={setRead} />}
      {isAlarmSetting && <SetAlarm setAlarmSetting={setAlarmSetting} />}
    </HeaderContainer>
  );
};

export default Header;
