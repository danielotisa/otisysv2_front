import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import axios from 'axios';

const useAuthToken = () => {
    const [tokenInfo, setTokenInfo] = useState(null);
    //const [permisosInfo, setPermisosInfo] = useState(null);
    const [expired, setExpired] = useState(false);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            const token = Cookies.get('accessToken');
            const base_url = localStorage.getItem('base_url');
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    const currentTime = Date.now() / 1000; // Tiempo actual en segundos

                    if (decoded.exp < currentTime) {
                        // Token expirado, intentar refresh
                        setRefreshing(true);
                        try {
                            const response = await axios.post(`${base_url}/refresh`);
                            if (response.status === 200) {
                                // Nuevo token debería estar en cookies
                                const newToken = Cookies.get('accessToken');
                                if (newToken) {
                                    const newDecoded = jwtDecode(newToken);
                                    setTokenInfo(newDecoded);
                                    setExpired(false);
                                } else {
                                    setExpired(true);
                                }
                            } else {
                                setExpired(true);
                            }
                        } catch (refreshError) {
                            console.error('Error al refrescar token:', refreshError);
                            setExpired(true);
                        } finally {
                            setRefreshing(false);
                        }
                    } else {
                        setTokenInfo(decoded);
                        setExpired(false);
                    }
                } catch (error) {
                    console.error('Error al decodificar el token:', error);
                    setExpired(true); // Considerar como expirado si hay un error
                }
            } else {
                setExpired(true); // No hay token, considerar como expirado
            }
            setLoading(false);
        };
        checkToken();
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

    return { getTokenInfo, isTokenExpired, getPermisosInfo, getPermisoPorParametro, loading, refreshing };
};

export default useAuthToken;