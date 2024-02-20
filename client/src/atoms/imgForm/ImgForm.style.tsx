import { styled } from "styled-components";
import { ProFileBoxProps } from "../atomsType";
import { ReactComponent as Person } from "../../assets/images/icons/Person.svg";
import { ReactComponent as ImageCover } from "../../assets/images/icons/ImageCover.svg";
import { ReactComponent as ChattingDefaultBackground } from "../../assets/images/icons/ChattingDefaultBackground.svg";
import { ReactComponent as Profile } from "../../assets/images/icons/headerIcons/ProfileImage.svg";

export const ProFileBox = styled.span<ProFileBoxProps>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border: 1px solid #f8d259;
  border-radius: ${(props) => props.radius}%;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProFileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  position: absolute;
  top: 0;
  left: 0;
`;

export const UserUnknown = styled(Person)<{ isDark: boolean }>`
  width: 100%;
  height: 100%;
  path {
    fill: ${(props) => props.isDark && `#F8D259`};
  }
`;

export const PetUnknown = styled(ChattingDefaultBackground)`
  width: 50%;
  height: 50%;
  path {
    fill: white;
  }
`;
export const FeedUnknown = styled(ImageCover)`
  width: 50%;
  height: 50%;
  path {
    fill: white;
  }
`;
export const ProfileUnknown = styled(Profile)`
  width: 50%;
  height: 50%;
`;
