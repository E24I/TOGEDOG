import styled from "styled-components";

export const ImageBackground = styled.div`
  background-color: rgb(59, 57, 51);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BigImage = styled.img<{ compare: boolean }>`
  height: 100%;
  aspect-ratio: 1/1;
  object-fit: contain;
  background-position: center;
  background-repeat: no-repeat;
`;
