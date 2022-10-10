import React from "react";
import Modal from "react-modal";
import { FlexBox } from "./ContentBase";
import texts from "../data/texts";
import styled from "styled-components";
import "../styles/Modal.css";
import media from "../utils/media";
import { Link, useNavigate } from "react-router-dom";
import { WithRequest } from "../hocs/hoc";
import { userPhotoCard, liveTicket } from "../utils/api/api";
import { nanoid } from "nanoid";
import { withTranslation } from "react-i18next";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {TailSpin} from 'react-loader-spinner'
import { useMediaQuery } from "react-responsive";
import { device } from "../styles/theme";

Modal.setAppElement("#root");

const ModalContainer = styled(FlexBox)`
  /* 
@media screen and (max-width: 420px) {
  font-size: 4vw;
  .modal-title {
    font-size:1vw;
  }

} */
  text-align: center;

  .modal-title {
    text-align: center;
    display: inline-block;

    ${media.mobile`
    font-size:4.5vw;
  `}
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.45px;
    color: #111;
  }

  .needLogin {
    align-items: center;
  }

  .showDetail {
    text-align: left !important;
    align-items: start;
  }
  
  .modal-desc {
    text-align: center;
    white-space: pre-line;
    display: block;
    margin-top: 5px;
    margin-bottom: 20px;
    ${media.mobile`
    white-space: pre-line;
    font-size:4.5vw;
    margin-top: 1.5vw;
    margin-bottom: 5.2vw;
  `}
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.22;
    letter-spacing: normal;
    color: #343434;
  }

  .modal-desc-top {
    text-align: center;
    white-space: pre-line;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    ${media.mobile`
    white-space: pre-line;
    font-size:4.5vw;
    margin-top: 5vw;
    flex-wrap: wrap
  `}
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.22;
    letter-spacing: normal;
    color: #343434;
  }

  .modal-desc-mid {
    text-align: center;
    white-space: pre-line;
    display: flex;
    justify-content: center;
    margin-top: 5px;
    ${media.mobile`
    white-space: pre-line;
    font-size:4.5vw;
    margin-top: 1.5vw;
    flex-wrap: wrap
  `}
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.22;
    letter-spacing: normal;
    color: #343434;
  }
  .modal-desc-bottom {
    text-align: center;
    white-space: pre-line;
    display: flex;
    justify-content: center;
    margin-top: 5px;
    margin-bottom: 20px;
    ${media.mobile`
    white-space: pre-line;
    font-size:4.5vw;
    margin-top: 1.5vw;
    margin-bottom: 5vw;
    flex-wrap: wrap
  `}
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.22;
    letter-spacing: normal;
    color: #343434;
  }

  .modal-desc-not {
    text-align: center;
    white-space: pre-line;
    display: block;
    ${media.mobile`
    font-size:4.5vw;
  `}
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.22;
    letter-spacing: normal;
    color: #343434;
  }

  .modal-desc-bold {
    text-align: center;
    white-space: pre-line;
    display: block;
    ${media.mobile`
    font-size:4.5vw;
  `}
    text-decoration: underline;
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.22;
    letter-spacing: normal;
    color: #343434;
  }

  #button-container {
    width: 100%;
  }

  #modal-button {
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    width: 240px;
    height: 71px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 39px;
    background-color: #000;
    ${media.mobile`
    margin-top:1vw;
    width:50.4vw;
    height:16,4vw;
    font-size:4vw;
  `}
  }

  ${media.mobile`
    padding: 10vw 13vw;
  `}
  padding: 50px 50px 50px 50px;

  justify-content: center;
  /* height:100%;         */

  #modal-button-text {
    font-size: 22px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 0.92;
    letter-spacing: normal;
    color: #fff;
    ${media.mobile`
    font-size:5.6vw;
    `}
  }
  .modal-extra {
    white-space: pre-line;
    text-align: left;
    margin-bottom:10px;
    ${media.mobile`
    width:65vw;
    font-size:3.64vw;
    margin-bottom:2vw;
    `}
    width:100%;

    font-size: 14px;
    font-weight: 600;
    color: #888;
  }
`;

