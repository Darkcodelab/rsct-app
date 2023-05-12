import { createContext, useReducer } from "react";
import tcReducer from "./TCReducer";

const TCContext = createContext();

// eslint-disable-next-line react/prop-types
export const TCProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tcReducer, []);

  return (
    <TCContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TCContext.Provider>
  );
};

export default TCContext;
