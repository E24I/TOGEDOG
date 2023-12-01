import styled from "styled-components";

// 토글 배경
export const ToggleContainer = styled.div<{ isOn: boolean }>`
  background-color: ${(props) =>
    props.isOn ? "skyblue" : "rgb(215, 215, 215)"};
  border: 1px solid rgb(215, 215, 215);
  border-radius: 18px;
  min-width: 50px;
  min-height: 26px;
  padding: 1px;
  position: relative;
`;

// 토글 원 버튼
export const ToggleBtn = styled.button<{ isOn: boolean }>`
  background-color: ${(props) => (props.isOn ? "white" : "white")};
  border: 1px solid rgb(215, 215, 215);
  border-radius: 50%;
  width: 22px;
  height: 22px;
  transition: 300ms;
  position: absolute;
  top: 1px;
  left: ${(props) => (props.isOn ? "1px" : "25px")};
`;
