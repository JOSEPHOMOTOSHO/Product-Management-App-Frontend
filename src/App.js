import './App.css';
import React,{useState} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from './components/signup/Signup';
import {Dashboard} from './components/Dashboard/Dashboard'
import {Login} from './components/login/Login'
import Protected from './components/protected'


function App() {
  let LoggedIn = localStorage.getItem('user')
  const [isLoggedIn, setisLoggedIn] = useState(Boolean(LoggedIn));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="signup" element={
        <Signup show={true}/>
        } />
        <Route path="login" element={<Login show={true} set={setisLoggedIn} />} />
        <Route path="dashboard" element={
          <Protected isLoggedIn= {isLoggedIn}>
            <Dashboard />
          </Protected>
        } />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
