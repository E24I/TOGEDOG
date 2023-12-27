import styled from "styled-components";
import { ReactComponent as Pin } from "../../../assets/images/icons/Marker.svg";

export const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const MapInput = styled.div`
  width: calc(100% - 20px);
  height: 480px;
  margin: 0px auto;
  cursor: pointer;
`;

export const Marker = styled(Pin)<{ xoffset: number; yoffset: number }>`
  display: ${(props) => props.xoffset === 0 && "none"};
  position: absolute;
  left: ${(props) =>
    props.xoffset && `${props.xoffset - 12}px`}; //아이콘 크기에 따라 달라짐
  top: ${(props) =>
    props.xoffset && `${props.yoffset - 35}px`}; //아이콘 크기에 따라 달라짐
  z-index: 999;
`;
