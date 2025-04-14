import React from "react";
import avatr from "../assets/images/avtar.png";
const Message = () => {
  return (
    <>
      {/*if message owner then flex-row-reverse */}

      <div className="flex gap-[20px] flex-row-reverse ">
        {/*message */}
        {/*message info */}
        <div>
          <div
            className="rounded-full
                  w-[50px] h-[50px] mt-[5px]"
          >
            <img src={avatr} alt="img" />
          </div>
          <span className="text-[14px]">Just now</span>
        </div>
        {/*message content */}
        <div className="flex max-w-[80%] gap-[10px] flex-col">
          <p
            className="bg-white p-[10px] 
        rounded-r-[10px]
        rounded-b-[10px] max-w-max
        "
          >
            Hello just now
          </p>
        </div>
      </div>
    </>
  );
};

export default Message;
{
  /*height:calc(100% - 160px) */
}
