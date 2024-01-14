import styled from "styled-components";

type DropdownPosition = {
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
};

export const DropDownContainer = styled.div<DropdownPosition>`
  background-color: white;
  border: 1px solid rgb(215, 215, 215);
  border-radius: 12px;
  overflow: hidden;
  position: absolute;
  z-index: 30;
  top: 5px;
  left: 35px;
  min-width: 90px;
  display: flex;
  flex-direction: column;
`;

export const Menu = styled.button`
  border-top: 1px solid rgb(215, 215, 215);
  padding: 10px 15px;
  white-space: nowrap;
  &:hover {
    background-color: rgb(215, 215, 215);
  }
`;
