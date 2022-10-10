import React, { useEffect } from "react";
import styled from "styled-components";
import {
  ContentWrapper,
  EmpableSpan,
  FlexBox,
  initializePage,
  Page,
  PageBase,
  PngImg,
} from "../components/ContentBase";
import { keyframes } from "styled-components";
import texts from "../data/texts";
import media from "../utils/media";
import { useMediaQuery } from "react-responsive";
import { device } from "../styles/theme";
import { nanoid } from "nanoid";
import { useTranslation } from "react-i18next";

const AboutWrapper = styled(PageBase)`
  height: 2643px;
  background-color: #080808;
  overflow: clip;
  padding-top: 240px;

  #warning-wrapper {
    margin: 0 auto;
    margin-top: 150px;
    text-align: center;
    white-space: pre-line;
    color: #888;
    ${media.mobile`    
    white-space:pre-line;
    width:100%;
    margin-top:26vw;
    text-align:left;
    `}
    span {
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.56;
      letter-spacing: normal;
    }
    #warning-title {
      color: #fff;
      display: block;
      margin-bottom: 10px;
      ${media.mobile`
      font-size:4.68vw;
      margin-bottom:5.2vw;
      `}
    }
    #warning-desc {
      line-height: 1.56;
      font-size:18px;
      ${media.mobile`
      font-size: 4.68vw;`}
      
    }
  }

  ${media.mobile`
  height:auto;
  padding-top:${154 * 0.26}vw;
  white-space:pre-wrap;
  `}

  .about-title {
    ${media.mobile`
    white-space:pre-line;
      font-size: 7.8vw;
      line-height: 1.33;
      width:auto;
      height:auto;`}

    width: 474px;
    height: 118px;
    font-size: 50px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
  }

  .about-desc-3 {
    ${media.mobile`height:auto;
      width:89.4vw;
      margin-top:3.9vw;
      font-size:4.16vw;
      line-height:1.5;
      `}
    margin-top: 70px;
    /* width: 726px; */
    height: 353px;
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
  }

  .about-desc-1 {
    ${media.mobile`height:auto;
      font-size:5.72vw;     
      `}
    white-space:pre-line;
    height: 36px;
    font-size: 30px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: left;
  }

  .about-desc-2 {
    ${media.mobile`height:auto;
      font-size:4.16vw;
      line-height:1.5;
      margin-top:5.2vw;`}
    margin-top: 20px;
    height: 58px;
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.416;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
  }
  .roadmap-title {
    ${media.mobile`
      font-size: 30px;
      line-height: 2; 
      `}

    font-size: 50px;
    font-weight: 800;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: center;
    color: #fff;
  }

  .roadmap-detail {
    display:block;
    opacity: 0.79;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    ${media.mobile`
    text-align: left;
    font-size:4.16vw;
    line-height: 1.5;
    letter-spacing:-0.8px;
    `}
    text-align: center;
    color: #fff;
    b {
      font-weight:bold;
    }
  }
  .qurter {
    margin-left: 0 !important;
    display: inline !important;
    color: #fff !important;
  }
  .roadmap-date {
    white-space: break-spaces;
    ${media.mobile`margin-left:20px;
    font-size:30px;
    line-height:2.33;
      `}
    font-size: 45px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.56;
    letter-spacing: normal;
    text-align: center;
    color: #888;
  }
  #bar {
    width: 140px;
    height: 3px;
    margin: 53px auto 58px;
    ${media.mobile`
        margin: 6.5vw auto 0px;
    `}
    opacity: 0.5;
    background-color: #fff;
  }

  .roadmap-subtitle1 {
    display: inline-block;
    font-size: 25px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 2;
    ${media.mobile`line-height:1.5;
    text-align:left;
    margin-right:5vw;
    font-size:6.5vw;`}
    letter-spacing: normal;
    text-align: center;
    color: #cdcdce;
  }
  .roadmap-subtitle2 {
    display: inline-block;
    ${media.mobile`
    font-size:6.24vw;
    margin-bottom: 2.6vw;
    text-align: left;
    white-space:pre-line;
    `}
    margin-bottom: 30px;
    font-size: 24px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: center;
    color: #fff;
  }

  .movingBlock {
    ${media.mobile`
      margin: 17.68vw 0 17.68vw 0;`}
    margin-top: 170px;
    margin-bottom: 170px;
    animation: ${(props) => slide_d} 10s linear infinite;

    ${media.mobile`
    animation:${(props) =>slide_m} 5s linear infinite;
    `}    
    /* margin-left:-2000px; */
    /* margin-left:-4902px; */
    /* margin-left:-1000px; */
  }
  .movingBlock2 {
    position:absolute;
    top:170px;
    left:0px;
    animation: ${(props) => slide_d2} 10s linear infinite;
    ${media.mobile`
    top:17.68vw;
    /* margin-left:-345px; */
    animation:${(props) =>slide_m2} 5s linear infinite;
    `}    
    /* margin-left:824px; */
    /* margin-left:-2078px; */
    /* margin-left:-3823px; */
  }

  #roadmap-rep {
    margin-top: 105px;
    width: 437px;
    height: 360px;
    object-fit: contain;
    ${media.mobile`
      margin-top:0;
      margin-bottom:5.2vw;
      width: 91vw;
      height:auto;
      `}
  }

  #right-column {
    margin-left: 87px;
    ${media.mobile`
    margin-left: 0px;`}
  }

  span pre {
    display: block;
  }
  #roadmap-line-m {
    position: absolute;
    /* top: 10.4vw; */
    /* left: 8vw; */
    /* top:5vw; */
    top: 50%;
    left: 25px;
    width: 1px;
    height: 244.92vw;
    opacity: 0.5;
    /* left:50%; */
    /* z-index: 0; */
    background-color: #707070;
    /* border: solid 1px #707070; */
  }
  #roadmap-line-m-highlight {
    position: absolute;
    width: 1px;
    height: 95.22vw;
    top: 80%;
    transform: translateY(-20%);

    left: 25px;
    z-index: 1000;
    opacity: 0.9;
    background-color: #fff;
  }

  #roadmap-phase {
    width: 100%;
    justify-content: space-between;
    align-items: flex-start;
    ${media.mobile`
    padding: 0`};
    padding: 0 30px;
  }
  .roadmap-check {
    z-index: 1001;
  }
  #roadmap-line {
    position: absolute;
    top: 95px;
    left: 50%;
    transform: translateX(-50%);
  }

  #phase-mobile {
    align-items: flex-start;
    ${media.mobile`
    margin-top:13vw;
    `}
  }
  #phase-dot-date {
    align-items: center;
  }
  .roadmap-descs {
    margin-left: 70px;
  }
  .The-First-Moment-of-LE-SSERAFIM-2022-12-31-3-X-Minting- {
    width: 1116px;
    height: 83px;
    margin: 10px 732px 0;
    opacity: 1;
    font-family: NotoSansCJKkr;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.56;
    letter-spacing: normal;
    text-align: center;
    color: #888;
  }
`;
const Wrapper = styled(ContentWrapper)`
  display: flex;
  flex-direction: column;
`;

