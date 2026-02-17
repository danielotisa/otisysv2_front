import { Link } from "react-router-dom";

import Navbar from './Navbar';
import Homepage from "../pages/Homepage";
import { Button } from "react-bootstrap";
import Cookies from "js-cookie";

// Import logos estáticamente
import logo1 from '../img/logo1.png';
import logo2 from '../img/logo2.png';
import logo4 from '../img/logo4.png';
import logo5 from '../img/logo5.png';
import logo6 from '../img/logo6.png';
import logo7 from '../img/logo7.png';
import logo8 from '../img/logo8.png';
/* import logonull from '../img/logonull.png'; */

// Mapa de logos por empId
const logoMap = {
  '1': logo1,
  '2': logo2,
  '4': logo4,
  '5': logo5,
  '6': logo6,
  '7': logo7,
  '8': logo8,
  //'null': logonull, // Fallback para empId null o no encontrado
};


const Header = () => {
    const handleLogout = () => {
        localStorage.clear();
        Cookies.remove('userId');
        Cookies.remove('empId');
        Cookies.remove('accessToken');
        window.location.reload();
    }
    const empId = Cookies.get('empId') || 'null';
    const logoSrc = logoMap[empId];// || logoMap['null']; // Default to logonull if empId not found
    return (
        <div>
            <header>
                <div className="nav-area">
                    <Link to="/" className="logo">
                        <img src={logoSrc} alt="" height="64" />
                    </Link>
                    <Navbar />
                    <Button variant="outline-primary" onClick={handleLogout}>Logout</Button>
                </div>
            </header>
            <Homepage />
        </div>
    );
};

export default Header;