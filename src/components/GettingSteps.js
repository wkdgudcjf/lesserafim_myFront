import React from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import texts from "../data/texts";
import { device } from "../styles/theme";
import media from "../utils/media";
import { FlexBox } from "./ContentBase";

const StepBlock = styled(FlexBox)``;

const Wrapper = styled.div`
  span {
    width: 100%;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
  }

  .step-box {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    ${media.mobile`
    width: 7.8vw;
    height: 7.8vw;
    `}
    width:30px;
    height: 30px;

    font-size: 16px;
    font-weight: 500;
    line-height: 1.19;
  }
  .step-box-current-dark {
    width: 619px;
    /* padding: 5px 0px 5px 10px; */
    text-align: left;

    ${media.mobile`width:7.8vw;height:7.8vw;`}
    background-color: #fff;
    color: #111;
  }
  .step-current-desk {
    font-size:16px;
    text-align:left;    
    margin-left:10px;
  }
  .step-number {
    display:block;
    width:100%;
    font-size: 18px;
    text-align:center;
    ${media.mobile`
    font-size:4.16vw;
    font-weight:500;
    `}
  }
  .step-box-current-light {
    width: 692px;
    /* padding: 5px 0px 5px 10px; */
    text-align: left;
    ${media.mobile`width:7.8vw;height:7.8vw;
    padding-left:0;
    background-color: #000;`}
    background-color: #000;
    color: #fafafa;
  }
  .step-box-already-dark {
  }
  .step-box-already-light {
  }
  .step-box-not-1 {
    ${media.mobile`
    background-color: #ddd;
    color: #fff;
    `}
    background-color: #5c5c5c;
    color: #fff;
  }
  .step-box-not {   
    background-color: #5c5c5c;
    color: #fff;
  }

  .step-bar {
    ${media.mobile`width: 28.6vw;
    height: 0.52vw;
    background-color: #fff;`}
    width:50px;
    height: 2px;
  }
  .step-bar-dark {
    background-color: #ccc;
    ${media.mobile`background-color: #fff;`}
  }
  .step-bar-light-first {
    background-color: #111;
  }
  .step-bar-light-second {
    background-color: #ddd;
  }
  #step-desc {
    display: block;
    font-size: 4.16vw;
    font-weight: 500;
    line-height: 1.25;
    ${media.mobile`
    white-space:pre-line;
    margin-bottom: 7.8vw;
    margin-top: 2.6vw;
    `}    
    text-align:left;
  }

  #step-container-light {
    ${media.mobile`width:100%`}
    width: 895px;
  }
  #step-container-dark {
    ${media.mobile`width:100%`}
    ${media.mobile`
    margin-top: 7.8vw;
    margin-bottom: 3.9vw;`}
    width:795px;
    margin-top:20px;
    
  }
  .step-container-dark-2 {
    margin-bottom:60px;
  }
  .step-container-dark-3 {
    margin-bottom:30px;
  }
  .step-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;      
  }
  .step-container-1 {
    margin-bottom:80px;  
  }
  .step-box-already-dark {
    background-color: #fff;
    color: #000;
  }
`;

const desktopTexts = () => {
  return [texts.getting.step1_desktop,
  texts.getting.step2_desktop,
  texts.getting.step3_desktop]
};


const generateContents = (isMobile, step, stepDesc) => {
  let temp = [<span className="step-number">01</span>,
  <span className="step-number">02</span>,
  <span className="step-number">03</span>,];

  if (step === "2") {
    temp[0] = <img className="step-already-img" alt="checked" src="/res/icons/chk_icon.svg" />;
  }

  if (step === "3") {
    temp[0] =  <img className="step-already-img" alt="checked" src="/res/icons/chk_icon.svg" />;
    temp[1] = <img className="step-already-img" alt="checked" src="/res/icons/chk_icon.svg" />;
  }

  if (!isMobile) {
    temp[step - 1] = <span className="step-current-desk">{desktopTexts()[step - 1]  + stepDesc[step - 1]}</span>;
  }  
  return temp;
};

const themePostFix = (step) => {
  return step === "1" ? "-light" : "-dark";
};

const getClassName = (id, step) => {
  const themePostfix = themePostFix(step);
  if (id === step) {
    return "step-box-current" + themePostfix;
  } else if (id < step) {
    return "step-box-already" + themePostfix;
  } else {
    if (step === "1") {
      return "step-box-not-1";
    }
    return "step-box-not";
  }
  // return temp + themePostfix;
};

const getAdditionalStepCont = (step)=>{
  if (step==="2") {return "step-container-dark-2"}
  else if (step==="3"){return "step-container-dark-3"}
  else return "step-container-1"
}

const desc_keys = ["getting1_desc1.2", "getting2_desc1.2", "getting3_desc1.2"];
const GettingSteps = ({ step }) => {
  const {t} = useTranslation();
  const stepDescs = [t(desc_keys[0]), t(desc_keys[1]),t(desc_keys[2]) ];
  const isMobile = useMediaQuery({ query: device.mobile });
  const contents = generateContents(isMobile, step, stepDescs);
  const stepBarClassNames =
    !isMobile ? ["step-bar-dark", "step-bar-dark"] :
    step === "1"
      ? ["step-bar-light-first", "step-bar-light-second"]
      : ["step-bar-dark", "step-bar-dark"];
  return (
    <Wrapper>
      <StepBlock
        className={(!isMobile && getAdditionalStepCont(step)) + " step-container "}
        id={"step-container" + themePostFix(step)}
      >
        <div className={"step-box " + getClassName("1", step)}>
          {contents[0]}
        </div>
        <div className={"step-bar " + stepBarClassNames[0]}></div>
        <div className={"step-box " + getClassName("2", step)}>
          {contents[1]}
        </div>
        <div className={"step-bar " + stepBarClassNames[1]}></div>
        <div className={"step-box " + getClassName("3", step)}>
          {contents[2]}
        </div>
      </StepBlock>
      {isMobile && (
        <span id="step-desc">
        {stepDescs[parseInt(step)-1]}
        </span>
      )}
    </Wrapper>
  );
};

export default GettingSteps;
