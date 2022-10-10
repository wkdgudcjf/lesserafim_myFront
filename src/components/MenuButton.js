import styled from "styled-components";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isGNBAtom } from "../utils/atoms";
import media from "../utils/media";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { device } from "../styles/theme";

const BtnMenuBlock = styled.div`
  position: relative;
  cursor: pointer;
  width: 40px;
  height: 40px;
  margin-left: 10px;
  ${media.mobile`
  margin-left:2vw;
  width:30px;
  height:30px;`}
  
`;

const BtnMenuBlock2 = styled.div`
  position: relative;
  cursor: pointer;
  width: 90px;
  height: 40px;
  ${media.mobile`
  width:60px;
  object-fit: fill;
  height:30px;`}
`;

const MenuBtn = (props) => {
  return (
    <BtnMenuBlock
      as="img"
      onClick={props.clickListner}
      alt="menu"
      src={props.src}
    ></BtnMenuBlock>
  );
};

const MenuBtn2 = (props) => {
  return (
    <BtnMenuBlock2
      as="img"
      onClick={props.clickListner}
      alt="menu"
      src={props.src}
    ></BtnMenuBlock2>
  );
};

const MenuButton = (props) => {
  const setIsGNB = useSetRecoilState(isGNBAtom);
  const isGNB = useRecoilValue(isGNBAtom);
  return (
    <div className="header-box">
      {isGNB ? (
        <MenuBtn
          clickListner={(e) => {
            e.preventDefault();
            setIsGNB(false);
          }}
          src="/res/menu-close.svg"
        />
      ) : props.isLight ? (
        <MenuBtn
          clickListner={() => {
            setIsGNB(true);
          }}
          src="/res/menu-icon.svg"
        />
      ) : (
        <MenuBtn
          clickListner={() => {
            setIsGNB(true);
          }}
          src="/res/menu-icon-dark.svg"
        />
      )}
    </div>
  );
};

export default MenuButton;
