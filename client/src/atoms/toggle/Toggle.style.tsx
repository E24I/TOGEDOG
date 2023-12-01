import styled from "styled-components";

// 토글 배경
export const ToggleContainer = styled.div`
  background-color: white;
  border: 1px solid rgb(215, 215, 215);
  border-radius: 18px;
  width: 50px;
  height: 26px;
  padding: 1px;
  position: relative;
`;

// 토글 원 버튼
export const ToggleBtn = styled.button<{ isOn: boolean }>`
  position: absolute;
  top: 1px;
  left: ${(props) => (props.isOn ? "1px" : "25px")};
  background-color: black;
  border: 1px solid rgb(215, 215, 215);
  border-radius: 50%;
  width: 22px;
  height: 22px;
  transition: 300ms;
`;
