import {React, useEffect} from 'react';
import logo from '../favicon-32x32.png'; // Import the image
import { Link, useLocation } from 'react-router-dom';



const Navbar = () => {
    let location = useLocation();
    useEffect(() => {
        console.log(location.pathname);
      }, [location]);
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark  bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
                        <strong>CloudNotes</strong>
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/home"? "active":""}`} aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about"? "active":""}`} to="/about">About Us</Link>
                            </li>
                        </ul>

                        <form className="d-flex"  style={{ marginLeft: "auto" }} role="search">
                        <Link type="button" className="btn btn-light mx-1 btn-sm" to='/login'>Log In</Link>
                        <Link type="button" className="btn btn-light mx-1 btn-sm" to='/signup'>Sign Up</Link>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
