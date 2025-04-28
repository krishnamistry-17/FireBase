import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "universal-cookie";
import { auth } from "../../Config/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const cookies = new Cookies();
  const [isSignedIn, setIsSignedIn] = useState(!!cookies.get("new-token"));
  console.log("isSignedIn :", isSignedIn);
  const [currentUser, setCurrentUser] = useState(null);

  const setUpCaptcha = (phoneNumber) => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container", // make sure this div exists in your JSX
        {
          size: "visible", // or "normal" if you want visible reCAPTCHA
          callback: (response) => {
            console.log("reCAPTCHA solved:", response);
          },
        }
      );
    }

    return signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
  };

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
    <AuthContext.Provider
      value={{ isSignedIn, setIsSignedIn, currentUser, setUpCaptcha }}
    >
      {children}
    </AuthContext.Provider>
  );
};
//created custome hhok
export const useAuth = () => useContext(AuthContext);
