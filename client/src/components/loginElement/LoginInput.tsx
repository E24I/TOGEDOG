import React from "react";
import { styled } from "styled-components";

const Input = styled.input`
  display: flex;
  width: 240px;
  padding: 10px 13px;
  align-items: center;
  gap: 10px;
  border-radius: 100px;
  border: 1px solid #d7d7d7;
  margin-bottom: 20px;
`;

type LoginInputProps = {
  placeholder: string;
};

const LoginInput = ({ placeholder }: LoginInputProps) => {
  return (
    <div>
      <Input
        type={placeholder === "이메일을 입력하세요." ? "text" : "password"}
        placeholder={placeholder}
      />
    </div>
  );
};

export default LoginInput;
