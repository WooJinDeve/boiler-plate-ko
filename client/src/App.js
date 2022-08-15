import './App.css';
import React from "react";
import {
  BrowserRouter,
  Route,
  Link,
  Routes
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={Auth(LandingPage, null)} />
        <Route path="/login" element={Auth(LoginPage, null)} />
        <Route path="/register" element={Auth(RegisterPage, null)} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
