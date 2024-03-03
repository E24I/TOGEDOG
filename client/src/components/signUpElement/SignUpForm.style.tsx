import { styled } from "styled-components";
import { ReactComponent as LogoV3 } from "../../assets/images/logos/LogoV3.svg";

export const SignUpBox = styled.div`
  width: 100%;
  margin: 0 auto;
  input {
    border: none;
    padding: 10px;
  }
  h1 {
    margin: 20px 0;
    color: #f8d259;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const BottomText = styled.p`
  font-size: 12px;
  text-align: center;
  margin-bottom: 10px;
`;

export const Logo = styled(LogoV3)`
  @media (max-width: 715px) {
    width: 150px;
  }
`;
