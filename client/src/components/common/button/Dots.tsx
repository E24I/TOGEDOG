import React from "react";
import { ReactComponent as DotsImage } from "../../../assets/images/icons/Dots.svg";
import styled from "styled-components";

interface OwnProps {
  width: string;
  height: string;
  handleCustomEvent: () => void;
}

const Dots: React.FC<OwnProps> = ({ width, height, handleCustomEvent }) => {
  return (
    <>
      <Setting />
    </>
  );
};
export default Dots;

export const Setting = styled(DotsImage)`
  width: 15px;
  height: 15px;
  margin: 0px 20px;
  cursor: pointer;
  path {
    fill: rgb(200, 200, 200);
  }
`;
