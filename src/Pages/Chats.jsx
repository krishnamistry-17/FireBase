import React, { useEffect, useState } from "react";
import avatr from "../assets/images/avtar.png";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../Config/firebase";
import { useAuth } from "./Context/AuthContext";
import { chatAuth } from "./Context/ChatContext";

const Chats = () => {
  const [chats, setChats] = useState([]);

  {
    /*whole detail is in chat */
  }

  console.log("chats :", chats);
  const { currentUser } = useAuth();
  const { dispatch } = chatAuth();

  useEffect(() => {
    if (!currentUser?.uid) return;
    const unsub = onSnapshot(doc(db, "chatUsers", currentUser.uid), (doc) => {
      setChats(doc.data());
    });

    return () => unsub();
  }, [currentUser?.uid]);
  console.log("chats", Object.entries[chats]);

  const handleSelect = (u) => {
    console.log("u------>> :", u);
    dispatch({ type: "CHANGE_USER", payload: u[0] });
  };

  return (
    <div className=" mt-[10px] ml-[15px]">
      {/*1 */}
      {chats &&
        Object.entries(chats).map((chat, value) => {
          console.log("value :", value);
          console.log("chat :", chat);
          return (
            <div
              className="flex"
              key={chat[0]}
              onClick={() => handleSelect(chat)}
            >
              <div
                className="rounded-full
        w-[50px] h-[50px] mt-[5px]"
              >
                <img src={avatr} alt="img" />
              </div>
              <div className="pl-[10px] pt-[5px]">
                <span>{chat[1].userInfo.name}</span>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Chats;
