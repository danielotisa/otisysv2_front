import React, { useEffect, useState } from "react";
//import ReactDOM from "react-dom";

import "./styles.css";

//import HomePage from "./pages/homepage/HomePage";
import Header from "./components/Header";
import Login from "./pages/login/Login";
import Cookies from "js-cookie";

function App() {
  // React States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const loggedUser = Cookies.get('userId');
    if (loggedUser) {
      setIsLoggedIn(true);
    }
  },[]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="app">
      {isLoggedIn ? <Header /> : <Login onLoginSuccess={handleLoginSuccess}/>}
    </div>
  );
}

export default App;
