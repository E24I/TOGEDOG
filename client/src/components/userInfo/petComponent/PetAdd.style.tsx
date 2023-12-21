import { styled } from "styled-components";
import { ReactComponent as BackSpace } from "../../../assets/images/icons/Backspace.svg";

export const PetAddContainer = styled.div`
  margin: 0 auto;
  width: 1440px;
  height: 500px;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid red;
`;

export const TopBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border: 1px solid black;
`;
export const BackIcon = styled(BackSpace)``;
export const Title = styled.h2`
  margin: 0 auto;
`;

export const MiddleBox = styled.div`
  border: 1px solid yellow;
`;

export const RegisterButton = styled.button`
  width: 200px;
  height: 50px;
  border-radius: 10px;
  background: #d7d7d7;
`;

export const Input = styled.input`
  width: 300px;
  display: block;
  border: 1px solid red;
`;
