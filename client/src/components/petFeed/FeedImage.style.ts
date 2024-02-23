import styled from "styled-components";

export const ImageBackground = styled.div`
  background-color: rgb(59, 57, 51);
  z-index: 40;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
`;

export const BigImage = styled.img<{ compare: boolean }>`
  ${(props) => (props.compare ? "width: 100vw" : "height: 100vh")};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;
