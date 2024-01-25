import { styled } from "styled-components";
import { ReactComponent as LogoV2 } from "../../assets/images/logos/LogoV2.svg";
import { ReactComponent as LogoV4 } from "../../assets/images/logos/LogoV4.svg";
import Background from "../../assets/images/backgrounds/Background.svg";

export const YellowLogo = styled(LogoV2)`
  margin-top: 50px;
`;
export const LoginLogo = styled(LogoV4)``;

export const LoginButtonOn = styled.button`
  background: #494949;
  border: none;
  border-radius: 100px;
  width: 80%;
  margin-top: 20px;
  padding: 15px 0;
  display: block;
  color: #ffffff;
  cursor: pointer;
`;
export const LoginButtonOff = styled.div`
  background: #d7d7d7;
  border: none;
  border-radius: 100px;
  width: 268px;
  margin-top: 20px;
  padding: 10.5px 0;
  color: #a4a4a4;
  font-size: 13px;
  display: block;
`;
export const LostPassword = styled.div`
  background: none;
  border: none;
  color: #a4a4a4;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
`;

export const SignUpMove = styled.button`
  background: none;
  border: none;
  color: #a4a4a4;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
`;

export const LoginInput = styled.input`
  width: 268px;
  margin-bottom: 20px;
  padding: 10px 13px;
  border: 1px solid #f8d259;
  border-radius: 100px;
  display: flex;
  align-items: center;
  gap: 10px;
  @media (max-width: 432px) {
    width: 70vw;
  }
`;

export const LoginContainer = styled.div`
  background-image: url(${Background});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100vw;
  height: calc(100vh); // header의 높이를 제외
  display: flex;
  justify-content: center;
  align-items: center;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const MainContainer = styled.div`
  width: 260px;
  height: calc(100vh);
  overflow-y: scroll;
  position: relative;

  // 스크롤바 설정(넓이 등)
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 1110px) {
    display: none;
  }
`;

export const UnLogin = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  color: #a4a4a4;
`;

export const MainPictures = styled.ul<{ top?: string }>`
  margin-top: ${(props) => props.top && props.top};
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

export const MainPicture = styled.li`
  background-color: rgb(255, 255, 255);
  width: 240px;
  height: 300px;
  margin: 10px 0px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding-top: 20px;
`;

export const MainImage = styled.img`
  width: 220px;
  height: 220px;
`;

export const InputContainer = styled.div`
  background-color: white;
  border-radius: 30px;
  width: 514px;
  height: 632px;
  margin-left: 50px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
  & > p {
    color: #404040;
    font-size: 12px;
    font-style: normal;
  }
  @media (max-width: 1110px) {
    margin: 0 auto;
  }
  @media (max-width: 545px) {
    width: 400px;
  }
`;

export const ButtonMenu = styled.div`
  display: flex;
  border: 1px solid red;
  justify-content: space-around;
  align-items: center;
`;

export const ImgBox = styled.div`
  width: 514px;
  height: 632px;
  border-radius: 30px 0 0 30px;
  background-image: url("https://img.freepik.com/free-vector/pet-sitting-labels-template_23-2149839225.jpg?w=740&t=st=1703842942~exp=1703843542~hmac=421509e5b68e623fdc9cc8f50b189c170e92e4b841c9e73730bbbb97bfe3034b");
  background-size: cover;
  background-position: center;
`;
