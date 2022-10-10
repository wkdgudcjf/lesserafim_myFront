import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { useRecoilValue } from "recoil";
import styled, { keyframes } from "styled-components";
import {
  ContentWrapper,
  initializePage,
  Mp4Player,
  Page,
  PageBase,
  PngImg,
} from "../components/ContentBase";
import PhotoCards from "../components/PhotoCards";
import texts from "../data/texts";
import { device } from "../styles/theme";
import { curMemberIdx } from "../utils/atoms";
import media from "../utils/media";

const LandingBlockBase = styled(PageBase)`
  background-color: ${(props) => props.bgColor};
  #landing1-wrapper {
    video {
      margin: 0 auto;
    }
    object-fit: fill;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 794px;
    ${media.mobile`
    position:relative;
    object-fit: fill;
    height:auto;
    width:100vw;
    padding-top:40vw;
    `}
  }
`;
const LandingBlock1 = styled(LandingBlockBase)`
  height: 948px;
  ${media.mobile`
  height:auto;`}
  background-color: #000;
`;
const LandingBlock2 = styled(LandingBlockBase)`
  height: 2231px;
  ${media.mobile`
  height:auto;`}
  background-color: #fafafa;

  #photocards {
    margin-top: 73px;
    /* ${media.mobile`margin: 18.2vw 0 18.2vw 0;`} */
  }

  #landing2-desc1 {
    font-size: 50px;
    font-weight: medium;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    text-align: left;
    margin-bottom: 12px;
    margin-top: 50px;
    color: #888;
    ${media.mobile`
    margin-top:3.9vw;
    margin-bottom:0;
      font-size: 28px;
      line-height: 1.21;
  `}
  }

  #landing2-desc2 {
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: #5b5b5b;
    margin-top: 50px;
    margin-bottom: 73px;

    b {
      font-weight: bold;
      color: #111;
    }

    ${media.mobile`
      font-size: 4.68vw;
      line-height: 1.33;
      margin-top:2.6vw;
      margin-bottom:7.8vw;
    `}
  }
  #landing2-container {
    padding-top: 130px;
    ${media.mobile`padding:18.72vw 0 18.62vw 0;`}
  }
`;

const offset = -2500;
const picDiff = 2225;
const delta = 2225;
const slide_1 = keyframes`
  from {
    margin-left: ${offset}px;
  }
  to {
    margin-left: ${offset-delta}px;
  }`;
const slide_2 = keyframes`
  from {
    margin-left: ${offset+picDiff}px;
  }
  to {
    margin-left: ${offset+picDiff-delta}px;
  }`;
const slide_3 = keyframes`
from {
  margin-left: ${offset+picDiff+picDiff}px;
}
to {
  margin-left: ${offset+picDiff+picDiff-delta}px;
}`;


