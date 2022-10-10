import PropTypes from "prop-types";
import React, { memo } from "react";
import { useQuery } from "react-query";
import { Navigate, useNavigate } from "react-router-dom";
import { isLogined, logout } from "../utils/api/api";

const doLogout = (goToHome) => {
  logout();
  goToHome();
};

export const WithErrorHandler = (Comp, props) => {
  const navigate = useNavigate();  

  if (props.needLogin) {
    if (!isLogined()) {
      navigate("/", { replace: true });
      return <div></div>;
    }
  }
  return <Comp {...props} />;
};



export const WithRequest = (req, Comp, props={}, fallback, loadingComp) => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery(
    req.name,
    () => {
      return req.func();
    },
    { cacheTime: req.cacheTime ? req.cacheTime : 1000,
      retry:2 }
  );
  
  const goToHome = ()=>{navigate("/", {replace:true})};

  if (isLoading) {
    if (loadingComp) {
      return loadingComp;
    }
    else {
      return <div></div>;
    }
  }

  if (error) {
    if (error?.code === 'ECONNABORTED' ) {
      //show timeout dlg
    }
    // handle error
    if (error?.response?.data?.status === 401) {
      // refresh token으로 갱신 또는 로그아웃 처리
      doLogout(goToHome)
    } else if (error?.response?.data?.status === 403) {
      doLogout(goToHome)
      // redirect home?
    }

    if (fallback) {
      return <Comp {...props}/>
    } else {
      return <div></div>;
    }    
  }
  
  let res = data.data;
  if (res.header.code !== 200) {
    // No definition
    doLogout(goToHome)
    return <div></div>;
  }

  // ok
  return <Comp data={res} {...props } />;
};
