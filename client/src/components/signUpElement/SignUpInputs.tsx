import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  InputContainer,
  CheckBoxContainer,
  CheckInput,
  CheckInputBox,
  ErrorMsg,
  TextInput,
  SubmitButton,
  MessageIcon,
  PersonIcon,
  LockIcon,
  CheckIcon,
} from "./SignUpInputs.style";
import {
  usePostSignUp,
  usePostEmail,
  usePostCode,
  usePostNickname,
} from "../../hooks/MemberHook";

const SignUpInputs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const [isEmail, setIsEmail] = useState<boolean>(false); //이메일 value 상태
  const [isAuthentication, setIsAuthentication] = useState<boolean>(false); //이메일 인증 상태
  const [isNickName, setIsNickName] = useState<boolean>(false); //닉네임 중복확인 상태
  const [isPassword, setIsPassword] = useState<boolean>(false); //비밀번호 value 상태
  const [isPwConfirm, setIsPwConfirm] = useState<boolean>(false); //비밀번호 컨펌 상태
  const [allSelected, setAllSelected] = useState<boolean>(false); //agree 상태

  //각각 input 태그 value 호출
  const email = watch("email", "");
  const nickname = watch("nickname", "");
  const authNum = watch("authentication", "");
  const password = watch("password", "");
  const pwConfirm = watch("pwConfirm", "");
  const agree1 = watch("agree1", "");
  const agree2 = watch("agree2", "");
  const signUpInfo = { email, nickname, password, pwConfirm, agree1, agree2 };

  //체크 박스 둘중 하나 체크 풀리면 전체선택은 false함수
  useEffect(() => {
    if (!agree1 || !agree2) {
      setAllSelected(false);
    } else if (agree1 || agree2) {
      setAllSelected(true);
    }
  }, [[agree1, agree2]]);

  //이메일 인풋의value 정규식 체크
  const emailCheck = () => {
    emailRegex.test(email) ? setIsEmail(true) : setIsEmail(false);
  };
  //비밀번호 인풋의value 정규식 체크
  const passwordCheck = () => {
    passwordRegex.test(password) ? setIsPassword(true) : setIsPassword(false);
  };
  //비밀번호 컨펌 인풋의value === 비밀번호 인풋의value 체크
  const pwConfirmCheck = () => {
    password === pwConfirm ? setIsPwConfirm(true) : setIsPwConfirm(false);
  };

  // 체크박스 전체 선택 누르면 둘다 true or false 함수
  const handleAllSelect = () => {
    if (allSelected === false) {
      setValue("agree1", true);
      setValue("agree2", true);
      setAllSelected(true);
    } else {
      setValue("agree1", false);
      setValue("agree2", false);
      setAllSelected(false);
    }
  };

  //이메일 유효성
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  //비밀번호 유효성
  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+=-])[A-Za-z\d~!@#$%^&*()_+=-]{8,20}$/;

  const { mutate: signUpMutate } = usePostSignUp(signUpInfo);
  const { mutate: emailMutate, isPending } = usePostEmail(email);
  const { mutate: codeMutate } = usePostCode({
    email,
    authNum,
    setIsAuthentication,
  });
  const { mutate: nicknameMutate } = usePostNickname({
    nickname,
    setIsNickName,
  });
  const onSubmit = () => {
    if (!isAuthentication) {
      return alert("이메일 인증은 필수입니다.");
    } else if (!isNickName) {
      return alert("닉네임 중복확인을 해주세요");
    } else if (!allSelected) {
      return alert("이용약관, 개인정보 수집은 필수입니다.");
    } else {
      signUpMutate();
    }
  };

  return (
    <InputContainer>
      <h2>
        회원가입을 위해
        <br /> 정보를 입력해 주세요.
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <TextInput>
              <MessageIcon />
              <input
                type="text"
                placeholder="이메일"
                autoComplete="off"
                {...register("email", { required: true, pattern: emailRegex })}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    emailMutate();
                  }
                  emailCheck();
                }}
              />
              {isPending ? (
                <button>대기중</button>
              ) : (
                <button onClick={() => emailMutate()}>인증번호 전송</button>
              )}
            </TextInput>
            {!isEmail && (
              <ErrorMsg>
                <p>올바르지 않은 이메일 형식입니다.</p>
              </ErrorMsg>
            )}
          </div>
          <div>
            <TextInput>
              <MessageIcon />
              <input
                type="text"
                placeholder="인증번호"
                autoComplete="off"
                {...register("authentication", { required: true })}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    codeMutate();
                  }
                }}
              />
              {isAuthentication ? (
                <CheckIcon />
              ) : (
                <button onClick={() => codeMutate()}>인증하기</button>
              )}
            </TextInput>
            {!isAuthentication && (
              <ErrorMsg>
                <p>이메일 인증은 필수 입니다.</p>
              </ErrorMsg>
            )}
          </div>
          <div>
            <TextInput>
              <PersonIcon />
              <input
                type="text"
                placeholder="닉네임"
                autoComplete="off"
                {...register("nickname", { required: true })}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    nicknameMutate();
                  }
                }}
              />
              {isNickName ? (
                <CheckIcon />
              ) : (
                <button onClick={() => nicknameMutate()}>중복확인</button>
              )}
            </TextInput>
            {!isNickName && (
              <ErrorMsg>
                <p>닉네임 중복확인은 필수 입니다.</p>
              </ErrorMsg>
            )}
          </div>
        </div>
        <div>
          <div>
            <TextInput>
              <LockIcon />
              <input
                type="password"
                placeholder="비밀번호"
                autoComplete="off"
                {...register("password", {
                  required: true,
                  pattern: passwordRegex,
                })}
                onKeyUp={() => {
                  passwordCheck();
                }}
              />
            </TextInput>
            {!isPassword && (
              <ErrorMsg>
                <p>
                  비밀번호는 숫자 + 문자 + 특수문자 조합 8자 이상이어야 합니다.
                </p>
              </ErrorMsg>
            )}
          </div>
          <div>
            <TextInput>
              <LockIcon />
              <input
                type="password"
                placeholder="비밀번호 확인"
                autoComplete="off"
                {...register("pwConfirm", {
                  required: true,
                  validate: (value) => value === password,
                })}
                onKeyUp={() => {
                  pwConfirmCheck();
                }}
              />
            </TextInput>
            {!isPwConfirm && (
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
            {!allSelected && (
              <ErrorMsg>
                <p>이용약관, 개인정보 수집은 필수 항목입니다.</p>
              </ErrorMsg>
            )}
          </CheckBoxContainer>
        </div>
        <SubmitButton type="submit">가입하기</SubmitButton>
      </form>
    </InputContainer>
  );
};

export default SignUpInputs;