const Description = ({ isMobile }) => {
  return (
    <FlexBox row={isMobile ? false : true}>
      <Description1></Description1>
      <Description3 isMobile={isMobile}></Description3>
    </FlexBox>
  );
};

const Description3 = ({ isMobile }) => {
  const {t} = useTranslation();
  // const contents = isMobile
  //   ? texts.about.desc_mobile
  //   : texts.about.desc_desktop;
  return (
    <FlexBox id="right-column" row={false}>
      <div>
        <span className="about-desc-1">{t('about1_desc1')}</span>
        <pre className="about-desc-2">{t('about1_desc2')}</pre>
        <pre className="about-desc-3">{t('about1_desc3')}</pre>
      </div>
    </FlexBox>
  );
};
const Description1 = () => {
  return (
    <FlexBox row={false}>
      <span lang="en" className="about-title">
        {texts.about.about_title}
      </span>
      <PngImg id="roadmap-rep" alt="about img" src="/res/etc/about_rep.png" />
    </FlexBox>
  );
};

const MovingImage = () => {
  const isMobile = useMediaQuery({ query: device.mobile });
  return (
    <div style={{position:'relative'}}>
      <MovingBlock
        className="movingBlock"
        src={"/res/etc/name-animation_" + (isMobile ? "m" : "d") + ".png"}
        alt="moving logo animation"
      />
      <MovingBlock
        className="movingBlock2"
        src={"/res/etc/name-animation_" + (isMobile ? "m" : "d") + ".png"}
        alt="moving logo animation"
      />
    </div>
  );
};

const slide_d = keyframes`
  from {
    margin-left: -2000px;
  }
  to {
    margin-left: -4824px;
  }`;

const slide_d2 = keyframes`
  from {
    margin-left: 824px;
  }
  to {
    margin-left: -2000px;
  }`;
  
