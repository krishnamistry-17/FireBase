import React from "react";
import SideBar from "./SideBar";
import Chat from "./Chat";

const MainChat = () => {
  return (
    <>
      <div className="flex justify-center items-center mt-[50px] ">
        <div
          className="border border-black rounded-sm 
        w-[65%] h-[500px] flex bg-blue-300 overflow-hidden"
        >
          <SideBar />
          <Chat />
        </div>
      </div>
    </>
  );
};

export default MainChat;
