import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
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

const SignUpInputs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const [allSelected, setAllSelected] = useState(false);

  //체크 박스 둘중 하나 체크 풀리면 전체선택은 false함수
  useEffect(() => {
    if (!watch("checkBox1") || !watch("checkBox2")) {
      setAllSelected(false);
    } else if (watch("checkBox1") || watch("checkBox2")) {
      setAllSelected(true);
    }
  }, [[watch("checkBox1"), watch("checkbox2")]]);

  // 전체 선택 누르면 둘다 true or false 함수
  const handleAllSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setAllSelected(isChecked);

    setValue("checkBox1", isChecked);
    setValue("checkBox2", isChecked);
  };

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
          <TextInput>
            <Message />
            <input
              type="text"
              placeholder="이메일을 입력해주세요."
              {...register("email", { required: true, pattern: emailRegex })}
            />
            <button>인증번호 전송</button>
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
              {...register("authentication", { required: true })}
            />
            <button>인증하기</button>
          </TextInput>
        </div>
        <div>
          <TextInput>
            <Person />
            <input
              type="text"
              placeholder="닉네임을 입력해주세요."
              {...register("nickName", { required: true })}
            />
          </TextInput>
        </div>
        <div>
          <TextInput>
            <Lock />
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              {...register("password", { required: true })}
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
              {...register("pwConfirm", { required: true })}
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
              {...register("checkBox1", { required: true })}
            />
            <p>이용약관 (필수)</p>
            <CheckInput
              type="checkbox"
              {...register("checkBox2", { required: true })}
            />
            <p>개인정보 수집 및 이용 동의 (필수)</p>
          </CheckInputBox>
          {(errors.checkBox1 || errors.checkBox2) && (
            <ErrorMsg>
              <p>이용약관, 개인정보 수집은 필수 항목입니다.</p>
            </ErrorMsg>
          )}
        </CheckBoxContainer>
        <SubmitButton>가입하기</SubmitButton>
      </form>
    </InputContainer>
  );
};

export default SignUpInputs;
