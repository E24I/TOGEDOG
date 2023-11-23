import styled from "styled-components";
import { ReactComponent as Pin } from "../../../../assets/images/icons/Marker.svg";

export const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const MapInput = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

export const Marker = styled(Pin)<{ xOffset: number; yOffset: number }>`
  display: ${(props) => props.xOffset === 0 && "none"};
  position: absolute;
  left: ${(props) =>
    props.xOffset && `${props.xOffset - 12}px`}; //아이콘 크기에 따라 달라짐
  top: ${(props) =>
    props.xOffset && `${props.yOffset - 35}px`}; //아이콘 크기에 따라 달라짐
  z-index: 999;
`;
