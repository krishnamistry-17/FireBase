import React from "react";
import { useAuth } from "./Context/AuthContext";
import MainChat from "./MainChat";

const Home = () => {
  const { isSignedIn } = useAuth();

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
              <MainChat />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
