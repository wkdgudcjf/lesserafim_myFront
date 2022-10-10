import { nanoid } from "nanoid";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { device } from "../styles/theme";
import media from "../utils/media";
import { FlexBox } from "./ContentBase";

const calcHeight = (px) => {
  return px * 0.26;
};

const FooterBlock = styled.footer`
  position: ${(props)=>props.relative ? "relative" : "absolute"};
  bottom: ${(props) => props.relative ? undefined : props.marginBottom};
  padding-top: ${(props)=>props.relative ? "206px" : undefined};
  padding-bottom: ${(props)=>props.relative ? "113px" : undefined};
  width: 100%;

  background-color:${({ bgColor }) => bgColor};
  ${media.mobile` 
      padding-left:5.3vw;
      position:relative;
      bottom:0px;
      padding-top:${calcHeight(150)}vw;
      padding-bottom:${calcHeight(147)}vw;
      
      `}

  color: ${(props) => {
    if (props.isLight) {
      return props.theme.colors.font_footer_light;
    } else {
      return props.theme.colors.font_footer;
    }
  }};
  span {
    width: ${({ theme }) => theme.contentWidth.desktopL}px;

    display: block;
    margin: 0 auto;
    ${media.mobile`
      width:auto;
      font-size: 4.16vw;      
      line-height: 1.31;      
      `}

    font-size: 24px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
  }
  #footer-links {
    width: 678px;
    ${media.mobile`
    margin: 0 auto;
    width:auto;
    height: 51.48vw;
    margin-top: 7.8vw;
    margin-left: 4.8vw;
    justify-content: space-between;
    align-items:start;
    span {
      color:${(props)=>props.isLight ? props.theme.colors.font_footer_light : props.theme.colors.font_footer}      
    }
    `}

    a:link {
      color: ${(props) => {
        if (props.isLight) {
          return props.theme.colors.font_footer_light;
        } else {
          return props.theme.colors.font_footer;
        }
      }};
      text-decoration: none;
    }
    a:visited {
      color: ${(props) => {
        if (props.isLight) {
          return props.theme.colors.font_footer_light;
        } else {
          return props.theme.colors.font_footer;
        }
      }};
      text-decoration: none;
    }
    a:hover {
      color: ${(props) => {
        if (props.isLight) {
          return props.theme.colors.font_footer_light;
        } else {
          return props.theme.colors.font_footer;
        }
      }};
      text-decoration: none;
    }
    a {
      ${media.mobile`
      width:auto;
      position:relative;
      `}
    }
    justify-content: space-between;
    align-items: center;
  }
  .links-desktop {
    width: auto;
    margin: 0;
    display: inline;
    font-size: 18px;
    font-weight: 600;
    line-height: 2;
    color:${(props)=>props.isLight ? props.theme.colors.font_footer_light : props.theme.colors.font_footer}
  }
  #flex-wrapper {
    width: ${({ theme }) => theme.contentWidth.desktopL}px;
    margin: 0 auto;
  }
  .delim {
    border-radius: 50%;
    width: 4px;
    height: 4px;
    background-color: #888;
  }

  #bottom-links {
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    margin-top: 60px;
    width: 1400px;

    /* justify-content: space-between; */
    ${media.mobile`width:100%`}
    a,
    span {
      display: inline;
      ${media.mobile`
      font-size:3.12vw;
      `}
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 2;
      letter-spacing: normal;
      color:#888;
    }
    span {
      margin-right: 30px;
      ${media.mobile`
      margin-right:3.64vw;`}
    }
    span:hover {
      font-weight:bold;
    }
  }
`;

const getBottomContents = (lang) => [
  { title: "footer.1", link: "https://weverse.io/policies/privacy?hl=" + lang},
  { title: "footer.2", link: "https://weverse.io/policies/cookie?hl=" + lang },
  { title: "footer.3", link: "https://weverse.io/policies/youth-protection" }];

const urls = {
  OFFICIAL: "https://sourcemusic.com/",
  WEVERSE: "https://weverse.onelink.me/qt3S/lgvphhra",
  FACEBOOK: "https://www.facebook.com/official.lesserafim",
  YOUTUBE: "https://www.youtube.com/channel/UCs-QBT4qkj_YiQw1ZntDO3g",
  INSTAGRAM: "https://www.instagram.com/le_sserafim/",
  TWITTER: "https://twitter.com/le_sserafim",
};

const Footer = (props) => {
  const { i18n, t } = useTranslation();
  const isMobile = useMediaQuery({ query: device.mobile });
  if (props.headerNFooter === false) {
    return <></>;
  }
  return (
    <FooterBlock {...props}>
      <span lang="en">© LE SSERAFIM. All rights reserved.</span>

      {!isMobile ? (
        <div id="flex-wrapper" lang="en">
          <FlexBox id="footer-links" row={true}>
            <a target="_blank" rel="noopener noreferrer" href={urls.OFFICIAL}>
              <span className="links-desktop">LE SSERAFIM OFFICIAL</span>
            </a>
            <div className="delim" />
            <a target="_blank" rel="noopener noreferrer" href={urls.WEVERSE}>
              <span className="links-desktop">WEVERSE</span>
            </a>
            <div className="delim" />
            <a target="_blank" rel="noopener noreferrer" href={urls.YOUTUBE}>
              <span className="links-desktop">YOUTUBE</span>
            </a>
            <div className="delim" />
            <a target="_blank" rel="noopener noreferrer" href={urls.INSTAGRAM}>
              <span className="links-desktop">INSTAGRAM</span>
            </a>
            <div className="delim" />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/le_sserafim"
            >
              <span className="links-desktop">TWITTER</span>
            </a>
          </FlexBox>
        </div>
      ) : (
        <FlexBox id="footer-links" isLight={props.isLight} row={false} lang="en">
          <a target="_blank" rel="noopener noreferrer" href={urls.OFFICIAL}>
            <span className="links">LE SSERAFIM OFFICIAL</span>
          </a>
          <a target="_blank" rel="noopener noreferrer" href={urls.WEVERSE}>
            <span className="links">WEVERSE</span>
          </a>
          <a target="_blank" rel="noopener noreferrer" href={urls.YOUTUBE}>
            <span className="links">YOUTUBE</span>
          </a>
          <a target="_blank" rel="noopener noreferrer" href={urls.INSTAGRAM}>
            <span className="links">INSTAGRAM</span>
          </a>
          <a target="_blank" rel="noopener noreferrer" href={urls.TWITTER}>
            <span className="links">TWITTER</span>
          </a>
        </FlexBox>
      )}
      <div id="bottom-links">
        {getBottomContents(i18n.language).filter(item=>{
          return item.title==="footer.3" && i18n.language!=="ko" ? false : true
        }).map((item) => {
          return (
            <a
              key={nanoid()}
              target="_blank"
              rel="noopener noreferrer"
              href={item.link}
            >
              <span className="bottom-link">{t(item.title)}</span>
            </a>
          );
        })}
      </div>
    </FooterBlock>
  );
};
export default Footer;
