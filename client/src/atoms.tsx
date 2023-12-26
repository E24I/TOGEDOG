import { atom } from "recoil";

export const isLoginAtom = atom<boolean>({
  key: "isLogin",
  default: false,
});
// 다른 컴포넌트에서 로그인 비로그인을 따질때는
// import { useRecoilValue } from "recoil";
// import { isLoginAtom } from "~~/atoms";

// const ??? = () => {
//     const isLogin = useRecoilValue(isLoginAtom); // Recoil 상태 조회

//     return (
//       <div>
//         {isLogin ? (
//           <div>로그인되었습니다</div>
//         ) : (
//           <span>로그인이 필요합니다</span>
//         )}
//       </div>
//     );
//   };

//번외
// import { isLoginAtom } from "./atoms";
// import { useRecoilState } from "recoil";

// const [isLogin, setIsLogin] = useRecoilState(isLoginAtom)
// 이렇게 useState처럼 사용도 가능
