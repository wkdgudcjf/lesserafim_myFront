import styled from "styled-components";
import React from "react";
import media from "../utils/media";

const BackPhotoFrameBlock = styled.img`
  ${media.mobile`
    width:100%;
    height:auto;
    object-fit:contain;
    `}
  ${media.mobile`height:${({ theme }) => theme.layout.m_photocard_height}
  height:${({ theme }) => theme.layout.m_photocard_width}
  `}
    width: ${({ theme }) => theme.layout.d_photoframe_width};
  height: ${({ theme }) => theme.layout.d_photoframe_height};
  object-fit: none;
`;

const CardFrameBlock = styled.img`
  ${media.mobile`
    width:${({ theme }) => theme.layout.m_photocard_width};`}
  ${media.mobile`height:${({ theme }) => theme.layout.m_photocard_height}`}
    width: ${({ theme }) => theme.layout.d_photocard_width};
  height: ${({ theme }) => theme.layout.d_photocard_height};
  object-fit: contain;
`;

const BackPhotoFrame = (props) => {
  if (props.large) {
      return <BackPhotoFrameBlock {...props}></BackPhotoFrameBlock>;
  } else {
      return <CardFrameBlock {...props}></CardFrameBlock>;
  }
};

export default BackPhotoFrame;
