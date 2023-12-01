export type CategoryElement = {
  title: string;
  isEditing: boolean;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};
