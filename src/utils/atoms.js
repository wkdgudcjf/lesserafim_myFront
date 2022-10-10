import { atom } from "recoil";

export const curMemberIdx = atom({
  key: "curMemIdx",
  default: 0,
})

export const isGNBAtom = atom({
  key: "isGNB",
  default: false,
});

export const currentPageAtom = atom({
  key: "curPage",
  default: {
    topThemeIsLight: true,
    background_color: "#fafafa",
    bottomTheme: true,
    marginBottom: "380px",
    bottomBgColor: "#080808",
    headerNFooter: true,
  },
});