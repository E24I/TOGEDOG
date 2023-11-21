import { styled } from "styled-components";

export const LoginButtonOn = styled.button`
  color: black;
  display: block;
  width: 268px;
  padding: 10px 0;
  border: none;
  border-radius: 100px;
  background: #d7d7d7;
  margin-top: 20px;
  cursor: pointer;
`;
export const LoginButtonOff = styled.div`
  color: #a4a4a4;
  font-size: 13px;
  display: block;
  width: 268px;
  padding: 10.5px 0;
  border: none;
  border-radius: 100px;
  background: #d7d7d7;
  margin-top: 20px;
`;
export const LostPassword = styled.div`
  color: #a4a4a4;
  font-size: 12px;
  font-weight: 600;
  background: none;
  border: none;
  cursor: pointer;
`;

export const SignUpMove = styled.button`
  color: #a4a4a4;
  font-size: 12px;
  font-weight: 600;
  background: none;
  border: none;
  cursor: pointer;
`;

export const LoginInput = styled.input`
  display: flex;
  width: 268px;
  padding: 10px 13px;
  align-items: center;
  gap: 10px;
  border-radius: 100px;
  border: 1px solid #d7d7d7;
  margin-bottom: 20px;
`;

export const InputContainer = styled.div`
  box-sizing: border-box;
  width: 514px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  border: 1px solid #a4a4a4;
  border-left: none;
  border-radius: 0 30px 30px 0;
  & > p {
    color: #404040;
    font-size: 12px;
    font-style: normal;
  }
`;

export const LogoImg = styled.div`
  margin: 40px 0 20px;
`;
