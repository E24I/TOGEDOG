import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

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
