import styled from "styled-components";
import { ReactComponent as InsertIcon } from "./../../../assets/images/icons/InsertIcon.svg";
import { ReactComponent as TrashIcon } from "./../../../assets/images/icons/TrashIcon.svg";
import { ReactComponent as SirenIcon } from "./../../../assets/images/icons/SirenIcon.svg";
import { ReactComponent as PinIcon } from "./../../../assets/images/icons/Pin.svg";

export const SettingContainer = styled.div`
  background-color: rgba(34, 34, 34, 0.4);
  width: 100%;
  height: calc(100% + 6px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -3px;
`;

export const SettingBtn = styled.button<{
  width: string;
  height: string;
  font: string;
}>`
  background-color: rgb(255, 255, 255);
  border-bottom: 1px solid black;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.font};
  display: flex;
  justify-content: center;
  align-items: center;
  &:nth-child(1) {
    border-top-left-radius: 18px;
    border-top-right-radius: 18px;
  }
  &:nth-last-child(1) {
    border: none;
    border-end-start-radius: 18px;
    border-end-end-radius: 18px;
  }
  &:hover {
    background-color: rgb(73, 73, 73);
    color: rgb(255, 255, 255);
  }
  &:active {
    background-color: rgb(73, 73, 73);
    color: rgb(255, 255, 255);
  }
  &:hover {
    path {
      fill: rgb(255, 255, 255);
      stroke: rgb(255, 255, 255);
    }
  }
`;

export const Insert = styled(InsertIcon)<{ icon: string }>`
  width: ${(props) => props.icon};
  height: ${(props) => props.icon};
  margin-left: 10px;
  path {
    stroke: rgb(73, 73, 73);
  }
`;

export const Trash = styled(TrashIcon)<{ icon: string }>`
  width: ${(props) => props.icon};
  height: ${(props) => props.icon};
  margin-left: 10px;
  path {
    fill: rgb(73, 73, 73);
  }
`;

export const Siren = styled(SirenIcon)<{ icon: string }>`
  width: ${(props) => props.icon};
  height: ${(props) => props.icon};
  margin-left: 10px;
  path {
    fill: rgb(73, 73, 73);
  }
`;

export const Pin = styled(PinIcon)<{ icon: string }>`
  width: ${(props) => props.icon};
  height: ${(props) => props.icon};
  margin-left: 10px;
  path {
    fill: rgb(73, 73, 73);
  }
`;

export const Cancel = styled.button`
  margin-top: 10px;
  color: rgb(73, 73, 73);
  font-size: 40px;
  font-weight: 600;

  &:hover {
    color: rgb(215, 215, 215);
  }
`;
