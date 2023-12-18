import React from "react";
import { Link } from "react-router-dom";
import { PetListForm, PetName } from "./PetList.style";
import { petlistDataType } from "../../../types/userInfoType";
import { PetImgForm } from "../../../atoms/imgForm/ImgForm";

const PetList = (propsdata: petlistDataType) => {
  return (
    <PetListForm>
      <Link to={`/petProfile/${propsdata.id}`}>
        <PetImgForm width={80} height={80} radius={50} URL={propsdata.image} />
        <PetName>{propsdata.name}</PetName>
      </Link>
    </PetListForm>
  );
};

export default PetList;
