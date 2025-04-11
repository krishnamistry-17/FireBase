import React from "react";

const Chats = () => {
  return (
    <div className=" mt-[10px] ml-[15px]">
      {/*1 */}
      <div className="flex">
        <div
          className="rounded-full bg-blue-700 
        w-[50px] h-[50px] mt-[5px]"
        ></div>
        <div className="pl-[10px] pt-[5px]">
          <span>John Doe</span>
          <p>Hello</p>
        </div>
      </div>
      {/*2 */}
      <div className="flex mt-[20px]">
        <div
          className="rounded-full bg-blue-700 
        w-[50px] h-[50px] mt-[5px]"
        ></div>
        <div className="pl-[10px] pt-[5px]">
          <span>John Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="flex mt-[20px]">
        <div
          className="rounded-full bg-blue-700 
        w-[50px] h-[50px] mt-[5px]"
        ></div>
        <div className="pl-[10px] pt-[5px]">
          <span>John Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="flex mt-[20px]">
        <div
          className="rounded-full bg-blue-700 
        w-[50px] h-[50px] mt-[5px]"
        ></div>
        <div className="pl-[10px] pt-[5px]">
          <span>John Doe</span>
          <p>Hello</p>
        </div>
      </div>
    </div>
  );
};

export default Chats;
