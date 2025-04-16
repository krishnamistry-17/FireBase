import React, { useContext } from "react";
import { MdVideoCall } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import Messages from "./Messages";
import Input from "./Input";
import avtar from "../assets/images/avtar.png";
import { useChatAuth } from "./Context/ChatContext";

const Chat = () => {
  const { data } = useChatAuth();
  console.log("data :", data);
  const { selectedUser } = useChatAuth();
  return (
    <div className="flex-2 ">
      <div
        className="flex items-center justify-between
       h-[50px] p-[10px] bg-blue-500"
      >
        {selectedUser ? (
          <div>
            <p>No user Selected</p>
          </div>
        ) : (
          <div className="flex">
            <img
              src={avtar}
              alt="img"
              className="w-[29px] h-[29px] rounded-full bg-blue-600"
            ></img>
            <p className="pl-[5px] text-[17px]">{data.user?.name}</p>
          </div>
        )}
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
