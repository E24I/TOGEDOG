import React from "react";
import { PetListForm, PetImg, PetName } from "./PetList.style";

const PetList: React.FC = () => {
  //펫 이미지, 펫 이름은 props받아야와함
  return (
    <PetListForm>
      <PetImg></PetImg>
      <PetName>마루123 as12</PetName>
    </PetListForm>
  );
};

export default PetList;
