import React from "react";
import { ModalBackground } from "../layout/Layout.style";
import LoadingDog from "../../assets/loading/LoadingDog.gif";
import styled from "styled-components";

const Loading: React.FC = () => {
  return (
    <>
      <ModalBackground />
      <Gif src={LoadingDog} alt="로딩 화면" />
      <Waiting>Waiting...</Waiting>
    </>
  );
};

export const Gif = styled.img`
  position: absolute;
  top: 42%;
  left: 45%;
  transform: scale(1.1);
  z-index: 99;
`;

export const Waiting = styled.p`
  position: absolute;
  top: 40%;
  left: 42%;
  font-size: 25px;
  background: linear-gradient(
    to right,
    #69d3b0 20%,
    #fadf84 30%,
    #f8d259 70%,
    #69d3b0 80%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 500% auto;
  animation: textShine 5s ease-in-out infinite alternate;
  @keyframes textShine {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }
  z-index: 99;
`;
export default Loading;
