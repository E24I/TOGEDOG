import { feedList } from "../../types/feedDataType";

export const feedLists: feedList[] = [
  {
    feedId: 1,
    title: "애카가서 신난 몽자",
    content:
      "저히 몽자 오늘 애견카페가서 아주 신나게 놀다왔답니당 다들 저히 기여운 몽자 보고 가세요",
    createDate: "2023-11-06",
    member: {
      memberId: 1,
      nickname: "세계최강 귀요미 몽자",
      profileUrl: "",
    },
    address: "멍멍애견카페",
    location: "",
    media: {
      imgUrl: ["1", "2", "3", "4"],
      videoUrl: "",
    },
    isLiked: false,
    isMarked: false,
    likeCount: 12,
    replyCount: 56,
  },
  {
    feedId: 1,
    title: "혹시 푸들 친구들 최애 장난감 뭔가요?",
    content:
      "저희 마루는 이제 10개월 된 귀요미 간장 푸들입니다. 혹시 이 시기즈음 푸들 친구들은 최애 장난감이 무엇이었는지 공유해주실 수 있을까요???!!!",
    createDate: "2023-11-07",
    media: {
      imgUrl: undefined,
      videoUrl: undefined,
    },
    address: undefined,
    location: undefined,
    member: {
      memberId: 1,
      nickname: "마루언니",
      profileUrl: undefined,
    },
    isLiked: false,
    isMarked: false,
    likeCount: 12,
    replyCount: 5,
  },
  {
    feedId: 1,
    title: "중랑천 애견쉼터 좋네요",
    content:
      "중랑천 애견쉼터 처음 가봤는데 강아지들도 많고 너무 재미있게 놀다 왔습니당 추천해요! 중랑천 애견쉼터 처음 가봤는데 강아지들도 많고 너무 재미있게 놀다 왔습니당 추천해요! 중랑천 애견쉼터 처음 가봤는데 강아지들도 많고 너무 ... 더 보기",
    createDate: "2023-11-08",
    media: {
      imgUrl: ["1", "2", "3"],
      videoUrl: "",
    },
    address: "중랑천애견쉼터",
    location: "",
    member: {
      memberId: 1,
      nickname: "포메복돌이",
      profileUrl: "",
    },
    isLiked: false,
    isMarked: false,
    likeCount: 12,
    replyCount: 4,
  },
];
