import React, { useState } from "react";
import { FaImages } from "react-icons/fa";
import { FaFile } from "react-icons/fa";
import { useChatAuth } from "./Context/ChatContext";
import { useAuth } from "./Context/AuthContext";
import { IoSend } from "react-icons/io5";
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
import EmojiPicker from "emoji-picker-react";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImage] = useState("");
  const [showPicker, setShowPicker] = useState(false);

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
        });
        {
          /*last seen */
        }
        await updateDoc(doc(db, "chatUsers", currentUser.uid), {
          [data.chatId + ".lastMessage"]: {
            text,
            senderId: currentUser.uid,
          },
          [data.chatId + ".date"]: serverTimestamp(),
          [data.chatId + ".userInfo.lastseen"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "chatUsers", data?.user?.uid), {
          [data.chatId + ".lastMessage"]: {
            text,
            senderId: currentUser.uid,
          },
          [data.chatId + ".date"]: serverTimestamp(),
          [data.chatId + ".unread"]: increment(1),
          [data.chatId + ".userInfo.lastseen"]: serverTimestamp(),
        });
        {
          /*emoji */
        }
        await updateDoc(doc(db, "chatUsers", currentUser.uid), {
          [data.chatId + ".lastMessage"]: {
            text,
            senderId: currentUser.uid,
          },
          [data.chatId + ".date"]: serverTimestamp(),
          [data.chatId + ".userInfo.emoji"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "chatUsers", data?.user?.uid), {
          [data.chatId + ".lastMessage"]: {
            text,
            senderId: currentUser.uid,
          },
          [data.chatId + ".date"]: serverTimestamp(),
          [data.chatId + ".userInfo.emoji"]: serverTimestamp(),
        });
        {
          /*status */
        }
        await updateDoc(doc(db, "chatUsers", currentUser?.uid), {
          [data.chatId + ".status"]: { isOnline: true },
        });
        await updateDoc(doc(db, "chatUsers", data?.user?.uid), {
          [data.chatId + ".status"]: { isOnline: true },
        });
        await updateDoc(doc(db, "chatUsers", data?.user?.uid), {
          [data.chatId + ".status"]: { isOnline: false },
        });
        setText("");
        setImage("");
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
    setText("");
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSend() && handleEmojiClick();
  };

  const handleEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData?.emoji);
    setShowPicker("");
  };

  return (
    <div className="bg-white sticky bottom-0 h-[50px] mt-[10px] flex items-center px-2">
      <div>
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="
          sm:w-[35px] h-[35px]
          w-[27px]
          xl:mr-[8px] mr-[5px]"
        >
          😀
        </button>
      </div>
      <input
        className="md:flex-1 w-[70%] h-[35px] p-[10px] border rounded-md md:text-[16px] text-[12px]"
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKey}
        value={text}
      />
      {showPicker && (
        <div className=" absolute top-[-280px]">
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            height={321}
            width={304}
          />
        </div>
      )}

      <div className="flex items-center md:space-x-4 space-x-2 ml-2">
        <FaImages />
        <FaFile />
        <button
          className="
          xl:w-[40px] xl:h-[40px] xl:p-[13px]
          w-[30px] h-[30px] p-[8px]
          text-white rounded-full shadow-md shadow-green-700"
          style={{ backgroundColor: "#25d366" }}
          onClick={handleSend}
          type="submit"
        >
          <IoSend />
        </button>
      </div>
    </div>
  );
};

export default Input;
