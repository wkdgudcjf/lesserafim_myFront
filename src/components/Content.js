import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import media from "../utils/media";

const ContentBlock = styled.div`
  position: relative;
  height: 100%;

  width: ${({ theme }) => theme.layout.pagebase_width};
  ${media.mobile`width:100vw`}
  color: ${({ theme }) => theme.colors.font_main};
  background-color: ${({ theme }) => theme.colors.background_main};
  margin: 0 auto;
`;

const Content = ({ children }) => {
  let location = useLocation();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return location.pathname === "/" ? (
    <ContentBlock id="ContentBlock" maxContent="false">
      {children}
    </ContentBlock>
  ) : (
    <ContentBlock id="ContentBlock" maxContent="false">
      {children}
    </ContentBlock>
  );
  // return <ContentBlock id="ContentBlock">{children}</ContentBlock>;
};

export default Content;
