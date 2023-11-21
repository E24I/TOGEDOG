import styled from "styled-components";

export const ToastContainer = styled.div<{ data: string }>`
  border: 2px solid black; // 채팅 토스트 구분선
  position: absolute;
  top: ${(props) => (props.data === "list" ? "-40px" : "70px")};
  right: ${(props) => (props.data === "list" ? "0" : "20px")};
  display: flex;
  flex-direction: column;
`;

export const Menu = styled.button`
  border: 2px solid green; // 구분선
`;
