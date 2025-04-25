import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { useChatAuth } from "./Context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../Config/firebase";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useChatAuth();
  const [scrollToBottom, setScrollToBottom] = useState(true);

  const scrollContainerRef = useRef(null);
  const chatEndRef = useRef(null);

  const handleScroll = (e) => {
    const isAtBottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    setScrollToBottom(isAtBottom);
  };

  useEffect(() => {
    if (scrollToBottom) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (!data.chatId) return;

    const unSub = onSnapshot(doc(db, "chats", data.chatId), (docSnap) => {
      if (docSnap.exists()) {
        setMessages(docSnap.data()?.messages || []);
      } else {
        setMessages([]);
      }
    });

    return () => unSub();
  }, [data.chatId]);

  const groupMessagesByDate = (msgs) => {
    const grouped = {};
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    msgs.forEach((msg) => {
      const date = new Date(msg.date?.seconds * 1000);
      let key = date.toDateString();

      if (date.toDateString() === today.toDateString()) {
        key = "Today";
      } else if (date.toDateString() === yesterday.toDateString()) {
        key = "Yesterday";
      }

      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(msg);
    });

    return grouped;
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div
      className="p-[10px] md:h-[calc(100%_-_111px)] h-screen overflow-y-scroll"
      onScroll={handleScroll}
      ref={scrollContainerRef}
    >
      {Object.entries(groupedMessages).map(([label, group]) => (
        <div key={label}>
          <div className="text-center text-gray-600 text-[14px] my-[12px]">
            {label.toUpperCase()}
          </div>
          {group.map((msg) => (
            <Message key={msg.id} message={msg} />
          ))}
        </div>
      ))}

      <div ref={chatEndRef} />
    </div>
  );
};

export default Messages;
