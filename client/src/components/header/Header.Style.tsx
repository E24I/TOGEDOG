//헤더 스타일 컴포넌트

import { styled } from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 80px; //추후 수정 부분
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d8d8d8; //구분을 위한 임시 코드 입니다
`;

export const MiddleButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 500px; // 추후 수정 부분
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
`;

export const NotificationsContainer = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;
