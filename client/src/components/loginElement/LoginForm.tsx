import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import Oauth from "./Oauth";

const InputContainer = styled.div`
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
  ul {
    padding: 0px;
    display: flex;
    justify-content: space-between;
  }
  li {
    list-style: none;
    display: inline;
  }
  button {
    color: #a4a4a4;
    font-size: 12px;
    font-weight: 600;
    background: none;
    border: none;
    cursor: pointer;
  }
  p {
    color: #404040;
    font-size: 12px;
    font-style: normal;
  }
  input {
    display: flex;
    width: 268px;
    padding: 10px 13px;
    align-items: center;
    gap: 10px;
    border-radius: 100px;
    border: 1px solid #d7d7d7;
    margin-bottom: 20px;
  }
  .buttonOn {
    color: black;
    display: block;
    width: 268px;
    padding: 10px 0;
    border: none;
    border-radius: 100px;
    background: #d7d7d7;
    margin-top: 20px;
    transition: 1s;
  }
  .buttonOff {
    color: a4a4a4;
    display: block;
    width: 268px;
    padding: 10px 0;
    border: none;
    border-radius: 100px;
    background: #d7d7d7;
    margin-top: 20px;
    transition: 1s;
    cursor: default;
  }
  .logoImg {
    margin: 40px 0 20px;
  }
`;

const LoginForm: React.FC = () => {
  const [loginInfo, setLoginInfo] = useState<boolean>(false); //아아디,비밀번호가 입력돼었으면 true
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");

  useEffect(() => {
    if (id && pw) {
      setLoginInfo(true);
    } else {
      setLoginInfo(false);
    }
  }, [id, pw]);

  const handleId = (value: string) => {
    const idValue = value;
    setId(idValue);
  };
  const handlePw = (value: string) => {
    const pwValue = value;
    setPw(pwValue);
  };
  return (
    <>
      <InputContainer>
        <div className="logoImg">로고</div>
        <form>
          <input
            type="text"
            placeholder="이메일을 입력하세요."
            onChange={(e) => {
              handleId(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="비밀번호를 입력하세요."
            onChange={(e) => {
              handlePw(e.target.value);
            }}
          />
          <button>비밀번호를 잊으셨나요?</button>
          <button className={loginInfo ? "buttonOn" : "buttonOff"}>
            로그인
          </button>
        </form>
        <div>
          <Oauth />
          <p>
            계정이 없으신가요?{" "}
            <Link to="/SignUp">
              <button>가입하기</button>
            </Link>
          </p>
        </div>
      </InputContainer>
    </>
  );
};

export default LoginForm;
