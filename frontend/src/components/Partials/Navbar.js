import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faRightFromBracket, faHouse, faBook  } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
    const navigate = useNavigate();

    // Function to logout
    const logout = async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");

        navigate('/login');
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                <div className="container-fluid container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link className="navbar-brand" to='/'>
                        <img src="/img/logo.png" width={200}/>
                    </Link>
                    <ul className="navbar-nav ms-3 me-auto mb-2 mb-lg-0">
                        <li className="nav-item me-4">
                            <Link className="nav-link" id="home" to='/'><FontAwesomeIcon icon={faHouse} /> Home</Link> 
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" id="bookings" to='/bookings'><FontAwesomeIcon icon={faBook} /> Bookings</Link> 
                        </li>
                    </ul>
                    {
                    localStorage.getItem("token") 
                    ? <button className="btn btn-primary pull-right" onClick={logout}><FontAwesomeIcon icon={faRightFromBracket} /> Logout</button> 
                    : <Link className="btn btn-primary pull-right" to='/login'><FontAwesomeIcon icon={faRightToBracket} /> Login</Link> 
                    }
                </div>
            </nav>
        </div>
    );
}