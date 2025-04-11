import React from "react";
import { MdVideoCall } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
const Chat = () => {
  return (
    <div className="flex-2 ">
      <div className="flex items-center justify-between h-[50px] p-[10px] bg-blue-500">
        <span>John</span>
        <div className="flex p-[10px] space-x-3">
          <MdVideoCall className="w-[20px] h-[20px]" />
          <FaUser />
          <IoIosMore className="w-[20px] h-[20px]" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
