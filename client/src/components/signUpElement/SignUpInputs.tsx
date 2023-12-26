import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { ReactComponent as Message } from "../../assets/images/icons/signUpIcons/Message.svg";
import { ReactComponent as Person } from "../../assets/images/icons/signUpIcons/Person.svg";
import { ReactComponent as Lock } from "../../assets/images/icons/signUpIcons/Lock.svg";
import {
  InputContainer,
  CheckBoxContainer,
  CheckInput,
  CheckInputBox,
  ErrorMsg,
  TextInput,
  SubmitButton,
} from "./SignUpInputs.style";
import {
  SignApiCall,
  getAuthentication,
  sendAuthentication,
  checkNickName,
} from "../../services/signUpService";

const SignUpInputs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const navigate = useNavigate();

  const [allSelected, setAllSelected] = useState(false);
  const [isAuthentication, setIsAuthentication] = useState(true); //인증코드상태

  //각각 input 태그 value 호출
  const email = watch("email", "");
  const nickname = watch("nickname", "");
  const authentication = watch("authentication", "");
  const password = watch("password", "");
  const pwConfirm = watch("pwConfirm", "");

  //체크 박스 둘중 하나 체크 풀리면 전체선택은 false함수
  useEffect(() => {
    if (!watch("agree1") || !watch("agree2")) {
      setAllSelected(false);
    } else if (watch("agree1") || watch("agree2")) {
      setAllSelected(true);
    }
  }, [[watch("agree1"), watch("agree2")]]);

  //이메일 유효성
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  //비밀번호 유효성
  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

  // 체크박스 전체 선택 누르면 둘다 true or false 함수
  const handleAllSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setAllSelected(isChecked);

    setValue("agree1", isChecked);
    setValue("agree2", isChecked);
  };

  const onSubmit = (data: any) => {
    if (data.authentication) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { authentication, ...rest } = data;
      SignApiCall(rest);
      // console.log(rest);
      // navigate("/");
    }
  };

  return (
    <InputContainer>
      <h2>
        회원가입을 위해
        <br /> 정보를 입력해 주세요.
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div>
          <TextInput>
            <Message />
            <input
              type="text"
              placeholder="이메일을 입력해주세요."
              autoComplete="off"
              {...register("email", { required: true, pattern: emailRegex })}
            />
            <button onClick={() => getAuthentication(email)}>
              인증번호 전송
            </button>
          </TextInput>
          {errors.email && (
            <ErrorMsg>
              <p>올바르지 않은 이메일 형식입니다.</p>
            </ErrorMsg>
          )}
        </div>
        <div>
          <TextInput>
            <Message />
            <input
              type="text"
              placeholder="인증번호를 입력해주세요."
              autoComplete="off"
              {...register("authentication", { required: true })}
            />
            <button
              onClick={() =>
                sendAuthentication(email, authentication, setIsAuthentication)
              }
            >
              인증하기
            </button>
          </TextInput>
        </div>
        <div>
          <TextInput>
            <Person />
            <input
              type="text"
              placeholder="닉네임을 입력해주세요."
              autoComplete="off"
              {...register("nickname", { required: true })}
            />
            <button onClick={() => checkNickName(nickname)}>중복확인</button>
          </TextInput>
        </div>
        <div>
          <TextInput>
            <Lock />
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              autoComplete="off"
              {...register("password", {
                required: true,
                pattern: passwordRegex,
              })}
            />
          </TextInput>
          {errors.password && (
            <ErrorMsg>
              <p>
                비밀번호는 숫자 + 문자 + 특수문자 조합 8자 이상이어야 합니다.
              </p>
            </ErrorMsg>
          )}
        </div>
        <div>
          <TextInput>
            <Lock />
            <input
              type="password"
              placeholder="비밀번호를 확인해주세요."
              autoComplete="off"
              {...register("pwConfirm", {
                required: true,
                validate: (value) => value === password || "",
              })}
            />
          </TextInput>
          {errors.pwConfirm && (
            <ErrorMsg>
              <p>비밀번호가 일치하지 않습니다.</p>
            </ErrorMsg>
          )}
        </div>
        <CheckBoxContainer>
          <CheckInputBox>
            <CheckInput
              type="checkbox"
              checked={allSelected}
              onChange={handleAllSelect}
            />
            <p>전체선택</p>
          </CheckInputBox>
          <CheckInputBox>
            <CheckInput
              type="checkbox"
              {...register("agree1", { required: true })}
            />
            <p>이용약관 (필수)</p>
            <CheckInput
              type="checkbox"
              {...register("agree2", { required: true })}
            />
            <p>개인정보 수집 및 이용 동의 (필수)</p>
          </CheckInputBox>
          {(errors.agree1 || errors.agree2) && (
            <ErrorMsg>
              <p>이용약관, 개인정보 수집은 필수 항목입니다.</p>
            </ErrorMsg>
          )}
        </CheckBoxContainer>
        <SubmitButton
          type="submit"
          onClick={handleSubmit((data) => {
            isAuthentication === false
              ? alert("이메일 인증은 필수입니다.")
              : onSubmit(data);
          })}
        >
          가입하기
        </SubmitButton>
      </form>
    </InputContainer>
  );
};

export default SignUpInputs;
