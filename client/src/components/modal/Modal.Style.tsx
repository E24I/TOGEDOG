import styled from "styled-components";

import { ReactComponent as Mypage } from "../../assets/images/icons/headerIcons/Mypage.svg";
import { ReactComponent as Logout } from "../../assets/images/icons/headerIcons/Logout.svg";
import { ReactComponent as Chat } from "../../assets/images/icons/headerIcons/Chat.svg";
import { ReactComponent as Alarm } from "../../assets/images/icons/headerIcons/Alarm.svg";
import { ReactComponent as Search } from "../../assets/images/icons/headerIcons/Search.svg";
import { ReactComponent as Mode } from "../../assets/images/icons/headerIcons/Mode.svg";

//assets
export const MypageButton = styled(Mypage)``;
export const LogoutButton = styled(Logout)``;
export const ChatButton = styled(Chat)``;
export const AlarmButton = styled(Alarm)``;
export const SearchButton = styled(Search)``;
export const ModeButton = styled(Mode)``;

//components
export const ModalContainer = styled.div`
  position: absolute;
  top: 80px; // 헤더의 높이만큼 지정
  left: 0;
  width: 100%;
  height: 100vh;
`;

export const ModalBackGround = styled.div`
  width: 100%;
  height: 100%;
  background-color: #2222225f;
`;

export const ModalMenus = styled.div`
  display: flex;
  flex-direction: column;
  width: 315px; // 임시사이즈
  height: 450px; //임시사이즈
  padding: 25px; // 임시 설정
  position: absolute;
  top: 20px;
  right: 20px;
  justify-content: space-between;
  border-radius: 20px;
  background-color: #ffffff;
`;

export const ModalMenu = styled.button`
  font-size: 20px;
  line-height: 19px;
  padding: 7px 0;
  text-align: right;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  & .icon {
    margin-left: 19px;
  }
`;
