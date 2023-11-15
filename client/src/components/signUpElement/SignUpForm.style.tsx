import { styled } from "styled-components";

export const SignUpBox = styled.div`
  width: 100%;
  height: 1024px;
  input {
    border: none;
    width: 220px;
    padding: 10px;
  }
  h1 {
    margin: 20px 0;
  }
  p {
    color: #404040;
    font-size: 12px;
    font-style: normal;
    text-align: center;
  }
  button {
    color: #a4a4a4;
    font-size: 12px;
    font-weight: 600;
    background: none;
    cursor: pointer;
  }
`;

export const Head = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 120px 0;
`;
