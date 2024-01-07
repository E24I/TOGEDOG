import styled from "styled-components";

export const DropDownContainer = styled.div<{ data?: string }>`
  position: absolute;
  top: ${(props) => (props.data === "list" ? "-50px" : "70px")};
  right: ${(props) => (props.data === "list" ? "10px" : "20px")};
  display: flex;
  flex-direction: column;
  background-color: #63b89c;
  width: 35%;
  border-radius: 10px;
  z-index: 10;
`;

export const Menu = styled.div`
  background-color: #63b89c;
  border-radius: 10px;
  padding: 5% 0;
  &:hover {
    background-color: #69d3b0;
  }
  &:active {
    background-color: #4a967c;
  }
`;
