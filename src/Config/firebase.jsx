// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbEg-Erz5clPZrnf0Hxn-XVw-lSPXCiZM",
  authDomain: "react-db-demo-28b22.firebaseapp.com",
  databaseURL: "https://react-db-demo-28b22-default-rtdb.firebaseio.com",
  projectId: "react-db-demo-28b22",
  storageBucket: "react-db-demo-28b22.firebasestorage.app",
  messagingSenderId: "107516568370",
  appId: "1:107516568370:web:da1798b138f0d622362d2b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

//google authentication
export const googleProvider = new GoogleAuthProvider();

//database
export const db = getFirestore(app);

//collection refrence
export const colRef = collection(db, "users");

//status
export const dbdata = getDatabase(app);

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6LdrEicrAAAAAF4lZqPN7ZT6E3BIIpLoDzNnm8wv"), // v3 site key from Firebase console
  isTokenAutoRefreshEnabled: true, // Optional, keeps App Check token refreshed
});
