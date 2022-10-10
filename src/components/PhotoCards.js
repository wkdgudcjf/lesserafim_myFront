import styled from "styled-components";
import { FlexBox } from "./ContentBase";
import React, { useState, useRef, useEffect } from "react";
import media from "../utils/media";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { device } from "../styles/theme";
import { WithRequest } from "../hocs/hoc";
import { photoCardValidation } from "../utils/api/api";
import { MovingImageSrc, StaticImageSrc, TextSrc } from "../data/memberList";
import PhotoFrame from "./PhotoFrame";
import { useTranslation } from "react-i18next";
import { useSetRecoilState } from "recoil";
import { curMemberIdx } from "../utils/atoms";

const PhotoCardsContainer = styled.div`
  img {
    border-radius: 2%;
  }
  .soldout-container {
    position: relative;
  }

  ${media.mobile`
  margin:0 auto;
  `}

  .signature-img {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .soldout-pic {
    width: 100%;
    height: 100%;
  }
  .soldout-frame {
    width: 100%;
    position: absolute;
    top: 0;
    right: 0;
  }
  .photos-row {
    margin: 0 auto;
    width:88vw;
    justify-content: space-between;
  }
  .photos-left, .photos-right {
    justify-content: space-between;
    /* width:87.8vw;     */
    height:202.2vw;
  }
  .photos {
    flex-wrap: wrap;
    height: 1450px;
    width: 100%;
    justify-content: space-between;
    align-items: flex-start;
    }
  }
  .silhouett {
    ${media.mobile`
    object-fit: contain;
    top: 0%;
    width: 100%;
    height: 100%;
    `}
    object-fit: none;
    object-position: center;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 50%;
    transform: translateX(-50%);
    top: 4px;
  }
  #exclamination {
    white-space:pre-line;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    top: 50%;
    left: 50%;
    text-align: center;
    transform: translate(-50%, -50%);
  }
  .nocard {
    width: 90px;
    height: 90px;
    ${media.mobile`
    width:10.4vw;
    height:10.4vw;`}
    width:100%;
  }
  .excl-desc {
    width: 100%;
    font-size: 26px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: center;
    white-space: pre-line;
    margin-top: 20px;
    ${media.mobile`
    width:65.4%;
    margin-top:2.5vw;    
  font-size: 3.64vw;  
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  text-align: center;
  color: #888;`}
    color: #888;
  }
  #base-bg {
    position: absolute;
    left: -30px;
    top: -35px;
    ${media.mobile`
    left:-7.8vw;top:-7.8vw;
    width:55.9vw;
    height:78vw;
    object-fit:contain;
    `}

    width: 480px;
    height: 720px;
    /* background-color:#fbfbfb; */
  }

  .photo-frame {
    ${media.mobile`
    width:100%;
    height:100%;
    `}
    ${media.mobile`height:${({ theme }) => theme.layout.m_photocard_height};
    object-fit:contain;`}
    width: ${({ theme }) => theme.layout.d_photocard_width};
    height: ${({ theme }) => theme.layout.d_photocard_height};
  }
  .countdown-frame {
    ${media.mobile`width:${({ theme }) => theme.layout.m_photocard_width}`}
    ${media.mobile`height:${({ theme }) => theme.layout.m_photocard_height}`}
    width: ${({ theme }) => theme.layout.d_photocard_width};
    height: ${({ theme }) => theme.layout.d_photocard_height};
  }
  .frame-wrapper {
    position: relative;
    ${media.mobile`width:${({ theme }) => theme.layout.m_photocard_width}`}
    ${media.mobile`height:${({ theme }) => theme.layout.m_photocard_height};
    object-fit:contain;`}
    width: ${({ theme }) => theme.layout.d_photocard_width};
    height: ${({ theme }) => theme.layout.d_photocard_height};
    object-fit: none;
    overflow: visible;
  }
  #count-down {
    display: flex;
    justify-content: space-between;
    width: 200px;
    height: 60px;
    align-items: center;
    ${media.mobile`
    font-size:3.9vwpx;
    width:20.8vw;
    height:10.4vw;
    `}
    font-size:40px;
    position: relatives;
    /* position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%); */
  }
  .timer-container {
    z-index: 1;
    position: absolute;
    left: 50%;
    top: 66.5%;
    transform: translate(-50%, -50%);
  }
  .coming_container {
    position: absolute;
    top: 65%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .color-not-opened {
    color: #444;
  }
  .color-countdown {
    color: #000;
  }
  .photo-date {
    display: inline-block;
    font-size: 61px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: -3.05px;
    text-align: center;
    width: 100%;
    ${media.mobile`
    font-size:7.8vw`}/* left: 50%;
    top: 50%;
    transform: translate(-50%, -50%); */
  }
  .photo-not-opened {
    display: inline-block;
    font-size: 61px;
    font-weight: 100;
    font-stretch: normal;
    font-style: normal;
    height: 71px;
    letter-spacing: normal;
    text-align: center;
    width: 100%;
    color: #444;
    ${media.mobile`font-size:9.1vw;
    
    line-height: 1;`}
  }
  .count-delim {
    display: inline-block;
    text-align: center;
    width: 15px;
    /* height: 40px; */
    ${media.mobile`
    width:3vw;
    font-size:3vw;
    /* height:20px; */
    `}
    font-size: 30px;
    color: #000;
    line-height: 1;
  }
  .count-numimg {
    width: 27px;
    height: 40px;
    ${media.mobile`width:3.6vw;height:5.2vw;`}
  }
`;

const padNumber = (num, length) => {
  return String(num).padStart(length, "0");
};

const HOUR_IN_MILLIS = (1000*60*60);
const MIN_IN_MILLIS = (1000*60)
const SEC_IN_MILLIS = 1000;
const getTimer = (time) => {
  const hour = Math.floor(time / HOUR_IN_MILLIS);
  const min = Math.floor((time - (hour*HOUR_IN_MILLIS)) / MIN_IN_MILLIS);
  const sec = Math.floor((time - (hour*HOUR_IN_MILLIS) - (min *MIN_IN_MILLIS)) / SEC_IN_MILLIS);

  return [hour, min, sec];
}
const TimerMember = ({updateDay, idx, target }) => {
  const dates = ["04.04", "04.05", "04.06", "04.07", "04.08", "04.09"];
  let countdown = useRef(target- Date.now());
  const [h,m,s] = getTimer(countdown.current);
  const [hour, setHour] = useState(h);
  const [min, setMin] = useState(m);
  const [sec, setSec] = useState(s);
  const interval = useRef(null);
  useEffect(() => {
    interval.current = setInterval(() => {
      countdown.current = target - Date.now();
      if (countdown.current < 0) {
        updateDay();
      }
      const [hour, min, sec] = getTimer(countdown.current);
      setHour(Math.floor(hour));
      setMin(Math.floor(min));
      setSec(Math.floor(sec));
    }, 1000);
    return () => clearInterval(interval.current);
  });

  const time = { hour, min, sec };
  return (
    <Photo
      alt="countdown-frame"
      className="countdown-frame"
      idx={idx}
      isPng={true}
    >
      <div className="timer-container">
        <span className="photo-date color-countdown">{dates[idx]}</span>
        <CountDown time={time}></CountDown>
      </div>
    </Photo>
  );
};

const CountDown = ({ time: { hour, min, sec } }) => {
  return (
    <div id="count-down">
      <ClockNumber number={padNumber(hour)} />
      <span className="count-delim">:</span>
      <ClockNumber number={padNumber(min)} />
      <span className="count-delim">:</span>
      <ClockNumber number={padNumber(sec)} />
    </div>
  );
};

const ClockNumber = ({ number }) => {
  const [first, second] = [padNumber(number, 2)[0], padNumber(number, 2)[1]];

  const getSrc = (i) => {
    return "/res/etc/countdown/" + i + ".png";
  };
  return (
    <>
      <img className="count-numimg" src={getSrc(first)} alt="cnt img" />
      <img className="count-numimg" src={getSrc(second)} alt="cnt img" />
    </>
  );
};

const getPicSrc = (isMobile, type, mId, pId) => {
  const image =
    "/res/last/"+mId+"/"+
    (pId > 9
      ? "moving_image/" + MovingImageSrc.imgs[mId][pId - 10]
      : "fix_image/" + StaticImageSrc.imgs[mId][pId]);
  if (type === "soldout") {
    return "/res/last/"+mId+"/getting/card_" + mId + ".png";
  } else if (type === "pic") {
    return image;
  } else if (type === "txt") {
    return "/res/last/"+mId+"/text/" + TextSrc.imgs[mId][pId];
  } else {
    // type === "audio"
    return "/res/";
  }
};
const silhouets = [
  [
    "/res/photo_frame/410x650_x3_01.png",
    "/res/photo_frame/410x650_x3_02.png",
    "/res/photo_frame/410x650_x3_03.png",
    "/res/photo_frame/410x650_x3_04.png",
    "/res/photo_frame/410x650_x3_05.png",
    "/res/photo_frame/410x650_x3_06.png",
  ],
  [
    "/res/photo_frame/sil_01.png",
    "/res/photo_frame/sil_02.png",
    "/res/photo_frame/sil_03.png",
    "/res/photo_frame/sil_04.png",
    "/res/photo_frame/sil_05.png",
    "/res/photo_frame/sil_06.png",
  ],
];

const BGCard = ({ isMobile }) => {
  return (
    <img
      alt="basepic"
      id="base-bg"
      className="photo-frame"
      src={
        "/res/photo_frame/" + (isMobile ? "m_card_bg.png" : "pc_card_bg.png")
      }
    />
  );
};

const Soldout = ({ idx, isMobile }) => {
  return (
    <div className="soldout-container">
      <img
        alt="card front"
        className="soldout-pic"
        src={getPicSrc(isMobile, "soldout", idx)}
      ></img>
      <img
        alt="pic"
        className="soldout-frame"
        src={
          "/res/photo_frame/" + (isMobile ? "m_sold_out.png" : "d_sold_out.png")
        }
      />
    </div>
  );
};

const CheckCardFrame = (props) => {
  const { data, isMobile, idx } = props;

  try {
    const valid =
      data.body.imageValidList.filter((item) => item < 1000).length > 0;

      const imgsrc =
      "/res/last/"+idx+"/getting/" +
      idx +
      ".png";
      if(idx === 1)
      {
        return (
          <img alt="pic" className="photo-frame" src={imgsrc} />
        );
      } else {
        return (
          <Link to={"/digitalsouvenirs/"} state={{ step: 2, mId: idx }}>
            <img alt="pic" className="photo-frame" src={imgsrc} />
          </Link>
        );
      }
     
  }
  catch (error) {
  }
};

const Photo = ({ idx, cardInfo, src, children, className }) => {
  const dates = ["04.04", "04.05", "04.06", "04.07", "04.08", "04.09"];
  const isMobile = useMediaQuery({ query: device.mobile });
  const path = "/res/last/"+idx+"/" + src;

  let imgComp;
  if (className === "not-opened") {
    imgComp = (
      <div>
        <BGCard isMobile={isMobile} />
        <img
          alt="silhouett"
          className="silhouett"
          src={silhouets[isMobile ? 1 : 0][idx]}
        />
        <div className="coming_container">
          <span className="color-not-opened photo-date">{dates[idx]}</span>
          <span className="photo-not-opened">OPEN</span>
        </div>
      </div>
    );
  } else if (src !== undefined) {
    imgComp = <img alt="frame" className="photo-frame" src={path} />;
  } else if (className === "countdown-frame") {
    const silu = (
      <img
        alt="silhouett"
        className="silhouett"
        src={silhouets[isMobile ? 1 : 0][idx]}
      />
    );
    imgComp = (
      <>
        <BGCard isMobile={isMobile} />
        {silu}
      </>
    );
  } else if (cardInfo === false) {
    const Exclamination = ()=>{
      const {t} = useTranslation();
      return (
      <div id="exclamination">
        <img
          alt="nocard"
          className="nocard"
          src={"/res/icons/free-icon-exclamation-sign-25607.png"}
        />
        <span className="excl-desc">{t("mypage1.2")}</span>
      </div>
    )};

    // {silu}
    imgComp = (
      <>
        <BGCard isMobile={isMobile} />
        <Exclamination />
      </>
    );
  } else if (cardInfo !== undefined) {
    const mId = idx;
    const { picId, txtId, audioId, frontUrl,backUrl } = cardInfo;
    var picImg;
    picImg = (
      <PhotoFrame
        large={true}
        pId={picId}
        height={isMobile ? "64.4vw" : undefined}
        width={isMobile ? "auto" : undefined}
        id="photo-frame-front"
        className="photo-frame"
        alt="pic"
        isMobile={isMobile}
        src={getPicSrc(isMobile, "pic", idx, picId)}
      />
    );

    const txtImg = (
      <img
        alt="txt"
        className="signature-img"
        src={getPicSrc(isMobile, "txt", idx, txtId)}
      />
    );
    if(idx === 1)
    {
      const imgsrc =
      "/res/last/"+idx+"/getting/" +
      idx +
      ".png";
      imgComp = (
        <PhotoFrame
          large={true}
          pId={0}
          height={isMobile ? "64.4vw" : undefined}
          width={isMobile ? "auto" : undefined}
          id="photo-frame-front"
          className="photo-frame"
          alt="pic"
          isMobile={isMobile}
          src={imgsrc}
        />
      );
    } else {
      imgComp = (
        <Link
          replace={false}
          to="/mypage"
          state={{ mId: mId, pId: picId, tId: txtId, aId: audioId, frontUrl: frontUrl, backUrl: backUrl }}
        >
          {txtImg}
          {picImg}
        </Link>
      );
    }
    
  } else {
    // sold out or create now card
    imgComp = WithRequest(
      {
        name: "photoCardValidation" + idx,
        func: () => {
          return photoCardValidation(idx);
        },
        cacheTime: 0,
      },
      CheckCardFrame,
      { isMobile: isMobile, idx: idx },
      true
    );
  }
  return (
    <div className="frame-wrapper">
      {children}
      {imgComp}
    </div>
  );
};

const getPublicCardsMembers = (updateDay, elapsedDay, targetTime) => {
  return [0, 1, 2, 3, 4, 5].map((i) => {
    if (i < elapsedDay) {
      return <Photo idx={i} isPng={true} className="opened" />;
    } else if (i - 1 < elapsedDay) {
      return <TimerMember updateDay={updateDay} idx={i} target={targetTime}></TimerMember>;
    } else {
      return <Photo idx={i} isPng={false} className="not-opened" />;
    }
  });
};

const getUserCardsMembers = (updateDay, elapsedDay, userCards, targetTime) => {
  return [0, 1, 2, 3, 4, 5].map((i) => {
    if (i < elapsedDay) {
      // available
      return (
        <Photo
          idx={i}
          isPng={true}
          cardInfo={userCards[i]} // if cardinfo is false, show no card
          className="opened"
        />
      );
    } else if (i - 1 < elapsedDay) {
      // count down
      return <TimerMember updateDay={updateDay} idx={i} target={targetTime}></TimerMember>;
    } else {
      // not opened
      return <Photo idx={i} isPng={false} className="not-opened" />;
    }
  });
};

const getElapsedDay = (targetTime) => {
  const HOUR_IN_MILLIS = 60 * 60 * 1000;
  const DAY_IN_MILLIS = 24 * HOUR_IN_MILLIS;

  const timeDiff = Date.now() - targetTime;
  return (timeDiff / DAY_IN_MILLIS);
};

const PhotoCards = ({ userCards }) => {
  const isMobile = useMediaQuery({ query: device.mobile });
  const setMemberIdx = useSetRecoilState(curMemberIdx);
  // 끝에 Z를 넣어서 UTC로 설정해야함
  const targetTime = new Date("2022-04-04T04:00:00Z").getTime();
  const elapsedDay = getElapsedDay(targetTime);  
  const [day, setDay] = useState(Math.floor(elapsedDay)+1);
  if (elapsedDay >= 0 && elapsedDay < 6) {
    setMemberIdx(Math.floor(elapsedDay));
  } else if (elapsedDay >= 6) {
    setMemberIdx(5);
  }
  
  const updateDay = ()=>{
    setDay(day+1)
  }
  const newTargetTime = targetTime + (Math.floor(elapsedDay)+1)*(HOUR_IN_MILLIS*24)
  let members;
  if (userCards !== undefined) {
    // my page
    members = getUserCardsMembers(updateDay, elapsedDay, userCards, newTargetTime);
  } else {
    //req valids
    members = getPublicCardsMembers(updateDay, elapsedDay, newTargetTime);
  }

  return (
    <PhotoCardsContainer>
      {isMobile && (
        <FlexBox className="photos-row" row={true}>
          <FlexBox className="photos-left" row={false}>
            {members[0]}
            {members[2]}
            {members[4]}
          </FlexBox>
          <FlexBox className="photos-right" row={false}>
            {members[1]}
            {members[3]}
            {members[5]}
          </FlexBox>
        </FlexBox>
      )}
      {!isMobile && (
        <FlexBox className="photos" row={true}>
          {members[0]}
          {members[1]}
          {members[2]}

          {members[3]}
          {members[4]}
          {members[5]}
        </FlexBox>
      )}
    </PhotoCardsContainer>
  );
};

export default PhotoCards;
