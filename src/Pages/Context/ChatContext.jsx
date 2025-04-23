import React, { createContext, useContext, useReducer } from "react";
import { useAuth } from "./AuthContext";

export const ChatAuthContext = createContext();

//created custome hhok
export const useChatAuth = () => useContext(ChatAuthContext);

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useAuth();

  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        const { currentUser, payload: selectedUser } = action;
        // console.log("🚀 ~ chatReducer ~ selectedUser:", selectedUser);

        return {
          user: selectedUser,
          chatId:
            currentUser.uid > selectedUser.uid
              ? currentUser.uid + selectedUser.uid
              : selectedUser.uid + currentUser.uid,
          name: selectedUser[1]?.userInfo.name,
          lastseen: selectedUser[1]?.userInfo.lastseen,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatAuthContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatAuthContext.Provider>
  );
};
