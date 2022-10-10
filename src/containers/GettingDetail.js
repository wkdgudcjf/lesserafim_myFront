import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ContentWrapper, initializePage, Page } from "../components/ContentBase";
import Slides from "../components/Slides";
import NotFound from "../components/NotFound";
import DecoratedRepImg from "../components/DecoratedRepImg";
import { useMediaQuery } from "react-responsive";
import { device } from "../styles/theme";
import media from "../utils/media";
import GettingSteps from "../components/GettingSteps";
import { WithRequest } from "../hocs/hoc";
import { photoCardValidation } from "../utils/api/api";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { MovingImageSrc, StaticImageSrc } from "../data/memberList";

const Content = styled.div`
  display: flex;
  ${media.mobile`
  flex-direction: column;
  height: auto;
  padding-top:0;
  `}
  flex-direction: row;
  height: 852px;
  padding-top: 32px;
  overflow: hidden;
  position: relative;
  align-items: flex-start;

  #step2-desktop-desc {
    font-weight:normal;
    line-height:1.5;
    ${media.mobile`
    margin-top:5.2vw;
    font-size:4.16vw;
    `}
  }

  /* justify-content: center; */
  /* align-items: center; */
`;

const DescriptionWrapper = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  /* justify-content: end; */
  /* align-items: center; */
  ${media.mobile`
  margin: 0;
  position: relative;
  height: 100%;
  `}

  margin-top: 226px;
  margin-left: 75px;
  position: absolute;
  right: 0;
  bottom: 0;
  /* position: relative; */
  /* height: 100%; */
  .slide-image {
    margin-right: 10px;
  }

  .slider-item-wrapper {
    position:relative;
  }

  .soldout {
    position:absolute;
    top:0;left:0;
    opacity:1;
    ${media.mobile`
    width:120px;
    height:120px;
    `}
    width:140px;
    height:140px;
    margin-right:10px;
    z-index:1000;
  }

  
`;

const GettingDetailWrapper = styled(ContentWrapper)`
  position: relative;
  ${media.mobile`
    padding-top:41.34vw;
    height:auto;
  `}
  height: 1567px;
  margin: 0 auto;
  overflow: hidden;
  padding-top: 240px;
`;

const RightColumn = (props) => {
  const {t} = useTranslation();
  return (
    <DescriptionWrapper>
      {!props.isMobile && <GettingSteps step="2" />}
      <Slides {...props}></Slides>
    </DescriptionWrapper>
  );
};

const getSlidesArgs = (id, step, valids) => { // valids is array of 20 numbers
  const component = (key, state, name, src, valid) => {
    return (
        <Link to={key} state={state}>
        <img className="slide-image" alt={name} src={src} />
        </Link>);
  };

  const staticThumbs = StaticImageSrc.thumbs[id].filter((item) => item.endsWith("png"));
  const movingThumbs = MovingImageSrc.thumbs[id].filter((item)=>item.endsWith("gif"));

  const staticValid = valids.slice(0,10).map(i=>i<1000);
  const movingValid = valids.slice(10,20).map(i=>i<1000);

  const fstItems = Object.keys(staticThumbs).map((i) => {
    const src = "/res/last/"+id+"/fix_image/" + staticThumbs[i];
    const comp = component(
      "/digitalsouvenirs",
      {step: 3, mId:id, pId:parseInt(i)},
      "fixed img : " + i,
      src, staticValid[i]
    );
    return {
      src: src,
      id: i,
      name: "fixed img : " + i,
      component: comp,
      valid: staticValid[i],
    };
  });
  const sndItems = Object.keys(movingThumbs).map((i) => {
    const src = "/res/last/"+id+"/moving_image/" + movingThumbs[i];
    const comp = component(
      "/digitalsouvenirs",
      {step: 3, mId:id, pId:parseInt(i)+10},
      "moving img : " + i,
      src, movingValid[i]
    );
    return {
      src: src,
      id: i,
      name: "moving img : " + i,
      component: comp,
      valid: movingValid[i],
    };
  });

  return {
    fstText: step === 2 ? t("getting2_desc1.3") : "TEXT",
    sndText: step === 2 ? t("getting2_desc1.4") : "AUDITORY",
    fstItems,
    sndItems,
    id,
  };
};

const GettingDetailImpl = (props)=>{

  const {memberId:mId, data, isMobile} = props;
  const valids = data.body.imageValidList;
  
  const MAX_PIC = 1000;
  if (valids.filter(i=>i<MAX_PIC).length === 0) {
    // ::TODO show error dialog and jump to main
  } 

  return (
    <Page {...initializePage(false, "#080808", false, "113px")}>
      <GettingDetailWrapper>
        <Content>
          <DecoratedRepImg step="2" isMobile={isMobile} memberId={mId} />   
          <RightColumn
            mId={mId}
            isMobile={isMobile}
            {...getSlidesArgs(mId, 2, valids)}
          ></RightColumn>
        </Content>
      </GettingDetailWrapper>
    </Page>
  );
  }

const GettingDetail = ({state}) => {
  const isMobile = useMediaQuery({ query: device.mobile });
  const memberId = state.mId;
  if (memberId < 0 || memberId > 5) {
    return <NotFound></NotFound>;
  }

  return WithRequest({
    name: "photoCardValidation" + memberId,
    func: () => {
      return photoCardValidation(memberId);
    },
  }, GettingDetailImpl, {isMobile, memberId}, false);
  // valids
  // state.mid  
};

export default GettingDetail;
