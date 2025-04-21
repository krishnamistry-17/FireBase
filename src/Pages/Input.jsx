import React, { useState } from "react";
import { FaImages } from "react-icons/fa";
import { FaFile } from "react-icons/fa";
import { useChatAuth } from "./Context/ChatContext";
import { useAuth } from "./Context/AuthContext";
import {
  arrayUnion,
  doc,
  increment,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../Config/firebase";
import { v4 as uuid } from "uuid";

const Input = () => {
  const [text, setText] = useState("");
  console.log("text input:", text);
  const [img, setImage] = useState("");

  const { data } = useChatAuth();
  const { currentUser } = useAuth();

  const handleSend = async () => {
    if (!data.chatId || !currentUser?.uid) return;

    try {
      if (text.trim()) {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
        {
          /*current user*/
        }
        await updateDoc(doc(db, "chatUsers", currentUser.uid), {
          [data.chatId + ".lastMessage"]: {
            text,
            senderId: currentUser.uid,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        });
        {
          /*user */
        }
        await updateDoc(doc(db, "chatUsers", data?.user?.uid), {
          [data.chatId + ".lastMessage"]: {
            text,
            senderId: currentUser.uid,
          },
          [data.chatId + ".date"]: serverTimestamp(),
          [data.chatId + ".unread"]: increment(1),
        });
        setText("");
        setImage("");
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  };

  return (
    <div className="bg-white h-[50px] mt-[10px] flex items-center px-2">
      <input
        className="flex-1 h-[35px] p-[10px] border rounded"
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKey}
        value={text}
      />
      <div className="flex items-center space-x-4 ml-2">
        <FaImages />
        <FaFile />
        <button
          className="w-[80px] h-[35px] bg-blue-500 text-white rounded"
          onClick={handleSend}
          type="submit"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Input;
