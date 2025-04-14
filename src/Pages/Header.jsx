import React from "react";
import { useAuth } from "./Context/AuthContext";
import { FaUser } from "react-icons/fa";
const Header = () => {
  const { currentUser } = useAuth();

  return (
    <div className="flex items-center justify-between">
      <h3 className="text-black text-[30px] font-medium pl-[20px]">Chat</h3>
      <div className="flex">
        <FaUser className="mt-[3px]" />
        <h2 className="pr-[20px] pl-[10px] text-[17px]">
          {currentUser ? currentUser.displayName || currentUser.email : "Guest"}
        </h2>
      </div>
    </div>
  );
};

export default Header;
