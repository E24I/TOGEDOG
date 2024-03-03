export type feedListsType = {
  feedId: number;
  member: {
    memberId: number;
    nickname: string;
    imageUrl: string | null;
  };
  content: string;
  title: string;
  images: string[] | [];
  videos: string;
  views: number | null;
  createdDate: string;
  updatedDate: string;
  likeCount: number;
  likeYn: boolean;
  bookmarkYn: boolean;
  address: string | null;
  replyFix: false;
  repliesCount: number;
  wgs84_y: number | null;
  wgs84_x: number | null;
};

export type feedReviewsType = {
  replyId: number;
  content: string;
  member: {
    memberId: number;
    nickname: string;
    imageUrl: string | null;
  };
  createdDate: string;
  updatedDate: string;
  fix: boolean;
  commentCount: number;
  likeCount: number;
  likeYn: boolean;
};

export type pageInformation = {
  page: number;
  size: number;
  totalPage: number;
  totalSize: number;
  first: boolean;
  last: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type feedDetailType = {
  feedId: number;
  member: {
    memberId: number;
    nickname: string;
    imageUrl: string | null;
  };
  content: string;
  title: string;
  images: string[] | [];
  videos: string;
  views: number | null;
  createdDate: string;
  updatedDate: string;
  likeCount: number;
  likeYn: boolean;
  bookmarkYn: boolean;
  address: string | null;
  replyFix: false;
  repliesCount: number;
  replies: {
    replies: feedReviewsType[] | [];
    pageInformation: pageInformation;
  };
};

export type postInformationType = {
  title: string;
  images: string[];
  videos: string;
  content: string;
  addMap: boolean;
  openYn: boolean;
};

export type updateInformationType = {
  title: string;
  content: string;
};

export type feedCommentType = {
  commentId: number;
  member: {
    memberId: number;
    nickname: string;
    imageUrl: string | null;
  };
  createDate: string;
  updateDate: string;
  content: string;
  mention?: string;
};
