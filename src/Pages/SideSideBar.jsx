import React from "react";
import { MdPrivacyTip } from "react-icons/md";
import { BsChatSquareText } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const SideSideBar = () => {
  const navigate = useNavigate();
  const handleSet = () => {
    navigate("/?setting");
  };
  return (
    <div
      style={{ backgroundColor: "#075e54" }}
      className="
    
      border-black shadow-green-700
      shadow-lg rounded-sm w-[50px] h-screen relative"
    >
      {/*vertical and at end */}
      <div className=" absolute bottom-0 m-[5px]">
        <div className="block">
          <MdPrivacyTip className="w-[30px] h-[30px]" />
        </div>
        <div className="block mt-[22px]">
          <FaUser className="w-[30px] h-[30px]" />
        </div>
        <div className="block mt-[22px]">
          <BsChatSquareText className="w-[30px] h-[30px]" />
        </div>
        <div className="block mt-[22px]">
          <IoIosNotifications className="w-[30px] h-[30px]" />
        </div>
        <div className="mt-[22px] ">
          <IoIosSettings className="w-[30px] h-[30px]" onClick={handleSet} />
        </div>
      </div>
    </div>
  );
};

export default SideSideBar;
