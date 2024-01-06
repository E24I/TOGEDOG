import { styled } from "styled-components";
import { ReactComponent as Backspace } from "../../../assets/images/icons/Backspace.svg";
import { ReactComponent as Person } from "../../../assets/images/icons/Person.svg";
import ImgCover from "../../../assets/images/icons/ImageCover.svg";

export const ChangeForm = styled.div`
  // 임시 - 공용 모달 배경 컴포넌트 만들예정
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    width: 100px;
    height: 36px;
    padding: 10px 13px;
    border-radius: 100px;
    border: 1px solid #d7d7d7;
    color: #818181;
    font-size: 10px;
    font-weight: 400;
  }
  form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    gap: 20px;
    & > div {
      width: 100%;
    }
    button {
      width: 100px;
      height: 36px;
      padding: 10px 13px;
      border-radius: 100px;
      border: 1px solid #d7d7d7;
      color: #818181;
      font-size: 10px;
      font-weight: 400;
    }
  }
`;

export const ChangeContainer = styled.div`
  margin: 0 auto;
  width: 600px;
  background: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
  .submitButton {
    color: white;
    background: #494949;
    bottom: -40px;
  }
`;

export const Topbox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  h3 {
    padding: 3% 0;
    margin: 0 auto;
  }
`;

export const ProfileBox = styled.div`
  width: 50%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  align-items: center;
  position: relative;
  & > div {
    width: 200px;
    height: 200px;
  }
  & > button {
    position: absolute;
    bottom: 0;
  }
`;
export const ProfileImg = styled.div<{ thumbnail: string | undefined }>`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: #d7d7d7;
  background-image: ${(props) =>
    props.thumbnail ? `url(${props.thumbnail})` : `url(${ImgCover})`};
  background-size: ${(props) => (props.thumbnail ? `cover` : ``)};
  background-repeat: no-repeat;
  background-position: center;
`;

export const SelectImgBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ChangeImgButton = styled.label`
  font-size: 16px;
  background: #494949;
  margin-top: 10px;
  padding: 7px 10px;
  border-radius: 10px;
  color: white;
  cursor: pointer;
`;

export const InputBox = styled.div`
  width: 80%;
  padding: 50px 0;
`;
export const TextInput = styled.div`
  border-bottom: 1px solid #d7d7d7;
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  p {
    font-size: 15px;
    padding-right: 20px;
  }
  input {
    width: 50%;
    background: none;
    padding: 10px;
  }
`;
//---------아이콘
export const BackIcon = styled(Backspace)`
  position: absolute;
`;
export const PersonIcon = styled(Person)`
  width: 18px;
  height: 18px;
`;
export const ProfilePersonIcon = styled(Person)``;
