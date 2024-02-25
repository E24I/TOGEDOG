import styled from "styled-components";

export const DropDownContainer = styled.div<{ data?: string }>`
  position: absolute;
  top: -50px;
  right: 10px;
  display: flex;
  flex-direction: column;
  width: 35%;
  height: 35%;
  border-radius: 10px;
  z-index: 10;
`;

export const Menu = styled.div`
  background-color: #494949;
  color: #ffffff;
  padding: 5% 0;

  &:nth-child(1) {
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }

  &:nth-child(3) {
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  &:hover {
    background-color: #fadf84;
    color: #494949;
    font-weight: 600;
  }

  transition: background-color 0.2s;
`;
