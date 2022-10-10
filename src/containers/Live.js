import React, {useState, useRef, useEffect} from "react";
import styled from "styled-components";
import {
  ContentWrapper,
  FlexBox4,
  FlexBox3,
  FlexBox5,
  FlexBox6,
  FlexBox7,
  initializePage,
  Page,
} from "../components/ContentBase";
import { WithRequest } from "../hocs/hoc";
import media from "../utils/media";
import { currentPageAtom } from "../utils/atoms";
import { useSetRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import { device } from "../styles/theme";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { isLogined, getTicketCheck, generateSignature } from "../utils/api/api";
import { ZoomMtg } from '@zoomus/websdk';

const LiveWrapper = styled(ContentWrapper)`
  height: 2500px;
  /* padding: 154px 0 60px 0; */
  padding-top:240px;
  color: #111;
  ${media.mobile`height:auto;`}

  .live-title {
    font-size: 50px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: left;
    color: #111;
    ${media.mobile`
    font-size: 6vw; 
    width:56.8vw;
    margin-bottom:2.6vw;
    `}
  }

  .live-title2 {
    font-size: 24px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: normal;
    text-align: left;
    color: #111;
    margin-top: 10px;
    ${media.mobile`
      font-size: 4vw;
      font-weight: normal;
      color: #5b5b5b;
      width:80vw;
      margin-bottom:5vw;`}
  }

  .live-title22 {
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: normal;
    text-align: left;
    color: #5b5b5b;
    margin-top: 10px;
    margin-bottom: 50px;
    ${media.mobile`
      font-size: 4vw;
      font-weight: normal;
      color: #5b5b5b;
      width:80vw;
      margin-top: 2.5vw;
      margin-bottom:10vw;`}
  }
  .live-notice {
    margin-top: 50px;
  }
  .live-notice-title {
    font-size: 22px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: left;
    color: #111;
    ${media.mobile`
    font-size: 4vw; 
    width:56.8vw;
    margin-bottom:2.6vw;
    `}
  }
  .live-notice-content {
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: left;
    color: #5b5b5b;
    margin-top: 10px;
    margin-bottom: 50px;
    ${media.mobile`
      font-size: 3vw;
      font-weight: normal;
      color: #5b5b5b;
      width:80vw;
      margin-top: 2.5vw;
      margin-bottom:10vw;`}
  }

  .live-title3 {
    font-size: 50px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: center;
    color: #111;
    margin-top: 185px;
    ${media.mobile`
      font-size: 6vw;
      width:80vw;
      margin-top: 20vw;
      margin-bottom:2.6vw;`}
  }

  .time-box {
    width: 435px;
    height: 80px;
    background-color: white;
    margin: auto;
    ${media.mobile`
      width: 70vw;
      height: 16vw;`}
  }
  .getting-avail {
    background-color: #000;
    color: #fff;
  }
  .getting-normal {
    background-color: #555;
    color: #888;
  }

  .count-numimg {
    width: 27px;
    height: 40px;
    ${media.mobile`width:3.6vw;height:5.2vw;`}
  }

  .timer-container {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    background-color: white;
    align-items: center;
    height: 100%;
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
  #count-down {
    display: flex;
    justify-content: space-between;
    width: 200px;
    height: 60px;
    align-items: center;
    ${media.mobile`
    font-size:3.9vw;
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

  .enter {
    font-size: 28px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #111;
    ${media.mobile`
      font-size:4vw;
    `}
  }
  #getting-button {
    margin: auto;
    cursor: pointer;
    outline-style: none;
    border: 0;
    display: block;
    width: 150px;
    font-size: 22px;
    font-weight: bold;
    height: 40px;
    ${media.mobile`
      font-size: 2.5vw;
      width: 15vw;
      height: 10vw;
    `}
  }

  #getting-button2 {
    margin: auto;
    cursor: pointer;
    outline-style: none;
    border: 0;
    display: block;
    width: 500px;
    font-size: 28px;
    font-weight: bold;
    height: 80px;
    margin-top: 60px;
    margin-bottom: 184px;
    ${media.mobile`
      font-size: 4.5vw;    
      width: 70vw;
      height: 18.40vw;
      margin-top: 15vw;
      margin-bottom: 20vw;
    `}
  }

  input::-webkit-input-placeholder {
    color: #e3e3e3;
    text-indent:10px;
  }
  input:-ms-input-placeholder {
    color: #e3e3e3;
    text-indent:10px;
  }

  .input-email {
    width: 100%;
    height: 30px;
    ${media.mobile`
      width: 45vw;
      height: 6vw;
      font-size: 3vw;`
    }
  }

  .input-email-input {
    width: 100%;
    height: 30px;
    border-radius: 5px;
    border: solid 1px #ebebeb;
    ${media.mobile`
      width: 45vw;
      height: 8vw;
      font-size: 3vw;`
    }
  }
