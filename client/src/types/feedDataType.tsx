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
  replyId: number;
  replyContent: string;
  createdDateTime: string | null;
  modifiedDateTime: string | null;
  replyLike: boolean;
  fix: boolean;
  commentCount: boolean;
};

export type feedDetailType = {
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
  reply: feedReviewsType[];
};

export type postInformationType = {
  title: string;
  content: string;
  images: string[];
  video: string;
  openYn: boolean;
  mapYn: boolean;
  address: { x: string; y: string };
};
export type updateInformationType = {
  title: string;
  content: string;
};
