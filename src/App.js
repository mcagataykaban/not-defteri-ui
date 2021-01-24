import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import axios from "axios";
import { trackPromise } from "react-promise-tracker";
import Nots from "./pages/Nots";


import "./App.css";
import LoginRegister from "./LoginRegister";

const App = () => {
  useEffect(() => {
    
    getAccessToken()
    const girisKontrol =()=> {
      
      var accessToken = getAccessToken();
      if (!accessToken) {
        return;
      }
      trackPromise(
        axios({
          method: "get",
          url: apiUrl + "api/Account/UserInfo",
          headers: { Authorization: "Bearer " + getAccessToken() },
        })
          .then((response) => {
            setuserName(response.data.Email);
            setisAuth(true);
          })
          .catch((error) => {
            setisAuth(false);
          })
      );
    }
    girisKontrol();
  }, []);
  const getAccessToken = ()=> {
    var accessToken = sessionStorage["login"] || localStorage["login"];
    if (accessToken) {
      accessToken = accessToken.substring(1, accessToken.length - 1);
    }
    if (!accessToken) {
      return null;
    }
    return accessToken;
  }
  const [isAuth, setisAuth] = useState(false);
  const [userName, setuserName] = useState("")
  const apiUrl = "https://notapi.cagataykaban.com/";
  
  return (
    <div className="App">
      <Router>
        <Switch>
        {isAuth === false ? (
          <Route>
            <LoginRegister apiUrl={apiUrl} />
          </Route>
        ) : (
          <Route>
            <Nots apiUrl={apiUrl} token={getAccessToken()}
            uName={userName}/>
          </Route>
        )}
        <Redirect to="/nots" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
