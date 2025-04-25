import React, { useEffect, useRef, useState } from "react";
import avatr from "../assets/images/avtar.png";
import { useAuth } from "./Context/AuthContext";

const Message = ({ message }) => {
  const { currentUser } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [showreadMore, setShowReadMore] = useState(false);

  const ref = useRef();
  const refpara = useRef(null);

  useEffect(() => {
    if (refpara.current) {
      const isOverflowing =
        refpara.current.scrollHeight > refpara.current.clientHeight;
      setShowReadMore(isOverflowing);
    }
  }, []);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const isCurrentUser = message.senderId === currentUser.uid;

  const messageDate = message?.date?.seconds
    ? new Date(message.date.seconds * 1000)
    : null;

  const now = new Date();
  const isToday = messageDate?.toDateString() === now.toDateString();
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = messageDate?.toDateString() === yesterday.toDateString();

  let formattedDate;
  if (isToday) {
    formattedDate = "Today";
  } else if (isYesterday) {
    formattedDate = "Yesterday";
  } else {
    formattedDate = messageDate?.toLocaleDateString();
  }

  const formattedTime = messageDate?.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      ref={ref}
      className={`message  flex gap-[18px] ${
        isCurrentUser ? "flex-row-reverse" : "sender"
      }`}
    >
      <div>
        <div
          className="
        mt-[5px]"
        >
          <img
            className="rounded-full 
        xl:w-[42px] xl:h-[42px]
        md:w-[35px] md:h-[35px]
        sm:w-[30px] sm:h-[30px]
        w-[30px] h-[30px]"
            src={avatr}
            alt="img"
          />
        </div>

        {formattedTime && (
          <>
            <span className="text-[12px] text-gray-500 block mt-[4px] text-center">
              {formattedTime}
            </span>
          </>
        )}
      </div>

      <div className="flex md:max-w-[50%] max-w-[80%] max-h-[10%] gap-[20px] flex-col">
        <p
          className={`
      bg-white p-[10px] 
      text-[14px] md:text-[14px] xl:text-[16px]
      rounded-r-[10px] rounded-b-[10px] mb-[10px]
      max-w-max max-h-max
      ${!isOpen ? "line-clamp-2  overflow-hidden " : ""}
    `}
          ref={refpara}
        >
          {message.text}
          {showreadMore && (
            <a
              className="text-blue-600 hover:underline w-fit block
              mt-[-5px] xl:text-[15px] text-[13px] ml-[7px] mb-[10px]"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? "Read less" : "Read more"}
            </a>
          )}
        </p>
      </div>
    </div>
  );
};

export default Message;
