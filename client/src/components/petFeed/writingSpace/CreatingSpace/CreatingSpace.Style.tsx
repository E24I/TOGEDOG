import styled from "styled-components";
import { ReactComponent as Add } from "../../../../assets/images/icons/Add.svg";
import { ReactComponent as Delete } from "../../../../assets/images/icons/Delete.svg";

//assets
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

export const CreateSpace = styled.div``;

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

export const ProfileImg = styled.div`
  width: 60px;
  height: 60px;
  background-color: #d8d8d8;
  border-radius: 200px;
  text-align: center;
`;

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

export const AttachedImg = styled.img`
  width: 100%;
  height: 275px;
  border-radius: 30px;
`;

export const AttachedVideo = styled.video`
  width: 100%;
  height: 275px;
  border-radius: 30px;
`;

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

export const FilesCount = styled.p`
  border: 2px solid #e9d14b;
`;

export const CreateTitle = styled.input`
  width: 100%;
  height: 70px;
  display: block;
  border-bottom: 1px solid #d7d7d7;
`;

//본문 입력 공간 래핑
export const CreateContentWrap = styled.div``;

export const CreateContent = styled.textarea`
  width: 100%;
  padding: 90px 0px;
`;

export const TextCount = styled.p`
  text-align: right;
  margin-bottom: 30px;
`;
