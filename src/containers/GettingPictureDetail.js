import {
  ContentWrapper,
  FlexBox,
  initializePage,
  Page,
  PageBase,
} from "../components/ContentBase";
import styled from "styled-components";
import texts from "../data/texts";
import Slides from "../components/Slides";
import { AuditorySrc, TextSrc } from "../data/memberList";
import DecoratedRepImg from "../components/DecoratedRepImg";
import media from "../utils/media";
import { useMediaQuery } from "react-responsive";
import { device } from "../styles/theme";
import React, { useState } from "react";
import Dialog from "../components/Dialog";
import GettingSteps from "../components/GettingSteps";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { isLogined, userPhotoCardBitmap } from "../utils/api/api";
import { useTranslation, withTranslation } from "react-i18next";
import { useEffect } from "react";

const PhotoPage1Block = styled(PageBase)`
  background-color: #08080b;
  height: 1254px;
  ${media.mobile`
    height:auto;
  `}
  #privacy-container {
    margin-top: 41px;
  }
  #privacy-agreement-checkbox {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 8px;
    ${media.mobile`

    width: 5.2vw;
    height: 5.2vw;
    margin-left: 0px;
    margin-right: 2.08vw;
    `}
    cursor: pointer;
  }

  #privacy-agreement-desc {
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
  }

  .slide-image {
    /* margin-right: 10px; */
  }

  #getting-button {
    cursor: pointer;
    outline-style: none;
    border: 0;
    display: block;
    width: 100%;
    font-size: 28px;
    font-weight: bold;
    ${media.mobile`
    font-size: 5.2vw;    

    width: 87.1vw;
    height: 18.40vw;
    margin-top: 18.6667vw;
    margin-bottom: 18.6667vw;
    `}
    height: 80px;
    margin-top: 40px;
  }

  .getting-avail {
    background-color: #fff;
    color: #111;
  }
  .getting-normal {
    background-color: #555;
    color: #888;
  }

  #effect-wrapper {
    display: flex;
    ${media.mobile`
    flex-direction:column;
    padding-top: 0;
    height:auto;
  `}
    flex-direction: row;
    height: 1000px;
    width: 100%;
    /* padding-top: 91px; */
    padding-top: 180px;
    overflow: hidden;
    position: relative;
  }
  #show-detail-wrapper {
    position: relative;
    display: block;
    display: flex;
    flex-direction: row;
    align-items: center;

    cursor: pointer;
    img {
      margin-left: 2px;
      width: 14px;
      height: 14px;
      ${media.mobile`
      width:3.73vw;
      height:3.73vw;
      `}
    }
  }

  #show-detail {
    white-space: nowrap;
    display: inline;
    /* width:100px; */
    ${media.mobile`    
    font-size: 16px;
    line-height: 1.5;
  `}
  }

  #step3-desktop-desc {
    font-size: 16px;
    font-weight: 400;
    ${media.mobile` 
    font-size:4.15vw;
    margin-top:7.8vw;
    `}
  }

  #right-column {
    ${media.mobile`
    margin:0;
    height:auto;
    position: relative;
    justify-content: auto;
    `}
    
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: start;
    /* justify-content: end; */
    /* align-items: center; */
    /* position: absolute;
    right: 0;
    bottom: 0; */
    position: relative;
    /* margin-top: 146px; */
    padding-top: 60px;
    margin-left: 75px;
    height: 100%;

    /* .dimmed {
      filter: brightness(50%);
    } */
  }
  #privacy-desc-subcontainer {
    width: 100%;
    justify-content: space-between;
    align-items: center;
    ${media.mobile`
    align-items:start;`}
  }
`;

const SelectableImg = styled.img.attrs((props) => ({
  style: {
    filter: props.selected < 2 ? "brightness( 100%)" : "brightness(50%)",
    border: props.selected === 0 ? "2px solid red" : "0px",
  },
}))`
  margin-right: 10px;
`;

