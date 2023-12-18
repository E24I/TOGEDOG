import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "../../signUpElement/SignUpInputs.style";
import { ReactComponent as Lock } from "../../../assets/images/icons/signUpIcons/Lock.svg";
import { ReactComponent as Message } from "../../../assets/images/icons/signUpIcons/Message.svg";
import { ErrorMsg } from "../../signUpElement/SignUpInputs.style";
import {
  ChangeForm,
  ChangeContainer,
  Topbox,
  BackIcon,
  MiddleBox,
} from "./PasswordChange.style";
import {
  usePostUserEmail,
  usePostUserCode,
  usePatchUserPassword,
} from "../../../hooks/UserInfoHook";

const PasswordChangeForm: React.FC<{
  setLostPw: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setLostPw }) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useForm();
  //각각 input 태그 value 호출
  const email = watch("email", "");
  const authentication = watch("authentication", "");
  const password = watch("password", "");
  const pwConfirm = watch("pwConfirm", "");
  const [codeCheck, setCodeCheck] = useState<boolean>(false);
  const { mutate: postEmailMutate } = usePostUserEmail(email);
  const { mutate: postCodeMutate } = usePostUserCode(
    email,
    authentication,
    setCodeCheck,
  );
  const { mutate: patchPasswordMutate } = usePatchUserPassword(
    password,
    pwConfirm,
  );

  //이메일 유효성
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  //비밀번호 유효성
  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

  const handleModal = () => {
    setLostPw(false);
  };
  return (
    <ChangeForm>
      <ChangeContainer>
        <Topbox>
          <BackIcon onClick={handleModal} />
          <h3>비밀번호변경</h3>
        </Topbox>
        <MiddleBox>
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
                  {...register("email", {
                    required: true,
                    pattern: emailRegex,
                  })}
                />
                <button onClick={() => postEmailMutate()}>인증번호 전송</button>
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
                <button onClick={() => postCodeMutate()}>인증하기</button>
              </TextInput>
            </div>
            <div>
              <TextInput>
                <Lock />
                <input
                  type="password"
                  placeholder="새로운 비밀번호를 입력해주세요."
                  autoComplete="off"
                  {...register("password", {
                    required: true,
                    pattern: passwordRegex,
                  })}
                />
              </TextInput>
              {errors.pwConfirm && (
                <ErrorMsg>
                  <p>
                    비밀번호는 숫자 + 문자 + 특수문자 조합 8자 이상이어야
                    합니다.
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
                    validate: (value) =>
                      value === password || "비밀번호가 일치하지 않습니다.",
                  })}
                />
              </TextInput>
              {errors.pwConfirm && (
                <ErrorMsg>
                  <p>비밀번호가 일치하지 않습니다.</p>
                </ErrorMsg>
              )}
            </div>
          </form>
        </MiddleBox>
        <button
          className="submitButton"
          onClick={codeCheck ? () => patchPasswordMutate() : undefined}
        >
          비밀번호 변경하기
        </button>
      </ChangeContainer>
    </ChangeForm>
  );
};

export default PasswordChangeForm;