const slide_m = keyframes`
  from {
    margin-left: -180px;
  }
  to {
    margin-left: -1256px;
  }`;

const slide_m2 = keyframes`
  from {
    margin-left: 896px;
  }
  to {
    margin-left: -180px;
  }`;

const MovingBlock = styled.img`
  width: 4531px;
  height: 150px;
  ${media.mobile`
    width:1864px;
    height:66px;
    
  `}
  overflow: hidden;
`;

const Phase = ({ idx, isMobile, contents }) => {
  const{ t }= useTranslation();
  const title = t(contents.title[1]);
  const desc1 = t(contents.desc1);
  const desc2 = t(contents.desc2)
  if (isMobile) {
    return (
      <FlexBox id="phase-mobile" row={false}>
        <FlexBox id="phase-dot-date" row={true}>
          <img
            className={idx === 0 && "roadmap-check"}
            alt="roadmap dot"
            src={
              idx === 0 || idx === 1
                ? "/res/icons/roadmap_check.svg"
                : "/res/icons/roadmap_dot.svg"
            }
          />
          <span className="roadmap-date">{contents.date[0]}</span>
          <span className="qurter roadmap-date">{contents.date[1]}</span>
          {isMobile && idx === 0 && (
            <>
              <div id="roadmap-line-m" />
              <div id="roadmap-line-m-highlight" />
            </>
          )}
        </FlexBox>

        <div className="roadmap-descs">
          <span className="roadmap-subtitle1">{contents.title[0]}</span>
          <span className="roadmap-subtitle2">{t(contents.title[1])}</span>
          <EmpableSpan wrap={true} className="roadmap-detail" text={['',desc1, desc2]}></EmpableSpan>
        </div>
      </FlexBox>
    );
  } else {
    return (
      <FlexBox row={false} width={"390px"} justify={"center"} align={"center"}>
        <div className="roadmap-date-container">
          <span className="roadmap-date">{contents.date[0]}</span>
          <span className="roadmap-date qurter">{contents.date[1]}</span>
        </div>
        <img
          alt="roadmap dot"
          src={
            idx === 0 || idx === 1
              ? "/res/icons/roadmap_check.svg"
              : "/res/icons/roadmap_dot.svg"
          }
        />
        <span className="roadmap-subtitle1">{contents.title[0]}</span>
        <span className="roadmap-subtitle2">{title}</span>
        <EmpableSpan wrap={true} className="roadmap-detail" text={['',desc1, desc2]}></EmpableSpan>
      </FlexBox>
    );
  }
};
const RoadmapImage = ({ isMobile }) => {
  const about = texts.about;
  const phaseContents = [about.roadmap1, about.roadmap2, about.roadmap3];
  const phases = phaseContents.map((item, idx) => (
    <Phase idx={idx} key={nanoid()} isMobile={isMobile} contents={item} />
  ));
  return (
    <FlexBox id="roadmap-phase" row={isMobile ? false : true}>
      {!isMobile && (
        <img
          id="roadmap-line"
          alt="roadmap line"
          src="/res/icons/roadmap_line2.svg"
        />
      )}
      {phases}
    </FlexBox>
  );
};
const Roadmap = ({ isMobile }) => {
  const {t} = useTranslation();
  return (
    <FlexBox id="roadmap" row={false} justify={"center"} align={"center"}>
      <span className="roadmap-title">{t('about2_roadmap')}</span>
      <div id="bar"></div>
      <RoadmapImage isMobile={isMobile}>로드맵 이미지</RoadmapImage>
    </FlexBox>
  );
};

// {isMobile ? texts.about.warning.desc : texts.about.warning.desc2}

const Warning = (isMobile) => {
  const {t} = useTranslation();
  return (
    <div id="warning-wrapper">
      <span id="warning-title">{t("about_warning.title")}</span>
      <span id="warning-desc">{t("about_warning.content")}</span>
    </div>
  );
};

const About = () => {
  // setCurrentPage(initializePage(false, "#080808", false, "380px"))
  const isMobile = useMediaQuery({ query: device.mobile });
  return (
    <Page {...initializePage(false, "#080808", false, "114px")}>
      <AboutWrapper>
        <Wrapper>
          <Description isMobile={isMobile}></Description>
          <MovingImage isMobile={isMobile}></MovingImage>
          <Roadmap isMobile={isMobile}></Roadmap>
          <Warning isMobile={isMobile} />
        </Wrapper>
      </AboutWrapper>
    </Page>
  );
};

export default About;
