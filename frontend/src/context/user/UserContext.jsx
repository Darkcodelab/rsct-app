import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import userReducer from "./UserReducer";

const backendURL = "http://localhost:5000";
const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const userToken = localStorage.getItem("rsct-user-token");
        if (userToken) {
          axios.defaults.headers.common["Authorization"] = `JWT ${userToken}`;
          axios
            .get(`${backendURL}/auth/verifyToken`)
            .then(({ data }) => {
              if (data.success === true) {
                dispatch({ type: "SET_USER", payload: data.user });
              }
            })
            .catch(() => console.log("Error while fetching user"));
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, []);
  const [state, dispatch] = useReducer(userReducer, {});

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
