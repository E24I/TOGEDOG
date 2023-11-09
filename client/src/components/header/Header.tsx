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

const Header: React.FC = () => {

  const [isRead, setRead] = useState<boolean>(false);

  const convertToRead = () => {
    if (isRead !== true) {
      setRead(true);
    }
  };

  return (
    <HeaderContainer>
      <Logo />
      <MiddleButtonContainer>
        <MainButtonStyle />
        <MapButtonStyle />
        <CreateFeedButtonStyle />
        <NotificationsContainer onClick={convertToRead}>
          {isRead === false ? <RedPointStyle /> : <NotificationsStyle />}
        </NotificationsContainer>
      </MiddleButtonContainer>
      <ProfileStyle />
    </HeaderContainer>
  );
};

export default Header;
