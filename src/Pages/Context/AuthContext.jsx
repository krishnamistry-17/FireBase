import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "universal-cookie";
import { auth } from "../../Config/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const cookies = new Cookies();
  const [isSignedIn, setIsSignedIn] = useState(!!cookies.get("new-token"));
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setIsSignedIn(true);
        cookies.set("new-token", user.accessToken);
      } else {
        setCurrentUser(null);
        setIsSignedIn(false);
        cookies.remove("new-token");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
//created custome hhok
export const useAuth = () => useContext(AuthContext);
