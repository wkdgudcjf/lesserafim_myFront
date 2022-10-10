import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  Bar,
  ContentWrapper,
  EmpableSpan,
  initializePage,
  Page,
} from "../components/ContentBase";
import texts from "../data/texts";
import { currentPageAtom } from "../utils/atoms";
import media from "../utils/media";

const NoticeWrapper = styled(ContentWrapper)`
  /* height: 1832px; */
  padding-top: 240px;
  ${media.mobile`
  height:auto;
  padding-top: 40vw;
  `}

  .faq-title {
    .faq-q {
      margin-right: 10px;
      ${media.mobile`margin-right: 2.4vw;`}
    }
    .faq-q2 {
      font-weight: normal;
    }
    .faq-clicked {
      font-weight: bold;
    }
    margin-left: 20px;
    ${media.mobile`margin-left: 2.4vw;
    display:flex;
    flex-direction:row;
    margin-right: 2.4vw`}
  }

  .faq {
    cursor: pointer;
    white-space: pre-line;
    margin-left: 20px;
    font-size: 50px;
    ${media.mobile`font-size:8.84vw;
    margin-left:5.2vw;`}
  }
  .faq-wrapper {
    color: #fff;

    .summary {
      cursor:pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 28px;
      padding-bottom: 28px;
      ${media.mobile`
        padding-top:4.68vw;
        padding-bottom:4.68vw;
      `}
    }
    ${media.mobile`
    font-size:4.16vw;`}
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: #333;
    span {
      white-space: pre-line;
      font-size: 16px;
      ${media.mobile`
    font-size:4.16vw;`}
      font-weight: 600;
      font-stretch: normal;
      font-style: normal;
      /* line-height: 3.2; */
      letter-spacing: normal;
      text-align: left;
      color: #333;
    }
  }
  .detail {
    white-space: pre-line;
    color: #707070;
    font-size: 16px;
    ${media.mobile`    
    font-size:4.16vw;`}
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: #5b5b5b;

    padding: 27px 30px 26px 30px;
    ${media.mobile`padding: 8.58vw 3.9vw;`}
    background-color: #f4f4f4;
  }
  .notice-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    ${media.mobile`padding: 7vw 2.6vw;
    
    flex-direction:column;
    justify-content:space-around;
    align-items:start;`}
  }
  .notice-title {
    ${media.mobile`display:inline;`}
    font-size: 16px;

    ${media.mobile`
    font-size:4.16vw;
    margin-bottom:2.08vw;`}
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: #5b5b5b;
  }
  .notice-date {
    font-size: 16px;
    ${media.mobile`
    font-size:4.16vw;`}
    ${media.mobile`display:inline;line-height: 2;`}
    ${media.mobile`font-size:3.64vw`}
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 4;
    letter-spacing: normal;
    text-align: left;
    color: #888;
  }

  .faq-icon {
    width: 20px;
    height: 20px;
    margin-right: 38px;
    ${media.mobile`
    width:4.68vw;
    height:4.68vw;
    margin-right:2.6vw;
    `}
  }
`;

const NoticeTitleBlock = styled.div`
  span {
    display: inline-block;
  }
  .selected {
    color: #111;
  }
  .false {
    color: #ddd;
  }
  .title {
    cursor: pointer;
    font-size: 50px;
    ${media.mobile`font-size:8.84vw;`}
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    text-align: left;
  }
  .sub {
    b {
      color: #111;
      display: inline;
      font-weight: bold;
    }
    white-space: pre-line;
    display: block;
    font-size: 24px;
    margin-top: 12px;
    ${media.mobile`font-size:4.5vw;
    font-weight: 600;
    margin-top:2.6vw;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;`}
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: #5b5b5b;

    margin-bottom: 70px;
    ${media.mobile`margin-bottom:13vw;`}
  }
`;

const NoticeTitle = ({ isNotice, setNotice }) => {
  const {t} = useTranslation();
  return (
    <NoticeTitleBlock>
      <span
        className={"title " + (isNotice && " selected")}
        onClick={() => {
          setNotice(true);
        }}
      >
        Notice
      </span>
      <span
        className={"faq " + (!isNotice && " selected")}
        onClick={() => {
          setNotice(false);
        }}
      >
        FAQ
      </span>
      {isNotice ? (
        <EmpableSpan className="sub" text={[t("notice.main_title.0"),t("notice.main_title.1"),t("notice.main_title.2")]} />
      ) : (
        <EmpableSpan className="sub" text={[t("faq.main_title.0"),t("faq.main_title.1"),t("faq.main_title.2")]} />
      )}
    </NoticeTitleBlock>
  );
};

const NoticeItem = ({ item, isEnd, id , t}) => {
  return (
    <>
      <Link to={"/notice/" + id}>
        <div className="notice-wrapper">
          <span className="notice-title">{t(item.title)}</span>
          <span className="notice-date" lang="en">
            {item.date}
          </span>
        </div>
      </Link>
      {!isEnd && <Bar height="1px" bgColor="#ddd" />}
    </>
  );
};

const FaqItem = ({ item, isEnd }) => {
  const [clicked, setClicked] = useState(false);
  return (
    <div className="faq-wrapper">
      <div
        className="summary"
        onClick={() => {
          setClicked(!clicked);
        }}
      >
        <div className="faq-title">
          <span className="faq-q" lang="en">
            Q
          </span>
          <span className={"faq-q2 " + (clicked ? "faq-clicked" : "")}>
            {item.Q}
          </span>
        </div>
        <img
          alt="faq"
          className="faq-icon"
          src={
            clicked ? "/res/icons/arrow_up.svg" : "/res/icons/arrow_down.svg"
          }
        />
      </div>
      {clicked ? <div className="detail">{item.A}</div> : <></>}
      {!isEnd && <Bar height="1px" bgColor="#ddd" />}
    </div>
  );
};

const getFaqList = (t) => {
  const total = Array.from({length:48}, (x,i)=>i).slice(1,47) // 1~47
  const a = total.filter(i=>i%2!==0);
  const b = total.filter(i=>i%2===0);
  let c = [];
  for(let i=0; i<a.length; i++) {
    let d = {};    
    d.Q = t("faq."+a[i]);
    d.A = t("faq."+b[i]);
    c.push(d);
  }  
  return c;
}

const Notice = () => {
  const {t} = useTranslation();
  const [isNotice, setNotice] = useState(true);
  const setCurrentPage = useSetRecoilState(currentPageAtom);
  useEffect(() => {
    setCurrentPage(initializePage(true, "#FAFAFA", true, "380px"));
  });

  const noticeList = texts.notice.noticeList;
  // const faqList = texts.notice.faqList;
  const faqList = getFaqList(t);
  // const faqList = [];
  const faqComp = faqList.map((item, index) => {
    return (
      <FaqItem
        key={nanoid()}
        item={item}
        isEnd={faqList.length - 1 === index}
      />
    );
  });
  const noticeComp = noticeList.map((item, index) => {
    return (
      <NoticeItem
      t={t}
        key={nanoid()}
        item={item}
        id={index}
        isEnd={noticeList.length - 1 === index}
      />
    );
  });
  return (
    <Page
      {...initializePage(true, "#FAFAFA", true, "380px", "#fafafa")}
      relative={true}
    >
      <NoticeWrapper>
        <NoticeTitle isNotice={isNotice} setNotice={setNotice}></NoticeTitle>
        <Bar height="2px" bgColor="#333" />

        {isNotice ? noticeComp : faqComp}

        <Bar height="2px" bgColor="#333" />
      </NoticeWrapper>
    </Page>
  );
};

export default Notice;
