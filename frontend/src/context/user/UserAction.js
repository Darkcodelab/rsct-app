import axios from "axios";
import { backendURL } from "../../config";

export const loginUser = async (userObj) => {
  try {
    const { data } = await axios.post(`${backendURL}/auth/login`, userObj);
    return data;
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};

export const logoutUser = async (dispatch) => {
  try {
    axios.defaults.headers.common["Authorization"] = "";
    dispatch({ type: "SET_USER", payload: {} });
    localStorage.removeItem("rsct-user-token");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: error.message };
  }
};

export const createUser = async (userObj) => {
  try {
    const { data } = await axios.post(`${backendURL}/auth/createUser`, userObj);
    return data;
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};
