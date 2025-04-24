import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbdata } from "../Config/firebase";

const useUserStatus = (db, userId, combinedId) => {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    if (!userId || !combinedId) return;

    const userRef = doc(dbdata, "chatUsers", userId);

    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      const data = docSnap.data();
      console.log("data ?????:", data);
      const status = data?.[`${combinedId}.status`];

      setIsOnline(status?.isOnline ?? false);
    });

    return () => unsubscribe();
  }, [db, userId, combinedId]);

  return (
    <div>
      {isOnline ? (
        <div className="w-[11px] h-[8px] ml-[-17px] mt-[27px] rounded-full bg-green-400"></div>
      ) : (
        <div
          className="w-[11px] h-[8px] ml-[-17px] mt-[27px] rounded-full "
          style={{ backgroundColor: "#dcf8c6" }}
        ></div>
      )}
    </div>
  );
};

export default useUserStatus;
