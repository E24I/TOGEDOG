import React, { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import Oauth from "../loginElement/Oauth";
import { ReactComponent as Message } from "../../assets/images/icons/signUpIcons/Message.svg";
import { ReactComponent as Person } from "../../assets/images/icons/signUpIcons/Person.svg";
import { ReactComponent as Lock } from "../../assets/images/icons/signUpIcons/Lock.svg";

const SignUpBox = styled.div`
  width: 100%;
  height: 1024px;
  input {
    border: none;
    width: 220px;
    padding: 10px;
  }
  h1 {
    margin: 20px 0;
  }
  h2 {
  }
  p {
    color: #404040;
    font-size: 12px;
    font-style: normal;
    text-align: center;
  }
  button {
    color: #a4a4a4;
    font-size: 12px;
    font-weight: 600;
    background: none;
    cursor: pointer;
  }
  .head {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 0 120px 0;
  }
  .inputContainer {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin: 100px 0;
    padding: 0;
  }
  .inputBoxes {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  form {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 30px;
    position: relative;
    button {
      width: 92px;
      height: 36px;
      padding: 10px 13px;
      border-radius: 100px;
      border: 1px solid #d7d7d7;
      color: #818181;
      font-size: 10px;
      font-weight: 400;
    }
    p {
      color: red;
      font-size: 9px;
      position: absolute;
      bottom: -15px;
    }
  }
  .box {
    border-bottom: 1px solid #d7d7d7;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const SignUpForm: React.FC = () => {
  return (
    <SignUpBox>
      <div className="head">
        <h1>Welcome!</h1>
        <div>로고</div>
      </div>
      <h2>
        회원가입을 위해
        <br /> 정보를 입력해 주세요.
      </h2>
      <div className="inputContainer">
        <div className="inputBoxes">
          <form>
            <div className="box">
              <Message />
              <input type="text" placeholder="이메일을 입력해주세요." />
            </div>
            <button>인증번호 전송</button>
            <p>올바르지 않은 이메일 형식입니다.</p>
          </form>
          <form>
            <div className="box">
              <Message />
              <input type="text" placeholder="인증번호를 입력해주세요." />
            </div>
            <button>인증하기</button>
          </form>
          <form>
            <div className="box">
              <Person />
              <input type="text" placeholder="닉네임을 입력해주세요." />
            </div>
          </form>
        </div>
        <div className="inputBoxes">
          <form>
            <div className="box">
              <Lock />
              <input type="password" placeholder="비밀번호를 입력해주세요." />
            </div>
            <p>숫자 + 문자 + 특수문자 조합 8자 이상이어야 합니다.</p>
          </form>
          <form>
            <div className="box">
              <Lock />
              <input type="password" placeholder="비밀번호를 확인해주세요." />
            </div>
            <p>비밀번호가 일치하지 않습니다.</p>
          </form>
          <form>
            <div className="box">
              <input />
            </div>
          </form>
        </div>
      </div>
      <div>
        <Oauth />
        <p>
          이미 계정이 있으신가요?{" "}
          <Link to="/">
            <button>로그인</button>
          </Link>
        </p>
      </div>
    </SignUpBox>
  );
};

export default SignUpForm;
