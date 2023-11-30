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

export const UpdateSpace = styled.div`
  border: 2px solid #a06cb7; //구분선 입니다
  width: 880px; // 임시 사이징
  margin: 108px auto; //임시사이징
`;

//수정 페이지 - 프로필 래핑
export const FeedOwner = styled.div`
  display: flex;
  flex-direction: row;
  border: 2px solid #34c2ff; // 구분선 입니다
  height: 60px;
`;

export const FeedOwnerImg = styled.img`
  display: block;
  width: 60px;
  height: 100%;
  border: 2px solid #111111;
  margin-right: 15px;
`;

//수정 페이지 - 피드 소유자 아이디와 등록된 주소 flexbox
export const IdAndAddress = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Id = styled.p`
  font-size: 16px;
`;

export const Address = styled.div`
  font-size: 10px;
`;

//수정 페이지 - 본문 컨테이너
export const FeedItems = styled.div``;

export const FeedTitle = styled.p`
  font-size: 16px;
  font-weight: 800;
  margin: 10px 0 10px 75px;
`;

export const EditTitle = styled.input``;

export const FeedContent = styled.div`
  font-size: 16px;
  margin: 0 0 10px 75px;
`;

export const DefaultContent = styled.p``;

//수정 페이지 - 피드 사진컨테이너
export const FeedImages = styled.div`
  display: flex;
  flex-direction: row;
  height: 280px;
  justify-content: space-between;
`;

export const Images = styled.div`
  width: 745px;
  border: 2px solid #999999; //구분선 입니다
`;

export const Img = styled.img`
  width: 233px;
  height: 100%;
  background-color: #d7d7d7;
  border-radius: 20px;
`;
