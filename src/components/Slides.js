import React from "react";
import styled from "styled-components";
import media from "../utils/media";
import { useMediaQuery } from "react-responsive";
import { device } from "../styles/theme";
import Slider from "./Slider";
import { nanoid } from "nanoid";

const Wrapper = styled.div`
  ${media.mobile`
    margin-top:7.8vw;
    margin-bottom:7.8vw;
  `}

  position: relative;
  overflow: hidden;
  #shadow {
    transform: none;
    position: absolute;
    ${media.mobile`
    width:151px;
    height:385px;
    right:-16.9vw;
    top:-10px;    
    `}
    width: 520px;
    height: 535px;
    right: -260px;
    top: 0px;
    z-index: 1000;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), #000);
  }
  span {
    display: block;
  }

  .bar {
    margin-top: 12px;
    margin-bottom: 20px;
    width: 100%;
    height: 2px;
    background-color: #333;
    ${media.mobile`
    margin-top:2.6vw;
    margin-bottom:2.6vw;`}
  }
  #sndText {
    margin-top: 50px;
    ${media.mobile`
      margin-top:7.8vw;
    `}
  }
  .slide-image {
    border-radius: 3px;
    width: 140px;
    height: 140px;
    ${media.mobile`
    width:120px;
    height:120px;`}
  }
  .slider-title {
    font-weight:500;
    font-size:24px;
    ${media.mobile`
    font-size:4.68vw;
    line-height:1;
    `}
  }

  #slider-fst {
    margin-bottom:50px;
    ${media.mobile`margin-bottom:7.8vw;`}    
  }
`;

const RowBar = styled.div``;
const PictureList = (props) => {
  const isMobile = useMediaQuery({ query: device.mobile });

  const imgList = props.pictures.map((item) => (
    <div className="slider-item-wrapper" key={nanoid()} >
      {item.component}
    </div>
  ));

  const slideOption = isMobile
    ? {
        itemWidth: 130,
        itemNumber: imgList.length,
        width: "92.3vw",
        height: "120px",
        type: "slide",
      }
    : {
        itemWidth: 150,
        itemNumber: imgList.length,
        width: "795px",
        height: "140px",
        type: "slide",
      };

  return <Slider id={props.id} {...slideOption}>{imgList}</Slider>;
};
const Slides = (props) => {
  return (
    <Wrapper>
      <span lang={props.fstText === "TEXT" && "en"} className="slider-title">{props.fstText}</span>
      <RowBar className="bar" />
      <PictureList id={"slider-fst"} pictures={props.fstItems}></PictureList>
      <span lang={props.fstText === "TEXT" && "en"} className="slider-title" id="sndText">{props.sndText}</span>
      <RowBar className="bar" />
      <PictureList id={"slider-snd"} pictures={props.sndItems}></PictureList>
    </Wrapper>
  );
};

export default Slides;
