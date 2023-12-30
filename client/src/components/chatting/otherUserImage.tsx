import React from "react";
import styled from "styled-components";
import { ReactComponent as Profile } from "../../assets/images/icons/headerIcons/ProfileImage.svg";
import { GetUserInfoQuery } from "../../hooks/ChatHooks";

interface UserNameType {
  id?: number;
  component?: string;
}

const UserImage: React.FC<UserNameType> = ({ id, component }) => {
  const { data: userInfo, isLoading, error } = GetUserInfoQuery(Number(id));
  return (
    <>
      {isLoading ? (
        <>loading</>
      ) : error ? (
        <>error</>
      ) : !userInfo.Image ? (
        <ProfileContainer data={component}>
          <ProfileWrap data={component}>
            <ProfileImage />
          </ProfileWrap>
        </ProfileContainer>
      ) : (
        <Image src={userInfo.image} />
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
export const Image = styled.img`
  width: 60px;
  height: 60px;
  border: 2px solid #ca2020; //구분선 입니다
  margin-right: 11px;
`;

export const ProfileContainer = styled.div<{ data?: string }>`
  flex-basis: ${(props) => (props["data"] === "list" ? 40 : 60)}px;
`;

export const ProfileWrap = styled.div<{ data?: string }>`
  position: relative;
  background-color: #f8d259;
  width: ${(props) => (props["data"] === "list" ? 40 : 60)}px;
  height: ${(props) => (props["data"] === "list" ? 40 : 60)}px;
  border-radius: 100px;
`;

export default UserImage;
