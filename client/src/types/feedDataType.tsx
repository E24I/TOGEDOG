export type feedListsType = {
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

export type feedReviewsType = {
  feedId: number;
  member: { memberId: number; nickname: string };
  ReplyId: number;
  content: string;
  createdDateTime: string | null;
  modifiedDateTime: string | null;
  replyLike: number;
  fix: boolean;
  comments: boolean;
};
