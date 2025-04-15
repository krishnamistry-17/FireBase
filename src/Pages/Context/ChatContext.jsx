import React, { createContext, useContext, useReducer } from "react";
import { useAuth } from "./AuthContext";

const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useAuth();

  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    console.log("update user in state", action.payload.user);
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
//created custome hhok
export const chatAuth = () => useContext(ChatContext);
