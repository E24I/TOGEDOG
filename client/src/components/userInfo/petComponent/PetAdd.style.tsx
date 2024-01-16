import { styled } from "styled-components";
import { ReactComponent as BackSpace } from "../../../assets/images/icons/Backspace.svg";

export const PetAddContainer = styled.div`
  margin: 0 auto;
  width: 1240px;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  form {
    display: flex;
    flex-direction: column;
    label {
      margin-right: 10px;
    }
  }
`;

export const TopBox = styled.div`
  width: 100%;
  position: relative;
`;
export const BackIcon = styled(BackSpace)`
  position: absolute;
  left: 0;
  top: -17px;
`;
export const Title = styled.h2`
  margin: 0 auto;
`;

export const MiddleBox = styled.div`
  width: 50%;
  margin: 10vh 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const ImgBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Input = styled.input`
  width: 300px;
  display: block;
  border: 1px solid #494949;
  border-radius: 5px;
  padding: 7px 10px;
  margin-top: 20px;
`;
export const Textarea = styled.textarea`
  margin-top: 20px;
  padding: 7px 10px;
  height: 200px;
  border: 1px solid #494949;
  border-radius: 5px;
`;

export const RadioBox = styled.div`
  display: flex;
  margin: 20px 0 20px 0;
`;

export const RegisterButton = styled.button`
  color: white;
  width: 200px;
  height: 50px;
  border-radius: 10px;
  background: #494949;
  margin: 0 auto;
`;
