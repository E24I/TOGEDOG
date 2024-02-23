import styled from "styled-components";
import { ReactComponent as Dots } from "../../assets/images/icons/Dots.svg";
import { ReactComponent as Cancel } from "../../assets/images/icons/Cancel.svg";
import { ReactComponent as LeftArrowIcon } from "../../assets/images/icons/LeftArrow.svg";
import { ReactComponent as RightArrowIcon } from "../../assets/images/icons/RightArrow.svg";

export const DetailBackground = styled.div`
  background-color: rgb(215, 215, 215, 50%);
  width: 100vw;
  height: 100vh;
  padding: 20px 30px;
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
  width: 100%;
  max-width: 80vw;
  height: 100%;
  max-height: 100vh;
  padding: 50px 50px;
  /* aspect-ratio: 1.5/1; */
  background-color: white;
  border-radius: 20px;
  position: relative;
  display: grid;
  justify-items: center;

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(1, 100%);
    overflow-y: auto;
    overflow-x: visible;

    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-thumb {
      height: 30%;
      background: gray;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
      background: rgb(0, 0, 0, 0);
    }
  }

  @media screen and (min-width: 1200px) {
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: repeat(1, 100%);
  }
`;

export const CloseModal = styled(Cancel)`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgb(215, 215, 215);
  font-size: 50px;
  cursor: pointer;
`;

export const DetailHeader = styled.section``;
export const DetailProfile = styled.div``;
export const DetailUserName = styled.div``;
export const DetailTime = styled.div``;
export const SettingIcon = styled.div``;

export const DetailLeft = styled.section``;
export const DetailContents = styled.div``;
export const DetailTitle = styled.div``;
export const DetailContent = styled.div``;
export const DetailMedia = styled.div``;
export const DetailVideo = styled.video``;
export const DetailImage = styled.img``;
export const PrevMedia = styled.div``;
export const NextMedia = styled.div``;
export const SelectMedia = styled.div``;
export const DetailStatus = styled.div``;

export const DetailRight = styled.section``;
