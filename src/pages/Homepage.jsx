import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import './homepage/HomePage.styles.scss';

import Facturas from './facturas/Facturas';
import Autofacturas from './autofacturas/Autofacturas';
import Remisiones from './remisiones/Remisiones';
import NotasCredito from './notascredito/NotasCredito';

const Homepage = () => {
    const [user, setUser] = useState({});
    useEffect(() => {
        setUser({id: localStorage.getItem('empId'), userId: localStorage.getItem('userId')})
      },[]);
    return (
        <div>
            <Routes>
                <Route path="/"/>
                <Route path="/facturas" element={<Facturas user={user}/>}/>
                <Route path="/notascredito" element={<NotasCredito user={user}/>}/>
                <Route path="/remisiones" element={<Remisiones user={user}/>}/>
                <Route path="/autofacturas" element={<Autofacturas user={user}/>}/>
            </Routes>
        </div>
    );
};

export default Homepage;