import React, {useEffect, useState} from 'react';
import {
  Route,
  Routes,
  Link,
 } from "react-router-dom";

import './HomePage.styles.css';

import Facturas from '../facturas/Facturas';
import Autofacturas from '../autofacturas/Autofacturas';
import Remisiones from '../remisiones/Remisiones';
import NotasCredito from '../notascredito/NotasCredito';

function HomePage() {
  const [isSubmitted, setIsSubmitted] = useState(true);
  const [user, setUser] = useState({})

  useEffect(() => {
    setUser({id: localStorage.getItem('empId'), userId: localStorage.getItem('userId')})
  },[]);
  
  const handleLogout = () => {
    localStorage.clear();
    setIsSubmitted(false);
    window.location.reload();
  }

  return(
    <div className='homepage'>
      <div className="page-header">
        <h1 className="page-title">Sistema de Facturación Electrónica</h1>
        <p className="page-subtitle">Gestione sus documentos electrónicos de forma segura y eficiente</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14,2 14,8 20,8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10,9 9,9 8,9"></polyline>
            </svg>
          </div>
          <h3>Facturas</h3>
          <p>Gestione el envío y consulta de facturas electrónicas</p>
          <Link to="/facturas" className="btn btn-primary">Ver Facturas</Link>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14,2 14,8 20,8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10,9 9,9 8,9"></polyline>
            </svg>
          </div>
          <h3>Notas de Crédito</h3>
          <p>Administre notas de crédito electrónicas</p>
          <Link to="/notascredito" className="btn btn-primary">Ver Notas</Link>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16,8 20,8 23,11 23,16 16,16 16,8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
          </div>
          <h3>Remisiones</h3>
          <p>Gestione remisiones y entregas</p>
          <Link to="/remisiones" className="btn btn-primary">Ver Remisiones</Link>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </div>
          <h3>Autofacturas</h3>
          <p>Administre autofacturas electrónicas</p>
          <Link to="/autofacturas" className="btn btn-primary">Ver Autofacturas</Link>
        </div>
      </div>

      <Routes>
        <Route path="/"/>
        <Route path="/facturas" element={<Facturas user={user}/>}/>
        <Route path="/notascredito" element={<NotasCredito user={user}/>}/>
        <Route path="/remisiones" element={<Remisiones user={user}/>}/>
        <Route path="/autofacturas" element={<Autofacturas user={user}/>}/>
      </Routes>
    </div>
  )

export default HomePage;