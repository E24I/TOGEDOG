import styled from "styled-components";
import { ReactComponent as Add } from "../../../../assets/images/icons/Add.svg";
import { ReactComponent as Delete } from "../../../../assets/images/icons/Delete.svg";
import { ReactComponent as AddVedio } from "../../../../assets/images/icons/AddVedioBtn.svg";
import { ReactComponent as AddImage } from "../../../../assets/images/icons/AddImageBtn.svg";
//assets
export const AddButton = styled(Add)`
  margin: 100px 75px;
`;
export const AddVideoButton = styled(AddVedio)`
  margin: 50% 32%;
`;
export const AddImageButton = styled(AddImage)`
  margin: 50% 28%;
`;
export const DeleteButton = styled(Delete)`
  position: absolute;
  top: 0px;
  right: 0;
  z-index: 1;
  cursor: pointer;
`;

//첨부파일 컨테이너
export const AttachmentSpaceWrap = styled.div`
  display: flex;
  flex-direction: row;

  overflow: auto;
`;

export const AttachmentSpaceContainer = styled.div`
  display: flex;
  height: 100%;
`;

//첨부파일 래핑
export const AttachmentWrap = styled.div`
  flex-basis: 300px;
  width: fit-content;
  height: 280px;
  position: relative;
  padding: 10px;
`;

export const AttachedImg = styled.img`
  width: fit-content;
  height: 100%;
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
  background-color: #63b89c;
  font-size: inherit;
  line-height: normal;
  cursor: pointer;
  border-radius: 1.7rem;
  margin: 10px;
  &:hover {
    background-color: #69d3b0;
  }
  &:active {
    background-color: #4a967c;
  }
`;

//첨부인풋폼
export const AttachingInput = styled.input`
  display: none;
`;

export const FilesCount = styled.p``;
