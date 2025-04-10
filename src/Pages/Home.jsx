import React, { useRef, useState } from "react";
import Cookies from "universal-cookie";
import { useAuth } from "./Context/AuthContext";
import { Chat } from "./Chat";
const cookie = new Cookies();
const Home = () => {
  const { isSignedIn, setIsSignedIn } = useAuth(cookie.get("new-token"));
  const [room, setIsRoom] = useState(null);

  const inputRef = useRef(null);

  return (
    <>
      <div>
        {!isSignedIn ? (
          <>
            <h2 className="text-black text-[25px] justify-center text-center pt-[25px]">
              Welcosme to home
            </h2>
            <h2 className="text-black text-[18px] justify-center text-center pt-[10px]">
              <a href="/signup">Go to Signup</a>
            </h2>
          </>
        ) : (
          <>
            <div>
              {room ? (
                <div>
                  <Chat room={room} />
                </div>
              ) : (
                <div className="ml-[10px]">
                  <label className="block text-[14px] font-medium text-gray-700 pl-[15px]">
                    Enter Name
                  </label>
                  <input
                    className="mt-[4px] block w-[160px] h-[40px] p-[10px] border border-gray-300 rounded-md
            focus:outline-none focus:ring-2
            "
                    ref={inputRef}
                    type="text"
                    name="name"
                  />
                  <button
                    className="w-[150px] py-[8px] px-[16px] text-white
               bg-blue-500 rounded-md mb-[20px] mt-[15px]
                hover:bg-blue-600 focus:outline-none  "
                    type="submit"
                    onClick={() => setIsRoom(inputRef.current.value)}
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
