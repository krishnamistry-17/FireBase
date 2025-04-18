import React, { useEffect, useRef } from "react";
import avatr from "../assets/images/avtar.png";
import { useAuth } from "./Context/AuthContext";
// import { formatDistanceToNow } from "date-fns";
const Message = ({ message }) => {
  console.log("message :", message);
  const { currentUser } = useAuth();

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const isCurrentUser = message.senderId === currentUser.uid;

  console.log("isCurrentUser :", isCurrentUser);

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

  const displayDateTime = `${formattedDate} at ${formattedTime}`;

  // const timeAgo = formatDistanceToNow(messageDate, { addSuffix: true });
  return (
    <div
      ref={ref}
      className={`flex gap-[20px] ${
        isCurrentUser ? "flex-row-reverse" : "sender"
      }`}
    >
      <div>
        <div className="rounded-full w-[50px] h-[50px] mt-[5px]">
          <img src={avatr} alt="img" />
        </div>

        {displayDateTime && (
          <>
            {/* <span className="text-[12px]">{timeAgo}</span> */}
            <span className="text-[12px] text-gray-500 block mt-[4px] text-center">
              {displayDateTime}
            </span>
          </>
        )}
      </div>

      <div className="flex max-w-[80%] gap-[10px] flex-col">
        <p
          className="bg-white p-[10px] 
            rounded-r-[10px]
            rounded-b-[10px] max-w-max"
        >
          {message.text}
        </p>
      </div>
    </div>
  );
};

export default Message;
{
  /*height:calc(100% - 160px) */
}
