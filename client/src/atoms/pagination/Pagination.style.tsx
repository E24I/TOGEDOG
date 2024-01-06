import styled from "styled-components";
import { ReactComponent as Circle } from "../../assets/images/icons/Circle.svg";

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PaginationBtn = styled.button<{ page?: boolean }>`
  width: 30px;
  height: 30px;
  margin: 5px;
  font-size: 16px;
  font-weight: ${(props) => (props.page ? "600" : "400")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CircleBtn = styled(Circle)<{ page?: boolean }>`
  min-width: 10px;
  height: 10px;
  margin: 0px 3px;
  cursor: pointer;
  circle {
    fill: ${(props) => props.page && "rgb(255, 255, 255)"};
    stroke: rgb(196, 196, 196);
  }
`;
