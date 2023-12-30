import React from "react";
import styled from "styled-components";
import { GetUserInfoQuery } from "../../hooks/ChatHooks";

interface UserNameType {
  id?: number;
}

const UserName: React.FC<UserNameType> = ({ id }) => {
  const { data: userInfo, isLoading, error } = GetUserInfoQuery(Number(id));
  return (
    <>
      {isLoading ? (
        <>loading</>
      ) : error ? (
        <>error</>
      ) : (
        <Name>{userInfo.nickname}</Name>
      )}
    </>
  );
};

export const Name = styled.div``;

export default UserName;
