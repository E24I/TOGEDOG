import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css";
import App from "./App";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { isAxiosError } from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      retry: 0,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (isAxiosError(error)) {
        if (error.response?.status === 500) {
          // 서버 500 에러
        }
        // 토큰 만료 오류 체크
      }
    },
  }),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <App />
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  </RecoilRoot>,
);
