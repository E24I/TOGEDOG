import React from "react";
import styled from "styled-components";
import { GetUserInfoQuery } from "../../hooks/ChatHooks";

interface UserNameType {
  id?: number;
  component?: string;
}

const UserName: React.FC<UserNameType> = ({ id, component }) => {
  const { data: userInfo, isLoading, error } = GetUserInfoQuery(Number(id));
  return (
    <>
      {isLoading ? (
        <>loading</>
      ) : error ? (
        <>error</>
      ) : (
        <Name data={component}>{userInfo.nickname}</Name>
      )}
    </>
  );
};

export const Name = styled.div<{ data?: string }>`
  margin-left: ${(props) => props["data"] === "detail" && 11}px;
`;

export default UserName;