const SlideImageWrapper = ({ idx, selected, name, src, onselect }) => {
  return (
    <>
      {/* <SelectableDiv className="slide-image-wrapper" selected={selected} > */}
      <SelectableImg
        as="img"
        className="slide-image"
        alt={name}
        src={src}
        onClick={() => {
          onselect(idx);
        }}
        selected={selected}
      />
      {/* </SelectableDiv> */}
    </>
  );
};

const getSlidesArgs = (mId, selected1, selected2, onSelect1, onSelect2) => {
  const fstItems = Object.keys(TextSrc.thumbs[mId]).map((i) => {
    const src = "/res/last/"+mId+"/text/" + TextSrc.thumbs[mId][i];
    const selected = selected1 === -1 ? 1 : i === selected1 ? 0 : 2;
    const comp = (
      <SlideImageWrapper
        key={nanoid()}
        idx={i}
        selected={selected}
        name={"moving img : " + i}
        src={src}
        onselect={onSelect1}
      />
    );

    return { src: src, id: i, name: "text img : " + i, component: comp };
  });
  const sndItems = Object.keys(AuditorySrc.thumbs).map((i) => {
    const src = "/res/last/"+mId+"/auditory/" + AuditorySrc.thumbs[i];
    const selected = selected2 === -1 ? 1 : i === selected2 ? 0 : 2;
    const comp = (
      <SlideImageWrapper
        key={nanoid()}
        idx={i}
        selected={selected}
        name={"audio img : " + i}
        src={src}
        onselect={onSelect2}
      />
    );

    return { src: src, id: i, name: "audio img : " + i, component: comp };
  });

  return {
    fstText: "TEXT",
    sndText: "AUDITORY",
    fstItems,
    sndItems,
  };
};

const doesUserAlreayHave = async (mId, setHaveCard)=>{
  const res = await userPhotoCardBitmap();
  const check = [1, 2, 4, 8, 16, 32];
  
  if (res?.data?.header?.code === 200) {
    const bmp = res.data.body.bitmap;
    const result = (bmp & check[mId]) === check[mId];
    setHaveCard(result);
  }
}

const PrivacyAgreement = ({
  state,
  audioSelected,
  txtSelected,
  isMobile,
  setIsOpen,
}) => {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(false);
  const [haveCard, setHaveCard] = useState(false);
  useEffect(()=>{
    if (isLogined()) {
      doesUserAlreayHave(state.mId, setHaveCard);
    }    
  }, []);
  return (
    <>
      <form>
        <FlexBox id="privacy-container" row={true} align={"start"}>
          <input
            id="privacy-agreement-checkbox"
            type="checkbox"
            name="privacyAgreed"
            onClick={(e) => {
              setChecked(e.target.checked);
            }}
          />

          <FlexBox id="privacy-desc-subcontainer" row={isMobile ? false : true}>
            <label
              htmlFor="privacy-agreement-checkbox"
              id="privacy-agreement-desc"
            >
              {t("getting3_desc1.3")}
            </label>
            <div
              id="show-detail-wrapper"
              onClick={() => {
                setIsOpen({ isOpen: true, type: "showDetail" });
              }}
            >
              <span id="show-detail" lang="en">
                {texts.pictureDetail.show_detail}
              </span>
              <img
                id="show-detail-icon"
                alt="show detail"
                src="/res/icons/arr_right.svg"
              />
            </div>
          </FlexBox>
        </FlexBox>
        <input
          id="getting-button"
          type="submit"
          className={
            checked && audioSelected !== -1 && txtSelected !== -1
              ? "getting-avail"
              : "getting-normal"
          }
          value={t("getting3_desc1.4")}
          onClick={(e) => {
            e.preventDefault();
            /*mId,pId,tId,aId*/
            if (!isLogined()) {
              setIsOpen({
                isOpen: true,
                type: "needLogin",
              });
            }  else if (haveCard) {
              setIsOpen({
                isOpen: true,
                type: "haveCard",
              });
            } else if (audioSelected === -1 || txtSelected === -1) {
              setIsOpen({
                isOpen: true,
                type: "checkCond1",
              });
            } else if (!checked) {
              setIsOpen({
                isOpen: true,
                type: "checkCond2",
              });
            } else {
              setIsOpen({
                isOpen: true,
                type: "getPhotoCard",
                idList: [
                  state.mId,
                  state.pId,
                  parseInt(txtSelected),
                  parseInt(audioSelected),
                ],
              });
            }

            // setIsOpen({ isOpen: true, type: "requesting" });
            // check audioSelected / txtSelected
            // setIsOpen({ isOpen: true, type: "needLogin" });
          }}
        />
      </form>
    </>
  );
};

