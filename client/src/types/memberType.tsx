//로그인 props
export type InfoProps = {
  email: string;
  password: string;
};

//회원가입 props
export type signUpInfoProps = {
  email: string;
  nickname: string;
  password: string;
  pwConfirm: string;
  agree1: boolean;
  agree2: boolean;
  authentication?: string;
};

// 인증번호 인증하기 props
export type authenticationProps = {
  email: string;
  authentication: string;
  setIsAuthentication: React.Dispatch<React.SetStateAction<boolean>>;
};

// 닉네임 중복확인 props
export type nicknameProps = {
  nickname: string;
  setIsNickName: React.Dispatch<React.SetStateAction<boolean>>;
};
