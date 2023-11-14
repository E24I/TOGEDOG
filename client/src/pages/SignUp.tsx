import React from "react";
import { styled } from "styled-components";
import SignUpForm from "../components/signUpElement/SignUpForm";

const SignUpContainer = styled.div`
  width: 900px;
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
