import styled from "styled-components";
import media from "../utils/media";
import Footer from "./Footer";
import ReactPlayer from "react-player/lazy";
import React from "react";
export const ContentWrapper = styled.div`
  display: block;
  position: relative;
  overflow: visible;
  width: ${({ theme }) => theme.contentWidth.desktopL}px;
  ${media.mobile`width:${({ theme }) => theme.contentWidth.mobile}`};
  margin: 0 auto;
`;

export const PageBase = styled.div`
  display: block;
  position: relative;
  margin: 0 auto;
  height: 100%;
  overflow: hidden;

  width: 100%;
  padding-top: ${(props) => props.padding_top};
  padding-bottom: ${(props) => props.padding_bottom};
  min-width: ${({ theme }) => theme.contentWidth.desktopL}px;
  ${media.mobile`
      width:100%;
      min-width:${({ theme }) => theme.contentWidth.mobile};
      padding-bottom:0px;
  `}
`;

const PageBaseBlock = styled(PageBase)`
  background-color: ${({ background_color }) => background_color};
  /* background-color: #08080b; */
`;

export const initializePage = (
  topThemeIsLight,
  background_color,
  bottomTheme,
  marginBottom,
  bottomBgColor = background_color
) => {
  return {
    topThemeIsLight: topThemeIsLight,
    background_color,
    bottomTheme,
    marginBottom,
    bottomBgColor,
  };
};

export const Page = (props) => {
  return (
    <div>
      <PageBaseBlock id="PageBase" background_color={props.background_color}>
        {props.children}
      </PageBaseBlock>
      <Footer
        relative={props.relative}
        headerNFooter={props.headerNFooter}
        bgColor={props.bottomBgColor}
        isLight={props.bottomTheme}
        marginBottom={props.marginBottom}
      ></Footer>
    </div>
  );
};

export const EmpableSpan = (props) => {
  if (typeof(props.text) ==='string') {
    return (<span style={props.wrap && { "white-space": "pre-line" }} {...props}>
    {props.text}
    </span>)
  }
  return (
    <span style={props.wrap && { "white-space": "pre-line" }} {...props}>
      {props.text[0]}
      <b>{props.text[1]}</b>
      {props.text[2]}
    </span>
  );
};

export const PngImg = (props) => {
  if (props.styledImg != null) {
    return (
      <props.styledImg
        id={props.id}
        className={props.className}
        alt={props.alt}
        src={props.src}
        // src={props.src + ".png"}
        // srcSet={props.src + "@2x.png 2x " + props.src + "@3x.png 3x"}
      ></props.styledImg>
    );
  } else {
    return (
      <img
        id={props.id}
        className={props.className}
        alt={props.alt}
        src={props.src}
        // src={props.src + ".png"}
        // srcSet={props.src + "@2x.png 2x " + props.src + "@3x.png 3x"}
      ></img>
    );
  }
};

export const Mp4Player = React.memo(function MP4Player(props) {
  return (
    <ReactPlayer
      id={props.id}
      url={props.src} // 플레이어 url
      width={props.width ? props.width : props.isMobile ? "87.1vw" : "530px"}
      height={
        props.height ? props.height : props.isMobile ? "134.42vw" : "820px"
      }
      playsinline={true}
      volume={0}
      loop={true}
      playing={true} // 자동 재생 on
      muted={true} // 자동 재생 on
      controls={false} // 플레이어 컨트롤 노출 여부
      light={false} // 플레이어 모드
      pip={false} // pip 모드 설정 여부
      style={{"borderRadius": "2%", overflow: "clip" }}
      onClick={props.onClick}
    />
  );
});
// id={props.id}
// className={props.className}
// alt={props.alt}
// src={props.src + ".png"}
// srcSet={props.src + "@2x.png 2x " + props.src + "@3x.png 3x"}

export const FlexBox = styled.div`
  position: relative;
  display: flex;
  width: ${({ width }) => width};
  flex-direction: ${({ row }) => (row ? `row` : `column`)};
  justify-content: ${({ justify }) => justify};
  align-items: ${({ align }) => align};
`;

export const FlexBox2 = styled.div`
  position: relative;
  display: flex;
  width: ${({ width }) => width};
  flex-direction: ${({ row }) => (row ? `row` : `column`)};
  justify-content: ${({ justify }) => justify};
  align-items: ${({ align }) => align}; ;
  background-color: black;
`;


export const FlexBox3 = styled.div`
  position: relative;
  display: flex;
  width: ${({ width }) => width};
  flex-direction: ${({ row }) => (row ? `row` : `column`)};
  justify-content: ${({ justify }) => justify};
  align-items: ${({ align }) => align}; ;
  background-color: white;
  align-items: center;
`;

export const FlexBox4 = styled.div`
  position: relative;
  display: flex;
  height: 788px;
  width: ${({ width }) => width};
  flex-direction: ${({ row }) => (row ? `row` : `column`)};
  justify-content: ${({ justify }) => justify};
  align-items: ${({ align }) => align}; 
  background-image: url("/res/live/live_back.png");
  background-size: contain;
  ${media.mobile`
    width:100%;
    min-width:${({ theme }) => theme.contentWidth.mobile};
    height: 50vw;
  `}
`;


export const FlexBox5 = styled.div`
  position: relative;
  display: flex;
  width: ${({ width }) => width};
  height: 80px;
  flex-direction: ${({ row }) => (row ? `row` : `column`)};
  justify-content: ${({ justify }) => justify};
  align-items: ${({ align }) => align}; ;
  background-color: white;
  align-items: center;
  ${media.mobile`
    width:70vw;
    min-width:${({ theme }) => theme.contentWidth.mobile};
    height: 16vw;
  `}
`;

export const FlexBox6 = styled.div`
  position: relative;
  display: flex;
  width: ${({ width }) => width};
  height: 80px;
  padding: 10px;
  flex-direction: ${({ row }) => (row ? `row` : `column`)};
  justify-content: ${({ justify }) => justify};
  align-items: ${({ align }) => align}; ;
  background-color: white;
  align-items: center;
  ${media.mobile`
    width:50vw;
    min-width: 0vw;
    height: 16vw;
    padding: 1vw;
  `}
`;

export const FlexBox7 = styled.div`
  position: relative;
  display: flex;
  width: ${({ width }) => width};
  height: 80px;
  padding: 10px;
  flex-direction: ${({ row }) => (row ? `row` : `column`)};
  justify-content: ${({ justify }) => justify};
  align-items: ${({ align }) => align}; ;
  background-color: white;
  align-items: center;
  ${media.mobile`
    width:20vw;
    min-width: 0vw;
    height: 16vw;
    padding: 1vw;
  `}
`;

export const Bar = styled.div`
  width: 100%;
  background-color: ${(props) => props.bgColor};
  height: ${(props) => props.height};
`;
