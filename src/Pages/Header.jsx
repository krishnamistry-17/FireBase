import React from "react";
import { useAuth } from "./Context/AuthContext";
import avtar from "../assets/images/avtar.png";
const Header = () => {
  const { currentUser } = useAuth();

  return (
    <div className="flex items-center justify-between">
      <h3
        className="text-black font-medium
      lg:text-[30px]  lg:pl-[20px]
      md:text-[25px] md:pl-[10px]
    text-[22px] pl-[10px]
      "
      >
        Chat
      </h3>
      <div className="flex">
        <img src={avtar} className="mt-[3px] w-[25px] h-[25px]" />
        <div className="flex">
          <h2 className=" pl-[10px] text-[17px]">
            {currentUser
              ? currentUser.displayName || currentUser.email
              : "Guest"}
          </h2>
          {currentUser && (
            <div className="w-[10px] h-[10px] bg-green-500 rounded-full"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
