import styled from "styled-components";

export const ModalContainer = styled.div`
  background-color: white;
  border: none;
  border-radius: 18px;
  width: 100%;
  max-width: 350px;
  min-height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  overflow: hidden;
`;

export const ModalContents = styled.div`
  border: 1px solid black;
  width: 100%;
  min-height: 120px;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ModalInput = styled.textarea`
  border: 1px solid black;
  border-radius: 8px;
  width: 100%;
  height: 200px;
  margin-top: 20px;
  padding: 10px;
`;

export const BtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const ModalBtn = styled.button`
  width: 50%;
  border: 1px solid black;
  max-height: 50px;
  min-height: 50px;
  padding: 10px 0px;
  text-align: center;
  &:hover {
    background-color: rgb(215, 215, 215);
  }
  &:active {
    background-color: rgb(162, 162, 162);
  }
`;

export const CheckBtn = styled(ModalBtn)``;
export const PositiveBtn = styled(ModalBtn)``;
export const NegativeBtn = styled(ModalBtn)``;
