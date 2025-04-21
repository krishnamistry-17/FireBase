// import React, { useContext } from "react";
// import Cam from "../img/cam.png";
// import Add from "../img/add.png";
// import More from "../img/more.png";
// import Messages from "./Messages";
// import Input from "./Input";
// import { ChatContext } from "../context/ChatContext";

// const Chat = () => {
//   const { data } = useContext(ChatContext);

//   return (
//     <div className="chat">
//       <div className="chatInfo">
//         <span>{data.user?.displayName}</span>
//         <div className="chatIcons">
//           <img src={Cam} alt="" />
//           <img src={Add} alt="" />
//           <img src={More} alt="" />
//         </div>
//       </div>
//       <Messages />
//       <Input/>
//     </div>
//   );
// };

// export default Chat;
// import React, { useContext, useState } from "react";
// import Img from "../img/img.png";
// import Attach from "../img/attach.png";
// import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";
// import {
//   arrayUnion,
//   doc,
//   serverTimestamp,
//   Timestamp,
//   updateDoc,
// } from "firebase/firestore";
// import { db, storage } from "../firebase";
// import { v4 as uuid } from "uuid";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

// const Input = () => {
//   const [text, setText] = useState("");
//   const [img, setImg] = useState(null);

//   const { currentUser } = useContext(AuthContext);
//   const { data } = useContext(ChatContext);

//   const handleSend = async () => {
//     if (img) {
//       const storageRef = ref(storage, uuid());

//       const uploadTask = uploadBytesResumable(storageRef, img);

//       uploadTask.on(
//         (error) => {
//           //TODO:Handle Error
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
//             await updateDoc(doc(db, "chats", data.chatId), {
//               messages: arrayUnion({
//                 id: uuid(),
//                 text,
//                 senderId: currentUser.uid,
//                 date: Timestamp.now(),
//                 img: downloadURL,
//               }),
//             });
//           });
//         }
//       );
//     } else {
//       await updateDoc(doc(db, "chats", data.chatId), {
//         messages: arrayUnion({
//           id: uuid(),
//           text,
//           senderId: currentUser.uid,
//           date: Timestamp.now(),
//         }),
//       });
//     }

//     await updateDoc(doc(db, "userChats", currentUser.uid), {
//       [data.chatId + ".lastMessage"]: {
//         text,
//       },
//       [data.chatId + ".date"]: serverTimestamp(),
//     });

//     await updateDoc(doc(db, "userChats", data.user.uid), {
//       [data.chatId + ".lastMessage"]: {
//         text,
//       },
//       [data.chatId + ".date"]: serverTimestamp(),
//     });

//     setText("");
//     setImg(null);
//   };
// //   return (
//     <div className="input">
//       <input
//         type="text"
//         placeholder="Type something..."
//         onChange={(e) => setText(e.target.value)}
//         value={text}
//       />
//       <div className="send">
//         <img src={Attach} alt="" />
//         <input
//           type="file"
//           style={{ display: "none" }}
//           id="file"
//           onChange={(e) => setImg(e.target.files[0])}
//         />
//         <label htmlFor="file">
//           <img src={Img} alt="" />
//         </label>
//         <button onClick={handleSend}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default Input;
// import React, { useContext, useEffect, useRef } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";

// const Message = ({ message }) => {
//   const { currentUser } = useContext(AuthContext);
//   const { data } = useContext(ChatContext);

//   const ref = useRef();

//   useEffect(() => {
//     ref.current?.scrollIntoView({ behavior: "smooth" });
//   }, [message]);

//   return (
//     <div
//       ref={ref}
//       className={`message ${message.senderId
//  === currentUser.uid && "owner"}`}
//     >
//       <div className="messageInfo">
//         <img
//           src={
//             message.senderId === currentUser.uid
//               ? currentUser.photoURL
//               : data.user.photoURL
//           }
//           alt=""
//         />
//         <span>just now</span>
//       </div>
//       <div className="messageContent">
//         <p>{message.text}</p>
//         {message.img && <img src={message.img} alt="" />}
//       </div>
//     </div>
//   );
// };

// export default Message;
// import { doc, onSnapshot } from "firebase/firestore";
// import React, { useContext, useEffect, useState } from "react";
// import { ChatContext } from "../context/ChatContext";
// import { db } from "../firebase";
// import Message from "./Message";

// const Messages = () => {
//   const [messages, setMessages] = useState([]);
//   const { data } = useContext(ChatContext);

