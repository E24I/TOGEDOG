import React from "react";
import styled from "styled-components";
import { GetUserInfoQuery } from "../../hooks/ChatHooks";
import { useNavigate } from "react-router-dom";

interface UserNameType {
  id?: number;
  component?: string;
}

const UserName: React.FC<UserNameType> = ({ id, component }) => {
  const { data: userInfo, isLoading, error } = GetUserInfoQuery(Number(id));
  const navigator = useNavigate();
  return (
    <>
      {isLoading ? (
        <>loading</>
      ) : error ? (
        <>error</>
      ) : (
        <Name data={component} onClick={() => navigator(`/user/${id}`)}>
          {userInfo?.nickname}
        </Name>
      )}
    </>
  );
};

export const Name = styled.div<{ data?: string }>`
  margin-left: ${(props) => props["data"] === "detail" && 11}px;
  cursor: pointer;
`;

export default UserName;
