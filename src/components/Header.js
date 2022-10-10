import styled from "styled-components";
import Logo from "./Logo";
import MenuButton from "./MenuButton";
import React from "react";
import media from "../utils/media";
import { useLocation } from "react-router-dom";

const HeaderWrapper = styled.header`
  position: absolute;
  width: 100%;
  z-index: 100;
  margin-top: 50px;
  ${media.mobile`
    margin-top:11.44vw;`}
`;
const HeaderBlock = styled.div`
  position: relative;
  width: ${({ theme }) => theme.contentWidth.desktopL}px;
  ${media.mobile`width:${({ theme }) => theme.contentWidth.mobile}`}
  height: 50px;
  margin: 0 auto;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 35px;
`;

function getIsLight(isGNB, location) {
  const pathname = location.pathname.split("/");
  if (isGNB) {
    return true;
  }
  if (
    pathname[1].length===0 || pathname[1].toUpperCase() === "ABOUT" || 
    (pathname[1].toLowerCase() === "digitalsouvenirs" && location.state !== null)
  ) {
    return false;
  } else {
    return true;
  }
}

function Header({ isGNB }) {
  const location = useLocation();
  const isLight = getIsLight(isGNB, location);
  return (
    <HeaderWrapper>
      <HeaderBlock>
        <Logo isLight={isLight}></Logo>
        <MenuButton isLight={isLight}> </MenuButton>
      </HeaderBlock>
    </HeaderWrapper>
  );
}

export default Header;
