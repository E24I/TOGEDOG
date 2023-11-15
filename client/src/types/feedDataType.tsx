export type feedList = {
  feedId: number;
  title: string;
  content: string;
  createDate: string;
  createTime: string;
  media: {
    imgUrl: string[] | undefined;
    videoUrl: string | undefined;
  };
  address: string | undefined;
  location: string | undefined;
  member: {
    memberId: number;
    nickname: string;
    profileUrl: string | undefined;
  };
  isLiked: boolean;
  isMarked: boolean;
  likeCount: number;
  replyCount: number;
};

export type postInformationType = {
  title: string;
  content: string;
  state: boolean;
  map: boolean;
  address: string;
};