const getContentsFromType = (type) => {
  if (type === "needLogin") {
    return texts.dialog.needLogin;
  } else if (type === "showDetail") {
    return texts.dialog.showDetail;
  } else if (type === "showDetail2") {
    return texts.dialog.showDetail2;
  } else if (type === "showDetail3") {
    return texts.dialog.showDetail3;
  } else if (type === "getPhotoCard") {
    return texts.dialog.getItem;
  } else if (type === "waiting") {
    return texts.dialog.waiting;
  } else if (type === "success") {
    return texts.dialog.success;
  } else if (type === "failed") {
    return texts.dialog.failed;
  } else if (type === "success2") {
    return texts.dialog.success2;
  } else if (type === "failed2") {
    return texts.dialog.failed2;
  } else if (type === "checkCond1") {
    return texts.dialog.condition_1;
  } else if (type === "checkCond2") {
    return texts.dialog.condition_2;
  } else if (type === "haveCard") {
    return texts.dialog.haveCard;
  } else if (type === "timeOut") {
    return texts.dialog.timeOut;
  }
};

const createContents = (type, t) => {
  const content = getContentsFromType(type);
  let contents;
  if(type === "showDetail2")
  {
    contents = content.texts.map((item) => {
      return (
        <>
          <span key={nanoid()} className={"modal-title"}>
            {t(item.title)}
          </span>
          <div key={nanoid()} className={"modal-desc-top"}>
            {t(item.desc1)}&nbsp;<span className={"modal-desc-not"}>{t(item.desc2)}</span>
          </div>
          <div key={nanoid()} className={"modal-desc-mid"}>
            {t(item.desc3)}&nbsp;<span className={"modal-desc-bold"}>{t(item.desc4)}</span>
          </div>
          <div key={nanoid()} className={"modal-desc-mid"}>
            {t(item.desc5)}&nbsp;<span className={"modal-desc-not"}>{t(item.desc6)}</span>
          </div>
          <div key={nanoid()} className={"modal-desc-bottom"}>
            {t(item.desc7)}&nbsp;<span className={"modal-desc-bold"}>{t(item.desc8)}</span>
          </div>
        </>
      );
    });
  } else if(type === "showDetail3")
  {
    contents = content.texts.map((item) => {
      return (
        <>
          <span key={nanoid()} className={"modal-title " + type}>
            {t(item.title)}
          </span>
          <div key={nanoid()} className={"modal-desc-top"}>
            {t(item.desc1)}&nbsp;<span className={"modal-desc-bold"}>{t(item.desc2)}</span>
          </div>
          <div key={nanoid()} className={"modal-desc-mid"}>
            {t(item.desc3)}&nbsp;<span className={"modal-desc-bold"}>{t(item.desc4)}</span>
          </div>
          <div key={nanoid()} className={"modal-desc-mid"}>
            {t(item.desc5)}&nbsp;<span className={"modal-desc-not"}>{t(item.desc6)}</span>
          </div>
          <div key={nanoid()} className={"modal-desc-bottom"}>
            {t(item.desc7)}&nbsp;<span className={"modal-desc-bold"}>{t(item.desc8)}</span>
          </div>
        </>
      );
    });
  } else {
    contents = content.texts.map((item) => {
      return (
        <>
          <span key={nanoid()} className={"modal-title " + type}>
            {t(item.title)}
          </span>
          <span key={nanoid()} className={"modal-desc " + type}>
            {t(item.desc)}
          </span>
        </>
      );
    });
  }
  
  const extra = content.extra ? (
    <span className="modal-extra">{t(content.extra)}</span>
  ) : (
    <></>
  );

  return [contents, extra, content.button];
};

const ModalButton = ({ click, button }) => {
  return (
    <div id="modal-button" onClick={click}>
      <span id="modal-button-text">{button}</span>
    </div>
  );
};

