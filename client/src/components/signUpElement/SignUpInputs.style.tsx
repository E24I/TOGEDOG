import { styled } from "styled-components";
import { ReactComponent as Message } from "../../assets/images/icons/signUpIcons/Message.svg";
import { ReactComponent as Person } from "../../assets/images/icons/signUpIcons/Person.svg";
import { ReactComponent as Lock } from "../../assets/images/icons/signUpIcons/Lock.svg";

export const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  h2 {
    margin: 0 0 50px 63px;
  }
  form {
    width: 100%;
    height: 240px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    position: relative;
    align-items: center;
    margin-bottom: 76px;

    button {
      width: 100px;
      height: 36px;
      padding: 10px 13px;
      border-radius: 100px;
      border: 1px solid #494949;
      color: #818181;
      font-size: 10px;
      font-weight: 400;
    }
    & > div {
      margin-bottom: 25px;
    }
  }
`;

export const TextInput = styled.div`
  border-bottom: 1px solid #494949;
  display: flex;
  width: 320px;
  flex-direction: row;
  align-items: center;
  input {
    width: 70%;
    background: none;
    padding: 10px;
  }
`;

export const ErrorMsg = styled.div`
  float: left;
  p {
    color: red;
    font-size: 9px;
  }
`;

export const CheckBoxContainer = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
`;
export const CheckInputBox = styled.div`
  margin-top: 10px;
  display: flex;
  p {
    font-size: 10px;
    margin: 0 10px 0 5px;
  }
`;

export const CheckInput = styled.input`
  width: 13px;
  height: 13px;
  float: left;
`;

export const SubmitButton = styled.button`
  color: black;
  background: #494949;
  position: absolute;
  bottom: -50px;
`;

export const MessageIcon = styled(Message)`
  path {
    fill: #494949;
  }
`;
export const PersonIcon = styled(Person)`
  path {
    fill: #494949;
  }
`;
export const LockIcon = styled(Lock)`
  path {
    fill: #494949;
  }
`;
