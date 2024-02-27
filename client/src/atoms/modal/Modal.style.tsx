import styled from "styled-components";

export const ModalContainer = styled.div`
  border: 1px solid rgb(215, 215, 215);
  box-shadow: 1px 1px 5px 0.1px rgb(131, 131, 131);
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
  border: 1px solid rgb(215, 215, 215);
  border-radius: 8px;
  width: 100%;
  height: 200px;
  margin-top: 20px;
  padding: 10px;
`;

export const ReportContainer = styled.div`
  background-color: rgb(255, 255, 255);
  border-radius: 18px 18px 0px 0px;
  width: 100%;
  padding: 0px 30px;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

export const ReportlTitle = styled.h2`
  width: 100%;
  margin: 30px 0px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ReportInput = styled.input`
  border-bottom: 1px solid rgb(215, 215, 215);
  width: 100%;
  max-width: 800px;
  margin-top: 60px;
  padding: 10px;
  font-size: 18px;
`;

export const BtnBox = styled.div`
  border-top: 1px solid rgb(215, 215, 215);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const ModalBtn = styled.button`
  text-align: center;
`;

export const CheckBtn = styled(ModalBtn)`
  width: 100%;
  height: 50px;
  padding: 10px 0px;
  &:hover {
    background-color: rgb(215, 215, 215);
  }
  &:active {
    background-color: rgb(162, 162, 162);
  }
`;

export const SendBtn = styled(ModalBtn)`
  background-color: rgb(248, 210, 89);
  border-radius: 8px;
  width: 100%;
  max-width: 240px;
  height: 45px;
  margin: 40px 0px;
`;

export const CloseBtn = styled(ModalBtn)`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 30px;
`;
