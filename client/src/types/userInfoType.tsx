// 펫프로필 특이사항을 제외한 견종,생일 ....
export type CategoryElement = {
  title: string;
  isEditing: boolean;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

// 유저페이지 게시물을 제외한 정보
export type infoType = {
  email: string;
  image: string | null;
  memberId: number;
  myIntro: string | null;
  nickname: string;
  pet: petDataType;
};

// 유저 get요청시 같이오는 펫 데이터
export type petDataType = {
  createdDateTime: string;
  modifiedDateTime: string;
  name: string;
  age: number;
  type: string;
  personality: string;
  significant: string;
  petIntro: string;
  gender: string;
  image: string;
  petId: number;
};

// 유저 페이지의 펫리스트
export type petlistDataType = {
  name: string;
  image: string | null;
  key: number;
};
