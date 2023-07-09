import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faRightFromBracket  } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
    const navigate = useNavigate();

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
                    <a className="navbar-brand" href="#">
                        <img src="/img/logo.png" width={200}/>
                    </a>
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