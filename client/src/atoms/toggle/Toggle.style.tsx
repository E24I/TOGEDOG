import styled from "styled-components";

// 토글 배경
export const ToggleContainer = styled.div<{ isOn: boolean }>`
  background-color: ${(props) =>
    props.isOn ? "skyblue" : "rgb(215, 215, 215)"};
  border: 1px solid rgb(215, 215, 215);
  border-radius: 18px;
  width: 80px;
  height: 26px;
  padding: 2px 8px;
  text-align: ${(props) => (props.isOn ? "right" : "left")};
  font-size: 14px;
  transition: 500ms;
  position: relative;
`;

// 토글 원 버튼
export const ToggleBtn = styled.button<{ isOn: boolean }>`
  background-color: ${(props) => (props.isOn ? "white" : "white")};
  border: 1px solid white;
  border-radius: 18px;
  width: 34px;
  height: 22px;
  transition: 300ms;
  position: absolute;
  top: 1px;
  left: ${(props) => (props.isOn ? "1px" : "42px")};
`;
