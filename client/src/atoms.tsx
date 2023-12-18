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

export const tokenAtom = atom<string | undefined>({
  key: "token",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});
export const memberIdAtom = atom<number | undefined>({
  key: "memberId",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});
// 다른 컴포넌트에서 로그인 비로그인을 따질때는
// import { useRecoilValue } from "recoil";
// import { isLoginAtom } from "~~/atoms";

// const ??? = () => {
//     const isLogin = useRecoilValue(isLoginAtom); // Recoil 상태 조회

//     return (
//       <div>
//         {isLogin ? (
//           <p>로그인 되었습니다</p>
//         ) : (
//           <p>로그인이 필요합니다</p>
//         )}
//       </div>
//     );
//   };

//번외
// import { isLoginAtom } from "./atoms";
// import { useRecoilState } from "recoil";

// const [isLogin, setIsLogin] = useRecoilState(isLoginAtom)
// 이렇게 useState처럼 사용도 가능
