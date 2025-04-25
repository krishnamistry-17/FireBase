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
        cookies.remove("new-token");
      });
  };

  return (
    <div
      className="flex items-center justify-between sticky top-0"
      style={{ backgroundColor: "#128c7e" }}
    >
      <div className="flex sticky top-0 justify-center items-center ml-[10px] h-[50px]">
        <img
          src={avtar}
          className="mt-[5px] ml-[20px] 
          xl:w-[35px] xl:h-[37px]
          md:w-[30px] md:h-[30px]
          w-[33px] h-[33px]
          rounded-full"
        />
        <div className="flex">
          <h2
            className=" pl-[10px] 
          xl:text-[21px] md:text-[20px] text-[19px] xl:pt-[5px] md:pt-[7px] pt-[6px]"
          >
            {currentUser
              ? currentUser.displayName || currentUser.email
              : "Guest"}
          </h2>
          <div className="">
            <button
              className="
              xl:w-[80px] xl:h-[35px]
              md:w-[66px] md:h-[30px]
              w-[63px] h-[32px]
              mt-[5px] xl:ml-[100px] md:ml-[44px] ml-[102px] mr-[12px]
              shadow-md shadow-green-700
              text-white rounded 
              xl:text-[19px]
              md:text-[15px] text-[14px]"
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
