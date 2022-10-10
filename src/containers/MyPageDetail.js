import React , {useState} from "react";
import { ContentWrapper, FlexBox, initializePage, Page } from "../components/ContentBase";
import MyPageTitle from "../components/MyPageTitle";
import styled from "styled-components";
import texts from "../data/texts";
import { device } from "../styles/theme";
import { useMediaQuery } from "react-responsive";
import media from "../utils/media";
import PhotoFrame from "../components/PhotoFrame";
import BackPhotoFrame from "../components/BackPhotoFrame";
import { AuditorySrc, MovingImageSrc, StaticImageSrc, TextSrc } from "../data/memberList";
import { WithErrorHandler } from "../hocs/hoc";
import { useAudio } from "../utils/audio";
import { useTranslation } from "react-i18next";

const MyPageDetailWrapper = styled(ContentWrapper)`
  height: 1669px;
  padding-top: 240px;
  ${media.mobile`
  height:auto;
  
  padding-top:40.4vw;
  `}

  #photo-desc {
    ${media.mobile` width:100%;
     `}
    margin-top: 30px;
    width: 66%;
  }

  /* margin-top:10.4vw;
      margin-bottom:2.6vw; */
  #photo-desc-title {
    ${media.mobile` font-size:4.68vw;
      line-height:1.11;`}
    font-size: 22px;
    font-weight: bold;
    line-height: 3.18;
    text-align: left;
    color: #333;
  }
  #photo-desc-bar {
    height: 2px;
    background-color: #333;
  }

  #photo-desc-bar-narrow {
    height: 1px;
    background-color: #ddd;
  }

  .photo-desc-left {
    float: left;
    font-size: 18px;
    font-weight: bold;
    line-height: 1.33;
    letter-spacing: normal;
    color: #404040;
  }

  .photo-desc-right {
    float: right;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: right;
    color: #5b5b5b;
  }
  #photo-desc-flex {
    justify-content: space-between;
    height: 163px;
  }
  #photo-cards {
    margin: 30px 0 30px 0;
  }

  .thumb-image {
    width: 156px;
    height: 156px;
    ${media.mobile` 
    width:27.56vw;
    height:27.56vw;`}
  }

  .thumb-image2 {
    width: 900px;
    height: 156px;
    object-fit: fill;
    ${media.mobile` 
    width:27.56vw;
    height:27.56vw;`}
  }

  .photo-frame {
    width: 420px;
    height: 650px;
    margin-right: 50px;
    ${media.mobile` width:86.4vw;
    height:auto;    
    height:auto;
    margin-top:0vw;    
    margin-top:1vw;
    margin-bottom:3vw;`}
    border-radius: 2%;
    box-shadow: 0px 0px 3px #8f8f8f;
  }
  
  .photo-frame2 {
    width: 420px;
    height: 650px;
    ${media.mobile` width:86.4vw;
    height:auto;    
    margin-top:1vw;
    margin-bottom:3vw;`}
    border-radius: 2%;
    box-shadow: 0px 0px 3px #8f8f8f;
    cursor: pointer;
  }

  #photo-card-signature {
    position: absolute;
    width: 420px;
    height: 650px;
    ${media.mobile`width:86.4vw;
    height:auto;`}

    top: 0px;
    left: 0px;
  }

  #photo-frame-front {
    margin-right: -20px;
    ${media.mobile`margin-right:0;`}
  }

  #front-photo-container {
    margin-right : 50px;
    position: relative;
    ${media.mobile`margin-right:0;`}
  }
  #audio-play-icon {
    z-index: 1000;
    position: absolute;
    width: 70px;
    height: 70px;

    bottom: 30px;
    left: 20px;
    ${media.mobile`
    width:14.56vw;
    height:14.56vw;    
    bottom:10.6vw;
    left:10.6vw;
    `}
  }
  .updown { border: 0.5px solid #ddd; width: 0.1px; margin-right: 50px; }
  .option { 
    margin-right: 30px;
    ${media.mobile`
    margin-right: 10px;
    `}
  }
`;

