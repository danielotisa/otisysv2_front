import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Login.styles.css";

// Icon components
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const BuildingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <path d="M9 22v-4h6v4"></path>
    <path d="M8 6h.01"></path>
    <path d="M16 6h.01"></path>
    <path d="M12 6h.01"></path>
    <path d="M12 10h.01"></path>
    <path d="M12 14h.01"></path>
    <path d="M16 10h.01"></path>
    <path d="M16 14h.01"></path>
    <path d="M8 10h.01"></path>
    <path d="M8 14h.01"></path>
  </svg>
);

const LogoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#764ba2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
    <path d="M2 17l10 5 10-5"></path>
    <path d="M2 12l10 5 10-5"></path>
  </svg>
);

function Login(props) {
    // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emps, setEmps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [companiesError, setCompaniesError] = useState(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem('userId');
    if (loggedUser) {
      setIsSubmitted(true);
    }
  },[]);

  const errors = {
    upass: "Usuario o contraseña inválidos",
    others: "Error de conexión. Por favor intente nuevamente.",
    noCompany: "Por favor seleccione una empresa"
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
      .then((r) => {
        setEmps(r.data);
        setLoadingCompanies(false);
      })
      .catch((err) => {
        console.log(err);
        setCompaniesError('No se pudieron cargar las empresas. Por favor recargue la página.');
        setLoadingCompanies(false);
      });
  },[base_url]);
  
  const handleSubmit = (e) => {
    //Prevent page reload
    e.preventDefault();
    setIsLoading(true);
    setErrorMessages({});

    var { uname, pass, company} = document.forms[0];

    if (!company.value) {
      setErrorMessages({ name: "noCompany", message: errors.noCompany });
      setIsLoading(false);
      return;
    }

    localStorage.setItem('env', 'prod');

    //axios.get(`${base_url}/empresa/${company.value}/user/${uname.value}/pass/${pass.value}`)
    axios.post(`${base_url}/login`, {user: uname.value, id: company.value, pass: pass.value})  
      .then((response) => {
        setIsLoading(false);
        if (response.status === 200) {
            setIsSubmitted(true);
            localStorage.setItem('userId', response.data.user.codUser);
            localStorage.setItem('empId', response.data.user.idEmp);
            localStorage.setItem('token', response.data.user.token);
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
      <div className="error">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        {errorMessages.message}
      </div>
    );

  // JSX code for login form
  return(
    <div className="login-page">
      <div className="login-form">
        <div className="login-header">
          <div className="login-logo">
            <LogoIcon />
          </div>
          <h1 className="title">Sistema de Facturación</h1>
          <p className="subtitle">Ingrese sus credenciales para continuar</p>
        </div>

        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>
                <UserIcon />
                Usuario
              </label>
              <input 
                type="text" 
                name="uname" 
                required 
                placeholder="Ingrese su usuario"
                autoComplete="username"
              />
            </div>
            <div className="input-container">
              <label>
                <LockIcon />
                Contraseña
              </label>
              <input 
                type="password" 
                name="pass" 
                required 
                placeholder="Ingrese su contraseña"
                autoComplete="current-password"
              />
              {renderErrorMessage("upass")}
            </div>
            <div className="input-container">
              <label>
                <BuildingIcon />
                Empresa
              </label>
              {companiesError ? (
                <div className="error">{companiesError}</div>
              ) : loadingCompanies ? (
                <div className="loading">
                  <div className="spinner"></div>
                  <span>Cargando empresas...</span>
                </div>
              ) : (
                <select name="company" defaultValue="">
                  <option value="" disabled>Seleccione una empresa</option>
                  {emps.map(({ codEmpresa, empresa }) => (
                    <option key={codEmpresa} value={codEmpresa}>{empresa}</option>
                  ))}
                </select>
              )}
            </div>
            {renderErrorMessage("others")}
            {renderErrorMessage("noCompany")}
            <div className="button-container">
              <input 
                type="submit" 
                value={isLoading ? "Ingresando..." : "Iniciar Sesión"}
                disabled={isLoading || loadingCompanies}
              />
            </div>
          </form>
        </div>

        <div className="login-footer">
          <p>© {new Date().getFullYear()} Trafosys - Sistema de Gestión</p>
        </div>
        
      </div>
    </div>
  );
}

export default Login;