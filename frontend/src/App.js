import React from 'react';
import Home from './components/Home/Home.js'
import UserBookings from './components/UserBookings/UserBookings.js'
import Login from './components/Users/Login.js';
import NavBar from './components/Partials/Navbar.js';
import Protected from './services/AuthService.js';
import { Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"

function App() {
  return (
    <>
      <NavBar />

      <Routes>
          <Route index
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />
          <Route path="/bookings"
            element={
              <Protected>
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
