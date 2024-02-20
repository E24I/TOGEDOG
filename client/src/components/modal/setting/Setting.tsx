import React from "react";
import { SettingBtn, SettingContainer } from "./Setting.style";

type SettingType = {
  수정?: () => void;
  삭제?: () => void;
  신고?: () => void;
  "댓글 고정하기"?: () => void;
};

interface OwnProps {
  elements: SettingType;
}

const Setting: React.FC<OwnProps> = ({ elements }) => {
  // <Dropdown set={set} handleCloseSetting={handleCloseSetting} /> 의 형태로 props 설정하면 됩니다.
  // 위 Setting 타입설정에 추가할 목록이 있다면 추가해주세요.
  // ex) const settingContent = {수정하기: handleReplyPatch, 삭제하기: handleReplyDelete};
  // ex) const handleCloseSetting = () => setSetting(false);

  const contents = Object.entries(elements);

  return (
    <SettingContainer>
      {contents.map((content, idx) => {
        return (
          <SettingBtn key={idx} onMouseDown={content[1]}>
            <span>{content[0]}</span>
          </SettingBtn>
        );
      })}
    </SettingContainer>
  );
};
export default Setting;