const GettingDescriptions = ({ isMobile, mId }) => {
  const { t } = useTranslation();
  const desc = t("getting3_desc1.1");
  return (
    <>
      {!isMobile && <span id="step3-desktop-desc">{desc}</span>}
      {!isMobile && <GettingSteps step="3" />}
    </>
  );
};

const PhotoPage1 = ({ state, isMobile, setIsOpen, pId }) => {
  const { t } = useTranslation();
  const [textSelected, setTextSelected] = useState(-1);
  const [audioSelected, setAudioSelected] = useState(-1);
  const slideComponents = getSlidesArgs(
    state.mId,
    textSelected,
    audioSelected,
    (selected) => {
      const value = selected === textSelected ? -1 : selected;
      setTextSelected(value);
    },
    (selected) => {
      const value = selected === audioSelected ? -1 : selected;
      setAudioSelected(value);
    }
  );

  return (
    <PhotoPage1Block>
      <DetailWrapper>
        <div id="effect-wrapper">
          <DecoratedRepImg
            step="3"
            pId={pId}
            isMobile={isMobile}
            memberId={state.mId}
            txtId={textSelected}
            audioId={audioSelected}
          />
          {isMobile && (
            <span id="step3-desktop-desc">{t("getting3_desc1.1")}</span>
          )}

          <div id="right-column">
            <GettingDescriptions mId={state.mId} isMobile={isMobile} />
            <Slides {...slideComponents}></Slides>
          </div>
        </div>
      </DetailWrapper>
    </PhotoPage1Block>
  );
};

const PhotoPage2Block = styled(PageBase)`
  background-color: #ffffff;
  height: auto;
  ${media.mobile`
    height:auto;
  `}

  #detail-2 {
    padding-top: 100px;
    ${media.mobile`padding-top:18.2vw;`}
  }

  .description-title {
    ${media.mobile`font-size:4.68vw;
    margin:0;
    margin-bottom:3.9vw;      `}
    font-size: 18px;
    font-weight: bold;
    line-height: 1.11;
    color: #000;
    margin-top: 30px;
  }

  .desc2-margin {
    ${media.mobile`margin-top:0;
    margin-bottom:3.9vw;`}
  }
  .desc1-margin {
    ${media.mobile`
    margin-top:3.9vw;
    margin-bottom:7.8vw;
    `}
    margin-top: 15px;
    margin-bottom: 30px;
  }

  .desc2-item {
    font-size: 16px;
    ${media.mobile`
    font-size:4.2vw;
    margin-left:-1.3vw;
    `}    
    margin-left:-2px;
    color: #888;
  }
  .descrition-desc {
    font-size: 16px;
    ${media.mobile`
    font-size:4.2656vw;
    letter-spacing: -0.4px;
    margin-bottom:2.66vw;
    `}    
    font-weight: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: #888;
  }
  .item-wrapper {
    ${media.mobile`
    margin-bottom:2.66vw;
    `}
  }

  .bar {
    ${media.mobile`
    width:89.4vw;
  `}
    width: 1400px;
    height: 2px;
    background-color: #000;
  }

  .bar-center {
    ${media.mobile`
    width:89.4vw;
  `}
    width: 1400px;
    height: 1px;
    background-color: #ddd;
  }
  #desc2-wrapper {
    margin-left:25px;
    ${media.mobile`margin-top:3.9vw;`}
    margin-top:15px;
    margin-bottom: 30px;
    
  }
  .texts-wrapper {
    ${media.mobile`margin:0;
      padding-top:10vw;
      padding-bottom:10vw;      
      `}
    margin-left:20px;
  }

  

  ul {
    list-style-type:disc;
    list-style-position: outside;
  }
  ul li::marker {
    list-style-image:url("/res/etc/icons/dot-circle.png");
  }
  ul li {
    font-size: 16px;
    ${media.mobile`
    font-size:4.2656vw;
    letter-spacing: -0.4px;
    `}
    font-weight: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: #888;
    /* padding-inline-start: -10px; */
    /* padding-left:-10px;
    list-style-image: url("/etc/icons/dot-circle.png");   */
  }
  /* ul li::marker {
    /* color:#888; */
    /* list-style-image: url("/etc/icons/dot-circle.png");   */
    
    /* list-style; */
  } */


  #circle-wrapper {
    ${media.mobile`align-items:start`}
    #circle {
      width:6.3984vw;
      height:6.3984vw;
      margin: 0;
      background-image: url("/res/icons/dot-circle.png");
      /* margin-top:2.08vw; */
      margin-right:1.064vw;
      /* font-size:4.2656vw; */
      object-fit:contain;
    }
    /* align-items: flex-start; */
  }
  #circle {
    width: 3px;
    height: 3px;
    margin-right: 8px;
    ${media.mobile`margin-top:2.5vw;
    margin-right:2.08vw;
    width:0.78vw;
    height:0.78vw;`}
  }
`;

