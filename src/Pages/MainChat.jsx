import React from "react";
import SideBar from "./SideBar";
import Chat from "./Chat";

const MainChat = () => {
  return (
    <>
      <div className="flex justify-center items-center mt-[50px] ">
        <div
          className="border border-black rounded-sm 
        xl:w-[65%] md:w-[90%] flex bg-blue-300 overflow-hidden
          w-full lg:w-[65%] h-screen mx-[10px]
         flex-col md:flex-row
        "
        >
          <SideBar />
          <Chat />
        </div>
      </div>
    </>
  );
};

export default MainChat;
