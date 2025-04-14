import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../Config/firebase";
import { useAuth } from "./Context/AuthContext";

const Search = () => {
  const { currentUser } = useAuth();
  const [name, setName] = useState("");
  console.log("name :", name);
  const [user, setUser] = useState(null);
  console.log("user :", user);
  const [err, setError] = useState(false);
  console.log("err :", err);

  const handleSeacrh = async () => {
    console.log("db :", db);
    const q = query(collection(db, "newusers"), where("name", "==", name));

    console.log(user);

    try {
      const querySnapshot = await getDocs(q);
      console.log("q :", q);
      console.log(q);
      console.log(querySnapshot, "querySnapshot");

      querySnapshot.forEach((doc) => {
        console.log("doc :", doc);
        setUser(doc.data());
      });
    } catch (error) {
      setError(true);
      console.log("error");
    }
  };

  const handleSelect = async () => {
    //check group chat exits , if not
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    //create user chats
    try {
      const res = await getDocs(db, "chats");
      if (!res.exists()) {
        //if there is no response in chats, so create chat in chat collection
        await getDocs(doc(db, "chats", combinedId), { message: [] });
        //craete user chats
        await updateDoc(doc(db, "chatUsers", currentUser.uid));
      }
    } catch (error) {}
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
        onKeyDown={handleKey}
        placeholder="Search name.."
      />
      {!user && <p className="text-red-500 text-[14px]">User not found</p>}
      {user && (
        <div onClick={handleSelect}>
          <img src={user.photoURL} alt="image" />
          <div>
            <span>{user.name}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
