import React from "react";
import { useAuth } from "./Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookie = new Cookies();
const NavBar = () => {
  const navigate = useNavigate();
  const { isSignedIn, setIsSignedIn } = useAuth(cookie.get("new-token"));
  const handleLogOut = (e) => {
    e.preventDefault();
    setIsSignedIn(false);
    navigate("/");
  };
  return (
    <div className="w-full bg-gray-500 h-[40px] 
    mt-[0px] text-white p-[10px]">
      <div className="flex justify-end">
        {!isSignedIn ? (
          <>
            <a className="pl-[80px]" href="/signin">
              Signin
            </a>
            <a className="pl-[30px] md:pr-[80px] sm:pr-[25px]" href="/signup">
              SignUp
            </a>
          </>
        ) : (
          <a className="pl-[80px]" href="/" onClick={handleLogOut}>
            Logout
          </a>
        )}
      </div>
    </div>
  );
};

export default NavBar;
