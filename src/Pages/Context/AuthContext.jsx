import React, { createContext, useState, useContext } from "react";

// Create a context to manage the isSignIn state
const AuthContext = createContext();

// Create a provider to wrap around  app
export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook useAuth and start with use
export const useAuth = () => useContext(AuthContext);
