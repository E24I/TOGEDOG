import styled from "styled-components";
import { ReactComponent as LeftBtn } from "../../../../assets/images/icons/LeftArrow.svg";
import { ReactComponent as RightBtn } from "../../../../assets/images/icons/RightArrow.svg";

//assets
export const LeftButton = styled(LeftBtn)`
  margin: auto 30px auto 15px;
`;
export const RightButton = styled(RightBtn)`
  margin: auto 30px auto 15px;
`;

//components
export const UpdateSpace = styled.div`
  width: 80%; // 임시 사이징
  margin: 108px auto; //임시사이징
  input {
    width: 100%;
  }
`;

//수정 페이지 - 프로필 래핑
export const FeedOwner = styled.div`
  display: flex;
  flex-direction: row;
  height: 60px;
`;

//수정 페이지 - 피드 소유자 아이디와 등록된 주소 flexbox
export const IdAndAddress = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Address = styled.div`
  font-size: 10px;
`;

//수정 페이지 - 본문 컨테이너
export const FeedItems = styled.div``;

export const FeedTitle = styled.div`
  font-size: 16px;
  font-weight: 300;
  margin: 10px 0 10px 75px;
  color: #444444;
`;
export const DefaultTitle = styled.p``;

export const EditTitle = styled.input``;

export const FeedContent = styled.div`
  font-size: 16px;
  margin: 0 0 10px 75px;
`;

export const DefaultContent = styled.div`
  .ql-editor {
    padding: 0;
  }
  p {
    font-size: 16px;
    font-weight: 400;
  }
`;

//수정 페이지 - 피드 사진컨테이너
export const FeedFilesContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 280px;
  overflow: auto;
  margin-top: 50px;
`;
export const FeedFiles = styled.div`
  display: flex;
  flex-direction: row;
  height: 280px;
  width: fit-content;
  margin: auto;
  :nth-child(n + 2) {
    margin-left: 30px;
  }
`;

export const Videos = styled.video`
  width: fit-content;
  height: 100%;
  background-color: #d7d7d7;
  border-radius: 20px;
`;

export const Img = styled.img`
  width: fit-content;
  height: 100%;
  background-color: #d7d7d7;
  border-radius: 20px;
`;
