import React, { useState } from "react";
import { FaImages } from "react-icons/fa";
import { FaFile } from "react-icons/fa";
import { chatAuth } from "./Context/ChatContext";
import { useAuth } from "./Context/AuthContext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../Config/firebase";
import { v4 as uuid } from "uuid";
const Input = () => {
  const [text, setText] = useState("");

  const { data } = chatAuth();
  const { currentUser } = useAuth();

  const handleSend = async () => {
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });
  };

  return (
    <div className="bg-white h-[50px] mt-[10px] ">
      <input
        className="w-[100%] h-[50px] p-[10px]"
        type="text"
        placeholder="Type something.."
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex mt-[-40px] float-right items-center space-x-4  ">
        <FaImages />
        <FaFile />
        <button
          className="w-[80px] h-[35px]  bg-blue-500 mr-[5px]"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Input;
