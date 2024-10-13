import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";


export const Privateroutes = ({ children }) => {
const{isAuth}=useContext(AuthContext)

  return (
    isAuth ? children : <Navigate to="/"/>
  );
};

