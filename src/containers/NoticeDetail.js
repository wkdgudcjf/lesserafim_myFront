import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  Bar,
  ContentWrapper,
  initializePage,
  Page,
} from "../components/ContentBase";
import texts from "../data/texts";
import media from "../utils/media";

const NoticeDetailWrapper = styled(ContentWrapper)`
  padding-top: 240px;
  min-height:1215px;
  ${media.mobile`
  min-height:auto;
  padding-top:41.6vw;`}
  #title {
    margin-bottom:8px;
    display: inline-block;
    font-size: 40px;
    ${media.mobile`font-size:6.24vw;
    margin-bottom:2.6vw;`}
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.73;
    letter-spacing: normal;
    text-align: left;
    color: #333;
  }

  #date {
    display: block;
    font-size: 16px;
    ${media.mobile`font-size:4.16vw`}
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    text-align: left;
    color: #888;

    margin-bottom: 20px;
  }

  #content {
    ${media.mobile`font-size:4.16vw`}
    white-space:pre-line;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: #888;
  }
  #content2 {
    ${media.mobile`font-size:4.16vw`}
    white-space:pre-line;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: black;
  }
  .notice-wrapper {
    ${media.mobile`padding:7.8vw 5.2vw;`}
    padding: 40px 20px 40px 20px;
  }
`;

export default function NoticeDetail() {
  const {t } = useTranslation();
  const { id } = useParams();
  const notice = texts.notice.noticeList[id];
  if(id === "0") {
    return (
      <Page {...initializePage(true, "#FAFAFA", true, "380px")} relative={true}>
        <NoticeDetailWrapper>
          <span id="title">{t(notice.title)}</span>
          <span id="date" lang="en">{notice.date}</span>
          <Bar height="2px" bgColor="#333" />
          <div className="notice-wrapper">
            <div id="content">{t(notice.content)}</div>
            <div id="content2">{t(notice.content2)}</div>
            <div id="content2">{t(notice.content3)}</div>
            <div id="content">{t(notice.content18)}</div>
            <div id="content2">{t(notice.content19)}</div>
            <div id="content">{t(notice.content4)}</div>
            <div id="content2">{t(notice.content5)}</div>
            <div id="content">{t(notice.content6)}</div>
            <div id="content2">{t(notice.content7)}</div>
            <div id="content">{t(notice.content8)}</div>
            <div id="content2">{t(notice.content9)}</div>
            <div id="content">{t(notice.content10)}</div>
            <div id="content2">{t(notice.content11)}</div>
            <div id="content">{t(notice.content12)}</div>
          </div>
          <Bar height="2px" bgColor="#333" />
        </NoticeDetailWrapper>
      </Page>
    );
  } else if(id === "1") {
    return (
      <Page {...initializePage(true, "#FAFAFA", true, "380px")} relative={true}>
        <NoticeDetailWrapper>
          <span id="title">{t(notice.title)}</span>
          <span id="date" lang="en">{notice.date}</span>
          <Bar height="2px" bgColor="#333" />
          <div className="notice-wrapper">
            <div id="content">{t(notice.content)}</div>
            <div id="content2">{t(notice.content2)}</div>
            <div id="content">{t(notice.content3)}</div>
            <div id="content2">{t(notice.content18)}</div>
            <div id="content">{t(notice.content19)}</div>
            <div id="content2">{t(notice.content4)}</div>
            <div id="content">{t(notice.content5)}</div>
            <div id="content2">{t(notice.content6)}</div>
            <div id="content">{t(notice.content7)}</div>
            <div id="content2">{t(notice.content8)}</div>
            <div id="content2">{t(notice.content9)}</div>
            <div id="content2">{t(notice.content10)}</div>
            <div id="content">{t(notice.content11)}</div>
            <div id="content2">{t(notice.content12)}</div>
            <div id="content">{t(notice.content13)}</div>
            <div id="content2">{t(notice.content14)}</div>
            <div id="content">{t(notice.content15)}</div>
            <div id="content2">{t(notice.content16)}</div>
            <div id="content">{t(notice.content17)}</div>
          </div>
          <Bar height="2px" bgColor="#333" />
        </NoticeDetailWrapper>
      </Page>
    );
  } else {
    return (
      <Page {...initializePage(true, "#FAFAFA", true, "380px")} relative={true}>
        <NoticeDetailWrapper>
          <span id="title">{t(notice.title)}</span>
          <span id="date" lang="en">{notice.date}</span>
          <Bar height="2px" bgColor="#333" />
          <div className="notice-wrapper">
            <div id="content">{t(notice.content)}</div>
          </div>
          <Bar height="2px" bgColor="#333" />
        </NoticeDetailWrapper>
      </Page>
    );
  }
}
