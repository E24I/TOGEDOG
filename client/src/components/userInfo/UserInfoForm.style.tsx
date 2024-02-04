import { styled } from "styled-components";
import { ReactComponent as AddVersion2 } from "../../assets/images/icons/AddVersion2.svg";
import { ReactComponent as LogoGradient } from "../../assets/images/logos/LogoGradient.svg";

export const Logo = styled(LogoGradient)`
  width: 200px;
  height: auto;
`;

export const MyInfoContainer = styled.div`
  width: 50%;
  margin: 0 auto;
`;

export const HeadBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 40px 0 20px 0;
`;

export const NickName = styled.h2`
  text-align: center;
`;

export const MessageButton = styled.button`
  color: #ffffff;
  width: 5rem;
  height: 40px;
  background: #494949;
  border-radius: 5px;
`;

export const TopContainer = styled.div`
  display: flex;
  justify-content: center;
  @media (min-width: 768px) and (max-width: 1023px) {
    flex-direction: column;
    align-items: center;
    gap: 2em;
  }
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    gap: 2em;
  }
`;

export const Introduction = styled.p`
  width: 100%;
  display: block;
  margin: 1rem 0;
  text-align: center;
`;

export const SectionBox = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ButtonSection = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  position: relative;
`;

export const MyButton = styled.button`
  color: #494949;
  width: 160px;
  height: 40px;
  background: #f8d259;
  border-radius: 5px;
`;

export const MoreButton = styled.button`
  width: 50px;
  height: 40px;
  background: #d7d7d7;
  border-radius: 5px;
`;

export const PetListBox = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 50px 0;
`;

export const PetAdd = styled(AddVersion2)`
  margin: 20px 10px;
`;
