import React from "react";
import { CategoryForm } from "./Category.style";
import { CategoryElement } from "../../../../types/userInfoType";

export const Category: React.FC<CategoryElement> = ({
  title,
  isEditing,
  value,
}) => {
  return (
    <CategoryForm>
      <h3>{title}</h3>
      {isEditing ? (
        <input type="text" placeholder={value} maxLength={20} />
      ) : (
        <p>{value}</p>
      )}
    </CategoryForm>
  );
};
