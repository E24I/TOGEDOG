import { styled } from "styled-components";
import { ReactComponent as Message } from "../../assets/images/icons/signUpIcons/Message.svg";
import { ReactComponent as Person } from "../../assets/images/icons/signUpIcons/Person.svg";
import { ReactComponent as Lock } from "../../assets/images/icons/signUpIcons/Lock.svg";
import { ReactComponent as Checked } from "../../assets/images/icons/Check.svg";

export const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  padding-top: 120px;
  margin: 0 auto;
  @media (max-width: 715px) {
    padding: 0px 0 40px 0;
  }
  h2 {
    margin: 0 0 50px 63px;
    @media (max-width: 715px) {
      margin: 0 auto;
      padding: 40px 0;
      text-align: center;
    }
  }
  form {
    width: 100%;
    height: 13rem;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-around;
    position: relative;
    margin-bottom: 76px;
    @media (max-width: 715px) {
      width: 100%;
      height: auto;
      margin: 0 auto;
      flex-direction: column;
      align-items: center;
    }

    button {
      width: 100px;
      height: 36px;
      border-radius: 10px;
      background: #494949;
      color: white;
      font-size: 10px;
      font-weight: 400;
    }
    & > div {
      @media (max-width: 715px) {
        width: 100%;
      }
    }
    & > div > div {
      margin-bottom: 25px;
      @media (max-width: 715px) {
        margin: 0 auto;
        width: 70%;
        margin-bottom: 3vh;
      }
    }
  }
`;

export const TextInput = styled.div`
  border-bottom: 1px solid #494949;
  display: flex;
  width: 320px;
  flex-direction: row;
  align-items: center;
  @media (max-width: 715px) {
    width: 100%;
  }
  input {
    width: 70%;
    background: none;
    padding: 10px;
    @media (max-width: 715px) {
      padding: 10px 0;
    }
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
  margin: 0 auto;
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
export const CheckIcon = styled(Checked)`
  margin-left: 1rem;
`;
