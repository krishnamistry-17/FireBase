// import { getDatabase, ref, onValue } from "firebase/database";
// import { useEffect, useState } from "react";
// import { formatDistanceToNow } from "date-fns";
// import { useChatAuth } from "./Context/ChatContext";

// function ChatUser() {
//   const { selectedUser } = useChatAuth();

//   console.log("selectedUser??? :", selectedUser);
//   const [setUserData] = useState(null);
//   const { data } = useChatAuth();

//   useEffect(() => {
//     if (!selectedUser?.uid) return;
//     console.log("selectedUser?.uid>>>>> :", selectedUser?.uid);

//     const db = getDatabase();
//     const userRef = ref(db, "chatUsers/" + selectedUser?.uid);

//     const unsubscribe = onValue(userRef, (snapshot) => {
//       setUserData(snapshot.val());
//     });

//     return () => unsubscribe();
//   }, [selectedUser?.uid]);

//   if (!selectedUser) {
//     return <div>Loading selected user...</div>;
//   }

//   const lastSeen = selectedUser.lastSeen
//     ? formatDistanceToNow(new Date(selectedUser.lastSeen), { addSuffix: true })
//     : "never";
//   console.log("lastSeen :", lastSeen);

//   return <div>{selectedUser.online ? "Online" : `Last seen ${lastSeen}`}</div>;
// }
// export default ChatUser;
