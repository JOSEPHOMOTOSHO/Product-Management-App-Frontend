import {useState, useEffect} from 'react'
import { Navigate } from "react-router-dom";
const Protected = ({ children, isLoggedIn }) => {

    console.log(isLoggedIn, 'protected')
 if (!isLoggedIn) {
 return <Navigate to="/login" replace />;
 }

 return children;
};
export default Protected;