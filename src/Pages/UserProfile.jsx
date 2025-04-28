import React from "react";
import avtar from "../assets/images/avtar.png";
import { useNavigate } from "react-router-dom";
import { useChatAuth } from "./Context/ChatContext";
import { IoIosArrowBack } from "react-icons/io";

const UserProfile = () => {
  const navigate = useNavigate("");
  const { data } = useChatAuth();

  const lastSeen = data?.user?.lastseen
    ? new Date(data.user?.lastseen.seconds * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "No last seen ";
  const handleBack = () => {
    navigate("/profile");
  };
  return (
    <>
      <div
        className="flex md:hidden sticky top-0 items-center justify-between shadow-sm shadow-green-700
              h-[50px] p-[10px]"
        style={{ backgroundColor: "#128c7e" }}
      >
        {!data.user ? (
          <div>
            <p>No user Selected</p>
          </div>
        ) : (
          <>
            <div className="flex items-center ">
              <button onClick={handleBack}>
                <IoIosArrowBack className="md:hidden w-[22px] h-[22px]" />
              </button>

              <img
                src={avtar}
                alt="img"
                className="w-[35px] h-[35px] rounded-full  "
              />
              <div className="pl-[5px] flex flex-col leading-tight">
                <p className="xl:text-[19px] md:text-[16px] text-[15px] font-bold">
                  {data.user?.name}
                </p>
                <span className="xl:text-[13px] text-[11px] font-semibold text-white">
                  Last seen at: {lastSeen}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserProfile;
