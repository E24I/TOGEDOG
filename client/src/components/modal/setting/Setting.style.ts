import styled from "styled-components";

export const SettingContainer = styled.div`
  background-color: rgba(34, 34, 34, 0.4);
  width: 100vw;
  height: calc(100% + 6px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -3px;
`;

export const SettingBtn = styled.button`
  background-color: rgb(255, 255, 255);
  border-bottom: 1px solid black;
  width: 447px;
  height: 108px;
  font-size: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:nth-child(1) {
    border-top-left-radius: 18px;
    border-top-right-radius: 18px;
  }
  &:nth-last-child(1) {
    border: none;
    border-end-start-radius: 18px;
    border-end-end-radius: 18px;
  }
  &:hover {
    background-color: rgb(73, 73, 73);
    color: rgb(255, 255, 255);
  }
  &:active {
    background-color: rgb(73, 73, 73);
    color: rgb(255, 255, 255);
  }
`;
