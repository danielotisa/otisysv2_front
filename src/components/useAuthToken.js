import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const useAuthToken = () => {
    const [tokenInfo, setTokenInfo] = useState(null);
    //const [permisosInfo, setPermisosInfo] = useState(null);
    const [expired, setExpired] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000; // Tiempo actual en segundos

                setTokenInfo(decoded);
                setExpired(decoded.exp < currentTime);
                //setPermisosInfo(decoded.permisos);
            } catch (error) {
                console.error('Error al decodificar el token:', error);
                setExpired(true); // Considerar como expirado si hay un error
            }
        } else {
            setExpired(true); // No hay token, considerar como expirado
        }
        setLoading(false);
    }, []);

    // Función para obtener la información del token decodificado
    const getTokenInfo = () => {
        return tokenInfo || {};
    };

    const getPermisosInfo = () => {
        return tokenInfo && Array.isArray(tokenInfo.permisos) ? tokenInfo.permisos : [];
    };

    // Función para verificar si el token ha expirado
    const isTokenExpired = () => {
        return expired;
    };

    // Función para encontrar el permiso correspondiente a un parametro dado
    const getPermisoPorParametro = (permisos, parametro) => {
        const item = permisos.find(item => item.parametro === parametro);
        return item ? item.permiso : 'N'; // Retorna el permiso o null si no se encuentra
    };

    return { getTokenInfo, isTokenExpired, getPermisosInfo, getPermisoPorParametro, loading };
};

export default useAuthToken;