import React, {useState} from "react";

import './App.css'
import Login from "./pages/Login";
import Register from "./pages/Register";
import SwitchButton from "./components/SwitchButton";

const LoginRegister = (props) => {
  const [isLogin, setIsLogin] = useState(true);
  const switchFormHandler = () => {
    setIsLogin(!isLogin);
  };
  const registerOkHandler = () => {
    setIsLogin(true);
  };
  return (
    <div className="deneme">
    <SwitchButton loginMi={isLogin} onClick={switchFormHandler} />
      {isLogin === true ? (
        <Login />
      ) : (
        <Register registerOk={registerOkHandler} />
      )}
    </div>
  );
};

export default LoginRegister;
