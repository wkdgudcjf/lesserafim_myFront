import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import React from "react";
import "./i18n";

import Content from "./components/Content";
import styled from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";

const OverlayAnimationDiv = styled.div`
  
  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active {
    opacity: 1;
    transition: all 0.2s linear;
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit-active {
    opacity: 0;
    transition: all 0.2s linear;
  }
  
  pre {
    background-color: inherit;
    overflow: inherit;
    word-break: inherit;
    word-wrap: inherit;
    border-radius:0px;
  }
`;

const queryClient = new QueryClient();
//const zoomMeetingSDK = document.getElementById('zmmtg-root')

// To hide
//zoomMeetingSDK.style.display = 'none';

function App() {
  
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <OverlayAnimationDiv>
          <Content>
            <Router />
          </Content>
        </OverlayAnimationDiv>
      </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}
export default App;