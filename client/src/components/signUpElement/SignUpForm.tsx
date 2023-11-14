import React, { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import Oauth from "../loginElement/Oauth";
import InputForm from "./SignUpInputs";

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
`;

const SignUpForm: React.FC = () => {
  return (
    <SignUpBox>
      <div className="head">
        <h1>Welcome!</h1>
        <div>로고</div>
      </div>
      <InputForm />
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
