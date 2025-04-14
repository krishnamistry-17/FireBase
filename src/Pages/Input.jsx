import React from "react";
import { FaImages } from "react-icons/fa";
import { FaFile } from "react-icons/fa";
const Input = () => {
  return (
    <div className="bg-white h-[50px] mt-[10px] ">
      <input
        className="w-[100%] h-[50px] p-[10px]"
        type="text"
        placeholder="Type something.."
      />
      <div className="flex mt-[-40px] float-right items-center space-x-4  ">
        <FaImages />
        <FaFile />
        <button className="w-[80px] h-[35px]  bg-blue-500 mr-[5px]">
          Send
        </button>
      </div>
    </div>
  );
};

export default Input;
