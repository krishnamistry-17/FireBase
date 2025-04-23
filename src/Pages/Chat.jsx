import React, { useState } from "react";
import { MdVideoCall } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import Messages from "./Messages";
import Input from "./Input";
import avtar from "../assets/images/avtar.png";
import { useChatAuth } from "./Context/ChatContext";
import { MdPrivacyTip } from "react-icons/md";
import { BsChatSquareText } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const Chat = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { data } = useChatAuth();
  // console.log(" ~ Chat ~ data.user?.name:", data.user?.name);

  const lastSeen = data?.user?.lastseen
    ? new Date(data.user?.lastseen.seconds * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "No last seen ";
  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };
  const handleBack = () => {
    navigate("/sidebar");
  };
  return (
    <div className="flex-2/4 ">
      <div
        className="flex sticky  items-center justify-between shadow-sm shadow-green-700
      h-[50px] p-[10px] "
        style={{ backgroundColor: "#128c7e" }}
      >
        {!data.user ? (
          <div>
            <p>No user Selected</p>
          </div>
        ) : (
          <>
            <div className="flex items-center">
              <IoIosArrowBack
                className="md:hidden w-[22px] h-[22px]"
                onClick={handleBack}
              />
              <img
                src={avtar}
                alt="img"
                className="w-[35px] h-[35px] rounded-full  "
              />
              <div className="pl-[5px] flex flex-col leading-tight">
                <p className="xl:text-[19px] md:text-[16px] text-[15px] font-bold">
                  {data.user?.name}
                </p>
                <span className="xl:text-[13px] text-[11px] font-semibold text-white">
                  Last seen at: {lastSeen}
                </span>
              </div>
            </div>

            <div className="flex p-[10px] space-x-3">
              <MdVideoCall className="w-[20px] h-[20px]" />
              <FaUser />
              <button onClick={handleClick}>&#x2022;&#x2022;&#x2022;</button>
            </div>
          </>
        )}
      </div>

      {/*  Menu  */}
      {menuOpen && (
        <div
          className="
        absolute xl:top-[52px] md:top-[89px] top-[140px] xl:right-[3px] md:right-[1px] right-[2px]
         bg-white shadow-lg
         w-[140px] p-[11px]
          rounded-md z-10 bg-white-light"
        >
          <div className="flex">
            <MdPrivacyTip className="w-[20px] h-[22px]" />
            <a href="/privacy" className="text-[15px] pl-[5px]  block">
              Privacy
            </a>
          </div>
          <div className="flex mt-[15px]">
            <FaUser className="w-[20px] h-[22px]" />
            <a href="/profile" className="text-[14px] pl-[5px]  block">
              Profile
            </a>
          </div>
          <div className="flex mt-[15px]">
            <BsChatSquareText className="w-[20px] h-[22px]" />
            <a href="/chat" className="text-[14px] pl-[5px] block">
              Chats
            </a>
          </div>
          <div className="flex mt-[15px]">
            <IoIosNotifications className="w-[20px] h-[22px]" />
            <a href="/notification" className="text-[14px] pl-[5px] block">
              Notification
            </a>
          </div>
          <div className="flex mt-[15px]">
            <IoIosSettings className="w-[20px] h-[22px]" />
            <a href="/?setting" className="text-[14px] pl-[5px]  block">
              Setting
            </a>
          </div>
        </div>
      )}

      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
