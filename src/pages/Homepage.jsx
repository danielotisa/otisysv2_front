import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import './homepage/HomePage.styles.scss';

import Facturas from './facturas/Facturas';
import Autofacturas from './autofacturas/Autofacturas';
import Remisiones from './remisiones/Remisiones';
import NotasCredito from './notascredito/NotasCredito';
import useAuthToken from "../components/useAuthToken";

const Homepage = () => {
    const [user, setUser] = useState({});
    const { getPermisosInfo, getPermisoPorParametro, loading } = useAuthToken();
    const [permisosInfo, setPermisosInfo] = useState([]);
    
    useEffect(() => {
        setUser({id: localStorage.getItem('empId'), userId: localStorage.getItem('userId')})
      },[]);

    useEffect(() => {
        if (!loading) { // Solo llama a getPermisosInfo cuando loading es false
            const permisos = getPermisosInfo();
            setPermisosInfo(permisos); // Establecer los permisos obtenidos
        }
    }, [loading, getPermisosInfo]);
    
    return (
        <div>
            <Routes>
                <Route path="/"/>
                {getPermisoPorParametro(permisosInfo,'MENU_FACTURA') === 'S' ? <Route path="/facturas" element={<Facturas user={user}/>}/> : ''}
                {getPermisoPorParametro(permisosInfo,'MENU_NOTA_CREDITO') === 'S' ? <Route path="/notascredito" element={<NotasCredito user={user}/>}/> : ''}
                {getPermisoPorParametro(permisosInfo,'MENU_REMISION') === 'S' ? <Route path="/remisiones" element={<Remisiones user={user}/>}/> : ''}
                {getPermisoPorParametro(permisosInfo,'MENU_AUTOFACTURA') === 'S' ? <Route path="/autofacturas" element={<Autofacturas user={user}/>}/> : ''}
            </Routes>
        </div>
    );
};

export default Homepage;