const MyPageDetailImpl = ({state, needLogin}) => {
  const {t} = useTranslation();
  let {mId, pId, tId, aId, frontUrl, backUrl} = state;

  const pSrc = "/res/last/"+mId+"/" + (pId > 9 ? "moving_image/"+MovingImageSrc.imgs[mId][pId-10] : "fix_image/" + StaticImageSrc.imgs[mId][pId]);
  const tSrc = "/res/last/"+mId+"/text/"+ TextSrc.imgs[mId][tId];
  const aSrc = "/res/last/"+mId+"/auditory/" + AuditorySrc.files[mId][aId];
  const isMobile = useMediaQuery({ query: device.mobile });

  const FrontPhoto = () => {
    const [playing, start, stop] = useAudio(aSrc)
    const toggle = ()=>playing ? stop() : start()

    return (
      <div id="front-photo-container">
        <PhotoFrame
          large={true}
          pId={pId}
          id="photo-frame-front"
          className="photo-frame"
          alt="card front"
          isMobile={isMobile}
          src={pSrc}
        />
        <img
          id="audio-play-icon"
          alt="play auditory"
          src={!playing ? "/res/icons/icon_play.png" : "/res/icons/icon_stop.png"}
          onClick={toggle}
        />
        <img id="photo-card-signature" alt="signature" src={tSrc} />
      </div>
    );
  };

  const BackPhoto = () => {
    return (
      <BackPhotoFrame
        large={true}
        className="photo-frame"
        alt="card back"
        src="/res/mypage/Photocard_back.png"
      />
    );
  };

  const thumbP = "/res/last/"+mId+"/" + (pId > 9 ? "moving_image/"+MovingImageSrc.thumbs[mId][pId-10] : "fix_image/" + StaticImageSrc.thumbs[mId][pId]);
  const thumbT = "/res/last/"+mId+"/text/" + TextSrc.thumbs[mId][tId];
  const thumbA = "/res/last/"+mId+"/auditory/" + AuditorySrc.thumbs[aId];

  frontUrl = process.env.REACT_APP_S3_URL+"/"+frontUrl;
  backUrl = process.env.REACT_APP_S3_URL+"/"+backUrl;
  const [realUrl, setRealUrl] = useState(frontUrl);
  const [pid, setPid] = useState(0);
  return (
    <Page {...initializePage(true, "#fafafa", true, "10px")}>
      <MyPageDetailWrapper>
        <MyPageTitle land="en" {...texts.mypage}></MyPageTitle>
        <FlexBox row={isMobile ? false : true} justify={"flex-start"}>
          {isMobile ? (
            <>
              <FrontPhoto />
              <BackPhoto />
              {realUrl !== process.env.REACT_APP_S3_URL+"/null" ? (
                      <PhotoFrame
                          large={true}
                          pId={pid}
                          className="photo-frame2"
                          alt="card front"
                          isMobile={isMobile}
                          src={realUrl}
                          onClick={()=>{
                            if(realUrl === frontUrl) {
                              setRealUrl(backUrl)
                              if(backUrl.charAt(backUrl.length-1) === '4') {
                                setPid(10)
                              } else {
                                setPid(0)
                              }
                            } else {
                              setRealUrl(frontUrl)
                              setPid(0)
                            }
                          }}
                        />
                    ):(
                      <div></div>
                    )
              }
            </>
          ) : (
            <>
              <FrontPhoto />
              <BackPhoto />
              <div className="updown"></div>
              {realUrl !== process.env.REACT_APP_S3_URL+"/null" ? (
                      <PhotoFrame
                        large={true}
                        pId={pid}
                        className="photo-frame2"
                        alt="card front"
                        isMobile={isMobile}
                        src={realUrl}
                        onClick={()=>{
                          if(realUrl === frontUrl) {
                            setRealUrl(backUrl)
                            if(backUrl.charAt(backUrl.length-1) === '4') {
                              setPid(10)
                            } else {
                              setPid(0)
                            }
                          } else {
                            setRealUrl(frontUrl)
                            setPid(0)
                          }
                        }}
                    />
                    ):( 
                      <div></div>
                    )
              }
            </>
          )}

        </FlexBox>
        <div id="photo-desc">
            <span id="photo-desc-title">{t('mypage2')}</span>
            <div id="photo-desc-bar"></div>
            <FlexBox id="photo-cards" row={true} justify={"center"}>
              <div className="option" id="thumb-visual">
                <img
                  className="thumb-image"
                  alt="visual thumbnail"
                  src={thumbP}
                ></img>
              </div>
              <div className="option" id="thumb-text">
                <img
                  className="thumb-image"
                  alt="text thumbnail"
                  src={thumbT}
                ></img>
              </div>
              <div className="option" id="thumb-auditory">
                <img
                  className="thumb-image"
                  alt="auditory thumbnail"
                  src={thumbA}
                ></img>                
              </div> 
            </FlexBox>
            <div id="photo-desc-bar"></div>
          </div>
      </MyPageDetailWrapper>
    </Page>
  );
};

const MyPageDetail = ({state, needLogin}) => {
  return WithErrorHandler(MyPageDetailImpl, {state, needLogin});
}

export default MyPageDetail;
