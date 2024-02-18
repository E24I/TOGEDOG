import { styled } from "styled-components";
import { ReactComponent as LogoGradient } from "../../assets/images/logos/LogoGradient.svg";
import { ReactComponent as LogoYellow } from "../../assets/images/logos/LogoV3.svg";
import { ReactComponent as Main } from "../../assets/images/icons/headerIcons/Main.svg";
import { ReactComponent as Map } from "../../assets/images/icons/headerIcons/Map.svg";
import { ReactComponent as CreateFeed } from "../../assets/images/icons/headerIcons/CreateFeed.svg";
import { ReactComponent as Notifications } from "../../assets/images/icons/headerIcons/Notifications.svg";
import { ReactComponent as NotificationsRedPoint } from "../../assets/images/icons/headerIcons/NotificationsRedpoint.svg";
import { ReactComponent as Profile } from "../../assets/images/icons/headerIcons/ProfileImage.svg";
import { ReactComponent as Dots } from "../../assets/images/icons/Dots.svg";
import { HeaderProps } from "../../types/headerType";

//assets style
export const LogoUnDark = styled(LogoGradient)`
  width: 10rem;
  height: auto;
`;
export const LogoDark = styled(LogoYellow)`
  width: 10rem;
  height: auto;
`;
export const MainButtonStyle = styled(Main)<{ isDark: boolean }>`
  width: 39px;
  height: 36px;
  path {
    fill: ${(props) => (props.isDark ? `#F8D259` : `#494949`)};
  }
`;
// export const MoreButton = styled.div<{ isDark: boolean }>`
//   border-radius: 50%;
//   width: 40px;
//   height: 40px;
//   background: ${(props) => (props.isDark ? `#F8D259` : `#494949`)};
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;
export const MapButtonStyle = styled(Map)<{ isDark: boolean }>`
  width: 39px;
  height: 39px;
  path {
    fill: ${(props) => (props.isDark ? `#F8D259` : `#494949`)};
  }
`;
export const CreateFeedButtonStyle = styled(CreateFeed)<{ isDark: boolean }>`
  width: 39px;
  height: 39px;
  path {
    fill: ${(props) => (props.isDark ? `#F8D259` : `#494949`)};
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

export const HeaderContainer = styled.div<HeaderProps>`
  position: sticky;
  top: 0;
  background-color: ${(props) => (props.isDark ? `#222222` : `white`)};
  z-index: 20;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 70px;
  padding: 0 20px;
  box-shadow: ${(props) =>
    props.scrolled
      ? `0 4px 8px ${props.isDark ? "white" : "rgba(0, 0, 0, 0.1)"}`
      : "none"};
  transition:
    box-shadow 0.2s ease,
    background-color 0.2s ease;
`;

export const HeaderBox = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 375px) {
    justify-content: space-between;
  }
`;

export const MiddleButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 33.3%;
  margin: 0 auto;
  @media (max-width: 375px) {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    background: white;
    border-top: 0.1px solid #f0ece2;
  }
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
  @media (max-width: 375px) {
  }
`;

export const MoreButton = styled.div<{ isDark: boolean }>`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background: ${(props) => (props.isDark ? `#F8D259` : `#494949`)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Dot = styled(Dots)<{ isDark: boolean }>`
  width: 60%;
  height: auto;
  path {
    fill: ${(props) => (props.isDark ? `black` : `white`)};
  }
`;
