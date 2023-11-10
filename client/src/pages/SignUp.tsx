import React, { useState } from "react";
import { styled } from "styled-components";
import SignUpForm from "../components/signUpElement/SignUpForm";

const SignUpContainer = styled.div`
  width: 775px;
  margin: 0 auto;
`;

const SignUp: React.FC = () => {
  return (
    <SignUpContainer>
      <SignUpForm />
    </SignUpContainer>
  );
};

export default SignUp;
