import styled from "styled-components";
import { ReactComponent as Dots } from "../../assets/images/icons/Dots.svg";
import { ReactComponent as Person } from "../../assets/images/icons/Person2.svg";
import { ReactComponent as LeftArrowIcon } from "../../assets/images/icons/LeftArrow.svg";
import { ReactComponent as RightArrowIcon } from "../../assets/images/icons/RightArrow.svg";

export const DetailBackground = styled.div`
  background-color: rgba(34, 34, 34, 0.6);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const DetailContainer = styled.section`
  background-color: rgb(255, 255, 255);
  border-radius: 20px 0px 20px 20px;
  width: 100%;
  max-width: 80vw;
  height: 100%;
  padding: 25px 0px;
  position: relative;
  transition: 300ms;
  @media screen and (max-width: 1024px) {
    overflow-y: auto;
    border-radius: 0px;
  }
  @media screen and (max-width: 767px) {
    max-width: 100vw;
  }
`;

export const CloseModal = styled.div`
  background-color: rgb(255, 255, 255);
  border-radius: 0 8px 8px 0;
  width: 60px;
  height: 60px;
  font-size: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: -60px;
  @media screen and (max-width: 1024px) {
    right: 0px;
  }
`;

export const DetailHeader = styled.section`
  width: 100%;
  margin-bottom: 10px;
  padding: 0px 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const DetailProfile = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;
export const DetailUserName = styled.button`
  font-size: 20px;
  span {
    font-weight: 600;
  }
`;
export const DetailTime = styled.div`
  margin-left: 15px;
  font-size: 12px;
  color: rgb(130, 130, 130);
`;
export const SettingIcon = styled(Dots)`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

export const DetailMain = styled.section`
  width: 100%;
  height: calc(100% - 15px);
  display: flex;
  justify-content: start;
  align-items: start;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const DetailLeft = styled.section`
  width: 50%;
  max-height: calc(100% - 10px);
  padding: 0px 60px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;
export const DetailContents = styled.div`
  width: 100%;
  margin-top: 10px;
`;
export const DetailTitle = styled.div`
  width: 100%;
  padding: 0px 5px;
  font-size: 18px;
  font-weight: 600;
`;
export const DetailContent = styled.div`
  width: 100%;
  min-height: 1.5rem;
  margin-top: 5px;
  color: rgb(130, 130, 130);
  font-size: 14px;
  line-height: 1.5rem;
  -webkit-line-clamp: 2;
  overflow-y: auto;
`;

export const DetailMedia = styled.div`
  border-radius: 18px;
  width: 100%;
  aspect-ratio: 1/1;
  margin-top: 20px;
  overflow: hidden;
  position: relative;

  &:hover {
    .button {
      visibility: visible;
    }
  }
`;
export const MediaBox = styled.div`
  width: 100%;
  height: 100%;
  transition: 300ms;
  display: flex;
  justify-content: start;
  align-items: center;
`;
export const DetailVideo = styled.video`
  background-color: rgb(59, 57, 51);
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: contain;
  background-position: center;
  background-repeat: no-repeat;
`;
export const DetailImage = styled.img`
  background-color: rgb(59, 57, 51);
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: contain;
  background-position: center;
  background-repeat: no-repeat;
`;
export const PrevMedia = styled(LeftArrowIcon)`
  visibility: hidden;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  left: 5px;
  cursor: pointer;
  path {
    fill: rgb(73, 73, 73);
    stroke: rgb(73, 73, 73);
  }
`;
export const NextMedia = styled(RightArrowIcon)`
  visibility: hidden;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  right: 5px;
  cursor: pointer;
  path {
    fill: rgb(73, 73, 73);
    stroke: rgb(73, 73, 73);
  }
`;
export const SelectMedia = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translate(-50%, 0%);
`;
export const SelectBtn = styled.button<{ select: boolean }>`
  background-color: ${(props) =>
    props.select ? "rgb(255,255,255)" : "rgb(73, 73, 73)"};
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: 0px 2px;
`;

export const DetailStatus = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: start;
`;
export const LikeBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  span {
  }
`;

export const DetailRight = styled.section`
  border-left: 1px solid rgb(215, 215, 215);
  width: 50%;
  height: 100%;
  padding: 0px 40px 40px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 1024px) {
    width: 100%;
    padding: 0px 40px 50px 40px;
  }
`;

export const ReplyCount = styled.div`
  border-bottom: 1px solid rgb(215, 215, 215);
  width: 100%;
  padding: 10px 10px;
`;
export const SendContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  transition: 300ms;
  @media screen and (max-width: 1024px) {
    background-color: rgb(255, 255, 255);
    max-width: calc(80vw - 80px);
    padding: 10px;
    position: fixed;
    bottom: 0;
    left: calc(50% - 40vw + 40px);
  }
  @media screen and (max-width: 767px) {
    max-width: 100vw;
    left: calc(50% - 50vw);
  }
`;
export const SendProfile = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Unknown = styled(Person)`
  width: 40px;
  height: 40px;
  path {
    fill: rgb(248, 210, 89);
  }
`;
export const SendBox = styled.div`
  background-color: rgb(250, 250, 250);
  border: 2px solid rgb(73, 73, 73);
  border-radius: 30px;
  width: 100%;
  height: 40px;
  padding: 0px 10px 0px 15px;
  display: flex;
  justify-content: start;
  align-items: center;
  span {
    white-space: nowrap;
    margin-right: 5px;
    color: rgb(0, 116, 201);
  }
`;
export const SendInput = styled.input`
  background-color: rgb(250, 250, 250);
  width: 100%;
  height: 30px;
`;
export const SendBtn = styled.button`
  width: 50px;
  height: 30px;
`;
