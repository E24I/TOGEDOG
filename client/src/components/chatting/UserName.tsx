import React from "react";
import styled from "styled-components";
import { GetUserInfoQuery } from "../../hooks/ChatHooks";
import { useNavigate } from "react-router-dom";

interface UserNameType {
  id?: number;
  component?: string;
  page?: string;
}

const UserName: React.FC<UserNameType> = ({ id, component, page }) => {
  const { data: userInfo, isLoading, error } = GetUserInfoQuery(Number(id));
  const navigator = useNavigate();
  return (
    <>
      {isLoading ? (
        <>loading</>
      ) : error ? (
        <>error</>
      ) : (
        <Name
          data={component}
          page={page}
          onClick={() => !page && navigator(`/user/${id}`)}
        >
          {userInfo?.nickname}
        </Name>
      )}
    </>
  );
};

export const Name = styled.div<{ data?: string; page?: string }>`
  margin-left: ${(props) => props["data"] === "detail" && 11}px;
  cursor: ${(props) => (!props.page ? "pointer" : "none")}px;
`;

export default UserName;