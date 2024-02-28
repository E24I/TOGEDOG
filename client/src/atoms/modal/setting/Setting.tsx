import React from "react";
import {
  Insert,
  Pin,
  SettingBtn,
  SettingContainer,
  Siren,
  Trash,
} from "./Setting.style";

type SettingType = {
  수정?: () => void;
  삭제?: () => void;
  신고?: () => void;
  "댓글 고정하기"?: () => void;
  "댓글 고정취소"?: () => void;
};

interface OwnProps {
  elements: SettingType;
  handleSetting?: () => void;
  width: string;
  height: string;
  font: string;
  icon: string;
}

const Setting: React.FC<OwnProps> = ({
  elements,
  handleSetting,
  width,
  height,
  font,
  icon,
}) => {
  // <Dropdown elements={settingContent} /> 의 형태로 props 설정하면 됩니다.
  // 위 Setting 타입설정에 추가할 목록이 있다면 추가해주세요.
  // ex) const settingContent = {수정: handleReplyPatch, 삭제: handleReplyDelete};

  const contents = Object.entries(elements);

  return (
    <SettingContainer onMouseDown={handleSetting}>
      {contents.map((content, idx) => {
        return (
          <SettingBtn
            key={idx}
            onMouseDown={content[1]}
            width={width}
            height={height}
            font={font}
          >
            <span>{content[0]}</span>
            {content[0] === "수정" && <Insert icon={icon} />}
            {content[0] === "삭제" && <Trash icon={icon} />}
            {content[0] === "신고" && <Siren icon={icon} />}
            {content[0] === "댓글 고정" && <Pin icon={icon} />}
          </SettingBtn>
        );
      })}
    </SettingContainer>
  );
};
export default Setting;
