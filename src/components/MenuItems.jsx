import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Dropdown from './Dropdown';
import useAuthToken from "../components/useAuthToken";

const MenuItems = ({ items }) => {
    const [dropdown, setDropdown] = useState(false);
    const { getPermisosInfo, getPermisoPorParametro, loading } = useAuthToken();
    const [permisosInfo, setPermisosInfo] = useState([]);

    let ref = useRef();

    useEffect(() => {
        const handler = (event) => {
            if (dropdown && ref.current && !ref.current.contains(event.target)) {
                setDropdown(false);
            }
        };
        
        document.addEventListener("mousedown", handler);
        
        document.addEventListener("touchstart", handler);
        
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    }, [dropdown]);

    useEffect(() => {
        if (!loading) { // Solo llama a getPermisosInfo cuando loading es false
            const permisos = getPermisosInfo();
            setPermisosInfo(permisos); // Establecer los permisos obtenidos
        }
    }, [loading, getPermisosInfo]);

    const onMouseEnter = () => {
        window.innerWidth > 960 && setDropdown(true);
    };
       
    const onMouseLeave = () => {
        window.innerWidth > 960 && setDropdown(false);
    };

    const closeDropdown = () => {
        dropdown && setDropdown(false);
    };

    return (
        <li className="menu-items" ref={ref} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={closeDropdown}>
        {items.submenu ? (
            <>
            <button type="button" aria-haspopup="menu" aria-expanded={dropdown ? "true" : "false"}
             onClick={() => setDropdown((prev) => !prev)}>
                {items.title}{' '}
            </button>
            <Dropdown submenus={items.submenu} dropdown={dropdown}/>
            </>
        ) : 
            (items.permiso !== undefined) ? (getPermisoPorParametro(permisosInfo,items.permiso) === 'S' ? <Link to={items.url}>{items.title}</Link> : '') : <Link to={items.url}>{items.title}</Link>
        }
        </li>
    );
};

export default MenuItems;