import React from "react";
import { CategoryForm } from "./Category.style";
import { CategoryElement } from "../../../../types/myPageType";

export const Category: React.FC<CategoryElement> = ({
  title,
  isEditing,
  value,
  setValue,
}) => {
  return (
    <CategoryForm>
      <h3>{title}</h3>
      {isEditing ? (
        <input
          type="text"
          value={value}
          maxLength={20}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      ) : (
        <p>{value}</p>
      )}
    </CategoryForm>
  );
};
