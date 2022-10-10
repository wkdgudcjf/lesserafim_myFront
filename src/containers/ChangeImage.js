import React, { useState } from "react";
import styled from "styled-components";
import {
  ContentWrapper,
  FlexBox,
  initializePage,
  Page,
} from "../components/ContentBase";
import media from "../utils/media";
import { currentPageAtom } from "../utils/atoms";
import { useSetRecoilState } from "recoil";
import { useLocation } from "react-router-dom";
import { adminPhotoCard, deleteAdminPhotoCard } from "../utils/api/api";

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
    margin-bottom: 10px;
    margin-top: 30px;
  }
  
  .filebox {
    padding: .5em .75em;
  }
  .filebox input[type="file"] 
  { 
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip:rect(0,0,0,0);
    border: 0;
  } 
  .filebox label 
  { 
    margin-left:5px;
    display: inline-block;
    padding: .5em .75em;
    color: #000000;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    background-color: #ffffff;
    cursor: pointer;
    border: 1px solid #000000;
    border-bottom-color: #000000;
    border-radius: .25em;
  }
  /* named upload */
  .filebox .upload-name
  {
    display: inline-block;
    padding: .5em .75em; 
    /* label의 패딩값과 일치 */ 
    font-size: inherit;
    font-family: inherit;
    line-height: normal;
    vertical-align: middle;
    background-color: #ddd;
    border: 1px solid #000000;
    border-bottom-color: #000000;
    border-radius: .25em;
    -webkit-appearance: none;
    /* 네이티브 외형 감추기 */
    -moz-appearance: none;
    appearance: none;
  }

  .UploadButton {
    margin-left:5px;
    display: inline-block;
    padding: .5em .75em;
    color: #000000;
    font-size: inherit;
    font-weight: bold;
    line-height: normal;
    vertical-align: middle;
    background-color: #fdfdfd;
    cursor: pointer;
    border: 1px solid #000000;
    border-bottom-color: #000000;
    border-radius: .25em;
    font-family: 'Noto Sans KR','Roboto',sans-serif;
  }
`;

const FileFrame = ({idx, isFront, memberId, changeFile}) => {
  const [fileName, changeFileName] = useState("");
    return (
      <div className="filebox"> 
        <input className="upload-name" value={fileName} disabled="disabled" /> 
        <label htmlFor={idx}>파일 찾기</label> 
        <input type="file" id={idx} className="upload-hidden" onChange={ (e)=>{
            changeFileName(e.target.files[0].name);
            changeFile(e.target.files[0])
          } } />
    </div>
    );
};

const GettingOverView = ({state})=>{
  const memberId = state.mId;
  const memberName = ["사쿠라","김가람","홍은채","김채원","카즈하","허윤진"];
  // ::TODO if needed, add get user photo card first and set userCards to PhotoCards
  const setCurrentPage = useSetRecoilState(currentPageAtom)
  setCurrentPage(initializePage(true, "#FAFAFA", true, "380px"))

  const [file_front, changeFrontFile] = useState();
  const [file_back, changeBackFile] = useState();
  return (
    <Page {...initializePage(true, "#FAFAFA", true, "380px")}>
      <GettingWrapper>
        <FlexBox row={false}>
          <span lang="en" className="getting-title">{memberName[memberId]} 이미지 수정</span>
          <pre className="getting-description">앞면</pre>          
          <FileFrame idx={0} isFront={0} memberId={memberId} changeFile = {changeFrontFile}></FileFrame>
          <pre className="getting-description">뒷면</pre>          
          <FileFrame idx={1} isFront={1} memberId={memberId} changeFile = {changeBackFile}></FileFrame>
          <div className="filebox">
            <button type="button" className="UploadButton" onClick={()=>{
              if(file_front == null || file_back == null) {
                alert('앞면 뒷면 모두 올려주세요.')
              }
              else {
                adminPhotoCard(file_front, file_back, memberId,
                (data)=>{ if(data.header.code === 500) {
                  alert('파일을 확인해 주세요.')
                } else {
                  alert('업로드 성공')
                }},
                ()=>{ alert('업로드 실패')})
              }
            }}>업로드</button>
          </div>
          <div className="filebox"> 
            <button type="button" className="UploadButton" onClick={()=>{
              deleteAdminPhotoCard(memberId, ()=>{ alert('삭제 완료')},()=>{ alert('삭제 실패')})
            }}>파일 초기화</button>
          </div>
        </FlexBox>
      </GettingWrapper>
    </Page>
  );
}

const ChangeImage = () => {
  const state = useLocation()?.state;
  return <GettingOverView state={state}></GettingOverView>;
};

export default ChangeImage;
