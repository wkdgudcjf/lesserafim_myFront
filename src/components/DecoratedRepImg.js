import React from "react";
import { PngImg, Mp4Player } from "./ContentBase";
import styled from "styled-components";
import media from "../utils/media";
import GettingSteps from "./GettingSteps";
import { MovingImageSrc, StaticImageSrc, TextSrc, AuditorySrc } from "../data/memberList";
import { useAudio } from "../utils/audio";

const DecoratedWrapper = styled.div`
  #rep-img-audio {
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
  #rep-img-signed {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 530px;
    height: 820px;
    ${media.mobile`    
      width:87.1vw;
      height:134.42vw;`}
  }
  #rep-img-wrapper {
    position: relative;
  }
  #rep-img {
    display: block;
    width: 530px;
    height: 820px;
    ${media.mobile`    
      width:87.1vw;
      height:134.42vw;
      border-radius:2px;
      `}
    box-shadow: 1px 1px black;
  }

  #react-player {
    display: block;
    width: 530px;
    height: 820px;
    ${media.mobile`    
      width:87.1vw;
      height:134.42vw;
      border-radius:2px;
      `}
    box-shadow: 1px 1px black;
  }

  #deco {
    ${media.mobile`
    position: relative;
    width: 83.72vw;
    height: 24.96vw;
    left:0px;
    `}
    position: absolute;
    width: 746px;
    height: 224px;
    top: 0px;
    left: 459px;
  }
`;

const getAudioSrc = (mId, aId) => {
  if (aId === -1) return null;
  return "/res/last/"+mId+"/auditory/" + AuditorySrc.files[mId][aId];
};

const getImgSrc = (memberId, pId) => {
  if (pId === undefined) {
    return "/res/last/"+memberId+"/getting/card_" + memberId + ".png";
  } else if (pId < 10) {
    return "/res/last/"+memberId+"/fix_image/" + StaticImageSrc.imgs[memberId][pId];
  } else {
    return "/res/last/"+memberId+"/moving_image/" + MovingImageSrc.imgs[memberId][pId - 10];
  }
};

const DecoratedRepImg = ({ pId, step, isMobile, memberId, txtId, audioId }) => {

  const src = getAudioSrc(memberId, audioId);
  const [playing, start, stop] = useAudio(src)
  const toggle = ()=>playing ? stop() : start()
  const repreImgSrc = getImgSrc(memberId, pId);

  var picture;
  if (pId > 9) {
    picture = (
      <Mp4Player
        id="react-player"
        src={repreImgSrc}
        alt="react-player"
        isMobile={isMobile}
      ></Mp4Player>
    );
  } else {
    picture = <PngImg id="rep-img" src={repreImgSrc} alt="rep img"></PngImg>;
  }

  const repImg = (
    <div id="rep-img-wrapper">
      {step === "3" && audioId !== -1 && (
        <img
          id="rep-img-audio"
          alt="audio"
          src={
            !playing ? "/res/icons/icon_play.png" : "/res/icons/icon_stop.png"
          }
          onClick={toggle}
        />
      )}
      {step === "3" && txtId >= 0 && (
        <img
          id="rep-img-signed"
          alt="signed"
          src={"/res/last/"+memberId+"/text/" + TextSrc.imgs[memberId][txtId]}
        />
      )}
      {picture}
    </div>
  );

  const decoImg = (
    <img
      id="deco"
      alt="decoration"
      src={"/res/last/"+memberId+"/getting/member_view_title_" + memberId + (isMobile ? "_m": "") + ".png"}
    />
  );

  if (isMobile) {
    return (
      <DecoratedWrapper>
        {decoImg}
        <GettingSteps step={step}></GettingSteps>
        {repImg}
      </DecoratedWrapper>
    );
  } else {
    return (
      <DecoratedWrapper>
        {repImg}
        {decoImg}
      </DecoratedWrapper>
    );
  }
};

export default DecoratedRepImg;
