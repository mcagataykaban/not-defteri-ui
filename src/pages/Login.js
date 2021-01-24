import React, { useState } from "react";
import { trackPromise } from 'react-promise-tracker';
import { Alert } from "react-bootstrap";


import axios from "axios";
import qs from "qs";
import Logonot from "../images/logonot.png";

import Loading from '../components/Loading'

import "../App.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [inputEmail, setinputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isChecked, setisChecked] = useState(false);
  const [isWrong, setIsWrong] = useState({wrong: false, message:""});

  const rememberMeHandler = () => {
    setisChecked(!isChecked);
  };
  const inputEmailHandler = (e) => {
    setinputEmail(e.target.value);
  };
  const inputPasswordHandler = (e) => {
    setInputPassword(e.target.value);
  };
  //https://www.basefactor.com/react-how-to-display-a-loading-indicator-on-fetch-calls
  const submitFormHandler = (e) => {
    e.preventDefault();
    var apiUrl = "https://notapi.cagataykaban.com/";
    trackPromise(
    axios({
      method: "post",
      url: apiUrl + "Token",
      data: qs.stringify({
        grant_type: "password",
        username: inputEmail,
        password: inputPassword,
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    })
      .then((response) => {
        setIsWrong({wrong: true, message:"Giriş başarılı.Yönlendiriliyorsunuz"})
        window.location.pathname = "/";
        localStorage.removeItem("login");
        sessionStorage.removeItem("login");
        var storage = isChecked ? localStorage : sessionStorage;
        storage["login"] = JSON.stringify(response.data.access_token);
      })
      .catch((error) => {
        if ((error.response.data.error === "invalid_grant")) {
          setIsWrong({wrong: true, message:"Kullanıcı adı veya parola yanlış."})
        }
      }));
  };
  return (
    <React.Fragment>
      <Loading />
      <form className="form-signin">
        <img className="mb-4" src={Logonot} alt="" width="90" height="90" />
        <h1 className="h3 mb-3 font-weight-normal">Giriş yap</h1>
        {isWrong.message === "Giriş başarılı.Yönlendiriliyorsunuz" &&  <Alert variant="success">{isWrong.message}</Alert>}
        {isWrong.message ==="Kullanıcı adı veya parola yanlış." && <Alert variant="danger">{isWrong.message}</Alert>}
        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          onChange={inputEmailHandler}
          type="email"
          className="form-control"
          placeholder="Email adresi"
          required
          autoFocus
        />
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          onChange={inputPasswordHandler}
          type="password"
          className="form-control mb-0"
          placeholder="Şifre"
          required
        />
        <button
          onClick={submitFormHandler}
          className="btn btn-lg btn-success btn-block"
          type="submit"
        >
          Giriş yap
        </button>
        <div className="checkbox">
          <label>
            <input
              onClick={rememberMeHandler}
              className="mt-4 mr-2"
              type="checkbox"
            />
            Beni hatırla
          </label>
        </div>
        <p className="mt-5 mb-3 text-muted">&copy; 2021</p>
      </form>
    </React.Fragment>
  );
};

export default Login;
