"use client"
import React, { createContext, useState, useContext, useEffect } from "react";

// Create context for authentication
const AuthContext = createContext();

// AuthProvider component to manage auth state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Retrieve user and token from localStorage on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");
    console.log("storedToken:",storedToken);
    console.log("storedUser:",storedUser);
  
    if (storedToken && storedUser) {
      const tokenExp = JSON.parse(atob(storedToken.split('.')[1])).exp * 1000;
      if (tokenExp < Date.now()) {
        logoutAuth();  // If the token is expired, log out the user
      } else {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const loginAuth = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem("authToken", tokenData);
    localStorage.setItem("authUser", JSON.stringify(userData));
  };

  const logoutAuth = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider value={{ user, token, loginAuth, logoutAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the auth context
export const useAuth = () => {
  return useContext(AuthContext);  // This gives access to the context values
};
