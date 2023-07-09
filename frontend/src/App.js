import React, { useState, useEffect } from 'react';
import Home from './components/Home/Home.js'
import UserBookings from './components/UserBookings/UserBookings.js'
import Login from './components/Users/Login.js';
import NavBar from './components/Partials/Navbar.js';
import Protected from './services/AuthService.js';
import { Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  const isLoggedIn = localStorage.getItem('token') && localStorage.getItem('user_id');

  return (
    <>
      <NavBar />

      <Routes>
          <Route index
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <Home />
              </Protected>
            }
          />
          <Route path="/bookings"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <UserBookings />
              </Protected>
            }
          />
          <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
