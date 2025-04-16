// useChatAuth.js
import { useContext } from "react";
import { ChatAuthContext } from "../context/ChatAuthContext";

export const useChatAuth = () => {
  return useContext(ChatAuthContext);
};