const LandingBlock3 = styled(LandingBlockBase)`
  height: 2522px;
  ${media.mobile`
  height:auto;`}
  background-color: black;

  #scroll-wrapper {
    position: relative;
    width: 100%;
    /* overflow:hidden; */
    z-index: 1000;
    margin-top: 353px;
    #land3-rep {
      position: relative;
      z-index: 101;
      height: 650px;
      width: 420px;
      float: right;
    }
    #land3-scroll {
      z-index: 100;
      position: absolute;
      height: 650px;
      width: 3090px;
      /* visibility:hidden; */
      animation: ${slide_1} 5s linear infinite;
    }
    #land3-scroll2 {
      z-index: 100;
      position: absolute;
      height: 650px;
      width: 3090px;
      animation: ${slide_2} 5s linear infinite;
    }
    #land3_scroll3 {
      /* visibility:hidden; */
      z-index: 100;
      position: absolute;
      height: 650px;
      width: 3090px;
      animation: ${slide_3} 5s linear infinite;
    }
  }
  
  #landing3-desc1 {
    margin-top: 50px;
    margin-bottom: 20px;
    font-size: 50px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.4;
    letter-spacing: normal;
    text-align: left;
    color: #fff;

    ${media.mobile`
      width:75vw;
      font-size: 7vw;
      margin-top: 6.667vw;
      margin-bottom:2.6vw;
      font-weight: 800;
      line-height: 1.29;
  `}
  }

  #landing3-desc2 {
    width: 700px;
    font-size: 24px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: #ccc;
    z-index: 100;
    white-space: normal;
    margin-bottom: 5px;

    ${media.mobile`
    white-space:pre-line;
      width:85vw;
      font-size: 4.8vw;
      line-height: 1.33;    
      margin-bottom:2.6vw;
    `}
  }

  #landing3-desc3 {
    display: block;
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: #888;
    ${media.mobile`font-size:4.16vw;
    margin-bottom:14.04vw;
    `}
  }

  #landing3-container {
    padding-top: 215px;
    ${media.mobile`padding-top:33.8vw`};
  }
  #landing3-bg {
    ${media.mobile`
    position:relative;
    object-fit:contain;
    width:100vw;
    /* height: 352vw; */
    /* background-image: url('/res/etc/landing_bg_m.png'); */
    /* background-size: 100vw auto;
    background-position-y: 66.56vw;
    background-repeat: no-repeat; */
  `}
  }
  .land3-deco-card-bg-on {
      background-image: url("/res/etc/land_bg.png");
    }
  .land3-deco-card-bg {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* left:-75px; */
    /* top:-75px; */
    width: 420px;
    height: 650px;
    /* opacity: 0.2; */
    border-radius: 15px;
    box-shadow: 0 0 50px 0 rgba(118, 118, 118, 0.11);    
    /* background-image: linear-gradient(327deg, #333 97%, #333 2%);     */
    
    background-position:center;
  }

  .scroll-deco-absolute {
    position: absolute;
    z-index: 1000;
  }
  #scroll-desc-visual {
    left: 618px;
    top: 279px;
  }
  #scroll-desc-text {
    left: 981px;
    top: -670px;
  }
  #scroll-desc-audio {
    left: 981px;
    top: 670px;
  }
  #scroll-desc-extra1 {
    left: 981px;
    top: 1335px;
  }
  #scroll-desc-extra2 {
    left: 981px;
    top: -1335px;
  }
  .scroll-deco-signature {
    position: absolute;
    width: 420px;
    height: 650px;
    opacity: 1;
  }
  #audio-scroll-desc-container {
    position: absolute;
    top: 73px;
  }
  #text-scroll-desc-container {
    position: absolute;
    bottom: 73px;
  }
  .scroll-desc-1 {
    opacity: 1;
    position: relative;
    z-index: 1001;
    display: block;
    font-size: 40px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: center;
    color: #fff;
    margin-bottom: 10px;
  }
  .scroll-desc-2 {
    white-space: pre-line;
    opacity: 1;
    display: block;
    z-index: 1001;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    /* line-height: 4.5; */
    letter-spacing: normal;
    text-align: center;
    color: #fff;
  }
  #scroll-audio-deco {
    position: absolute;
    top: -75px;
    left: -75px;
    width: 570px;
    height: 800px;
    /* margin-top:118px; */
  }
`;

const LandingPage1 = ({ bgColor, isMobile }) => {
  return (
    <LandingBlock1 bgColor={bgColor}>
      <ContentWrapper id="landing1-wrapper">
        <Mp4Player
          width={isMobile ? "100%" : "1400px"}
          height="auto"
          src="/res/etc/LS_LOGOMOTION_EDIT_FINAL.mp4"
        />
      </ContentWrapper>
    </LandingBlock1>
  );
};

const LandingPage2 = () => {
  const { t } = useTranslation();
  return (
    <LandingBlock2>
      <ContentWrapper>
        <FlexBox id="landing2-container" color={"#111"}>
          <LandingTitle lang="en">{texts.landing.land2_title}</LandingTitle>

          <span style={{ whiteSpace: "pre-line" }} id="landing2-desc2">
            {t("land2_desc")}
          </span>

          <PhotoCards id="photocards"></PhotoCards>
        </FlexBox>
      </ContentWrapper>
    </LandingBlock2>
  );
};

