import { createGlobalStyle } from "styled-components";
import media from "../utils/media";
import { useMediaQuery } from "react-responsive";
import { device } from "../styles/theme";
const GlobalStyle = createGlobalStyle`

html {
  .wf-loading pre {
    visibility:hidden;
  }
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  vertical-align: baseline;
  overflow: visible;
  outline:none;
}

html, body {
  height: inherit;
  width: inherit;
  min-width: inherit;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}

button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}

body, #root {
  line-height: normal;  
  background-color:white;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
img {
  font-size:0;
  object-fit:contain;
}
//
a {
  text-decoration: none;  
}
html, span, div, pre {
  font-display:block;
  box-sizing: border-box;  
  :lang(ko) {font-family:'Noto Sans KR', 'Roboto',sans-serif};
  :lang(ja) {font-family:'Noto Sans JP', 'Roboto',sans-serif};
  :lang(en) {font-family:'Roboto', sans-serif};
}
pre {
  white-space: pre-line;
}

video {
  object-fit:fill;
}

div, span, pre, p {
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
}

*, *::before, *::after {
  box-sizing: inherit;
  
  // hide scrollbar
  /* scrollbar-width:none;
  -ms-overflow-style: none; */
}
/* *::-webkit-scrollbar {
  display:none;
} */

`;

export default GlobalStyle;
