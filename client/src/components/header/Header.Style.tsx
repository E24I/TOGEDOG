//헤더 스타일 컴포넌트

import { styled } from "styled-components";

import { ReactComponent as Home } from "../../assets/images/icons/headerIcons/Home.svg";
import { ReactComponent as Main } from "../../assets/images/icons/headerIcons/Main.svg";
import { ReactComponent as Map } from "../../assets/images/icons/headerIcons/Map.svg";
import { ReactComponent as CreateFeed } from "../../assets/images/icons/headerIcons/CreateFeed.svg";
import { ReactComponent as Notifications } from "../../assets/images/icons/headerIcons/Notifications.svg";
import { ReactComponent as NotificationsRedPoint } from "../../assets/images/icons/headerIcons/NotificationsRedpoint.svg";
import { ReactComponent as Profile } from "../../assets/images/icons/headerIcons/Profile.svg";

//assets style
export const Logo = styled(Home)``;
export const MainButtonStyle = styled(Main)``;
export const MapButtonStyle = styled(Map)``;
export const CreateFeedButtonStyle = styled(CreateFeed)``;
export const NotificationsStyle = styled(Notifications)``;
export const RedPointStyle = styled(NotificationsRedPoint)``;
export const ProfileStyle = styled(Profile)`
  background-color: #d7d7d7;
  border-radius: 100px;
  width: 60px; //임시 사이징 입니다
  height: 60px; //임시 사이징 입니다
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
  height: 80px; //추후 수정 부분
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d8d8d8; //구분을 위한 임시 코드 입니다
  padding: 0 20px; //임시 코드 입니다
`;

export const MiddleButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 500px; // 추후 수정 부분
  justify-content: space-between;
  align-items: center;
`;

export const NotificationsContainer = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;
