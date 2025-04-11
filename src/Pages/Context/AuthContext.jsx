import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "universal-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const cookies = new Cookies();
  const [isSignedIn, setIsSignedIn] = useState(!!cookies.get("new-token"));

  useEffect(() => {
    const token = cookies.get("new-token");
    setIsSignedIn(!!token);
  }, []);

  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
