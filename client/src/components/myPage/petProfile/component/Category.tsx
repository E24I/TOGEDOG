import React from "react";
import { CategoryForm } from "./Category.style";

type CategoryElement = {
  title: string;
  isEditing: boolean;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

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
          value={value}
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
