import React from "react";
import styled from "styled-components";
import { ReactComponent as Profile } from "../../assets/images/icons/headerIcons/ProfileImage.svg";
import { GetUserInfoQuery } from "../../hooks/ChatHooks";
import { useNavigate } from "react-router-dom";

interface UserNameType {
  id?: number;
  component?: string;
  page?: string;
}

const UserImage: React.FC<UserNameType> = ({ id, component, page }) => {
  const { data: userInfo, isLoading, error } = GetUserInfoQuery(Number(id));
  const navigator = useNavigate();
  return (
    <>
      {isLoading ? (
        <>loading</>
      ) : error ? (
        <>error</>
      ) : (
        <ProfileContainer
          page={page}
          onClick={() => !page && navigator(`/user/${id}`)}
        >
          {userInfo?.image === null ? (
            <ProfileWrap data={component}>
              <ProfileImage />
            </ProfileWrap>
          ) : (
            <ImageWrap data={component}>
              <Image src={userInfo?.image} />
            </ImageWrap>
          )}
        </ProfileContainer>
      )}
    </>
  );
};

//asset
export const ProfileImage = styled(Profile)`
  position: absolute;
  top: 25%;
  left: 25%;
  width: 50%;
  height: 50%;
`;
//component
export const Image = styled.img<{ data?: string }>`
  position: absolute;
  top: 0;
  left: 0%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 1000px;
`;

export const ProfileContainer = styled.div<{ page?: string }>`
  cursor: pointer;
  transition: all 0.5s;
`;

export const ProfileWrap = styled.div<{ data?: string }>`
  position: relative;
  background-color: #f8d259;
  width: ${(props) => (props["data"] === "list" ? 40 : 60)}px;
  height: ${(props) => (props["data"] === "list" ? 40 : 60)}px;
  border-radius: 100px;

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: ${(props) => (props["data"] === "list" ? 32 : 42)}px;
    height: ${(props) => (props["data"] === "list" ? 32 : 42)}px;
  }
  @media screen and (max-width: 767px) {
    width: ${(props) => (props["data"] === "list" ? 25 : 34)}px;
    height: ${(props) => (props["data"] === "list" ? 25 : 34)}px;
  }
`;

export const ImageWrap = styled(ProfileWrap)<{ data?: string }>`
  background-color: transparent;
  width: ${(props) => (props["data"] === "list" ? 40 : 60)}px;
  height: ${(props) => (props["data"] === "list" ? 40 : 60)}px;
`;

export default UserImage;
