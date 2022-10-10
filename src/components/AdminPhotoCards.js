import styled from "styled-components";
import { FlexBox } from "./ContentBase";
import React, {useState} from "react";
import media from "../utils/media";
import { useMediaQuery } from "react-responsive";
import { device } from "../styles/theme";
import PhotoFrame from "./PhotoFrame";
import { Link } from "react-router-dom";

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

  .photo-frame2 {
    ${media.mobile`
    width:100%;
    height:100%;
    `}
    ${media.mobile`height:${({ theme }) => theme.layout.m_photocard_height};
    object-fit:contain;`}
    width: ${({ theme }) => theme.layout.d_photocard_width};
    height: ${({ theme }) => theme.layout.d_photocard_height};
    cursor: pointer;
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

  .filebox input[type="file"]
  { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip:rect(0,0,0,0); border: 0; } 

  .filebox label
  { display: inline-block; padding: .5em .75em; color: #999; font-size: inherit; line-height: normal; vertical-align: middle; 
    background-color: #fdfdfd; cursor: pointer; border: 1px solid #ebebeb; border-bottom-color: #e2e2e2; border-radius: .25em; }

  /* named upload */
  .filebox .upload-name
   { display: inline-block; padding: .5em .75em; /* label의 패딩값과 일치 */ font-size: inherit; font-family: inherit; line-height: normal; vertical-align: middle; background-color: #f5f5f5; 
   border: 1px solid #ebebeb; border-bottom-color: #e2e2e2; border-radius: .25em; -webkit-appearance: none; /* 네이티브 외형 감추기 */ -moz-appearance: none; appearance: none; }

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

const AdminPhoto = ({idx, frontUrl, backUrl}) => {
  const isMobile = useMediaQuery({ query: device.mobile });
  let imgComp;
  const imgsrc =
  "/res/last/"+idx+"/getting/" +
  idx +
  ".png";
  const [realUrl, setRealUrl] = useState(frontUrl);
  const [pid, setPid] = useState(0);
  const memberName = ["사쿠라","김가람","홍은채","김채원","카즈하","허윤진"];
  if(realUrl !== process.env.REACT_APP_S3_URL+"/null")
  {
    imgComp = (
      <PhotoFrame
        large={true}
        pId={pid}
        className="photo-frame2"
        alt="card front"
        isMobile={isMobile}
        src={realUrl}
        onClick={()=>{
          if(realUrl === frontUrl) {
            setRealUrl(backUrl)
            if(backUrl.charAt(backUrl.length-1) === '4') {
              setPid(10)
            } else {
              setPid(0)
            }
          } else {
            setRealUrl(frontUrl)
            setPid(0)
          }
        }}
      />
    );
  }
  else
  {
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
    )
  }
 
  return (
    <div className="frame-wrapper">
      {imgComp}
      <Link to={"/changeImage/"} state={{ mId: idx }} style={{textAlign:"center"}}>
          <p style={{fontSize:"20px"}}>{memberName[idx]} 이미지 업로드</p>
      </Link>
    </div>
  );
};

const getAdminCardsMembers = (frontImageList, backImageList) => {
  return [0, 1, 2, 3, 4, 5].map((i) => {
      return (
        <AdminPhoto
          idx={i}
          frontUrl={process.env.REACT_APP_S3_URL+"/"+frontImageList[i].item}
          backUrl={process.env.REACT_APP_S3_URL+"/"+backImageList[i].item}
        />
      );
  });
};

const AdminPhotoCards = ({frontImageList, backImageList}) => {
  const isMobile = useMediaQuery({ query: device.mobile });
  let members;
  members = getAdminCardsMembers(frontImageList, backImageList);

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

export default AdminPhotoCards;
