import React from "react";
import { useChatAuth } from "./Context/ChatContext";
import { IoIosArrowBack } from "react-icons/io";
import avtar from "../assets/images/avtar.png";
import { useNavigate } from "react-router-dom";
import { MdVideoCall } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPrivacyTip } from "react-icons/md";
import { BsChatSquareText } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";

const Profile = () => {
  const navigate = useNavigate("");
  const { data } = useChatAuth();

  const lastSeen = data?.user?.lastseen
    ? new Date(data.user?.lastseen.seconds * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "No last seen ";
  const handleBack = () => {
    navigate("/");
  };
  return (
    <>
      <div
        className="flex sticky top-0 items-center justify-between shadow-sm shadow-green-700
          h-[50px] p-[10px]"
        style={{ backgroundColor: "#128c7e" }}
      >
        {!data.user ? (
          <div>
            <p>No user Selected</p>
          </div>
        ) : (
          <>
            <div className="flex items-center ">
              <button onClick={handleBack}>
                <IoIosArrowBack className=" w-[22px] h-[22px] text-white" />
              </button>

              <img
                src={avtar}
                alt="img"
                className="w-[35px] h-[35px] rounded-full  "
              />
              <div className="pl-[5px] flex flex-col leading-tight">
                <p className="xl:text-[19px] md:text-[16px] text-[15px] font-bold text-white">
                  {data.user?.name}
                </p>
                <span className="xl:text-[13px] text-[11px] font-semibold text-white">
                  Last seen at: {lastSeen}
                </span>
              </div>
            </div>
            <div className="flex p-[10px] space-x-3">
              <MdVideoCall className="w-[20px] h-[20px] text-white" />
              <FaUser className="text-white" />
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col md:h-screen mt-[65px] md:mt-[0px] justify-center items-center text-center ">
        <div
          className=" flex justify-center items-center md:p-[17px] p-[10px] text-black md:w-[300px] md:h-[60px]
          w-[250px] h-[50px] shadow-green-900
        shadow-lg  rounded-md"
          style={{ backgroundColor: "#128c7e" }}
        >
          <MdPrivacyTip className="w-[20px] h-[22px] text-white" />
          <a href="/privacy" className="pl-[7px] text-white">
            Privacy
          </a>
        </div>
        <div
          className=" flex justify-center items-center md:p-[17px] p-[10px] text-black md:w-[300px] md:h-[60px]
          w-[250px] h-[50px] 
         shadow-green-900
        shadow-lg  rounded-md mt-[18px]"
          style={{ backgroundColor: "#128c7e" }}
        >
          <FaUser className="w-[20px] h-[20px] text-white" />
          <a href="/profile" className="pl-[7px] text-white">
            Profile
          </a>
        </div>
        <div
          className=" flex justify-center items-center md:p-[17px] p-[10px] text-black md:w-[300px] md:h-[60px]
          w-[250px] h-[50px] 
         shadow-green-900
        shadow-lg  rounded-md mt-[18px]"
          style={{ backgroundColor: "#128c7e" }}
        >
          <BsChatSquareText className="w-[20px] h-[22px] text-white" />
          <a href="/chats" className="pl-[7px] text-white">
            Chats
          </a>
        </div>
        <div
          className=" flex justify-center items-center md:p-[17px] p-[10px] text-black md:w-[300px] md:h-[60px]
          w-[250px] h-[50px] 
         shadow-green-900
        shadow-lg  rounded-md mt-[18px]"
          style={{ backgroundColor: "#128c7e" }}
        >
          <IoIosNotifications className="w-[20px] h-[22px] ml-[26px] text-white" />
          <a href="/notification" className="pl-[7px] text-white">
            Notification
          </a>
        </div>
        <div
          className=" flex justify-center items-center md:p-[17px] p-[10px] text-black md:w-[300px] md:h-[60px]
          w-[250px] h-[50px] 
         shadow-green-900
        shadow-lg  rounded-md mt-[18px]"
          style={{ backgroundColor: "#128c7e" }}
        >
          <IoIosSettings className="w-[20px] h-[22px] text-white" />
          <a href="/setting" className="pl-[7px] text-white">
            Settings
          </a>
        </div>
      </div>
    </>
  );
};

export default Profile;
