import styled from "styled-components";

import { ReactComponent as Backspace } from "../../assets/images/icons/Backspace.svg";
import { ReactComponent as Add } from "../../assets/images/icons/Add.svg";
import { ReactComponent as Delete } from "../../assets/images/icons/Delete.svg";

// assets
export const BackspaceButton = styled(Backspace)``;
export const AddButton = styled(Add)`
  margin: 100px 75px;
`;
export const DeleteButton = styled(Delete)`
  position: absolute;
  top: 0px;
  right: 0;
  z-index: 1;
  cursor: pointer;
`;

// 피드 전체 컨테이너
export const CreateFeedContainer = styled.div`
  border: 2px solid #ffa1a1; // 구분선 입니다
  margin: 60px;
`;

//피드 탑 컨테이너
export const FeedTopContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 2px solid #63af80; //구분선 입니다
`;

//새 피드 올리기
export const PageName = styled.p`
  font-weight: 800;
`;

//게시 버튼
export const CreateButton = styled.button`
  font-weight: 800;
  width: 100px;
`;

//프로필 래핑
export const ProfileWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 220px;
  justify-content: space-between;
  margin-left: 20px;
  border: 2px solid #9876e3; //구분선 입니다
`;

//프로필 사진이 들어갈 자리 입니다
export const ProfileImg = styled.div`
  width: 60px;
  height: 60px;
  background-color: #d8d8d8;
  border-radius: 200px;
  text-align: center;
`;

//유저이름
export const Username = styled.div``;

//첨부파일 컨테이너
export const AttachmentSpaceContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: 2px solid #d79fe3; //구분선 입니다
  height: fit-content;
  overflow: scroll;
`;

//첨부파일 래핑
export const AttachmentWrap = styled.div`
  width: 300px;
  position: relative;
  padding: 10px;
`;

//첨부이미지
export const AttachedImg = styled.img`
  width: 100%;
  height: 275px;
  border-radius: 30px;
`;

//첨부영상
export const AttachedVideo = styled.video`
  width: 100%;
  height: 275px;
  border-radius: 30px;
`;

//첨부버튼
export const AttachingButton = styled.label`
  height: 275px;
  width: 200px;
  background-color: #d8d8d8;
  font-size: inherit;
  line-height: normal;
  cursor: pointer;
  border-radius: 30px;
  margin: 20px;
`;

//첨부인풋폼
export const AttachingInput = styled.input`
  display: none;
`;

//등록한 첨부파일의 갯수
export const Count = styled.p`
  border: 2px solid #e9d14b;
`;

//제목 입력칸
export const Title = styled.input`
  width: 100%;
  height: 70px;
  display: block;
  border-bottom: 1px solid #d7d7d7;
`;

//본문 입력 공간 래핑
export const ContentWrap = styled.div`
  border-bottom: 1px solid #d7d7d7;
`;

//내용 입력칸
export const Content = styled.textarea`
  width: 100%;
  padding: 90px 0px;
`;

//본문 글자수 카운팅
export const ContentCount = styled.p`
  text-align: right;
  margin-bottom: 30px;
`;

//하단 컨테이너(지도 검색, 토글)
export const FeedBottomContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

//검색한 주소 컨테이너
export const AddressContainer = styled.div`
  flex-grow: 1;
`;

//토글들
export const Toggles = styled.div``;

//토클 래핑
export const ToggleWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  padding: 5px;
`;

//토글배경
export const ToggleContainer = styled.div<{ data: boolean }>`
  position: relative;
  width: 45px;
  height: 25px;
  margin-left: 10px;
  border-radius: 50px;
  background-color: ${(props) => (props.data === true ? "#d7d7d7" : "#79D87C")};
`;

//토글배경
export const ToggleCircle = styled.div<{ data: boolean }>`
  position: absolute;
  width: 23px;
  height: 23px;
  top: 1px;
  left: ${(props) => (props.data === true ? "1px" : "21px")};
  border-radius: 50px;
  background-color: #ffffff;
  transition: ${(props) => (props.data === true ? "none" : "0.3s")};
`;
