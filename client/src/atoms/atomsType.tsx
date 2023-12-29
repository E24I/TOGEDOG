export type Size = {
  width: string;
  height: string;
};

export type ImgFormProps = {
  width: number;
  height: number;
  radius: number;
  URL?: string | null;
  onClick?: () => void;
};

export type ProFileBoxProps = {
  width: number;
  height: number;
  radius: number;
};
