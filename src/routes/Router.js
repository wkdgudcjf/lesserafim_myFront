import { Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Auth from "../components/Auth";
import OverlayMenu from "../components/OverlayMenu";
import About from "../containers/About";
import Getting from "../containers/Getting";
import Landing from "../containers/Landing";
import MyPage from "../containers/MyPage";
import Admin from "../containers/Admin";
import ChangeImage from "../containers/ChangeImage";
import Notice from "../containers/Notice";
import NotFound from "../components/NotFound";
import Header from "../components/Header";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { isGNBAtom } from "../utils/atoms";
import { useRecoilValue } from "recoil";
import NoticeDetail from "../containers/NoticeDetail";
import { useState } from "react";

const Router = (props) => {
  const isGNB = useRecoilValue(isGNBAtom);

  const [header, setHeader] = useState(true);

  return (
    <div>            
      {header?<Header isGNB={isGNB}></Header>:<></>}
      <SwitchTransition timeout={200}>
        <CSSTransition timeout={200} key={isGNB} classNames="fade">
          {isGNB ? (
            <OverlayMenu />
          ) : (
            <Routes>
              <Route path="/" element={<Landing />}></Route>
              <Route path="/menu" element={<OverlayMenu />}></Route>
              <Route path="/auth" element={<Auth />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/admin" element={<Admin />}></Route>
              <Route path="/changeImage" element={<ChangeImage />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/digitalsouvenirs" element={<Getting type="entry"/>}></Route>              
              <Route path="/notice" element={<Notice />}></Route>
              <Route path="/notice/:id" element={<NoticeDetail />}></Route>
              <Route path="/mypage" element={<MyPage />}></Route>                           
              <Route path="*" element={<NotFound setHeader={setHeader}/>}></Route>              
            </Routes>
          )}
        </CSSTransition>
      </SwitchTransition>      
    </div>
  );
};

export default Router;
