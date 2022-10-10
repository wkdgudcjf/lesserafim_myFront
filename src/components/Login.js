import React, { useEffect } from "react";
import { isLogined } from "../utils/api/api";
import { useNavigate } from "react-router-dom";
const redirect = () => {
  const weverseAccountLoginUrl = process.env.REACT_APP_WEVERSE_LOGIN_URL
  window.location.href = weverseAccountLoginUrl;
};

const Login = () => {
  const navigate = useNavigate()
  //redirects after component is mounted
  useEffect(() => {
    if(isLogined())
    {
      navigate('/');
      return <div></div>;
    }
    redirect();
  });
  return <div></div>;
};

export default Login;
