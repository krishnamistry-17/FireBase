import React from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../Config/firebase";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "./Context/AuthContext";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";

const SignUp = () => {
  const { setIsSignedIn } = useAuth();

  const navigate = useNavigate();
  const colRef = collection(db, "newusers");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be atleast 6 chracters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .min(6, "Password must be atleast 6 chracters")
        .oneOf([Yup.ref("password"), null], "Password must match")
        .required("Confirmpassword is required"),
    }),
    onSubmit: async (values) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );

        const user = userCredential.user;

        await updateProfile(user, {
          displayName: values.name,
        });

        await setDoc(doc(db, "newusers", user.uid), {
          uid: user.uid,
          name: values.name,
          email: values.email,
          createdAt: serverTimestamp(),
          photoURL: user.photoURL || "",
        });

        await setDoc(doc(db, "chatUsers", user.uid), {});

        alert("Signup successful");
        formik.resetForm();
        setIsSignedIn(true);
        navigate("/signin");
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleClick = () => {
    navigate("/signin");
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="flex justify-center items-center mt-[60px]">
        <div
          className="bg-white  border border-gray-300 mx-[10px]
     rounded-lg shadow-lg  w-[380px]"
        >
          <div className="px-[25px]">
            <h2 className="md:text-[25px] text-[22px] text-black font-bold mb-[24px] text-center pt-[20px]">
              Register your Account
            </h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-[16px]">
                <label className="block text-[14px] font-medium text-gray-700">
                  Name<span className="text-red-700">*</span>
                </label>
                <input
                  className="mt-[4px] block w-full p-[10px] border border-gray-300 rounded-md
            focus:outline-none focus:ring-2
            "
                  type="text"
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                <p className="text-red-700">
                  {formik.touched.name && formik.errors.name && (
                    <div>{formik.errors.name}</div>
                  )}
                </p>
              </div>

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
                  className="mt-[4px] block w-full p-[10px] border border-gray-300 rounded-md
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

              <div className="mb-[16px]">
                <label
                  className="block text-[14px] font-medium text-gray-700"
                  htmlFor="confirmpassword"
                >
                  Confirm Password<span className="text-red-700">*</span>
                </label>
                <input
                  className="mt-[4px] block w-full p-[10px] border border-gray-300 rounded-md
           focus:outline-none focus:ring-2
           "
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                />
                <p className="text-red-700">
                  {formik.errors.confirmPassword &&
                    formik.touched.confirmPassword && (
                      <div>{formik.errors.confirmPassword}</div>
                    )}
                </p>
              </div>

              <div className="flex items-center mb-[16px]">
                <div>
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    className="mr-2"
                  />
                  <label htmlFor="terms" className="text-gray-700 text-[14px]">
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-black hover:underline text-[13px]"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>

              <div className="flex">
                <p className="text-black text-[16px]">
                  already have an account?
                </p>
                <a
                  className="text-black text-[16px] pl-[10px] underline"
                  href="/signin"
                >
                  SignIn
                </a>
              </div>

              <button
                className="w-full py-[8px] px-[16px]  text-white
               bg-blue-500 rounded-md mb-[20px] mt-[15px]
                hover:bg-blue-600 focus:outline-none  "
                type="submit"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
