import { styled } from "styled-components";
import { ReactComponent as HeartIcon } from "../../../assets/images/icons/Heart.svg";
import { ReactComponent as BookMarkIcon } from "../../../assets/images/icons/BookMark.svg";
import ImgCover from "../../../assets/images/icons/ImageCover.svg";

export const CardForm = styled.div<{ thumbnail: string | undefined }>`
  width: 236px;
  height: 236px;
  background: #d7d7d7;
  background-image: ${(props) =>
    props.thumbnail ? `url(${props.thumbnail})` : `url(${ImgCover})`};
  background-size: ${(props) => (props.thumbnail ? `cover` : ``)};
  background-repeat: no-repeat;
  background-position: center;
  .cardHover {
    display: none;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  &:hover .cardHover {
    display: block;
  }
`;
export const ContentBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  img {
    width: 100%;
    height: 100%;
  }
`;
export const LikeBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    color: #d7d7d7;
    font-weight: bold;
  }
`;
export const BookMarkBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    color: #d7d7d7;
    font-weight: bold;
  }
`;
export const NoneImg = styled(ImgCover)``;
export const Heart = styled(HeartIcon)<{ state: boolean }>``;
export const BookMark = styled(BookMarkIcon)<{ state: boolean }>``;
