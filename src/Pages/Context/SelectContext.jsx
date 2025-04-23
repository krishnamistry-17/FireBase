import { createContext, useReducer, useState } from "react";

export const SelectContext = createContext();

export const SelectContextProvider = ({ children }) => {
  const [selectedUserName, setSelectedUserName] = useState("");

  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };
  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        const { payload: selectedUserName } = action;
        return {
          user: selectedUserName,
          name: selectedUserName.name,
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  return (
    <SelectContext.Provider
      value={{ data: state, dispatch, selectedUserName, setSelectedUserName }}
    >
      {children}
    </SelectContext.Provider>
  );
};
