import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import texts from "../data/texts";
import { currentPageAtom } from "../utils/atoms";
import media from "../utils/media";
import { FlexBox, Page } from "./ContentBase";

const Wrapper = styled.div`
  color: black;
  font-size: 25px;
  text-align: center;
  height: 100%;
  /* min-height:800px; */
  /* padding-top:27.4vh; */
  padding-top:296px;

  div, span, pre {
    :lang(ko) {font-family:'Roboto', sans-serif};
    :lang(jp) {font-family:'Roboto', sans-serif};
    :lang(en) {font-family:'Roboto', sans-serif};
  }
  ${media.mobile`
    height:100%;
    /* padding-top:auto; */
    padding-top:61.62vw;
    white-space:pre-wrap;
  `}
  span {
    display: inline-block;
  }
  .nf-code {
    width:515px;
    height:203px;
    ${media.mobile`
    margin-bottom: 13.33vw;
    width:66.04vw;
    height:26vw;
    `}

    /* height:18.7963vw; */
    margin-bottom:4.62vh
  }
  .nf-title {
    ${media.mobile`
    margin-bottom: 5.2vw;
    font-size:6.4vw;
    `}
    margin-bottom: 2.7778vh;
    font-size: 24px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.21;
    letter-spacing: normal;
    text-align: center;
    color: #444;
  }
  .nf-desc {
    ${media.mobile`
    font-size:4.6vw;
    width:75vw;`}
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: center;
    color: #707070;
  }
  #footer-nf {
    margin-top:296px;
    margin-bottom:84px;
    width: 100%;
    text-align: center;

    font-size: 18px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 2;
    letter-spacing: normal;
    color: #888;
    ${media.mobile`
    position: relative;
    /* bottom: 7.8vh; */
    margin-top:50vw;
    margin-bottom:13vw;
    font-size: 4.2667vw;    
    line-height: 1.31;
    color: #111;
    `}
  }
`;

const NFFlexBox = styled(FlexBox)`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const NotFound = ({setHeader}) => {
  const setCurrentPage = useSetRecoilState(currentPageAtom)
  useEffect(() => {
    setCurrentPage({headerNFooter: false});
    setHeader(false);
  });
  return (<Page background_color={"#fafafa"} headerNFooter={false}>
    <Wrapper>
      <NFFlexBox row={false}>
        <img className="nf-code" alt="not found" src="/res/etc/notfound.png"></img>
        <span className="nf-title">{texts.notfound.title}</span>
        <pre className="nf-desc">{texts.notfound.desc}</pre>
        <span id="footer-nf">{texts.footer.title}</span>
      </NFFlexBox>
    </Wrapper>
    </Page>
  );
};

export default NotFound;
