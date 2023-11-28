import React from "react";
import { Menu, DropDownContainer } from "./Dropdowns.style";

interface OwnProps {
  contents: string[];
  handleFunc: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Dropdown: React.FC<OwnProps> = ({ contents, handleFunc }) => {
  // <Dropdown contents={contents} handleFunc={handleFunc} /> 의 형태로 props 설정하면 됩니다.
  // 해당 props 타입은 위에 OwnProps를 확인해주세요.
  // handleFunc 함수는 switch 문을 사용해서 실행하면 될 것 같습니다.
  // ex) const handleFunc = (e) => {switch(e.currentTarget.textContent) {case "신고하기" : console.log("신고 되었습니다.") return;}}

  return (
    <DropDownContainer>
      {contents.map((content, idx) => {
        return (
          <Menu key={idx} onClick={handleFunc}>
            {content}
          </Menu>
        );
      })}
    </DropDownContainer>
  );
};

export default Dropdown;