//   useEffect(() => {
//     const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
//       doc.exists() && setMessages(doc.data().messages);
//     });

//     return () => {
//       unSub();
//     };
//   }, [data.chatId]);

//   console.log(messages)

//   return (
//     <div className="messages">
//       {messages.map((m) => (
//         <Message message={m} key={m.id} />
//       ))}
//     </div>
//   );
// };

// export default Messages;
// import React, { useContext, useState } from "react";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   setDoc,
//   doc,
//   updateDoc,
//   serverTimestamp,
//   getDoc,
// } from "firebase/firestore";
// import { db } from "../firebase";
// import { AuthContext } from "../context/AuthContext";
// const Search = () => {
//   const [username, setUsername] = useState("");
//   const [user, setUser] = useState(null);
//   const [err, setErr] = useState(false);

//   const { currentUser } = useContext(AuthContext);

//   const handleSearch = async () => {
//     const q = query(
//       collection(db, "users"),
//       where("displayName", "==", username)
//     );

//     try {
//       const querySnapshot = await getDocs(q);
//       querySnapshot.forEach((doc) => {
//         setUser(doc.data());
//       });
//     } catch (err) {
//       setErr(true);
//     }
//   };

//   const handleKey = (e) => {
//     e.code === "Enter" && handleSearch();
//   };

//   const handleSelect = async () => {
//     //check whether the group(chats in firestore) exists, if not create
//     const combinedId =
//       currentUser.uid > user.uid
//         ? currentUser.uid + user.uid
//         : user.uid + currentUser.uid;
//     try {
//       const res = await getDoc(doc(db, "chats", combinedId));

//       if (!res.exists()) {
//         //create a chat in chats collection
//         await setDoc(doc(db, "chats", combinedId), { messages: [] });

//         //create user chats
//         await updateDoc(doc(db, "userChats", currentUser.uid), {
//           [combinedId + ".userInfo"]: {
//             uid: user.uid,
//             displayName: user.displayName,
//             photoURL: user.photoURL,
//           },
//           [combinedId + ".date"]: serverTimestamp(),
//         });

//         await updateDoc(doc(db, "userChats", user.uid), {
//           [combinedId + ".userInfo"]: {
//             uid: currentUser.uid,
//             displayName: currentUser.displayName,
//             photoURL: currentUser.photoURL,
//           },
//           [combinedId + ".date"]: serverTimestamp(),
//         });
//       }
//     } catch (err) {}

//     setUser(null);
//     setUsername("")
//   };
//   return (
//     <div className="search">
//       <div className="searchForm">
//         <input
//           type="text"
//           placeholder="Find a user"
//           onKeyDown={handleKey}
//           onChange={(e) => setUsername(e.target.value)}
//           value={username}
//         />
//       </div>
//       {err && <span>User not found!</span>}
//       {user && (
//         <div className="userChat" onClick={handleSelect}>
//           <img src={user.photoURL} alt="" />
//           <div className="userChatInfo">
//             <span>{user.displayName}</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Search;
// import { doc, onSnapshot } from "firebase/firestore";
// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";
// import { db } from "../firebase";

// const Chats = () => {
//   const [chats, setChats] = useState({}); // Initialize as an empty object

//   const { currentUser } = useContext(AuthContext);
//   const { dispatch } = useContext(ChatContext);

//   useEffect(() => {
//     const getChats = () => {
//       const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
//         setChats(doc.data() || {}); // If doc.data() is null, set an empty object
//       });

//       return () => {
//         unsub();
//       };
//     };

//     if (currentUser?.uid) {
//       getChats();
//     }
//   }, [currentUser?.uid]);

//   const handleSelect = (u) => {
//     dispatch({ type: "CHANGE_USER", payload: u });
//   };

//   return (
//     <div className="chats">
//       {Object.entries(chats)?.length > 0 && // Check if there are entries
//         Object.entries(chats)
//           .sort((a, b) => b[1].date - a[1].date)
//           .map((chat) => (
//             <div
//               className="userChat"
//               key={chat[0]}
//               onClick={() => handleSelect(chat[1].userInfo)}
//             >
//               <img src={chat[1].userInfo.photoURL} alt="" />
//               <div className="userChatInfo">
//                 <span>{chat[1].userInfo.displayName}</span>
//                 <p>{chat[1].lastMessage?.text}</p>
//               </div>
//             </div>
//           ))}
//     </div>
//   );
// };

