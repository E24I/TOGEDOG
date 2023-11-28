import styled from "styled-components";

type DropdownPosition = {
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
};

export const DropDownContainer = styled.div<DropdownPosition>`
  border: 2px solid black; // 채팅 토스트 구분선
  position: absolute;
  /* top: 0;
  left: 0; */
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
`;

export const Menu = styled.button`
  border: 2px solid green; // 구분선
  padding: 5px 10px;
`;
