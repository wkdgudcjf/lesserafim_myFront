import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import React, { useState, useRef } from "react";
import { isGNBAtom } from "../utils/atoms";
import { ContentWrapper, FlexBox, initializePage, Page } from "./ContentBase";
import media from "../utils/media";
import { useMediaQuery } from "react-responsive";
import { device } from "../styles/theme";
import { useTranslation } from "react-i18next";
import { nanoid } from "nanoid";
import { isAdmin, isLogined, logout } from "../utils/api/api";

const MenuFlexBox = ({ row, children, id, className }) => {
  const setIsGNB = useSetRecoilState(isGNBAtom);

  return (
    <FlexBox
      id={id}
      className={className}
      row={row}
      onClick={() => setIsGNB(false)}
      as="ul"
    >
      {children}
    </FlexBox>
  );
};

const MainMenuBlock = styled.div`
  position: relative;

  ul li:hover {
    color: #333;
  }

  li.selected {
    color: #333;
  }

  li.not-selected {
    color: #ddd;
  }

  li.strikethrough {
    color: #333;
    text-decoration: line-through;
    text-decoration-thickness: 3%;
  }

  li {
    padding: 2vh 0;
    ${media.mobile`color: #333`}
    color: #ddd;

    font-size: 30px;
    font-weight: 900;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: left;
  }

  li.member-item,
  #logout {
    position: relative;
    ${media.mobile`padding: 0 0 1vh 0;
    margin-left:0;`};
    padding: 2vh 0;
    margin-left: 230px;
    font-size: 30px;
    font-weight: 300;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    cursor: pointer;
    color: #333;
  }
`;

const OverlayMenuBlock = styled.div`
  position: relative;
  top: 0;
  width: 100%;
  height: 1444px;

  /* padding-left: 1112px; */
  margin: 0 auto;
  padding-top: 418px;
  padding-left: 522px;
  ${media.mobile`
      padding-left:${({ theme }) => theme.layout.m_pedding_left};
      padding-top:${161 * 0.26}vw;
      height:auto;
  `};

  background-color: ${({ theme }) => theme.colors.background_gnb};

  #lang {
    padding-top: 2vh;
    margin-right: 71px;
    ${media.mobile`
    margin-bottom:4.1vh;
    padding-top: 0;
    margin-right: 0;
    `}
    justify-content: start;
    align-items: center;
  }

  #lang_inner {
    width: 100px;
    height: 150px;
    margin-top: 20px;
    justify-content: space-around;
    align-items: center;
    border: 2px solid #333;
    ${media.mobile`
    border:0px;
    margin-top: 0;
    margin-left:8vw;
    width:auto;
    height:auto;    `}

    li:hover {
      color: #333;
    }
    li.selected {
      color: #333;
    }
    li {
      width: 100%;
      font-size: 20px;
      font-weight: 900;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.2;
      letter-spacing: normal;
      text-align: center;
      color: #888;
      cursor: pointer;
      ${media.mobile`padding-right:6.7vw;`}
    }
  }

  #members {
    margin-top: 168px;
    padding-left: 61px;
    height: 310px;
    ul {
      height: 100%;
      justify-content: space-around;
      align-items: center;
    }
    li {
      font-size: 30px;
      font-weight: 300;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.2;
      letter-spacing: normal;
      text-align: center;
      color: #333;
    }
  }

  div .active {
    visibility: visible;
  }

  div .inactive {
    visibility: hidden;
  }
  #logout-menuitem {
    cursor: pointer;
  }