// export default Chats;
// <div class="formContainer bg-[#a7bcff] h-screen flex items-center justify-center">
//   <div class="formWrapper bg-white p-8 rounded-lg flex flex-col gap-2 items-center">
//     <div class="logo text-[#5d5b8d] font-bold text-2xl">Logo</div>
//     <div class="title text-[#5d5b8d] text-xs">Title</div>
//     <form class="flex flex-col gap-4">
//       <input
//         type="text"
//         class="p-4 border-b border-[#a7bcff] w-64 placeholder:text-gray-400"
//         placeholder="Enter text"
//       />
//       <button class="bg-[#7b96ec] text-white p-2 font-bold border-none cursor-pointer">Send</button>
//       <label class="flex items-center gap-2 text-[#8da4f1] text-xs cursor-pointer">
//         <img src="attach.png" class="w-8" alt="Attach" />
//         Attach File
//       </label>
//     </form>
//     <p class="text-[#5d5b8d] text-xs mt-2">Some description text</p>
//   </div>
// </div>

// <!-- Home Section -->
// <div class="home bg-[#a7bcff] h-screen flex items-center justify-center">
//   <div class="container border 
// border-white rounded-lg 
// w-[65%] h-[80%] flex overflow-hidden sm:w-[90%]">
//     <!-- Sidebar -->
//     <div class="sidebar flex-1 bg-[#3e3c61] relative">
//       <div class="navbar flex items-center bg-[#2f2d52] h-12 px-4 justify-between text-[#ddddf7]">
//         <div class="logo font-bold sm:hidden">Logo</div>
//         <div class="user flex gap-2">
//           <img src="user.png" class="bg-[#ddddf7] w-6 h-6 rounded-full object-cover" alt="User" />
//           <button class="bg-[#5d5b8d] text-[#ddddf7] text-xs border-none cursor-pointer sm:absolute sm:bottom-2">
//             Log out
//           </button>
//         </div>
//       </div>
//       <div class="search border-b border-gray-500">
//         <div class="searchForm p-2">
//           <input
//             type="text"
//             class="bg-transparent border-none text-white outline-none placeholder:text-lightgray"
//             placeholder="Search"
//           />
//         </div>
//       </div>
//       <div class="userChat p-2 flex items-center gap-2 text-white cursor-pointer hover:bg-[#2f2d52]">
//         <img src="user2.png" class="w-12 h-12 rounded-full object-cover" alt="User" />
//         <div class="userChatInfo">
//           <span class="text-lg font-medium">User Name</span>
//           <p class="text-sm text-lightgray">Last message preview</p>
//         </div>
//       </div>
//     </div>

//     <!-- Chat -->
//     <div class="chat flex-2">
//       <div class="chatInfo h-12 bg-[#5d5b8d] flex items-center justify-between p-2 text-lightgray">
//         <div class="chatIcons flex gap-2">
//           <img src="cam.png" class="h-6 cursor-pointer" alt="Camera" />
//           <img src="add.png" class="h-6 cursor-pointer" alt="Add" />
//           <img src="more.png" class="h-6 cursor-pointer" alt="More" />
//         </div>
//       </div>
//       <div class="messages bg-[#ddddf7] p-2 h-[calc(100%-160px)] overflow-auto">
//         <div class="message flex gap-5 mb-5">
//           <div class="messageInfo flex flex-col text-gray-500 font-light">
//             <img
//               src="user3.png"
//               class="w-10 h-10 rounded-full object-cover"
//               alt="User"
//             />
//             <span>Just now</span>
//           </div>
//           <div class="messageContent max-w-[80%] flex flex-col gap-2">
//             <p class="bg-white p-2 rounded-tl-lg rounded-br-lg max-w-max">Hello!</p>
//             <img src="image.png" class="w-1/2" alt="Image" />
//           </div>
//         </div>
//       </div>
//       <div class="input h-12 bg-white p-2 flex items-center justify-between">
//         <input
//           type="text"
//           class="w-full border-none outline-none text-[#2f2d52] text-xl placeholder:text-lightgray"
//           placeholder="Type a message"
//         />
//         <div class="send flex items-center gap-2">
//           <img src="attach.png" class="h-6 cursor-pointer" alt="Attach" />
//           <button class="border-none p-2.5 text-white bg-[#8da4f1] cursor-pointer">Send</button>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
