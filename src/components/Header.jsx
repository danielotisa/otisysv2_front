import { Link } from "react-router-dom";

import Navbar from './Navbar';
import Homepage from "../pages/Homepage";
import { Button } from "react-bootstrap";


const Header = () => {
    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    }
    const logo = `logo${localStorage.getItem('empId')}`;
    return (
        <div>
            <header>
                <div className="nav-area">
                    <Link to="/" className="logo">
                        <img src={require(`../img/${logo}.png`)} alt="" height="64" />
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