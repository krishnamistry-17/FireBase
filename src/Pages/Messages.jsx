import React, { useEffect, useState } from "react";
import Message from "./Message";
import { useChatAuth } from "./Context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../Config/firebase";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  const { data } = useChatAuth();

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

  // console.log("messages", messages);

  return (
    <>
      <div className="p-[10px] h-[calc(100%_-_111px)] overflow-y-scroll">
        {messages.map((m) => (
          <Message message={m} key={m.id} />
        ))}
      </div>
    </>
  );
};

export default Messages;
