import React from 'react'
import $ from 'jquery';
import UserService from "../../services/UserService.js";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket  } from '@fortawesome/free-solid-svg-icons';
import "./Login.css";

export default function Login() {
    const navigate = useNavigate();

    const sendForm = async (body) => {
        return await UserService.login(body);
    }

    const handleSubmit = async (e) => {
        //Prevent page reload
        e.preventDefault();
        var email = $("#email").val();
        var password = $("#password").val();
        
        await sendForm({email: email, password: password}).then(async (res) => {
            if(res) {
                await localStorage.setItem('token', res.token);
                await localStorage.setItem('user_id', res.user_id);

                navigate('/');
            } else {
                $("#password").val('');
                $('#error').removeClass('d-none');
            }
        });
    };

    return (
        <div class="background">
            <div class="container m-auto">
                <form onSubmit={handleSubmit}>
                    <div class="row justify-content-center">
                        <div class="col-md-5">
                            <div class="card mt-5">
                                <div class="card-body text-center">
                                    <img src='/img/logo.png' class="m-4" alt="Logo" width="400"/>

                                    <hr/>
                                    <div class="form-floating mb-3">
                                        <input type="email" class="form-control" required id="email" name="email" placeholder="admin@admin.com"/>
                                        <label for="email">Email</label>
                                    </div>

                                    <div class="form-floating mb-3">
                                        <input type="password" class="form-control" required id="password" name="password" placeholder="password"/>
                                        <label for="password">Password</label>
                                    </div>
                                    <div class="alert alert-danger alert-dismissible fade show d-none" id="error" role="alert">
                                        Error: User not found!
                                    </div>
            
                                    <button type="submit" class="btn btn-primary w-100 mt-1"><FontAwesomeIcon icon={faRightToBracket} /> Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}