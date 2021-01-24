import React, { useState } from "react";
import { trackPromise } from "react-promise-tracker";
import { Alert } from "react-bootstrap";

import Logonot from "../images/logonot.png";
import Loading from '../components/Loading'
import axios from "axios";
import qs from "qs";
import "../App.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const Register = (props) => {
  const [inputEmail, setinputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputConfirm, setInputConfirm] = useState("");
  const [isWrong, setIsWrong] = useState({wrong: false, message:""});
  const inputEmailHandler = (e) => {
    setIsWrong(false);
    setinputEmail(e.target.value);
  };
  const inputPasswordHandler = (e) => {
    setIsWrong(false);
    setInputPassword(e.target.value);
  };
  const inputConfirmHandler = (e) => {
    setIsWrong(false);
    setInputConfirm(e.target.value);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    var apiUrl = "https://notapi.cagataykaban.com/";
    trackPromise(
      axios({
        method: "post",
        url: apiUrl + "api/Account/Register",
        data: qs.stringify({
          email: inputEmail,
          password: inputPassword,
          confirmpassword: inputConfirm,
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })
        .then((response) => {
          props.registerOk();
        })
        .catch((error) => {
          if (error.response.data.ModelState["model.ConfirmPassword"]) {
            setIsWrong({wrong: true, message:"Şifreler eşleşmiyor."})
          } else if (error.response.data.ModelState[""][1]) {
            setIsWrong({wrong: true, message:"Bu mail daha önce alınmış."})
          } else{
            setIsWrong({wrong: true, message:"Parola min 6 karakterden oluşmalı içinde noktalama işareti,büyük,küçük harf ve rakam bulunmalıdır."})
          }
        })
    );
  };
  return (
    <form className="form-signin">
      <Loading />
      <img className="mb-4" src={Logonot} alt="" width="90" height="90" />
      <h1 className="h3 mb-3 font-weight-normal">Kayıt ol</h1>
      {isWrong.wrong && <Alert variant="danger">{isWrong.message}</Alert>}
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
        className="form-control mb-0 border-bottom-0"
        placeholder="Şifre"
        required
      />
      <label htmlFor="inputPasswordConfirm" className="sr-only">
        Password
      </label>
      <input
        onChange={inputConfirmHandler}
        type="password"
        className="form-control mb-0"
        placeholder="Şifre tekrarı"
        required
      />
      <button
        onClick={submitFormHandler}
        className="text-white btn btn-lg btn-warning btn-block"
        type="submit"
      >
        Kayıt ol
      </button>
      <p className="mt-5 mb-3 text-muted">&copy; 2021</p>
    </form>
  );
};

export default Register;
