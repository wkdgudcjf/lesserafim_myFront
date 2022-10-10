import React, { setState } from "react";
import MyPage from "./MyPage";
import MyPageDetail from "./MyPageDetail";

const MyPageWrapper = () => {
  const [picId, setPicId] = setState(-1);
  return (
    <>
      {picId === -1 ? (
        <MyPage selectPicId={setPicId}></MyPage>
      ) : (
        <MyPageDetail picId={picId}></MyPageDetail>
      )}
    </>
  );
};

export default MyPageWrapper;
