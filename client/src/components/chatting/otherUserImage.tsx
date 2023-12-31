import React from "react";
import styled from "styled-components";
import { ReactComponent as Profile } from "../../assets/images/icons/headerIcons/ProfileImage.svg";
import { GetUserInfoQuery } from "../../hooks/ChatHooks";
import { useNavigate } from "react-router-dom";

interface UserNameType {
  id?: number;
  component?: string;
}

const UserImage: React.FC<UserNameType> = ({ id, component }) => {
  const { data: userInfo, isLoading, error } = GetUserInfoQuery(Number(id));
  const navigator = useNavigate();
  return (
    <>
      {isLoading ? (
        <>loading</>
      ) : error ? (
        <>error</>
      ) : (
        <ProfileContainer onClick={() => navigator(`/user/${id}`)}>
          {userInfo.image === null ? (
            <ProfileWrap data={component}>
              <ProfileImage />
            </ProfileWrap>
          ) : (
            <ImageWrap data={component}>
              <Image src={userInfo.image} />
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
  left: 12%;
  width: fit-content;
  height: 100%;
  border-radius: 1000px;
`;

export const ProfileContainer = styled.div<{ data?: string }>`
  cursor: pointer;
`;

export const ProfileWrap = styled.div<{ data?: string }>`
  position: relative;
  background-color: #f8d259;
  width: ${(props) => (props["data"] === "list" ? 40 : 60)}px;
  width: ${(props) => (props["data"] === "list" ? 40 : 60)}px;
  height: ${(props) => (props["data"] === "list" ? 40 : 60)}px;
  border-radius: 100px;
`;

export const ImageWrap = styled(ProfileWrap)`
  background-color: transparent;
`;

export default UserImage;
