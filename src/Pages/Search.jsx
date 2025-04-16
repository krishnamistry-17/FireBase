import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../Config/firebase";
import { useAuth } from "./Context/AuthContext";
import avtar from "../assets/images/avtar.png";
import { useChatAuth } from "./Context/ChatContext";

const Search = () => {
  const { currentUser } = useAuth();
  const { dispatch } = useChatAuth();

  const [userNotFound, setUserNotFound] = useState(false);
  const [users, setUsers] = useState([]);
  console.log("users :", users);
  const [name, setName] = useState("");
  console.log("name :", name);
  const [err, setError] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const handleSearch = async () => {
    if (!name.trim()) return;

    try {
      const q = query(collection(db, "newusers"), where("name", "==", name));
      const querySnapshot = await getDocs(q);

      const matchedUsers = [];
      querySnapshot.forEach((doc) => {
        matchedUsers.push(doc.data());
        console.log(" matchedUsers :", matchedUsers);
        console.log("avialaible user :", doc.data().name);
      });

      if (matchedUsers.length === 0) {
        setUserNotFound(true);
        setUsers(chatHistory);
      } else {
        setUserNotFound(false);
        setUsers(matchedUsers);
      }
    } catch (error) {
      setError(true);
      console.log("search-catch error", error);
    }
  };

  // ⌨️ Enter to search
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  // Select user and set up chat
  const handleSelect = async (selectedUser) => {
    const combinedId =
      currentUser.uid > selectedUser.uid
        ? currentUser.uid + selectedUser.uid
        : selectedUser.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // Update current user's chat list
        await updateDoc(doc(db, "chatUsers", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: selectedUser.uid,
            name: selectedUser.name,
            photoURL: selectedUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        // Update selected user's chat list
        await updateDoc(doc(db, "chatUsers", selectedUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            name: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },

          [combinedId + ".date"]: serverTimestamp(),
        });
      }

      dispatch({
        type: "CHANGE_USER",
        payload: selectedUser,
        currentUser: currentUser,
      });

      setUsers([]);
      setName("");
    } catch (error) {
      console.log("error for chat user", error);
    }
  };

  //  previous chat users
  useEffect(() => {
    if (!currentUser?.uid) return;

    const unsub = onSnapshot(
      doc(db, "chatUsers", currentUser.uid),
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const sortedChats = Object.entries(data).sort(
            (a, b) => b[1].date?.seconds - a[1].date?.seconds
          );

          setChatHistory(sortedChats);
        }
      }
    );

    return () => unsub();
  }, [currentUser?.uid]);

  return (
    <div className="ml-[20px] mt-[10px]">
      <input
        type="text"
        className="w-[191px] h-[41px] border rounded-sm shadow-sm p-[5px]"
        onChange={(e) => setName(e.target.value)}
        value={name}
        onKeyDown={handleKey}
        placeholder="Search name.."
      />

      {userNotFound && (
        <p className="text-red-500 text-[14px]">User not found</p>
      )}

      {/* Search Results */}
      {users.length > 0 && (
        <div className="mt-3">
          <p className="text-black text-[15px] mb-[5px]">Search Results:</p>
          {users.map((user, index) => {
            return (
              <div
                onClick={() => handleSelect(user)}
                key={index[0]}
                className="flex items-center gap-2 p-2 cursor-pointer rounded"
              >
                <img
                  src={avtar}
                  alt="avatar"
                  className="w-[35px] h-[35px] rounded-full"
                />
                <span className="text-[17px]">{user.name}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Previous Chats */}
      {chatHistory && (
        <div className="mt-5">
          <p className="text-gray-700 text-sm mb-1">Recent Chats:</p>

          {chatHistory.map(([chatId, chat]) => (
            <div
              key={chatId}
              onClick={() => handleSelect(chat.userInfo)}
              className="flex items-center gap-[8px] p-[8px] cursor-pointer rounded"
            >
              <img
                src={avtar}
                alt="avatar"
                className="w-[35px] h-[35px] rounded-full"
              />
              <span className="text-[17px]">{chat.userInfo?.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
