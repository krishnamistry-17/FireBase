import React from "react";
import Header from "./Header";
import Search from "./Search";

const SideBar = ({ onUserClick }) => {
  return (
    <>
      <div
        className="lg:flex-1  border-r-2   "
        style={{ backgroundColor: "#ece5dd" }}
        onClick={onUserClick}
      >
        <div>
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
