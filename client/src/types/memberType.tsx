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
  authNum: string;
  setIsAuthentication: React.Dispatch<React.SetStateAction<boolean>>;
};

// 닉네임 중복확인 props
export type nicknameProps = {
  nickname: string;
  setIsNickName: React.Dispatch<React.SetStateAction<boolean>>;
};

// 유저 페이지(마이페이지) props타입
export interface MyInfoFormProps {
  pageMemberId: string | undefined;
}

// 유저페이지(마이페이지) 피드 데이터 타입
type feedDataType = {
  content: string;
  createdDate: string;
  feedId: number;
  images: string[];
  likeCount: number;
  repliesCount: number;
  updatedDate: string;
  title: string;
  videos: string;
  views: null | number;
};
