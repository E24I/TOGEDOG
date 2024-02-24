import styled from "styled-components";
import { ReactComponent as Dots } from "../../assets/images/icons/Dots.svg";
import { ReactComponent as PinIcon } from "../../assets/images/icons/Pin.svg";

export const Replies = styled.ul`
  background-color: rgb(245, 245, 245);
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
  overflow-x: visible;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

export const Reply = styled.li`
  width: 100%;
  padding: 15px 10px 15px 10px;
  position: relative;
  display: flex;
  justify-content: start;
  align-items: start;
`;

export const ReplyProfile = styled.button`
  background-color: rgb(215, 215, 215);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ReplyContents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;
export const ReplyHeader = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ReplyNickname = styled.button`
  font-size: 16px;
  font-weight: 600;
`;
export const ReplyPin = styled(PinIcon)`
  width: 12px;
  height: 12px;
  margin-right: 2px;
`;
export const ReplyFixed = styled.span`
  font-size: 12px;
`;

export const ReplyMain = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ReplyContent = styled.div`
  width: 100%;
  margin: 5px 0px;
  word-break: break-all;
`;
export const ReplyEditBox = styled.input`
  background-color: rgb(245, 245, 245);
  width: 100%;
  padding: 0px 5px;
  font-size: 16px;
`;
export const LikeBox = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  span {
    font-size: 12px;
  }
`;

export const ReplyStatus = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;
export const ReplyTime = styled.span`
  margin-right: 12px;
  font-size: 12px;
`;
export const SendComment = styled.button`
  margin-right: 15px;
  font-size: 12px;
`;
export const SettingIcon = styled(Dots)`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

export const MoreComment = styled.button`
  margin-top: 8px;
  font-size: 14px;
`;
