import { styled } from "styled-components";
import { ReactComponent as Backspace } from "../../../assets/images/icons/Backspace.svg";

export const ChangeForm = styled.div`
  // 임시 - 공용 모달 배경 컴포넌트 만들예정
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    width: 100px;
    height: 36px;
    padding: 10px 13px;
    border-radius: 100px;
    border: 1px solid #d7d7d7;
    color: #818181;
    font-size: 10px;
    font-weight: 400;
  }
  form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    button {
      width: 100px;
      height: 36px;
      padding: 10px 13px;
      border-radius: 100px;
      border: 1px solid #d7d7d7;
      color: #818181;
      font-size: 10px;
      font-weight: 400;
    }
  }
`;

export const ChangeContainer = styled.div`
  margin: 0 auto;
  width: 600px;
  height: 520px;
  background: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  .submitButton {
    width: 30%;
    color: black;
    background: gray;
  }
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
  height: 300px;
`;
