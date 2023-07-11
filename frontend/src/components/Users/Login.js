import React, { useEffect } from 'react';
import $ from 'jquery';
import UserService from "../../services/UserService.js";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket  } from '@fortawesome/free-solid-svg-icons';
import "./Login.css";

export default function Login() {
    const navigate = useNavigate();
    
    // Function to send form to backend
    const sendForm = async (body) => { return await UserService.login(body); }
    // Function to check if is Logged
    const isLoggedIn = async () => { return await localStorage.getItem('token'); }

    // Function to submit form
    const handleSubmit = async (e) => {
        //Prevent page reload
        e.preventDefault();
        let email = $("#email").val();
        let password = $("#password").val();
        
        await sendForm({email: email, password: password}).then(async (res) => {
            if(res) {
                localStorage.setItem('token', res.token);
                localStorage.setItem('user_id', res.user_id);

                navigate('/', {replace: true});
            } else {
                $("#password").val('');
                $('#error').removeClass('d-none');
            }
        });
    };

    // Init function
    useEffect(() => {
        isLoggedIn()
        .then((res) => {
            if(res) {
                navigate('/', { replace: true });
            }
        })
        .catch((e) => {
            console.log(e.message)
        })
    }, [])

    // render
    return (
        <div className="background">
            <div className="container m-auto">
                <form onSubmit={handleSubmit}>
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            <div className="card mt-5">
                                <div className="card-body text-center">
                                    <img src='/img/logo.png' className="m-4" alt="Logo" width="400"/>

                                    <hr/>
                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control" required id="email" name="email" placeholder="admin@admin.com"/>
                                        <label htmlFor="email">Email</label>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control" required id="password" name="password" placeholder="password"/>
                                        <label htmlFor="password">Password</label>
                                    </div>
                                    <div className="alert alert-danger alert-dismissible fade show d-none" id="error" role="alert">
                                        Error: User not found!
                                    </div>
            
                                    <button type="submit" className="btn btn-primary w-100 mt-1"><FontAwesomeIcon icon={faRightToBracket} /> Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}