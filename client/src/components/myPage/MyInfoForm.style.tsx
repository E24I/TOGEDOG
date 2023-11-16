import { styled } from "styled-components";

export const MyInfoContainer = styled.div`
  width: 65%;
  height: 500px;
  margin: 0 auto;
  border: 1px solid red;
  .img {
    width: 150px;
    height: 150px;
    background: #d7d7d7;
  }
`;

export const ProFileBox = styled.div`
  width: 150px;
  float: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
`;

export const NickName = styled.h1`
  text-align: center;
  margin: 20px 0 15px 0;
`;

export const ProFileImg = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: green;
`; //추후 이미지 태그로 바꿀것

export const SectionBox = styled.div`
  border: 1px solid blue;
  width: 500px;
  height: 150px;
  float: right;
`;
// export const FeedN = styled.div``;
// export const N = styled.div``;
// export const FeedN = styled.div``;

export const PetList = styled.div`
  width: 100%;
  height: 100px;
  float: left;
  margin-top: 50px;
  border: 1px solid green;
`;
