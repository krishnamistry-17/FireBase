import {
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
  collection,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuth } from "./Context/AuthContext";
import avtar from "../assets/images/avtar.png";
import { useChatAuth } from "./Context/ChatContext";
import { FaSearch } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { ref, set, onDisconnect, onValue } from "firebase/database";
import { db, dbdata } from "../Config/firebase";

const Search = () => {
  const { currentUser } = useAuth();
  const { dispatch } = useChatAuth();
  const { data } = useChatAuth();
  const auth = getAuth();
  const { isSignedIn } = useAuth();

  const [userNotFound, setUserNotFound] = useState(false);
  const [setUsers] = useState([]);
  const [name, setName] = useState("");
  const [setError] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  console.log("chatHistory :", chatHistory);
  const [status, setStatus] = useState("offline");

  useEffect(() => {
    if (!currentUser) return;

    const userId = currentUser.uid;
    const userStatusRef = ref(dbdata, `chatUsers/${userId}`);

    set(userStatusRef, { status: "online" });

    const disconnectRef = onDisconnect(userStatusRef);
    disconnectRef.set({ status: "offline" });

    const unsubscribe = onValue(userStatusRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // console.log("data !!!!!:", data);
        // setStatus(data.status || "offline");
      }
    });

    return () => {
      disconnectRef.cancel();
      unsubscribe();
    };
  }, [currentUser, dbdata]);

  const handleSearch = async () => {
    if (!name.trim()) return;

    try {
      const q = query(collection(db, "newusers"), where("name", "==", name));
      const querySnapshot = await getDocs(q);
      const matchedUsers = [];
      querySnapshot.forEach((doc) => {
        matchedUsers.push(doc.data());
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
    // console.log("  handleSelect ~ selectedUser:", selectedUser);
    const combinedId =
      currentUser.uid > selectedUser.uid
        ? currentUser.uid + selectedUser.uid
        : selectedUser.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "chatUsers", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: selectedUser.uid,
            name: selectedUser.name,
            photoURL: selectedUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
          [combinedId + ".lastseen"]: serverTimestamp(),
          [combinedId + ".unread"]: 0,
        });

        await updateDoc(doc(db, "chatUsers", selectedUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            name: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
          [combinedId + ".lastseen"]: serverTimestamp(),
          [combinedId + ".unread"]: 0,
        });

        //last seen update for both user
        await updateDoc(doc(db, "chatUsers", currentUser?.uid), {
          [`${combinedId}.lastseen`]: serverTimestamp(),
        });

        await updateDoc(doc(db, "chatUsers", selectedUser?.uid), {
          [`${combinedId}.lastseen`]: serverTimestamp(),
        });

        //status for users

        // Update status for both users when chat starts
        await updateDoc(doc(db, "chatUsers", currentUser.uid), {
          [`${combinedId}.status`]: { isOnline: true },
        });

        await updateDoc(doc(db, "chatUsers", selectedUser.uid), {
          [`${combinedId}.status`]: { isOnline: true },
        });

        await updateDoc(doc(db, "chatUsers", currentUser?.uid), {
          [`${combinedId}.status`]: { isOnline: false },
        });

        await updateDoc(doc(db, "chatUsers", selectedUser?.uid), {
          [`${combinedId}.status`]: { isOnline: false },
        });
      }

      //RESET UNREAD COUNT when chat is opened
      await updateDoc(doc(db, "chatUsers", currentUser.uid), {
        [combinedId + ".unread"]: 0,
      });

      dispatch({
        type: "CHANGE_USER",
        payload: selectedUser,
        currentUser: currentUser,
      });

      setName("");
    } catch (error) {
      console.log("Error selecting chat:", error);
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
          console.log("data---------> :", data);
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
    <div className=" mt-[10px]">
      <div className="flex mx-[10px]">
        <input
          type="text"
          className="
          w-full
           h-[41px] border rounded-sm shadow-sm p-[15px]"
          onChange={handleInputChange}
          value={name}
          onKeyDown={handleKey}
          placeholder="Search name.."
        />
        <FaSearch className="w-[20px] h-[20px] ml-[-30px] mt-[10px]" />
      </div>

      {suggestions.length > 0 && (
        <div className="mt-[8px]">
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

      {/* Previous Chats */}
      {chatHistory?.length > 0 && (
        <div className="mt-[20px]">
          <p className="text-gray-700 text-[14px] mb-[4px] pl-[15px]">
            Recent Chats:
          </p>

          {chatHistory.map(([chatId, chat]) => {
            const messageDate = chat?.date?.seconds
              ? new Date(chat.date.seconds * 1000)
              : null;

            const formattedTime = messageDate?.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            const lastSeen = chat?.lastSeen
              ? new Date(chat.lastSeen.seconds * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Not available";

            return (
              <div
                key={chatId}
                onClick={() => handleSelect(chat.userInfo)}
                className="flex items-center gap-[8px] p-[8px] cursor-pointer rounded"
              >
                <img
                  src={avtar}
                  alt="avatar"
                  className="w-[40px] h-[40px] rounded-full shadow-md"
                />

                {chat?.userInfo?.status?.isOnline ? (
                  <div className="w-[11px] h-[9px] ml-[-18px] mt-[33px] bg-green-500 rounded-full"></div>
                ) : (
                  <div className="w-[11px] h-[9px] ml-[-18px] mt-[33px] bg-yellow-700 rounded-full"></div>
                )}

                <div className="flex justify-between w-full items-start">
                  <div className="max-w-[70%]">
                    <span className="xl:text-[16px] text-[14px] font-bold block">
                      {chat.userInfo?.name}
                    </span>

                    <p className="text-[14px] text-black truncate max-w-full">
                      {chat.lastMessage
                        ? `${
                            chat.lastMessage.senderId === currentUser.uid
                              ? "You:"
                              : ""
                          }${chat.lastMessage.text}`
                        : "No messages yet"}
                    </p>
                  </div>

                  <div className="text-right flex flex-col items-end gap-[4px]">
                    {formattedTime && (
                      <span className="text-[12px] text-gray-500 block">
                        {formattedTime}
                      </span>
                    )}

                    {/*  unread badge */}
                    {chat.unread > 0 && (
                      <span
                        className="
                       text-white w-[20px] h-[21px]
                        text-[12px] px-[7px] py-[2px] rounded-full"
                        style={{ backgroundColor: "#25d366" }}
                      >
                        {chat.unread}
                      </span>
                    )}
                  </div>
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
