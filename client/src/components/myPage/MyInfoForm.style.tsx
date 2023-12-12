import { styled } from "styled-components";
import { ReactComponent as AddVersion2 } from "../../assets/images/icons/AddVersion2.svg";

export const MyInfoContainer = styled.div`
  width: 50%;
  margin: 0 auto;
  .img {
    width: 150px;
    height: 150px;
    background: #d7d7d7;
  }
`;

export const ProFileBox = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NickName = styled.h2`
  text-align: center;
  margin: 50px 0 15px 0;
`;

export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ProFileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: gray;
`; //추후 이미지 태그로 바꿀것

export const Introduction = styled.p`
  margin-top: 10px;
`;

export const SectionBox = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

//추후 어드벤스드
// export const ListSection = styled.div`
//   margin: 20px 0;
//   display: flex;
//   justify-content: space-around;
//   div {
//     text-align: center;
//     p {
//       font-weight: bold;
//     }
//   }
// `;

export const ButtonSection = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  position: relative;
`;

export const Button1 = styled.button`
  width: 160px;
  height: 40px;
  background: #d7d7d7;
  border-radius: 5px;
`;
export const Button2 = styled.button`
  width: 160px;
  height: 40px;
  background: #d7d7d7;
  border-radius: 5px;
`;
export const MoreButton = styled.button`
  width: 50px;
  height: 40px;
  background: #d7d7d7;
  border-radius: 5px;
`;

export const PetListBox = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 50px 0;
`;

export const PetAdd = styled(AddVersion2)`
  margin: 20px 10px;
`;
