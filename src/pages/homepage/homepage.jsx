import React, {useEffect, useState} from 'react';
import {
  Route,
  Routes,
  Link,
 } from "react-router-dom";

import './homepage.styles.scss';

import Facturas from '../facturas';
import Autofacturas from '../autofacturas';
import Remisiones from '../remisiones';
import NotasCredito from '../notascredito';

function HomePage() {
  const [isSubmitted, setIsSubmitted] = useState(true);
  const [user, setUser] = useState({/* id: localStorage.getItem('empId'), userId: localStorage.getItem('userId') */})

  useEffect(() => {
    setUser({id: localStorage.getItem('empId'), userId: localStorage.getItem('userId')})
  },[]);
  //const user = {id: localStorage.getItem('empId'), userId: localStorage.getItem('userId')};
  
  const handleLogout = () => {
    localStorage.clear();
    setIsSubmitted(false);
    window.location.reload();
  }

  return(
  <div className='homepage'>
    <h2>FACTURACION ELECTRONICA</h2>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/facturas">Facturas</Link>
            </li>
            <li>
              <Link to="/notascredito">Notas de Credito</Link>
            </li>
            <li>
              <Link to="/remisiones">Remisiones</Link>
            </li>
            <li>
              <Link to="/autofacturas">Autofacturas</Link>
            </li>
          </ul>
        </nav>
        <button onClick={handleLogout}>logout</button>
      </header>
      <Routes>
        <Route path="/facturas" element={<Facturas user={user}/>}/>
        <Route path="/notascredito" element={<NotasCredito user={user}/>}/>
        <Route path="/remisiones" element={<Remisiones user={user}/>}/>
        <Route path="/autofacturas" element={<Autofacturas user={user}/>}/>
      </Routes>
  </div>
)}

export default HomePage;