`;

const getElapsedDay = (targetTime) => {
  const HOUR_IN_MILLIS = 60 * 60 * 1000;
  const DAY_IN_MILLIS = 24 * HOUR_IN_MILLIS;

  const timeDiff = targetTime - Date.now();
  return (timeDiff / DAY_IN_MILLIS);
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
const TimerEnter = ({updateDay, target }) => {
  const {t} = useTranslation();
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
    <div className="timer-container">
      <CountDown time={time}></CountDown>
      <pre className="enter">{t("live_enter")}</pre>
    </div>
  );
};
const padNumber = (num, length) => {
  return String(num).padStart(length, "0");
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
const isEmail = (email) => {
  const emailRegex =
    /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

  return emailRegex.test(email);
};

var role = 0
var leaveUrl = process.env.REACT_APP_S3_URL

function getSignature(joinName, language, isMobile) {
  generateSignature(
  {
    role: role
  },
  data => {
    startMeeting(data.body.ret.signature, data.body.ret.meetingNumber, data.body.ret.password,data.body.ret.sdkKey, joinName, language, isMobile)
  },
  err => {
    console.error(err)
  });
};

function startMeeting(signature, meetingNumber, password, sdkKey, joinName, language, isMobile) {
  ZoomMtg.setZoomJSLib('https://source.zoom.us/2.5.0/lib', '/av');

  ZoomMtg.preLoadWasm();
  ZoomMtg.prepareWebSDK();
  var lang = 'en-US';
  if(language === 'ko') {
    lang = 'ko-KO';
  } else if (language === 'ja') {
    lang = 'jp-JP';
  }
  
  // loads language files, also passes any error messages to the ui
  ZoomMtg.i18n.load(lang);
  ZoomMtg.i18n.reload(lang);
  ZoomMtg.init({
    leaveUrl: leaveUrl,
    screenShare: false,
    showMeetingHeader: false,
    disableInvite: true,
    success: (success) => {
      console.log(success)
      console.log("init success")
      document.getElementById('zmmtg-root').style.display = 'block'
      document.getElementById('root').style.display = 'none'
      ZoomMtg.join({
        signature: signature,
        meetingNumber: meetingNumber,
        userName: joinName,
        sdkKey: sdkKey,
        userEmail: joinName,
        passWord: password,
        success: (success) => {
          console.log("join sueccess")

          if(document.getElementsByClassName('wr-tile')[0] !== undefined)
          {
            document.getElementsByClassName('wr-tile')[0].style.maxWidth = '1100px';
            document.getElementsByClassName('wr-tile')[0].childNodes[0].innerText="Welcome to the Online Special Event with LE SSERAFIM!"
            document.getElementsByClassName('wr-desc')[0].innerHTML = "<span>1. 원활한 이벤트 참여를 위해 PC로 접속해주세요.</span><br /><span>We recommend using your PC when logging in to Zoom.</span><br /><span>スムーズなイベント参加のために、ZOOMにはパソコンでアクセスすることをおすすめします。</span><br /><br /><span>2. 이벤트에는 당첨자 본인만 참여 가능하며, 이를 확인하기 위해 이벤트 주최 측에서 Zoom 입장 시 얼굴(화면) 노출을 요청드릴 수 있습니다.</span><br /><span>The event organizer may require the participants to turn on cameras for face verification after entering the Zoom meeting.</span><br /><span>確認のため、Zoom入場の際にイベント主催側より顔(画面)の露出をお願いすることがあります。</span>"
            document.getElementsByClassName('wr-desc')[0].style.maxWidth = '1100px';
            document.getElementsByClassName('wr-desc')[0].style.padding = '10px';
            document.getElementsByClassName('wr-desc')[0].style.fontSize = '16px';
            document.getElementsByClassName('wr-desc')[0].style.textAlign = 'center';
            document.getElementsByClassName('wr-desc')[0].style.color = 'black';
          }

          if(document.getElementsByClassName('meeting-info-container')[0] !== undefined)
          {
            document.getElementsByClassName('meeting-info-container')[0].style.display = 'none';
          }
          console.log(success)
        },
        error: (error) => {
          console.log(error)
        }
      })

    },
    error: (error) => {
      console.log(error)
    }
  })
}

const InputBox = ({ setJoinName }) => {
  const isMobile = useMediaQuery({ query: device.mobile });
  const {t, i18n} = useTranslation();
  const [ email, setEmail ] = useState('')
  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  return (
    <FlexBox5 row={true} justify={"center"}>
      <FlexBox6 row={false} width="235px" justify={"center"}>
        <pre className="input-email">{t("input_email")}</pre>
        <input onChange={onChangeEmail} className="input-email-input" placeholder="abc@gmail.com"></input>
      </FlexBox6>
      <FlexBox7 width="200px" row={false} justify={"center"}>
        <input
          id="getting-button"
          type="submit"
          className={
            isEmail(email) === true
              ? "getting-avail"
              : "getting-normal"
          }
          value={t("live_enter")}
          onClick={(e) => {
            if(isEmail(email) === true)
            {
              setJoinName(email);
              getSignature(email, i18n.language, isMobile);
            }
          }
          }
        />
      </FlexBox7>
    </FlexBox5>
  );
}

const getPublicCardsMembers = (updateDay, elapsedDay, targetTime, setJoinName) => {
  if (elapsedDay <= 0) {
    return <InputBox setJoinName={setJoinName} ></InputBox>;
  } else {
    return <TimerEnter updateDay={updateDay} target={targetTime}></TimerEnter>;
  } 
};

const LiveOverView = (props)=>{
  const {data} = props;
  const targetTime = new Date("2022-07-26T04:30:00Z").getTime();
  const elapsedDay = getElapsedDay(targetTime);

  const [day, setDay] = useState(Math.floor(elapsedDay));
  const [joinName, setJoinName] = useState('');

  const updateDay = ()=>{
    setDay(day+1)
  }
  const {t} = useTranslation();
  const time = getPublicCardsMembers(updateDay, elapsedDay, targetTime, setJoinName);

  const isMobile = useMediaQuery({ query: device.mobile });
  const navigate = useNavigate();
  const setCurrentPage = useSetRecoilState(currentPageAtom)
  setCurrentPage(initializePage(true, "#FAFAFA", true, "500px"))
  return (
    <Page {...initializePage(true, "#FAFAFA", true, "500px")}>
      {data.body.ret ? (
        joinName === '' ? (
          <LiveWrapper>
          <span className="live-title">{t("live_title5")}</span>
          <pre className="live-title22">{t("live_title6")}</pre>
          <FlexBox4 row={isMobile ? false : true} justify={"center"}>
            <div className="time-box">
              {time}
            </div>
          </FlexBox4>
          <div className="live-notice">
            <span className="live-notice-title">{t("live_notice_title")}</span>
            <pre className="live-notice-content">{t("live_notice_content")}</pre>
          </div>
          </LiveWrapper>
        ) : (
          <LiveWrapper>
            <></>
          </LiveWrapper>
        )
      ) : (
        <LiveWrapper>
          <FlexBox3 row={false} justify={"center"}>
            <pre className="live-title3">{t("live_title4")}</pre>
            <form>
              <input
                id="getting-button2"
                type="submit"
                className={"getting-avail"}
                value={t("input_button2")}
                onClick={(e) => 
                  navigate("/", { replace: true })
                }
            />
           </form>
          </FlexBox3>
        </LiveWrapper>
      )
    }
    </Page>
  );
}


const Live = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    if (!isLogined()) {
      navigate("/login", { replace: true });
      return <div></div>;
    }
  }, []);
  return WithRequest({
    name: "getTicketCheck",
    func: () => {
      return getTicketCheck();
    },
  }, LiveOverView, false);
};

export default Live;
