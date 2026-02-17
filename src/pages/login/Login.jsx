import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./Login.styles.css";

function Login(props) {
    // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emps, setEmps] = useState([]);

  useEffect(() => {
    const loggedUser = Cookies.get('userId');
    if (loggedUser) {
      setIsSubmitted(true);
    }
  },[]);

  const errors = {
    upass: "invalid username or password",
    others: "other error"
  };
  var url = window.location.hostname;
  var port = window.location.port;
  let base_url;
  if (url === process.env.REACT_APP_BASEIP_PROD) {
    base_url = (process.env.REACT_APP_ENV === 'prod') ? process.env.REACT_APP_BASEURL_PROD : process.env.REACT_APP_BASEURL_TEST;
  } else {
    base_url = (process.env.REACT_APP_ENV === 'prod') ? `http://${url}:${port}/api` : process.env.REACT_APP_BASEURL_TEST;
  }  
  
  localStorage.setItem('base_url', base_url);

  useEffect(() => {
    axios.get(`${base_url}/emps_data`)
      .then((r) => {setEmps(r.data)})
      .catch((err) => {
        console.log(err);
      });
  },[base_url]);

  /* const handleChangeEnvironment = (e) => {
    e.preventDefault();
    var {env} = document.forms[0];
    localStorage.setItem('env', env.value);
  } */
  
  const handleSubmit = (e) => {
    //Prevent page reload
    e.preventDefault();

    var { uname, pass, company} = document.forms[0];

    /* base_url = (localStorage.getItem('env') === 'prod') ? process.env.REACT_APP_BASEURL_PROD : process.env.REACT_APP_BASEURL_TEST; */

    localStorage.setItem('env', 'prod');

    //axios.get(`${base_url}/empresa/${company.value}/user/${uname.value}/pass/${pass.value}`)
    axios.get(`${base_url}/login`,{params:{user: uname.value, id: company.value, pass: pass.value}})  
      .then((response) => {
        if (response.status === 200) {
            setIsSubmitted(true);
            Cookies.set('userId', response.data.user.codUser, { secure: true, sameSite: 'strict' });
            Cookies.set('empId', response.data.user.idEmp, { secure: true, sameSite: 'strict' });
            Cookies.set('accessToken', response.data.user.token, { secure: true, sameSite: 'strict' });
            props.onLoginSuccess();
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
  return(
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
          {/* <div className="input-container">
            <label>Entorno </label>
            <select name="env" onChange={handleChangeEnvironment}>
              <option value= "test">Testing</option>
              <option value= "prod">Producción</option>
            </select>
          </div> */}
          <div className="button-container">
            <input type="submit" value="Login"/>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;