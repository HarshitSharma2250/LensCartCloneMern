import React, { useEffect } from "react";
import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuth, setisAuth] = useState(JSON.parse(localStorage.getItem("loggedin"))||false);
  const [Authdata, setAuthData] = useState(JSON.parse(localStorage.getItem("userData"))); //i will get object inside it


  useEffect(() => {
    // Check if loggedin exists in localStorage
    const loggedin = JSON.parse(localStorage.getItem("loggedin"));
    const loginTime = localStorage.getItem("loginTime");

    if (loggedin && loginTime) {
      const currentTime = new Date().getTime();
      // Check if 2 days (in milliseconds) have passed
      if (currentTime - loginTime < 2 * 24 * 60 * 60 * 1000) {
        setisAuth(true); // Set to true if within 2 days
      } else {
        // Remove items from localStorage if expired
        localStorage.removeItem("loggedin");
        localStorage.removeItem("userData");
        localStorage.removeItem("loginTime");
      }
    }
  }, []);

  
  return (
    <AuthContext.Provider value={{ isAuth, setisAuth, Authdata, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