const landSrc = (idx) => {
  return "res/last/"+idx+"/land";
}
const LandingPage3 = ({ isMobile }) => {
  const memberIdx = useRecoilValue(curMemberIdx)
  const { t, i18n } = useTranslation();
  const langPostfix = i18n.language[0];
  return (
    <LandingBlock3 id="landing3-bgwrapper">
      <ContentWrapper>
        <FlexBox id="landing3-container" color={"#fff"}>
          <div>
            <LandingTitle lang="en">{texts.landing.land3_title}</LandingTitle>
          </div>
          <pre id="landing3-desc1">{t("land3_desc1")}</pre>
          <span id="landing3-desc3">{t("land3_desc3")}</span>
        </FlexBox>

        {!isMobile && (
          <div id="scroll-wrapper">
            <div id="rep-img-container">
              <div
                id="scroll-desc-extra2"
                className="land3-deco-card-bg scroll-deco-absolute land3-deco-card-bg-on"                
              >
                <img
                  alt="sign"
                  className="scroll-deco-signature"
                  src="/res/etc/landing_card_bg.png"
                />
              </div>
              <div id="scroll-desc-visual" className="scroll-deco-absolute">
                <span lang="en" className="scroll-desc-1">
                  VISUAL
                </span>
                <span className="scroll-desc-2">{t("land3_etc_VISUAL")}</span>
              </div>
              <div
                id="scroll-desc-text"
                className="land3-deco-card-bg  scroll-deco-absolute"
              >
                <img
                  alt="sign"
                  className="scroll-deco-signature"
                  src="/res/etc/landing_scroll_vertical_1.png"
                />
                <div id="text-scroll-desc-container">
                  <span lang="en" className="scroll-desc-1">
                    TEXT
                  </span>
                  <span className="scroll-desc-2">{t("land3_etc_TEXT")}</span>
                </div>
              </div>
              <div
                id="scroll-desc-audio"
                className="land3-deco-card-bg scroll-deco-absolute"
              >
                <div id="audio-scroll-desc-container">
                  <span lang="en" className="scroll-desc-1">
                    AUDITORY
                  </span>
                  <span className="scroll-desc-2">
                    {t("land3_etc_AUDITORY")}
                  </span>
                </div>
                <img
                  id="scroll-audio-deco"
                  alt="tape"
                  src="/res/etc/scroll-deco-audio.png"
                ></img>
              </div>
              <img id="land3-rep" alt="card" src="res/land/land3_rep.png"></img>
            </div>
            <img
              id="land3-scroll"
              alt="scroll"
              src="res/land/land3_scroll2.png"
            ></img>
            <img
              id="land3-scroll2"
              alt="scroll"
              src="res/land/land3_scroll2.png"
            ></img>
            <img
              id="land3_scroll3"
              alt="scroll"
              src="res/land/land3_scroll2.png"
            ></img>
            <div
              isBg={true}
              id="scroll-desc-extra1"
              className="land3-deco-card-bg scroll-deco-absolute land3-deco-card-bg-on"
            ></div>
          </div>
        )}
      </ContentWrapper>
      {isMobile && (
        <div>
          <PngImg
            id="landing3-bg"
            alt="landing3-bg"
            src={"res/land/land3_bg_m_" + langPostfix + ".png"}
          />
        </div>
      )}
    </LandingBlock3>
  );
};

const LandingTitle = styled.span`
  ${media.mobile`
  font-size: 8.84vw;
  line-height: 1.11;
  `}
  white-space: pre-line;
  font-size: 100px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.95;
  letter-spacing: normal;
  text-align: left;
`;

const FlexBox = styled.div`
  padding-top: ${(props) => props.paddingTop};
  /* padding-left: 590px; */
  padding-top: 215px;
  color: ${(props) => props.color};
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: baseline;
`;

const PageBlock = styled(Page)``;

const Landing = () => {
  // query and get photo card lists
  //const zoomMeetingSDK = document.getElementById('zmmtg-root')
  // To hide
  //zoomMeetingSDK.style.display = 'none';
  const isMobile = useMediaQuery({ query: device.mobile });
  return (
    <PageBlock {...initializePage(false, "#FAFAFA", false, "141px", "#000")}>
      <LandingPage1 isMobile={isMobile} />
      <LandingPage2 isMobile={isMobile} />
      <LandingPage3 isMobile={isMobile} />
    </PageBlock>
  );
};

export default Landing;
