//헤더 스타일 컴포넌트

import { styled } from "styled-components";

import { ReactComponent as Home } from "../../assets/images/icons/headerIcons/Home.svg";
import { ReactComponent as Main } from "../../assets/images/icons/headerIcons/Main.svg";
import { ReactComponent as Map } from "../../assets/images/icons/headerIcons/Map.svg";
import { ReactComponent as CreateFeed } from "../../assets/images/icons/headerIcons/CreateFeed.svg";
import { ReactComponent as Notifications } from "../../assets/images/icons/headerIcons/Notifications.svg";
import { ReactComponent as NotificationsRedPoint } from "../../assets/images/icons/headerIcons/NotificationsRedpoint.svg";
import { ReactComponent as Profile } from "../../assets/images/icons/headerIcons/ProfileImage.svg";

//assets style
export const Logo = styled(Home)``;
export const MainButtonStyle = styled(Main)`
  width: 39px;
  height: 36px;
  path {
    fill: #f8d259;
  }
`;
export const MapButtonStyle = styled(Map)`
  width: 39px;
  height: 39px;
  path {
    fill: #f8d259;
  }
`;
export const CreateFeedButtonStyle = styled(CreateFeed)`
  width: 39px;
  height: 39px;
  path {
    fill: #f8d259;
  }
`;
export const NotificationsStyle = styled(Notifications)`
  width: 48px;
  path {
    fill: #f8d259;
  }
`;
export const RedPointStyle = styled(NotificationsRedPoint)`
  width: 48px;
  height: 58px;
  path {
    fill: #f8d259;
  }
`;
export const ProfileStyle = styled(Profile)`
  background-color: #d7d7d7;
  border-radius: 100px;
  width: 50px; //임시 사이징 입니다
  height: 50px; //임시 사이징 입니다
  cursor: pointer;
`;

//component style
export const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 30;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 70px; //추후 수정 부분
  border-bottom: 1px solid #d8d8d8; //구분을 위한 임시 코드 입니다
  padding: 0 20px; //임시 코드 입니다
  .icon {
    height: 100%;
  }
`;

export const HeaderBox = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const MiddleButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 33.3%;
  margin: 0 auto;
`;

export const NotificationsContainer = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;

export const MoveLogin = styled.button`
  color: white;
  border-radius: 1rem;
  width: 6rem;
  height: 1.8rem;
  background: #494949;
  float: right;
`;

export const UserProfile = styled.div`
  cursor: pointer;
`;
