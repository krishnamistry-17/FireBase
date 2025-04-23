import React from "react";
import { useAuth } from "./Context/AuthContext";
import avtar from "../assets/images/avtar.png";
import { signOut } from "firebase/auth";
import { auth } from "../Config/firebase";
const Header = () => {
  const { currentUser } = useAuth();

  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <div
      className="flex items-center justify-between"
      style={{ backgroundColor: "#128c7e" }}
    >
      {/* <h3
        className="text-black font-medium
      lg:text-[30px]  lg:pl-[20px]
      md:text-[25px] md:pl-[10px]
    text-[22px] pl-[10px]
      "
      >
        Chat
      </h3> */}
      <div className="flex justify-center items-center ml-[10px] h-[50px]">
        <img
          src={avtar}
          className="mt-[5px] ml-[20px] w-[35px] h-[37px] rounded-full"
        />
        <div className="flex">
          <h2 className=" pl-[10px] text-[21px] pt-[5px]">
            {currentUser
              ? currentUser.displayName || currentUser.email
              : "Guest"}
          </h2>
          <div className="">
            <button
              className="w-[80px] h-[35px] mt-[5px] xl:ml-[100px] ml-[44px] mr-[12px]
              shadow-md shadow-green-700
              text-white rounded"
              style={{ backgroundColor: "#25d366" }}
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
