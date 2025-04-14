import React from "react";
import Message from "./Message";

const Messages = () => {
  return (
    <div className="p-[10px] h-[calc(100%_-_111px)] overflow-y-scroll">
      {/* Render multiple messages */}
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  );
};

export default Messages;
