import styled from "styled-components";
import React from "react";
import media from "../utils/media";
import { Mp4Player } from "./ContentBase";

const PhotoFrameBlock = styled.video`
  ${media.mobile`
    width:100%;
    height:auto;
    object-fit:contain;
    `}
  ${media.mobile`height:${({ theme }) => theme.layout.m_photocard_height}
  width:${({ theme }) => theme.layout.m_photocard_width}
  `}
  width: ${({ theme }) => theme.layout.d_photoframe_width};
  height: ${({ theme }) => theme.layout.d_photoframe_height};
  object-fit: fill;
`;

const CardFrameBlock = styled.img`
  ${media.mobile`width:${({ theme }) => theme.layout.m_photocard_width};`}
  ${media.mobile`height:${({ theme }) => theme.layout.m_photocard_height}`}
  width: ${({ theme }) => theme.layout.d_photocard_width};
  height: ${({ theme }) => theme.layout.d_photocard_height};
  object-fit: contain;
`;

const PhotoFrame = (props) => {
    if (props.large) {
      return props.pId < 10 ? (<PhotoFrameBlock as="img" {...props}></PhotoFrameBlock>) 
        : <Mp4Player
        width={props.width ? props.width : props.isMobile ?"86.4vw" :"420px"}
        height={props.height ? props.height : props.isMobile ? "auto": "650px"}
        id="react-player"
        src={props.src}
        alt="react-player"
        isMobile={props.isMobile}
        onClick={props.onClick}
      ></Mp4Player>
    } else {
        return <CardFrameBlock {...props}></CardFrameBlock>;
    }
};

export default PhotoFrame;
