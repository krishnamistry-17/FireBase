import React from "react";
import avatr from "../assets/images/avtar.png";
const Chats = () => {
  return (
    <div className=" mt-[10px] ml-[15px]">
      {/*1 */}
      <div className="flex">
        <div
          className="rounded-full
        w-[50px] h-[50px] mt-[5px]"
        >
          <img src={avatr} alt="img" />
        </div>
        <div className="pl-[10px] pt-[5px]">
          <span>John Doe</span>
          <p>Hello</p>
        </div>
      </div>
      {/*2 */}
      <div className="flex mt-[20px]">
        <div
          className="rounded-full
          w-[50px] h-[50px] mt-[5px]"
        >
          <img src={avatr} alt="img" />
        </div>
        <div className="pl-[10px] pt-[5px]">
          <span>Krishna</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="flex mt-[20px]">
        <div
          className="rounded-full
          w-[50px] h-[50px] mt-[5px]"
        >
          <img src={avatr} alt="img" />
        </div>
        <div className="pl-[10px] pt-[5px]">
          <span>Abc</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="flex mt-[20px]">
        <div
          className="rounded-full
          w-[50px] h-[50px] mt-[5px]"
        >
          <img src={avatr} alt="img" />
        </div>
        <div className="pl-[10px] pt-[5px]">
          <span>xyz</span>
          <p>Hello</p>
        </div>
      </div>
    </div>
  );
};

export default Chats;
