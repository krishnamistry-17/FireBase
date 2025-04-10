// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
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
export const colRef = collection(db, "Users");
