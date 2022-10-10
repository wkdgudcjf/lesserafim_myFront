import { useSearchParams, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isGNBAtom } from "../utils/atoms";
import { useEffect, useReducer } from "react";
import { setCookie } from "../utils/api/cookie";
import { login} from "../utils/api/api";

const requestAuth = async (searchParams, dispatch, navigate) => {
  const access_token = searchParams.get("access_token");
  if(access_token == null)
  {
    navigate('/');
    return <div></div>;
  }
  dispatch({ type: 'LOADING' });
  login(
  {
    accessToken: access_token
  },
  data => {
    if(data.body.token == null)
    {
      navigate('/');
      return <div></div>;
    }

    const expires = new Date()
    expires.setDate(expires.getDate() + 7)
    setCookie(process.env.REACT_APP_USER_ID, data.body.token.token, {
      path: "/",
      expires,
      secure: true,
      sameSite: "none",
    })

    if(data.body.token.role)
    {
      setCookie(process.env.REACT_APP_AMDIN_ID, "ADMIN", {
        path: "/",
        expires,
        secure: true,
        sameSite: "none",
      })
    }

    dispatch({type:'SUCCESS', data:data.body.token});
  },
  err => {
    if (err.response.data.status === 400) {
      
    }
    else if (err.response.data.status === 500) {
    }
    dispatch({type:'ERROR', error:err});   
  });

};

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        data: null,
        error: null,
      };
    case "SUCCESS":
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case "ERROR":
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const setIsGNB = useSetRecoilState(isGNBAtom);
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });

  useEffect(() => {
    requestAuth(searchParams, dispatch, navigate);
  }, [searchParams]);

  const { loading, data, error } = state;

  if (loading) {
    return (<div>loading</div>);
  } // loading rendering or action
  if (error) {
    return (<div>err</div>);
  } // error rendering or action
  if (data) {
    setIsGNB(false);
    navigate('/');
    return <div></div>;
  }

  return <div></div>
};

export default Auth;
