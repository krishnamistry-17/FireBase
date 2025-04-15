import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../Config/firebase";
import { useAuth } from "./Context/AuthContext";
import avtar from "../assets/images/avtar.png";
import { chatAuth } from "./Context/ChatContext";
const Search = () => {
  const { dispatch } = chatAuth();
  const { currentUser } = useAuth();
  const [userNotFound, setUserNotFound] = useState(false);

  const [name, setName] = useState("");
  console.log("name :", name);
  const [user, setUser] = useState(null);
  console.log("user :", user);
  const [err, setError] = useState(false);
  console.log("search err :", err);

  const handleSeacrh = async () => {
    console.log("db :", db);
    const q = query(collection(db, "newusers"), where("name", "==", name));
    console.log("user error", user);

    try {
      const querySnapshot = await getDocs(q);

      console.log("q :", q);
      console.log(q);
      console.log(querySnapshot, "querySnapshot");

      querySnapshot.forEach((doc) => {
        console.log("doc :", doc);
        setUser(doc.data());
        console.log("Availbale user", doc.data().name);
        setUserNotFound(true);
      });
    } catch (error) {
      setError(true);
      console.log("search catch error", error);
    }
    setUserNotFound(false);
  };

  const handleSelect = async (u) => {
    //check group chat exits , if not
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    console.log("combinedId", combinedId);
    //create user chats
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        console.log("res :", res);
        //if there is no response in chats, so create chat in chat collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        console.log("db combine :", db);

        //craete user chats [for curent user]
        await updateDoc(doc(db, "chatUsers", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            name: user.name,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        //craete user chats [for  user]
        await updateDoc(doc(db, "chatUsers", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            name: currentUser.name,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log("error for chat user", error);
    }
    setUser(null);
    setName("");
    dispatch({ type: "CHANGE_USER", payload: u[0] });
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSeacrh();
  };

  return (
    <div className="ml-[20px] mt-[10px]">
      <input
        type="text"
        className="w-[191px] h-[41px] 
        border rounded-sm shadow-sm p-[5px]"
        onChange={(e) => setName(e.target.value)}
        value={name}
        onKeyDown={handleKey}
        placeholder="Search name.."
      />

      {userNotFound && !user && (
        <p className="text-red-500 text-[14px]">User not found</p>
      )}
      {user && (
        <div onClick={handleSelect} className="flex mt-[10px]">
          <img
            src={avtar}
            alt="image"
            className="w-[25px] h-[25px] rounded-full bg-blue-600"
          />
          <div>
            <span className="pl-[10px]">{user.name}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