const DetailWrapper = styled(ContentWrapper)`
  padding-top: 155px;
  ${media.mobile`
    padding-top:41.34vw;
  `}
`;

const PhotoPage2 = ({ mId, isMobile }) => {
  const { t } = useTranslation();
  const warnings = Array.from({ length: 14 }, (x, i) => i).map((i) => {
    return (
      <li key={nanoid()} className="item-wrapper">
        <pre className="desc2-item desc2-margin descrition-desc">
          {t("warnings." + (i + 1))}
        </pre>
      </li>
    );
  });

  return (
    <PhotoPage2Block>
      <DetailWrapper id="detail-2">
        <FlexBox row={false}>
          <div className="bar" />
          <FlexBox className="texts-wrapper" row={false}>
            <span className="description-title">{t("getting3_desc2.1")}</span>
            <pre className="descrition-desc desc1-margin">
              {t("getting3_desc2.2")}
            </pre>
          </FlexBox>
          <div className="bar-center" />
          <FlexBox className="texts-wrapper" row={false}>
            <span className="description-title">{t("warnings.title")}</span>
            <FlexBox id="desc2-wrapper" row={false}>
              <ul>{warnings}</ul>
            </FlexBox>
          </FlexBox>
          <div className="bar" />
        </FlexBox>
      </DetailWrapper>
    </PhotoPage2Block>
  );
};

const GettingPictureDetail = ({ state }) => {
  const navigate = useNavigate();
  // query to get available
  // if not available, show dialog and go back to home
  const [isOpen, setIsOpen] = useState({
    isOpen: false,
    type: "needLogin",
    idList: [],
  });

  const isMobile = useMediaQuery({ query: device.mobile });
  const { mId, pId } = state;

  if (!(mId >= 0 && mId <= 5 && pId >= 0 && pId <= 20)) {
    navigate("/NotFound", { replace: true });
    return <div></div>;
  }

  const TranslatedDialog = withTranslation()(Dialog);

  return (
    <Page
      {...initializePage(false, "#08080b", true, "206px", "#fff")}
      relative="true"
    >
      <PhotoPage1
        pId={pId}
        state={state}
        isMobile={isMobile}
        setIsOpen={setIsOpen}
      ></PhotoPage1>
      <PhotoPage2 mId={state.mId} isMobile={isMobile}></PhotoPage2>
      <TranslatedDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </Page>
  );
};

export default GettingPictureDetail;
