import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import { ReactComponent as Message } from "../../assets/images/icons/signUpIcons/Message.svg";
import { ReactComponent as Person } from "../../assets/images/icons/signUpIcons/Person.svg";
import { ReactComponent as Lock } from "../../assets/images/icons/signUpIcons/Lock.svg";

const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  margin: 0;
  padding: 0;
  h2 {
    margin: 0 0 50px 63px;
  }
  form {
    width: 100%;
    height: 250px;
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
      border: 1px solid #d7d7d7;
      color: #818181;
      font-size: 10px;
      font-weight: 400;
    }
    .box {
      border-bottom: 1px solid #d7d7d7;
      display: flex;
      width: 320px;
      flex-direction: row;
      align-items: center;
      margin-top: 25px;
    }
    p {
      color: red;
      font-size: 9px;
      float: left;
    }
    .submitButton {
      width: 240px;
      color: black;
      background: #d7d7d7;
      position: absolute;
      bottom: -50px;
    }
  }
`;

const InputForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return (
    <InputContainer>
      <h2>
        회원가입을 위해
        <br /> 정보를 입력해 주세요.
      </h2>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <div>
          <div className="box">
            <Message />
            <input
              type="text"
              placeholder="이메일을 입력해주세요."
              {...register("email", { required: true, pattern: emailRegex })}
            />
            <button>인증번호 전송</button>
          </div>
          {errors.email && (
            <div>
              <p>올바르지 않은 이메일 형식입니다.</p>
            </div>
          )}
        </div>
        <div>
          <div className="box">
            <Message />
            <input
              type="text"
              placeholder="인증번호를 입력해주세요."
              {...register("authentication", { required: true })}
            />
            <button>인증하기</button>
          </div>
        </div>
        <div>
          <div className="box">
            <Person />
            <input
              type="text"
              placeholder="닉네임을 입력해주세요."
              {...register("nickName", { required: true })}
            />
          </div>
        </div>
        <div>
          <div className="box">
            <Lock />
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              {...register("password", { required: true })}
            />
          </div>
          {errors.password && (
            <div>
              <p>
                비밀번호는 숫자 + 문자 + 특수문자 조합 8자 이상이어야 합니다.
              </p>
            </div>
          )}
        </div>
        <div>
          <div className="box">
            <Lock />
            <input
              type="password"
              placeholder="비밀번호를 확인해주세요."
              {...register("reConfirm", { required: true })}
            />
          </div>
          {errors.reConfirm && (
            <div>
              <p>비밀번호가 일치하지 않습니다.</p>
            </div>
          )}
        </div>
        <div></div>
        <button type="submit" className="submitButton">
          가입하기
        </button>
      </form>
    </InputContainer>
  );
};

export default InputForm;
