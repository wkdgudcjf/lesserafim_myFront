import React from "react";
import {
  ContentWrapper,
  initializePage,
  Page,
} from "../components/ContentBase";
import styled from "styled-components";
import PhotoCards from "../components/PhotoCards";
import MyPageTitle from "../components/MyPageTitle";
import texts from "../data/texts";
import media from "../utils/media";
import { useLocation } from "react-router-dom";
import MyPageDetail from "./MyPageDetail";
import { userPhotoCardList } from "../utils/api/api";
import { WithRequest } from "../hocs/hoc";

const MyPageWrapper = styled(ContentWrapper)`
  padding-top: 240px;
  height: 2340px;
  ${media.mobile`
  padding-top:40.4vw;
  height:auto;
  `}
  #photos-wrapper {
    ${media.mobile`
    margin-top:0;`}
    margin-top:70px;
  }
`;

const Comp = ({ data }) => {
  let cardsInfo = [false, false, false, false, false, false];

  data.body.list.forEach((item) => {
    cardsInfo[item.girlId] = {
      picId: item.imageId,
      txtId: item.messageId,
      audioId: item.audioId,
      frontUrl: item.frontUrl,
      backUrl: item.backUrl
    };
  });
  return (
    <Page {...initializePage(true, "#fafafa", true, "275px")}>
      <MyPageWrapper>
        <MyPageTitle {...texts.mypage}></MyPageTitle>
        <div id="photos-wrapper">
          <PhotoCards userCards={cardsInfo}></PhotoCards>
        </div>
      </MyPageWrapper>
    </Page>
  );
};

const MyPageOverview = () => {
  return WithRequest({
    name: "userPhotoCardList",
    func: userPhotoCardList,
  }, Comp);
};

const MyPage = () => {
  const location = useLocation();
  const state = location?.state;

  if (state !== null) {
    return <MyPageDetail state={state}></MyPageDetail>;
  } else {
    return <MyPageOverview></MyPageOverview>;
  }
};
export default MyPage;