`;

const langConverter = (isMenu, lng) => {
  if (isMenu) {
    switch (lng) {
      case "JP":
        return "ja";
      case "KR":
        return "ko";
      case "EN":
        return "en";
      default:
        return "en";
    }
  } else {
    switch (lng) {
      case "ja":
        return "JP";
      case "ko":
        return "KR";
      case "en":
        return "EN";
      default:
        return "EN";
    }
  }
};

const LangButtons = ({ clearTimer, setonIntButton, isMobile }) => {
  const { i18n } = useTranslation();
  const langs = ["KR", "EN","JP"];
  return (
    <div
      onMouseOver={() => {
        clearTimer();
        setonIntButton(true);
      }}
      onMouseLeave={() => {
        setonIntButton(false);
      }}
    >
      <MenuFlexBox row={isMobile ? true : false} id="lang_inner">
        {langs.map((lang) => {
          return (
            <li
              key={lang}
              onClick={() => {
                let lng =langConverter(true, lang);
                i18n.changeLanguage(lng);
                document
                  .getElementsByTagName("html")[0]
                  .setAttribute("lang", i18n.language);
              }}
              className={
                langConverter(false, i18n.language) === lang ? "selected" : undefined
              }
            >
              {lang}
            </li>
          );
        })}
      </MenuFlexBox>
    </div>
  );
};

const Languages = ({ isMobile }) => {
  const [onIntButton, setonIntButton] = useState(false);
  let outTimerRef = useRef(null);
  const clearTimer = () => {
    clearTimeout(outTimerRef);
  };

  return (
    <FlexBox row={isMobile ? true : false} id="lang">
      <img
        width="44px"
        height="44px"
        alt="lang-icon"
        src="/res/icons/international_icon.svg"
        onClick={isMobile ? () => setonIntButton(!onIntButton) : undefined}
        onMouseOver={
          !isMobile
            ? () => {
                setonIntButton(true);
              }
            : undefined
        }
        onMouseLeave={
          !isMobile
            ? () => {
                outTimerRef = setTimeout(() => {
                  setonIntButton(false);
                }, 50);
              }
            : undefined
        }
      />
      <div className={onIntButton ? "active" : "inactive"}>
        <LangButtons
          setonIntButton={setonIntButton}
          clearTimer={clearTimer}
          isMobile={isMobile}
        />
      </div>
    </FlexBox>
  );
};

// state
// logged,

// event - login clicked
// event - getting clicked
// onMouseOver / onMouseleave
const menus = [
  { pathname: "/login", content: "LOGIN" },
  { pathname: "/mypage", content: "MY PAGE" },
  { pathname: "/admin", content: "ADMIN" },
  { pathname: "/logout", content: "LOGOUT" },
  { pathname: "/about", content: "ABOUT" },
  { pathname: "/digitalsouvenirs", content: "DIGITAL SOUVENIR" },
  { pathname: "/notice", content: "NOTICE & FAQ" }
];

const MainMenu = ({ isMobile }) => {
  const navigate = useNavigate();
  const setIsGNB = useSetRecoilState(isGNBAtom);
  const MenuItem = (props) => {
    return (
      <li
        className={
          onMouseOver === null
            ? "selected"
            : onMouseOver === props.item.pathname
            ? "selected strikethrough"
            : "not-selected"
        }
        {...props}
      >
        {props.children}
      </li>
    );
  };

  const doLogout = () => {
    logout();
    navigate("/", { replace: true });
    setIsGNB(false);
  };

  const LogoutMenu = (item) => {
    if (!isMobile && item.pathname === "/mypage" && onMouseOver === "/mypage") {
      return (
        <span
          id="logout"
          onClick={() => {
            doLogout();
          }}
        >
          Logout
        </span>
      );
    } else {
      return <></>;
    }
  };

  const [onMouseOver, setOnMouseOver] = useState(null);
  const Links = menus
    .filter((item) =>
      isLogined()
        ? item.pathname !== "/login" &&
          !(!isMobile && item.pathname === "/logout") && !(!isAdmin() && item.pathname === "/admin")
        : item.pathname !== "/mypage" && item.pathname !== "/logout" && item.pathname !== "/admin"
    )
    .map((item) => {
      const logout = LogoutMenu(item);
      return (
        <FlexBox
          row={true}
          key={item.pathname}
          onMouseOver={() => {
            clearTimeout(outTimerRef);
            setOnMouseOver(item.pathname);
          }}
          onMouseLeave={() =>
            (outTimerRef = setTimeout(() => {
              setOnMouseOver(null);
            }, 50))
          }
        >
          {item.pathname === "/logout" ? (
            <MenuItem id="logout-menuitem" item={item} onClick={doLogout}>
              {item.content}
            </MenuItem>
          ) : (
            <Link
              key={nanoid()}
              to={item.pathname}
              onClick={() => {
                setIsGNB(false);
              }}
            >
              <MenuItem item={item}>{item.content}</MenuItem>
            </Link>
          )}

          {logout}
        </FlexBox>
      );
    });
  let outTimerRef = useRef(null);
  return (
    <>
      <MainMenuBlock>
        <FlexBox as="ul">{Links}</FlexBox>
      </MainMenuBlock>
    </>
  );
};

const OverlayMenu = () => {
  const isMobile = useMediaQuery({ query: device.mobile });
  const items = (
    <>
      <Languages isMobile={isMobile} />
      <MainMenu isMobile={isMobile} />
    </>
  );
  return (
    <Page {...initializePage(true, "#FFFEFF", true, "200px")}>
      <ContentWrapper>
        <OverlayMenuBlock lang="en">
          {isMobile ? (
            <FlexBox row={false}>{items}</FlexBox>
          ) : (
            <FlexBox row={true}>{items}</FlexBox>
          )}
        </OverlayMenuBlock>
      </ContentWrapper>
    </Page>
  );
};

export default OverlayMenu;
