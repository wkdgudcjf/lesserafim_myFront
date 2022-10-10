import styled from "styled-components";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isGNBAtom } from "../utils/atoms";
import media from "../utils/media";

const LogoBlock = styled.div`
  width: 127px;
  height: 40px;
  ${media.mobile`
    width:95px;height:35px;`}
  /* object-fit: contain; */
  /* margin-left: 10px; */
  span {
    display: table-cell;
    vertical-align: middle;
  }
  a,
  img {
    display: inline-block;
    width: inherit;
    height: inherit;
  }
`;

const Logo = (props) => {
  const setIsGNB = useSetRecoilState(isGNBAtom);
  const isGNB = useRecoilValue(isGNBAtom);
  return (
    <LogoBlock>
      <Link
        to="/"
        onClick={(e) => {
          setIsGNB(false);
        }}
      >
        <img
          alt="logo"
          id="logo"
          src={props.isLight|| isGNB ? "/res/logo_dark.svg" : "/res/logo_light.svg"}
        />
      </Link>
    </LogoBlock>
  );
};

export default Logo;
