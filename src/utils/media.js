import { css } from "styled-components";

const sizes = {
  mobile: 420,
};

const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => {
    if (label === "mobile") {
      return css`
        @media only screen and (max-width: ${sizes[label]}px) {
          ${css(...args)};
        }
      `;
    } else if (label === "desktopS") {
      return css`
        @media only screen and (max-width: ${sizes.desktopL}px) and (min-width: ${sizes.mobile}px) {
          ${css(...args)};
        }
      `;
    } else {
      return css`
        @media only screen and (min-width: ${sizes[label]}px) {
          ${css(...args)};
        }
      `;
    }
  };

  return acc;
}, {});

export default media;
