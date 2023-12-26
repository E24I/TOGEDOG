import React from "react";
import { DropContainer } from "./ButtonDrop.style";

const ButtonDrop: React.FC = () => {
  return (
    <DropContainer>
      <ul>
        <li>a</li>
        <li>b</li>
        <li>c</li>
      </ul>
    </DropContainer>
  );
};

export default ButtonDrop;
