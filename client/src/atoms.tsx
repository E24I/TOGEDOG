import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { roomsDataType } from "./types/chatType";

const { persistAtom } = recoilPersist({
  key: "TOGEDOG",
  storage: sessionStorage,
});

export const isLoginAtom = atom<boolean>({
  key: "isLogin",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const tokenAtom = atom<string>({
  key: "token",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const memberIdAtom = atom<number | undefined>({
  key: "memberId",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

export const theOtherMemberIdAtom = atom<number | undefined>({
  key: "theOtherMemberId",
  default: undefined,
});

export const chatRoomIdAtom = atom<number | undefined>({
  key: "chatRoomId",
  default: undefined,
});

export const alreadyExistChatMemberAtom = atom<object>({
  key: "chatMembers",
  default: undefined,
});

export const alertAtom = atom<string>({
  key: "alert",
  default: "",
});

type confirmType = {
  sort: string;
  content: string;
  currentPetId: string | undefined;
};

export const confirmAtom = atom<confirmType>({
  key: "confirm",
  default: {
    sort: "",
    content: "",
    currentPetId: undefined,
  },
});

type reportType = {
  sort: string;
  feedId: number | undefined;
  replyId: number | undefined;
  commentId: number | undefined;
  chatRoomId: number | undefined;
};

export const reportAtom = atom<reportType>({
  key: "report",
  default: {
    sort: "",
    feedId: undefined,
    replyId: undefined,
    commentId: undefined,
    chatRoomId: undefined,
  },
});

export const darkAtom = atom<boolean>({
  key: "isDark",
  default: false,
});

export const replyAtom = atom<{
  replyId: number | undefined;
  nickname: number | undefined;
}>({
  key: "reply",
  default: { replyId: undefined, nickname: undefined },
});
