export const darkTheme = {
  bgColor: "#222222",
  buttonColor: "#FADF84",
  fontColor: "#ffffff",
};
export const lightTheme = {
  bgColor: "#FADF84",
  buttonColor: "#494949",
  fontColor: "#494949",
};
export const theme = {
  lightTheme,
  darkTheme,
};

// styled-compornent theme 사용법

// App.tsx에서 ThemeProvider로 감쌌기 때문에 따로 props를 내려줄 필요없다.
// <ThemeProvider theme={isDarkAtom ? darkTheme : lightTheme}>

// App.tsx와 같은 경로에 theme.tsx 파일이 존재하고 그파일에 다크모드, 라이트모드 객체가 존재
// 따라서 props.theme.(원하는 색상 선택)

// 다른 컴포넌트에서 사용시 바로 props로 상태를 불러올 수 있다.
// ex)
// 다크모드버튼(svg) 색 지정 (path 부분)
// export const DarkMode = styled(Mode)`
//   position: absolute;
//   top: 20px;
//   right: 20px;
//   path {
//     fill: ${(props) => props.theme.buttonColor};
//     transition: fill 0.2s ease 0s;
//   }
//   @media (max-width: 1023px) {
//     display: none;
//   }
// `;

// 위 코드처럼 현재 다크모드 or 라이트모드 에 따라서 버튼 색상이 달라짐
// 원하는 색상이 추가되어야 할 경우 따로 추가해서 사용가능 이해안되는 부분 카톡 ㄱ
