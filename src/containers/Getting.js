import React from "react";
import styled from "styled-components";
import {
  ContentWrapper,
  FlexBox,
  initializePage,
  Page,
} from "../components/ContentBase";
import texts from "../data/texts";
import PhotoCards from "../components/PhotoCards";
import media from "../utils/media";
import GettingSteps from "../components/GettingSteps";
import { currentPageAtom } from "../utils/atoms";
import { useSetRecoilState } from "recoil";
import { useLocation } from "react-router-dom";
import GettingPictureDetail from "./GettingPictureDetail";
import GettingDetail from "./GettingDetail";
import { useTranslation } from "react-i18next";

const GettingWrapper = styled(ContentWrapper)`
  height: 2547px;
  ${media.mobile`height:auto;`}
  /* padding: 154px 0 60px 0; */
  padding-top:154px;
  color: #111;

  .getting-title {
    ${media.mobile`font-size: 7.8vw; width:56.8vw;
      margin-bottom:2.6vw;`}
    font-size: 50px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    text-align: left;
    color: #111;
  }

  .getting-description {    
    ${media.mobile`
        width:77.9vw;
        font-size:4.68vw;
        margin:0;
        line-height:1.33;
        margin-bottom:7.8vw;
        `}
    /* width: 705px; */    
    white-space:pre-line;
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    color: #5b5b5b;
    margin-bottom: 30px;
    margin-top: 12px;
  }
`;

const GettingOverView = ()=>{
  const {t} = useTranslation();
  // ::TODO if needed, add get user photo card first and set userCards to PhotoCards
  const setCurrentPage = useSetRecoilState(currentPageAtom)
  setCurrentPage(initializePage(true, "#FAFAFA", true, "380px"))
  return (
    <Page {...initializePage(true, "#FAFAFA", true, "380px")}>
      <GettingWrapper>
        <FlexBox row={false}>
          <span lang="en" className="getting-title">{texts.getting.landing_title}</span>
          <pre className="getting-description">{t("getting1_desc1.1")}</pre>
          <GettingSteps step="1"/>
          <PhotoCards></PhotoCards>
        </FlexBox>
      </GettingWrapper>
    </Page>
  );
}

const Getting = () => {
  const state = useLocation()?.state;
  if (state === null) {
    return <GettingOverView></GettingOverView>;
  } else if(state.step===2) {
    return <GettingDetail state={state}></GettingDetail>;
  }  else {
    return <GettingPictureDetail state={state}></GettingPictureDetail>
  }
  
};

export default Getting;
