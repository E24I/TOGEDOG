import React from "react";
import { ReactComponent as Message } from "../../assets/images/icons/Message.svg";
import { styled } from "styled-components";

const Header: React.FC = () => {
  return <HeaderContainer>{/* <Mes /> */}</HeaderContainer>;
};

export default Header;

export const Mes = styled(Message)`
  width: 200px;
  height: 200px;
  path {
    fill: black;
  }
  margin-left: 40px;
`;

export const HeaderContainer = styled.header`
  width: 100vw;
  height: 70px;
  background-color: pink;
`;
