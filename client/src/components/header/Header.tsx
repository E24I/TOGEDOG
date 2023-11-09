import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Home } from "../../assets/images/icons/headerIcons/Home.svg";
import { ReactComponent as Main } from "../../assets/images/icons/headerIcons/Main.svg";
import { ReactComponent as Map } from "../../assets/images/icons/headerIcons/Map.svg";
import { ReactComponent as CreateFeed } from "../../assets/images/icons/headerIcons/CreateFeed.svg";
import { ReactComponent as Notifications } from "../../assets/images/icons/headerIcons/Notifications.svg";
import { ReactComponent as NotificationsRedPoint } from "../../assets/images/icons/headerIcons/NotificationsRedpoint.svg";
import { ReactComponent as Profile } from "../../assets/images/icons/headerIcons/Profile.svg";
import {
  MiddleButtonContainer,
  HeaderContainer,
  NotificationsContainer,
} from "./Header.Style";
import styled from "styled-components";

const Header: React.FC = () => {
  const [isRead, setRead] = useState<boolean>(false);

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
        <Link to="/">
          <MainButtonStyle />
        </Link>
        <Link to="/">
          <MapButtonStyle />
        </Link>
        <Link to="/create">
          <CreateFeedButtonStyle />
        </Link>

        <NotificationsContainer onClick={convertToRead}>
          {isRead === false ? <RedPointStyle /> : <NotificationsStyle />}
        </NotificationsContainer>
      </MiddleButtonContainer>
      <ProfileStyle />
    </HeaderContainer>
  );
};

//assets style
export const Logo = styled(Home)``;
export const MainButtonStyle = styled(Main)``;
export const MapButtonStyle = styled(Map)``;
export const CreateFeedButtonStyle = styled(CreateFeed)``;
export const NotificationsStyle = styled(Notifications)``;
export const RedPointStyle = styled(NotificationsRedPoint)``;
export const ProfileStyle = styled(Profile)`
  padding: 15px;
  background-color: #d7d7d7;
  border-radius: 100px;
`;

export default Header;
