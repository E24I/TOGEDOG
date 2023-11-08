import React from "react";
import { styled } from "styled-components";

const Input = styled.input``;

type LoginInputProps = {
  placeholder: string;
};

const LoginInput = ({ placeholder }: LoginInputProps) => {
  return (
    <>
      <Input
        type={placeholder === "이메일을 입력하세요." ? "text" : "password"}
      />
    </>
  );
};

export default LoginInput;
