import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
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
  const [name, setName] = useState("");
  const [err, setError] = useState(false);

  const [suggestions, setSuggestions] = useState([]);
  console.log("suggestions :", suggestions);
  const [chatHistory, setChatHistory] = useState([]);
  console.log("chatHistory :", chatHistory);

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
      {
        /*for auto */
      }

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

      // setUsers([]);
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
          console.log("data :", data);
          const sortedChats = Object.entries(data).sort((a, b) => {
            const dateA = a[1]?.date;
            const dateB = b[1]?.date;

            if (!dateA && !dateB) return 0;
            if (!dateA) return 1;
            if (!dateB) return -1;

            // Compare seconds
            if (dateB.seconds !== dateA.seconds) {
              return dateB.seconds - dateA.seconds;
            }

            // If seconds are equal, compare nanoseconds
            return dateB.nanoseconds - dateA.nanoseconds;
          });

          console.log("sortedChats :", sortedChats);
          setChatHistory(sortedChats);
        }
      }
    );

    return () => unsub();
  }, [currentUser?.uid]);

  const handleInputChange = async (e) => {
    const input = e.target.value;
    setName(input);

    if (!input.trim()) {
      setSuggestions([]);
      setUsers([]);
      return;
    }
    try {
      const q = query(
        collection(db, "newusers"),
        where("name", ">=", input),
        limit(5)
      );
      const querySnapshot = await getDocs(q);

      const results = [];
      querySnapshot.forEach((doc) => results.push(doc.data()));
      setSuggestions(results);
    } catch (err) {
      console.error("Suggestion fetch failed", err);
    }
  };

  return (
    <div className="ml-[20px] mt-[10px]">
      <input
        type="text"
        className="w-[178px] h-[41px] border rounded-sm shadow-sm p-[5px]"
        onChange={handleInputChange}
        value={name}
        onKeyDown={handleKey}
        placeholder="Search name.."
      />

      {suggestions.length > 0 && (
        <div className="mt-[8px]  ">
          <p className="text-black text-[15px] mb-[5px]">Search Results:</p>
          {suggestions.map((user, index) => {
            return (
              <div>
                <div
                  key={index}
                  onClick={() => {
                    handleSelect(user);
                    setSuggestions([]);
                    setName(user.name);
                  }}
                  className="p-[8px] flex items-center gap-[8px] cursor-pointer"
                >
                  <img
                    src={avtar}
                    alt="avatar"
                    className="w-[35px] h-[35px] rounded-full"
                  />
                  <span>{user.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {userNotFound && (
        <p className="text-red-500 text-[14px]">User not found</p>
      )}

      {/* Search Results */}
      {/* {users.length > 0 && (
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
      )} */}

      {/* Previous Chats */}
      {chatHistory?.length > 0 && (
        <div className="mt-5">
          <p className="text-gray-700 text-sm mb-1">Recent Chats:</p>

          {chatHistory.map(([chatId, chat]) => {
            return (
              <div
                key={chatId}
                onClick={() => handleSelect(chat.userInfo)}
                className="flex items-center gap-[8px] p-[8px] cursor-pointer rounded"
              >
                {console.log("chat------- :", chat)}
                <img
                  src={avtar}
                  alt="avatar"
                  className="w-[40px] h-[40px] rounded-full shadow-md"
                />
                <div className="max-w-[70%]">
                  <span className="text-[18px] font-bold block">
                    {chat.userInfo?.name}
                  </span>

                  <p className="text-[14px] text-black ">
                    {chat.lastMessage
                      ? `${
                          chat.lastMessage.senderId === currentUser.uid
                            ? "Youuuu: "
                            : ""
                        }
                        ${chat.lastMessage?.text}`
                      : "No messages yet"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Search;
