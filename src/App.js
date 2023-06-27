import React, { useEffect, useState } from "react";
//import ReactDOM from "react-dom";

import "./styles.css";


function App() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emps, setEmps] = useState([]);

  const errors = {
    upass: "invalid username or password",
    others: "other error"
  };

  useEffect(() => {
    fetch('http://localhost:3000/emps_data')
      .then((r) => r.json())
      .then((data) => {setEmps(data)})
      .catch((err) => {
        console.log(err);
      });
  },[]);
  
  const handleSubmit = (e) => {
    //Prevent page reload
    e.preventDefault();

    var { uname, pass, company} = document.forms[0];

    console.log(uname.value, pass.value, company.value)

    fetch(`http://localhost:3000/empresa/${company.value}/user/${uname.value}/pass/${pass.value}`)
      .then((data) => {
        console.log(data)
          if (data.status === 200) {
            setIsSubmitted(true);
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
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="input-container">
          <label>Empresa </label>
          <select name="company">
            {emps.map(({codEmpresa, empresa},i) => <option value={codEmpresa} >{empresa}</option>)}
          </select>
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

export default App;
