import { useEffect, useState } from "react";
import useAuthToken from "../components/useAuthToken";

const Dropdown = ({ submenus, dropdown }) => {
  const { getPermisosInfo, getPermisoPorParametro, loading } = useAuthToken();
  const [permisosInfo, setPermisosInfo] = useState([]);

  useEffect(() => {
    if (!loading) { // Solo llama a getPermisosInfo cuando loading es false
        const permisos = getPermisosInfo();
        setPermisosInfo(permisos); // Establecer los permisos obtenidos
    }
  }, [loading, getPermisosInfo]);

    return (
      <ul className={`dropdown ${dropdown ? "show" : ""}`}>
        {submenus.map((submenu, index) => (
          getPermisoPorParametro(permisosInfo,submenu.permiso) === 'S' ? 
          (<li key={index} className="menu-items">
            <a href={submenu.url}>{submenu.title}</a>
          </li>)
        : ''
        ))}
      </ul>
    );
  };
  
  export default Dropdown;