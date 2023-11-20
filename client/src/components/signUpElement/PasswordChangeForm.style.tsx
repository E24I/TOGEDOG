import { styled } from "styled-components";
import { ReactComponent as Backspace } from "../../assets/images/icons/Backspace.svg";

export const ChangeForm = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ChangeContainer = styled.div`
  margin: 0 auto;
  width: 624px;
  height: 635px;
  background: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Topbox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
export const BackIcon = styled(Backspace)`
  margin: 0 25% 0 3%;
`;

export const MiddleBox = styled.div`
  width: 70%;
  height: 400px;
  border: 1px solid red;
`;
