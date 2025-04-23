import React from "react";
import SideBar from "./SideBar";
import Chat from "./Chat";
import SideSideBar from "./SideSideBar";

const MainChat = () => {
  return (
    <>
      <div className="flex justify-center items-center ">
        <div
          className="rounded-sm shadow-blue-300 shadow-lg ml-[0px] mt-[0px]
        xl:w-full sm:w-full md:w-full flex  overflow-hidden
          w-full h-screen  overflow-y-auto
         flex-col md:flex-row
        "
          style={{ backgroundColor: "#ece5dd" }}
        >
          <div className=" hidden md:block rounded-sm mr-[0px] ">
            <SideSideBar />
          </div>
          <SideBar />
          <Chat />
        </div>
      </div>
    </>
  );
};

export default MainChat;
