import React, { useState } from "react";
import { MdVideoCall } from "react-icons/md";
import { FaUser } from "react-icons/fa";
// import { IoIosMore } from "react-icons/io";
import Messages from "./Messages";
import Input from "./Input";
import avtar from "../assets/images/avtar.png";
import { useChatAuth } from "./Context/ChatContext";

const Chat = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { data } = useChatAuth();
  // console.log("🚀 ~ Chat ~ data.user?.name:", data.user?.name);

  const lastSeen = data?.user?.lastseen
    ? new Date(data.user?.lastseen.seconds * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "No last seen ";

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex-2">
      <div
        className="flex items-center justify-between 
      h-[50px] p-[10px] bg-blue-500"
      >
        {!data.user ? (
          <div>
            <p>No user Selected</p>
          </div>
        ) : (
          <>
            <div className="flex items-center">
              <img
                src={avtar}
                alt="img"
                className="w-[29px] h-[29px] rounded-full bg-blue-600"
              />
              <div className="pl-[5px] flex flex-col leading-tight">
                <p className="md:text-[16px] text-[15px] font-bold">
                  {data.user?.name}
                </p>
                <span className="md:text-[13px] text-[11px] text-white">
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
        absolute top-[130px] right-[52px]
         bg-blue-300 shadow-lg
         w-[140px] p-[11px]
          rounded-md z-10 bg-white-light"
        >
          <a href="/privacy" className="text-[14px] p-[5px]  block">
            Privacy
          </a>
          <a href="/profile" className="text-[14px] p-[5px]  block">
            Profile
          </a>
          <a href="/chat" className="text-[14px] p-[5px] block">
            Chats
          </a>
          <a href="/notification" className="text-[14px] p-[5px] block">
            Notification
          </a>
          <a href="/setting" className="text-[14px] p-[5px] block">
            Setting
          </a>
        </div>
      )}

      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
