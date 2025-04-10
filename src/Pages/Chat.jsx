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

export const Chat = (props) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const colRef = collection(db, "Chat-App");
  const { room } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;
    await addDoc(colRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });
    setNewMessage("");
  };

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
      <div className="flex justify-center items-center mt-[30px]">
        <div className="border border-gray-300 rounded-lg shadow-lg w-[450px] ">
          <div>
            <h2 className="text-black font-medium text-[22px] w-full h-[50px] bg-blue-400 rounded-sm text-center pt-[7px]">
              Welcome to {room.toUpperCase()}
            </h2>
            {messages.map((message) => (
              <div key={message.id} className="mt-[10px]">
                <span className="text-[17px] pl-[10px] font-bold pr-[10px]">
                  {message.user}
                </span>
                {message.text}
              </div>
            ))}

            <form onSubmit={handleSubmit}>
              <input
                placeholder="Type message here.."
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
                className="block w-full h-[50px] p-[5px]
            mt-[20px]  border border-gray-300 rounded-md
         focus:outline-none focus:ring-2"
              />
              <button
                className="w-[180px] py-[8px] px-[16px]
                 ml-[30px] mt-[20px] text-white
             bg-blue-500 rounded-md mb-[20px]
              hover:bg-blue-600 focus:outline-none  "
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

// echo "# FireBase" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/krishnamistry-17/FireBase.git
// git push -u origin main