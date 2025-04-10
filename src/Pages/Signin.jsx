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
      //signin with firebase validation
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        alert("Signed in successfully");
        formik.resetForm();
        setIsSignedIn(true);
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    },
  });

  //Google signin
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });

    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("new-token", result.user.refreshToken);
      setIsSignedIn(true);
      navigate("/");
      console.log("Google Sign-In Successful", result);
    } catch (error) {
      console.log("Error with sign-in", error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center mt-[60px]">
        <div
          className="bg-white  border border-gray-300
   rounded-lg shadow-lg  w-[380px]"
        >
          <div className="px-[25px]">
            <h2
              className="text-[25px] text-black 
                font-bold mb-[24px] text-center pt-[20px]"
            >
              Login to your Account
            </h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-[16px]">
                <label
                  className="block text-[14px] font-medium text-gray-700"
                  htmlFor="email"
                >
                  Email<span className="text-red-700">*</span>
                </label>
                <input
                  className="mt-[4px] block w-full p-[10px] border border-gray-300 rounded-md
         focus:outline-none focus:ring-2
         "
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

              <div className="mb-[16px]">
                <label
                  className="block text-[14px] font-medium text-gray-700"
                  htmlFor="password"
                >
                  Password<span className="text-red-700">*</span>
                </label>
                <input
                  className="mt-[4px] block w-full p-[10px] 
                      border border-gray-300 rounded-md
                        focus:outline-none focus:ring-2
                        "
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
                <div>
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    className="mr-2"
                  />
                  <label htmlFor="terms" className="text-gray-700 text-[14px]">
                    I agree to the{" "}
                    <a href="#" className="text-black hover:underline">
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>

              <div className="flex">
                <p className="text-black text-[16px]">
                  didn't have an account?
                </p>
                <a
                  className="text-black text-[16px] pl-[10px] underline"
                  href="/signup"
                >
                  SignUp
                </a>
              </div>

              <button
                className="w-[180px] py-[8px] px-[16px]
                 ml-[70px] mt-[20px] text-white
             bg-blue-500 rounded-md mb-[20px]
              hover:bg-blue-600 focus:outline-none  "
                type="submit"
              >
                Login
              </button>
            </form>

            <div className="ml-[65px] mb-[20px] rounded-lg">
              <img src={image} alt="gogglebtn" onClick={signInWithGoogle} />
            </div>
          </div>
        </div>
      </div>

      
    </>
  );
};

export default Signin;
