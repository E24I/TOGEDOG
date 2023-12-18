import React from "react";
import { Menu, DropDownContainer } from "./Dropdowns.style";

type Setting = {
  수정하기?: () => void;
  삭제하기?: () => void;
  댓글고정?: () => void;
};

interface OwnProps {
  setting: Setting;
  handleCloseDropdown: () => void;
}

const Dropdown: React.FC<OwnProps> = ({ setting, handleCloseDropdown }) => {
  // <Dropdown setting={setting} handleCloseDropdown={handleCloseDropdown} /> 의 형태로 props 설정하면 됩니다.
  // 위 Setting 타입설정에 추가할 목록이 있다면 추가해주세요.
  // ex) const settingContent = {수정하기: handleReplyPatch, 삭제하기: handleReplyDelete};
  // ex) const handleCloseDropdown = () => setDropdown(false);

  const contents = Object.entries(setting);

  return (
    <DropDownContainer onClick={handleCloseDropdown}>
      {contents.map((content, idx) => {
        return (
          <Menu key={idx} onMouseDown={content[1]}>
            {content[0]}
          </Menu>
        );
      })}
    </DropDownContainer>
  );
};

export default Dropdown;
