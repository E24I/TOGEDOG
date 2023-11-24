import React from "react";
import { ToggleBtn, ToggleContainer } from "./Toggle.style";

interface OwnProps {
  isOn: boolean;
  handleChageToggle: () => void;
}

const Toggle: React.FC<OwnProps> = ({ isOn, handleChageToggle }) => {
  // 외부에서 아래 주석된 내용을 추가로 입력해서 props로 내려줘야합니다.
  // const [isOn, setOn] = useState<boolean>(false);
  // const handleChageToggle = (): void => {
  //   setOn(!isOn);
  // };

  return (
    <ToggleContainer onClick={handleChageToggle}>
      <ToggleBtn isOn={isOn} />
    </ToggleContainer>
  );
};

export default Toggle;
