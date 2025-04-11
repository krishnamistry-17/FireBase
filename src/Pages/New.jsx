/* @format /
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { auth, db } from "../Config/firebase";

export const Chat = ({ room }) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const messagesRef = collection(db, "Chat-App");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      uid: auth.currentUser.uid,
      room: room.toUpperCase(),
    });

    setNewMessage("");
  };

  useEffect(() => {
    const roomName = room.toUpperCase();
    const q = query(
      messagesRef,
      where("room", "==", roomName),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, [room]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md h-[90vh] bg-white rounded-lg shadow-lg flex flex-col">
        {/ Header /}
        <div className="bg-blue-600 text-white text-center py-3 text-xl font-bold rounded-t-lg">
          Room: {room.toUpperCase()}
        </div>

        {/ Chat Messages /}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((msg) => {
            const isCurrentUser = msg.uid === auth.currentUser.uid;
            return (
              <div
                key={msg.id}
                className={`flex ${
                  isCurrentUser ? "justify-end" : "justify-start"
                }`}>
                <div
                  className={`p-3 rounded-xl max-w-[70%] text-sm ${
                    isCurrentUser
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-300 text-black rounded-bl-none"
                  }`}>
                  <p className="font-semibold mb-1">
                    {isCurrentUser ? "You" : msg.user}
                  </p>
                  <p>{msg.text}</p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/ Input /}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 p-3 border-t bg-white">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-full outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
/* @format /

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
/* @format /

import React, { useRef, useState } from "react";
import { useAuth } from "./Context/AuthContext";
import { Chat } from "./Chat";
const Home = () => {
  const { isSignedIn } = useAuth();
  const [room, setIsRoom] = useState(null);
  const inputRef = useRef(null);

  return (
    <div>
      {!isSignedIn ? (
        <>
          <h2 className="text-black text-[25px] justify-center text-center pt-[25px]">
            Welcome to Home
          </h2>
          <h2 className="text-black text-[18px] justify-center text-center pt-[10px]">
            <a href="/signup">Go to Signup</a>
          </h2>
        </>
      ) : (
        <div>
          {room ? (
            <Chat room={room} />
          ) : (
            <div className="ml-[10px]">
              <label className="block text-[14px] font-medium text-gray-700 pl-[15px]">
                Enter Name
              </label>
              <input
                className="mt-[4px] block w-[160px] h-[40px] p-[10px] border border-gray-300 rounded-md
                focus:outline-none focus:ring-2"
                ref={inputRef}
                type="text"
                name="name"
              />
              <button
                className="w-[150px] py-[8px] px-[16px] text-white bg-blue-500 rounded-md mb-[20px] mt-[15px]
                  hover:bg-blue-600 focus:outline-none"
                onClick={() => setIsRoom(inputRef.current.value)}>
                Submit
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
/* @format /

import React from "react";
import { useAuth } from "./Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookie = new Cookies();

const NavBar = () => {
  const navigate = useNavigate();
  const { isSignedIn, setIsSignedIn }
   = useAuth();

  const handleLogOut = (e) => {
    e.preventDefault();
    cookie.remove("new-token");
    setIsSignedIn(false);
    navigate("/");
  };

  return (
    <div className="w-full bg-gray-500 h-[40px] mt-[0px] text-white p-[10px]">
      <div className="flex justify-end">
        {!isSignedIn ? (
          <>
            <a className="pl-[80px]" href="/signin">
              Signin
            </a>
            <a className="pl-[30px] md:pr-[80px] sm:pr-[25px]" href="/signup">
              SignUp
            </a>
          </>
        ) : (
          <a className="pl-[80px]" href="/" onClick={handleLogOut}>
            Logout
          </a>
        )}
      </div>
    </div>
  );
};

export default NavBar;
/* @format /

import React from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../Config/firebase";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
import image from "../assets/images/googlebtn.png";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Signin = () => {
  const { setIsSignedIn } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const result = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        cookies.set("new-token", result.user.refreshToken);
        alert("Signed in successfully");
        formik.resetForm();
        setIsSignedIn(true);
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    },
  });

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("new-token", 
      result.user.refreshToken);
      setIsSignedIn(true);
      navigate("/");
      console.log("Google Sign-In Successful", result);
    } catch (error) {
      console.log("Error with sign-in", error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-[60px]">
      <div className="bg-white border border-gray-300 rounded-lg shadow-lg w-[380px]">
        <div className="px-[25px]">
          <h2 className="text-[25px] text-black font-bold mb-[24px] text-center pt-[20px]">
            Login to your Account
          </h2>
          <form onSubmit={formik.handleSubmit}>
            {/ Email Input /}
            <div className="mb-[16px]">
              <label
                className="block text-[14px] font-medium text-gray-700"
                htmlFor="email">
                Email<span className="text-red-700">*</span>
              </label>
              <input
                className="mt-[4px] block w-full p-[10px] border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <p className="text-red-700">
                {formik.errors.email && formik.touched.email && (
                  <div>{formik.errors.email}</div>
                )}
              </p>
            </div>

            {/ Password Input /}
            <div className="mb-[16px]">
              <label
                className="block text-[14px] font-medium text-gray-700"
                htmlFor="password">
                Password<span className="text-red-700">*</span>
              </label>
              <input
                className="mt-[4px] block w-full p-[10px] border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                type="password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <p className="text-red-700">
                {formik.errors.password && formik.touched.password && (
                  <div>{formik.errors.password}</div>
                )}
              </p>
            </div>

            <div className="flex items-center mb-[24px]">
              <input type="checkbox" id="terms" name="terms" className="mr-2" />
              <label htmlFor="terms" className="text-gray-700 text-[14px]">
                I agree to the{" "}
                <a href="#" className="text-black hover:underline">
                  Terms and Conditions
                </a>
              </label>
            </div>

            <div className="flex">
              <p className="text-black text-[16px]">Didn't have an account?</p>
              <a
                className="text-black text-[16px] pl-[10px] underline"
                href="/signup">
                SignUp
              </a>
            </div>

            <button
              className="w-[180px] py-[8px] px-[16px] md:ml-[70px] mt-[20px] text-white bg-blue-500 rounded-md mb-[20px] hover:bg-blue-600 focus:outline-none"
              type="submit">
              Login
            </button>
          </form>

          <div className="md:ml-[65px] mb-[20px] rounded-lg">
            <img src={image} alt="googlebtn" onClick={signInWithGoogle} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
[10/04, 10:22 pm] Krishna Mistry: {/ Cart Icon with Quantity Badge /}
          <div className="relative">
            <img
              src={Cart}
              alt="Cart"
              onClick={handleCart}
              className="w-[24px] h-[24px] md:ml-[15px] sm:ml-[26px] xs:ml-[20px]"
            />
            {totalQuantity > 0 && (
              <span
                className="absolute -top-2 -right-2 text-white text-[12px] font-semibold
      bg-red-700 h-[20px] w-[20px] flex items-center justify-center rounded-full">
                {totalQuantity}
              </span>
            )}
          </div>*/

import React from "react";

const New = () => {
  return <div>New</div>;
};

export default New;
