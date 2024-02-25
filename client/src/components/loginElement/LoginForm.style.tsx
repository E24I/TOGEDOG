import { styled } from "styled-components";
import { ReactComponent as LogoV2 } from "../../assets/images/logos/LogoV2.svg";
import { ReactComponent as LogoV4 } from "../../assets/images/logos/LogoV4.svg";
import { ReactComponent as LogoGradient } from "../../assets/images/logos/LogoGradient.svg";
import { ReactComponent as ImgText } from "../../assets/images/icons/ImgText.svg";
import { ReactComponent as DogIllustration } from "../../assets/images/icons/DogIllustration.svg";
import { ReactComponent as Mode } from "../../assets/images/icons/headerIcons/Mode.svg";

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

export const LoginInput = styled.input<{ isDark: boolean }>`
  background-color: ${(props) => (props.isDark ? `#222222` : `white`)};
  border: 1px solid ${(props) => (props.isDark ? `white` : `#f8d259`)};
  color: ${(props) => props.isDark && `white`};
  width: 268px;
  margin-bottom: 20px;
  padding: 10px 13px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition:
    background-color 0.2s ease 0s,
    border 0.2s ease 0s,
    color 0.2s ease 0s;
  @media (max-width: 432px) {
    width: 70vw;
  }
`;

// background-image: url(${(props) =>
//   props.isDark ? BackTextDark : BackTextUnDark}),
// linear-gradient(
//   ${(props) =>
//     props.isDark ? `45deg, #494949, #222222` : `45deg, #fadf84, #f8d259`}
// );
export const LoginContainer = styled.div<{ isDark: boolean }>`
  background-color: ${(props) => (props.isDark ? `#222222` : `#f8d259`)};
  background-position: center;
  background-size: cover;
  width: 100vw;
  height: calc(100vh);
  display: flex;
  justify-content: center;
  align-items: center;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  transition: background-color 0.2s ease 0s;
`;

export const UnLogin = styled.button<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? `white` : `darkgray`)};
  transition: color 0.2s ease 0s;
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

export const MainContainer = styled.div`
  display: flex;
`;

export const MainImage = styled.div`
  background: #69d3b0;
  width: 514px;
  height: 620px;
  border-radius: 30px;
  margin-right: -40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  @media (max-width: 1023px) {
    display: none;
  }
`;

export const InputContainer = styled.div<{ isDark: boolean }>`
  background-color: ${(props) => (props.isDark ? `#222222` : `white`)};
  border: ${(props) => (props.isDark ? `1px solid white` : "none")};
  border-radius: 30px;
  width: 514px;
  height: 620px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
  padding-left: 45px;
  transition:
    background-color 0.2s ease 0s,
    border 0.2s ease 0s;
  & > p {
    color: #404040;
    font-size: 12px;
    font-style: normal;
  }
  & div > p {
    color: ${(props) => props.isDark && `white`};
    font-size: 12px;
    font-style: normal;
  }
  @media (max-width: 1023px) {
    margin: 0 auto;
    padding: 0;
  }
  @media (max-width: 767px) {
    width: 400px;
  }
  @media (max-width: 430px) {
    width: 85vw;
  }
`;

export const ButtonMenu = styled.div`
  display: flex;
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
export const BottomMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #a4a4a4;
`;
export const LostPassword = styled.div`
  background: none;
  color: #a4a4a4;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
`;

export const SignUpMove = styled.button`
  padding-bottom: 3px;
  background: none;
  color: #a4a4a4;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
`;

export const YellowLogo = styled(LogoV2)`
  margin-top: 50px;
`;
export const LoginLogo = styled(LogoV4)`
  @media (max-width: 430px) {
    width: 80vw;
  }
`;
export const LoginText = styled(ImgText)`
  margin-top: 100px;
`;
export const LoginTogedog = styled(LogoGradient)`
  width: 400px;
  height: auto;
  margin-top: 80px;
`;

export const LoginDog = styled(DogIllustration)`
  position: relative;
  top: 45px;
`;

export const DarkMode = styled(Mode)`
  position: absolute;
  top: 20px;
  right: 20px;
  path {
    fill: ${(props) => props.theme.buttonColor};
    transition: fill 0.2s ease 0s;
  }
  @media (max-width: 1023px) {
    display: none;
  }
`;
// export const DarkMode = styled(Mode)<{ isDark: boolean }>`
//   position: absolute;
//   top: 20px;
//   right: 20px;
//   path {
//     fill: ${(props) => props.isDark && `#FADF84`};
//     transition: fill 0.2s ease 0s;
//   }
//   @media (max-width: 1023px) {
//     display: none;
//   }
// `;
export const MobileDarkMode = styled(Mode)<{ isDark: boolean }>`
  display: none;
  position: absolute;
  top: 20px;
  right: 20px;
  path {
    fill: ${(props) => props.isDark && `#FADF84`};
    transition: fill 0.2s ease 0s;
  }
  @media (max-width: 1023px) {
    display: block;
  }
  @media (max-width: 432px) {
    width: 10%;
  }
`;
