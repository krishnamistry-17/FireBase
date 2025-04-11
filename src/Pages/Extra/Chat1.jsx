import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

import { useEffect, useState } from "react";
import { auth, db } from "../Config/firebase";
import { FaUser } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

export const Chat = ({ room, previousRooms }) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const colRef = collection(db, "Chat-App");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newMessage === "") return;
    await addDoc(colRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      photo: auth.currentUser.photoURL,
      room,
    });
    setNewMessage("");
  };

  //query
  useEffect(() => {
    const queryMessage = query(
      colRef,
      where("room", "==", room),
      orderBy("createdAt")
    );

    const unsuscribe = onSnapshot(queryMessage, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsuscribe();
  }, []);

  return (
    <>
      <div className="flex">
        <div
          className="sidebar lg:w-[350px] md:w-[250px]
         bg-white rounded-sm shadow-md"
        >
          <h3
            className="
          lg:text-[40px] md:text-[30px] 
          pl-[20px] font-medium "
          >
            Chats
          </h3>
          {/*user & profile */}
          <div className=" text-[24px] pt-[20px]">
            <div className="flex h-[50px] shadow-sm">
              <div
                className=" border rounded-full 
              w-[43px] h-[43px] p-[8px] ml-[21px] mt-[2px]"
              >
                <FaUser />
              </div>
              <div className="pl-[16px] pt-[4px] text-[25px] font-medium">
                {room}
              </div>
            </div>
          </div>
          {/*previous room */}
          {previousRooms && previousRooms.length > 0 && (
            <div className="mt-4">
              <ul className="list-disc pl-[25px] text-[16px]">
                {previousRooms.map((prevRoom, index) => (
                  <li key={index}>{prevRoom}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          <div className="border border-gray-300 rounded-lg shadow-lg w-[750px] ">
            <h2
              className="text-black font-medium 
            sm:text-[22px] xs:text-[20px] pt-[11px] 
             w-full h-[50px] bg-blue-400 rounded-sm text-center "
            >
              {room.toUpperCase()}
            </h2>
            <div className="">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="mt-[10px] sm:text-[16px] text-[15px]"
                >
                  <span
                    className=" sm:text-[17px]
                   text-[14px] pl-[10px] font-bold pr-[10px]"
                  >
                    {message.user}
                  </span>
                  {message.text}
                </div>
              ))}

              <form onSubmit={handleSubmit}>
                <div className="flex">
                  <input
                    placeholder="Type message here.."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                    className="block w-full h-[50px] p-[5px]
            mt-[20px]  border border-gray-300 rounded-md
         focus:outline-none focus:ring-2"
                  />
                  <div
                    className=" rounded-full 
                  w-[38px] ml-[-38px] mt-[25px] h-[38px] p-[12px] bg-blue-500"
                  >
                    <IoMdSend />
                  </div>
                </div>
                {/* <button
                  className="w-[180px] py-[8px] px-[16px]
                 ml-[7px] mt-[20px] text-white
             bg-blue-500 rounded-md mb-[20px]
              hover:bg-blue-600 focus:outline-none  "
                  type="submit"
                >
                  Submit
                </button> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
