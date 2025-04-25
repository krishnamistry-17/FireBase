import React from "react";
import Header from "./Header";
import Search from "./Search";

const SideBar = ({ onUserClick }) => {
  return (
    <>
      <div
        className="lg:flex-1  border-r-2  h-screen "
        style={{ backgroundColor: "#ece5dd" }}
        onClick={onUserClick}
      >
        <div className=" sticky top-0">
          <Header />
        </div>
        <div>
          <Search />
        </div>
      </div>
    </>
  );
};

export default SideBar;
