const calcRem = (size) => `${size / 16}rem`;

const fontSizes = {
  title: calcRem(30),
  titleSub: calcRem(23),
  small: calcRem(14),
  base: calcRem(16),
  lg: calcRem(18),
  xl: calcRem(20),
  xxl: calcRem(22),
  xxxl: calcRem(24),
  titleSize: calcRem(50),
};

const paddings = {
  small: calcRem(8),
  base: calcRem(10),
  lg: calcRem(12),
  xl: calcRem(14),
  xxl: calcRem(16),
  xxxl: calcRem(18),
};

const layout = {
  getting: {
    padding_top: "240px",
    padding_bottom: "380px",
  },
  contentwrapper_width: "1400px",
  pagebase_width: "100%",

  d_photoframe_width:"420px",
  d_photoframe_height:"650px",

  m_pedding_left: "5.3%",

  m_photocard_width: "40.3vw",
  m_photocard_height: "62.4vw",

  d_photocard_width: "420px",
  d_photocard_height: "650px",
};

const margins = {
  small: calcRem(8),
  base: calcRem(10),
  lg: calcRem(12),
  xl: calcRem(14),
  xxl: calcRem(16),
  xxxl: calcRem(18),
};

const interval = {
  base: calcRem(50),
  lg: calcRem(100),
  xl: calcRem(150),
  xxl: calcRem(200),
};

const verticalInterval = {
  base: `${calcRem(10)} 0 ${calcRem(10)} 0`,
};

const deviceSizes = {
  mobile: "420px",
  tablet: "768px",
  desktopS: "1400px",
};

const colors = {
  black: "#000000",
  white: "#FFFFFF",
  gray_1: "#222222",
  gray_2: "#767676",
  green_1: "#3cb46e",
  copyright: "#f5f5f5",
  font_main: "#f5f5f5",
  font_footer: "#ffffff",
  font_footer_light: "#111",
  background_landing_1: "#e8e5e5",
  background_landing_2: "#fafafa",
  background_landing_3: "black",

  background_main: "#ffffff",
  background_menu: "#333",
  background_gnb: "#fffeff",
};

export const device = {
  mobile: `only screen and (max-width: ${deviceSizes.mobile})`,
  tablet: `only screen and (max-width: ${deviceSizes.tablet})`,
  desktopS: `only screen and (max-width: ${deviceSizes.desktopS})`,
};
const contentWidth = {
  desktopL: 1400,
  desktopS: 1024,
  mobile: "89.4%",
};

const theme = {
  fontSizes,
  layout,
  colors,
  deviceSizes,
  device,
  paddings,
  margins,
  interval,
  verticalInterval,
  contentWidth,
};
export default theme;
