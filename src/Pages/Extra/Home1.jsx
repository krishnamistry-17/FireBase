import React, { useRef, useState } from "react";
import { useAuth } from "./Context/AuthContext";
import { Chat } from "./Chat";

const Home = () => {
  const { isSignedIn } = useAuth();

  const [room, setRoom] = useState(null);
  const [previousRooms, setPreviousRooms] = useState([]);

  const inputRef = useRef(null);

  const handleRoomSubmit = () => {
    const newRoom = inputRef.current.value.trim();
    if (newRoom) {
      if (room && !previousRooms.includes(room)) {
        setPreviousRooms((prev) => [...prev, room]);
      }
      setRoom(newRoom);
      console.log(newRoom);
    }
  };

  return (
    <>
      <div>
        {!isSignedIn ? (
          <>
            <h2 className="text-black text-[25px] text-center pt-[25px]">
              Welcome to Home
            </h2>
            <h2 className="text-black text-[18px] text-center pt-[10px]">
              <a href="/signup">Go to Signup</a>
            </h2>
          </>
        ) : (
          <>
            <div>
              <chat />
            </div>
            <div>
              {room ? (
                <div>
                  <Chat room={room} previousRooms={previousRooms} />
                </div>
              ) : (
                <div className="ml-[10px]">
                  <label className="block text-[14px] font-medium text-gray-700 pl-[15px]">
                    Enter Room Name
                  </label>
                  <input
                    className="mt-[4px] block w-[160px] h-[40px] p-[10px] border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                    ref={inputRef}
                    type="text"
                    name="name"
                  />
                  <button
                    className="w-[150px] py-[8px] px-[16px] text-white bg-blue-500 rounded-md mb-[20px] mt-[15px] hover:bg-blue-600 focus:outline-none"
                    type="submit"
                    onClick={handleRoomSubmit}
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