export const DialogWith = (type, isOpen, click, t) => {
  const [contents, extra, button] = createContents(type, t);

  return (
    <Modal
      style={{
        overlay: {
          "z-index": "1002",
          backgroundColor: "rgba(200, 200, 200, 0.95)",
        },
      }}
      className="modal"
      isOpen={isOpen.isOpen}
      contentLabel="lesserafim dialog"
    >
      <ModalContainer id="modal-container" className={isOpen.type}>
        {contents}
        {extra}
        <div id="button-container">
          {isOpen.type === "needLogin" ? (
            <Link to="/login">
              <ModalButton click={click} button={t(button)} />
            </Link>
          ) : (
            <ModalButton click={click} button={t(button)} />
          )}
        </div>
      </ModalContainer>
    </Modal>
  );
};

const LoadingDialog = () => {
  const isMobile = useMediaQuery({ query: device.mobile });
  const size = {width: isMobile ? "15vw" : "150", height: isMobile ? "15vw" : "150"} 
  return (
    <Modal
      style={{
        overlay: {
          "z-index": "1002",
          backgroundColor: "rgba(200, 200, 200, 0.95)",
        },
      }}
      className="modal"
      isOpen={true}
      contentLabel="lesserafim dialog"
    >      
      <ModalContainer id="modal-container" className="loading">
      <TailSpin
      color="#343434"
      height={size.height}
      width={size.width} />      

      </ModalContainer>
    </Modal>
  );
};

const CardResultDialog = ({ t, isOpen, state, data }) => {
  const navigate = useNavigate();
  const result = data.body.ret;

  const goToGetting = () => {
    navigate("/digitalsouvenirs", {
      state: { step: 2, mId: state.mId },
      replace: true,
    });
  };
  const goToMyPage = () => {
    navigate("/mypage", { state: state, replace: true });
  };

  if (result) {
    return DialogWith("success", isOpen, goToMyPage, t);
  } else {
    return DialogWith("failed", isOpen, goToGetting, t);
  }
};
const CardResultDialog2 = ({ t, isOpen, state, data }) => {
  const navigate = useNavigate();
  const result = data.body.ret;

  const goToLive = () => {
    navigate("/", { state: state, replace: true });
  };
  const goToMainPage = () => {
    navigate("/", { state: state, replace: true });
  };

  if (result) {
    return DialogWith("success2", isOpen, goToMainPage, t);
  } else {
    return DialogWith("failed2", isOpen, goToLive, t);
  }
};
const TranslatedWithDialog = withTranslation()(CardResultDialog);
const TranslatedWithDialog2 = withTranslation()(CardResultDialog2);

const Dialog = ({ t, isOpen, setIsOpen }) => {
  const toggleModal = () => {
    setIsOpen({ isOpen: !isOpen.isOpen, type: isOpen.type });
  };

  if (isOpen.type === "getLiveTicket") {
    const state = {
      quiz1: isOpen.liveList[0],
      quiz2: isOpen.liveList[1],
      sex: isOpen.liveList[2],
      name1: isOpen.liveList[3],
      name2: isOpen.liveList[4],
      birth: isOpen.liveList[5]
    };

    // replace={true}
    return WithRequest(
      {
        name: "live-req",
        func: () => {
          return liveTicket(state.quiz1, state.quiz2, state.sex, state.name1, state.name2, state.birth);
        },
        cache: 0,
      },
      TranslatedWithDialog2,
      { isOpen, state },
      false,
      <LoadingDialog />
    );
  }
  else if (isOpen.type === "getPhotoCard") {
    const state = {
      mId: isOpen.idList[0],
      pId: isOpen.idList[1],
      tId: isOpen.idList[2],
      aId: isOpen.idList[3],
    };

    // replace={true}
    return WithRequest(
      {
        name: "photo-req",
        func: () => {
          return userPhotoCard(state.mId, state.pId, state.tId, state.aId);
        },
        cache: 0,
      },
      TranslatedWithDialog,
      { isOpen, state },
      false,
      <LoadingDialog />
    );
  } else if (isOpen.type === "showDetail2") {
    return DialogWith(isOpen.type, isOpen, toggleModal, t);
  } else if (isOpen.type === "showDetail3") {
    return DialogWith(isOpen.type, isOpen, toggleModal, t);
  }
  else {
    return DialogWith(isOpen.type, isOpen, toggleModal, t);
  }
  
};

export default Dialog;
