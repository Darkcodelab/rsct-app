import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/user/UserContext";
import { toast } from "react-toastify";
import { setLSItem } from "../utils/localstorage";

// actions
import { loginUser } from "../context/user/UserAction";

// assets
import LoginImage from "../assets/login.png";

// icons
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";

export default function Login() {
  const { user, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?._id) {
      navigate("/");
    }
  }, [user, navigate]);

  const initialState = {
    email: "",
    password: "",
  };
  const [formFields, setFormFields] = useState(initialState);
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const res = await loginUser(formFields);
    setLoading(false);
    if (res.success === true) {
      // set the token to local storage
      setLSItem("rsct-user-token", res.token);
      axios.defaults.headers.common["Authorization"] = `JWT ${res.token}`;
      dispatch({ type: "SET_USER", payload: res.user });
    } else {
      toast.error(res.error);
    }
  };

  const handleInputChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };

  return (
    <main className="container mx-auto">
      <div className="px-2">
        <form
          onSubmit={handleFormSubmit}
          className="max-w-[500px] mx-auto p-4 rounded-md border mt-8 bg-gray-50 shadow-md"
        >
          <div className="text-center pb-8">
            <img
              src={LoginImage}
              alt="login"
              className="max-w-[100%] block rounded-md"
            />
            <h2 className="text-xl font-bold mt-2">Welcome</h2>
            <p>Please login to continue</p>
          </div>
          <div className="flex items-center border p-3 rounded-md gap-2 bg-white">
            <MdAlternateEmail fontSize={22} />
            <input
              type="email"
              name="email"
              value={formFields.email}
              onChange={handleInputChange}
              placeholder="email address"
              className="w-full outline-none"
              required
            />
          </div>
          <div className="flex items-center border p-3 rounded-md gap-2 mt-2 bg-white">
            <MdLockOutline fontSize={22} />
            <input
              type="password"
              name="password"
              value={formFields.password}
              onChange={handleInputChange}
              placeholder="password"
              className="w-full outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="p-3 w-full bg-primary text-white rounded-md shadow-md mt-4"
            disabled={loading}
            style={{ cursor: loading ? "not-allowed" : "cursor" }}
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
