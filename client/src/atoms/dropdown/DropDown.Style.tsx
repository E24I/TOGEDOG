import styled from "styled-components";

export const DropDownContainer = styled.div<{ data?: string }>`
  position: absolute;
  top: ${(props) => (props.data === "list" ? "-25px" : "70px")};
  right: ${(props) => (props.data === "list" ? "0" : "20px")};
  display: flex;
  flex-direction: column;
`;

export const Menu = styled.button`
  background-color: #63b89c;
  &:hover {
    background-color: #69d3b0;
  }
  &:active {
    background-color: #4a967c;
  }
`;
