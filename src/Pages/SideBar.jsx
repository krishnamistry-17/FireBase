import React from "react";
import Header from "./Header";
import Search from "./Search";
// import Chats from "./Chats";

const SideBar = () => {
  return (
    <div className="lg:flex-1  border-r-2 bg-blue-300 overflow-y-auto">
      <Header />
      <div>
        <Search />
      </div>
      {/* <Chats /> */}
    </div>
  );
};

export default SideBar;
