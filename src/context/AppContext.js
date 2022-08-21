import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// Set Initial State
const initialState = {
  server: "",
  serverData: {},
};

// create context
export const AppContext = createContext(initialState);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function setServer(payload) {
    dispatch({
      type: "SET_SERVER",
      payload: payload,
    });
  }
  function setServerData(payload) {
    dispatch({
      type: "SET_SERVER_DATA",
      payload: payload,
    });
  }

  return (
    <AppContext.Provider
      value={{
        server: state.server,
        serverData: state.serverData,
        setServer,
        setServerData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
