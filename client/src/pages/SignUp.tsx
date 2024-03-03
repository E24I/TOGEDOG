import React from "react";
import { styled } from "styled-components";
import SignUpForm from "../components/signUpElement/SignUpForm";

const SignUpContainer = styled.div`
  width: 715px;
  margin: 0 auto;
  @media (max-width: 715px) {
    width: 100%;
  }
`;

const SignUp: React.FC = () => {
  return (
    <SignUpContainer>
      <SignUpForm />
    </SignUpContainer>
  );
};

export default SignUp;
