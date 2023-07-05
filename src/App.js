import React, { useEffect, useState } from "react";
//import ReactDOM from "react-dom";

import "./styles.css";

import HomePage from "./pages/homepage/homepage";
import axios from "axios";

function App() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emps, setEmps] = useState([]);

  const errors = {
    upass: "invalid username or password",
    others: "other error"
  };

  

  let base_url = (localStorage.getItem('env') === 'prod') ? process.env.REACT_APP_BASEURL_PROD : process.env.REACT_APP_BASEURL_TEST;

  useEffect(() => {
    axios.get(`${base_url}/emps_data`)
      .then((r) => {setEmps(r.data)})
      .catch((err) => {
        console.log(err);
      });
  },[base_url]);

  useEffect(() => {
    const loggedUser = localStorage.getItem('userId');
    if (loggedUser) {
      setIsSubmitted(true);
    }
  },[]);

  const handleChangeEnvironment = (e) => {
    e.preventDefault();
    var {env} = document.forms[0];
    localStorage.setItem('env', env.value);
  }
  
  const handleSubmit = (e) => {
    //Prevent page reload
    e.preventDefault();

    var { uname, pass, company, env} = document.forms[0];

    base_url = (localStorage.getItem('env') === 'prod') ? process.env.REACT_APP_BASEURL_PROD : process.env.REACT_APP_BASEURL_TEST;

    localStorage.setItem('env', env.value);

    axios.get(`${base_url}/empresa/${company.value}/user/${uname.value}/pass/${pass.value}`)
      .then((response) => {
        if (response.status === 200) {
          setIsSubmitted(true);
          localStorage.setItem('userId', response.data.user.codUser);
          localStorage.setItem('empId', response.data.user.idEmp);
        } else {
          setErrorMessages({name: "upass", message: errors.upass});
        }
      })
      .catch((err) => {
        setErrorMessages({name: "others", message: errors.others});
      });
  };


  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );
  

  // JSX code for login form
  const renderForm = (
    <div className="login-form">
      <div className="title">Sign In</div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Usuario </label>
            <input type="text" name="uname" required />
          </div>
          <div className="input-container">
            <label>Password </label>
            <input type="password" name="pass" required />
            {renderErrorMessage("upass")}
          </div>
          <div className="input-container">
            <label>Empresa </label>
            <select name="company">
              {emps.map(({codEmpresa, empresa},i) => <option value={codEmpresa} >{empresa}</option>)}
            </select>
          </div>
          {renderErrorMessage("others")}
          <div className="input-container">
            <label>Entorno </label>
            <select name="env" onChange={handleChangeEnvironment}>
              <option value= "test">Testing</option>
              <option value= "prod">Producción</option>
            </select>
          </div>
          <div className="button-container">
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
  return (
    <div className="app">
      {isSubmitted ? <HomePage /> : renderForm}
    </div>
  );
}

export default App;
