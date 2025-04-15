import React from "react";
import { MdVideoCall } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import Messages from "./Messages";
import Input from "./Input";
import { chatAuth } from "./Context/ChatContext";

const Chat = () => {
  const { data } = chatAuth();

  console.log("chat user", data);

  console.log("user name", data.name);

  return (
    <div className="flex-2 ">
      <div
        className="flex items-center justify-between
       h-[50px] p-[10px] bg-blue-500"
      >
        <span>{data.user?.name}</span>
        <div className="flex p-[10px] space-x-3">
          <MdVideoCall className="w-[20px] h-[20px]" />
          <FaUser className="user" />
          <IoIosMore className="w-[20px] h-[20px]" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
