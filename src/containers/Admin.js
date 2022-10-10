import React  from "react";
import styled from "styled-components";
import {
  ContentWrapper,
  FlexBox,
  initializePage,
  Page,
} from "../components/ContentBase";
import AdminPhotoCards from "../components/AdminPhotoCards";
import media from "../utils/media";
import { currentPageAtom } from "../utils/atoms";
import { useSetRecoilState } from "recoil";
import { adminPhotoCardList } from "../utils/api/api";
import { WithRequest } from "../hocs/hoc";

const GettingWrapper = styled(ContentWrapper)`
  height: 2547px;
  ${media.mobile`height:auto;`}
  /* padding: 154px 0 60px 0; */
  padding-top:154px;
  color: #111;

  .getting-title {
    ${media.mobile`font-size: 7.8vw; width:56.8vw;
      margin-bottom:2.6vw;`}
    font-size: 50px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    text-align: left;
    color: #111;
  }

  .getting-description {    
    ${media.mobile`
        width:77.9vw;
        font-size:4.68vw;
        margin:0;
        line-height:1.33;
        margin-bottom:7.8vw;
        `}
    /* width: 705px; */    
    white-space:pre-line;
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    color: #5b5b5b;
    margin-bottom: 30px;
    margin-top: 12px;
  }
`;

const Comp = ({ data }) => {
  let frontImageList = [false, false, false, false, false, false];
  let backImageList = [false, false, false, false, false, false];

  data.body.imageList[0].forEach((item , i) => {
    frontImageList[i] = {item};
  });

  data.body.imageList[1].forEach((item , i) => {
    backImageList[i] = {item};
  });

  const setCurrentPage = useSetRecoilState(currentPageAtom)
  setCurrentPage(initializePage(true, "#FAFAFA", true, "380px"))
  return (
    <Page {...initializePage(true, "#FAFAFA", true, "380px")}>
      <GettingWrapper>
        <FlexBox row={false}>
          <span lang="en" className="getting-title">Admin Page</span>
          <pre className="getting-description">이미지 업로드</pre>
          <AdminPhotoCards frontImageList={frontImageList} backImageList={backImageList} ></AdminPhotoCards>
        </FlexBox>
      </GettingWrapper>
    </Page>
  );
};

const AdminOverView = () => {
  return WithRequest({
    name: "adminCardList",
    func: adminPhotoCardList,
  }, Comp);
};

const Admin = () => {
    return <AdminOverView></AdminOverView>;
};

export default Admin;
