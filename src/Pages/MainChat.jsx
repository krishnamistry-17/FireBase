import React, { useState } from "react";
import SideBar from "./SideBar";
import Chat from "./Chat";
import SideSideBar from "./SideSideBar";

const MainChat = () => {
  const [showChat, setShowChat] = useState(false);

  const handleUserClick = () => {
    setShowChat(true);
  };
  const handleBackToSideBar = () => {
    setShowChat(false);
  };

  return (
    <>
      <div>
        <div className=" md:block hidden ">
          <div
            className="flex h-screen w-full  rounded-sm shadow-blue-300 overflow-hidden
          shadow-lg "
            style={{ backgroundColor: "#ece5dd" }}
          >
            <SideSideBar className="hidden md:block rounded-sm mr-[0px] " />
            <SideBar />
            <Chat />
          </div>
        </div>
        <div className="flex md:hidden">
          {!showChat ? (
            <SideBar onUserClick={handleUserClick} />
          ) : (
            <div style={{ backgroundColor: "#ece5dd" }}>
              <Chat onBack={handleBackToSideBar} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MainChat;
{
  /*windowscrollbottom,sendicon,para */
}
