import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../context/user/UserContext";
import { toast } from "react-toastify";

// icons
import {
  MdAccountCircle,
  MdAlternateEmail,
  MdLockOutline,
} from "react-icons/md";

// actions
import { createUser } from "../context/user/UserAction";
import { ColorRing } from "react-loader-spinner";

export default function CreateUser() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const initialState = {
    name: "",
    email: "",
    password: "",
  };
  const [formFields, setFormFields] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?._id || !user?.admin) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleInputChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const res = await createUser(formFields);
    setLoading(false);
    if (res.success === true) {
      toast.success("User created!");
      setFormFields(initialState);
    } else {
      toast.error(res.error);
    }
  };

  return (
    <main className="container mx-auto p-2">
      <section>
        <Link to="/" className="text-primary text-lg font-semibold">
          &lt; Go to Dashboard
        </Link>
      </section>
      <section>
        <form
          className="p-2 py-4 bg-gray-100 mt-8 shadow-md"
          onSubmit={handleFormSubmit}
        >
          <h2 className="text-xl text-center">Create a new user account</h2>
          <div className="flex items-center p-3 bg-white rounded-md mt-4 border gap-4">
            <MdAccountCircle fontSize={25} />
            <input
              type="text"
              name="name"
              value={formFields.name}
              onChange={handleInputChange}
              className="w-full outline-none"
              placeholder="Full Name"
              required
            />
          </div>
          <div className="flex items-center p-3 bg-white rounded-md mt-2 border gap-4">
            <MdAlternateEmail fontSize={25} />
            <input
              type="email"
              name="email"
              value={formFields.email}
              onChange={handleInputChange}
              className="w-full outline-none"
              placeholder="Email Address"
              required
            />
          </div>
          <div className="flex items-center p-3 bg-white rounded-md mt-2 border gap-4">
            <MdLockOutline fontSize={25} />
            <input
              type="text"
              name="password"
              value={formFields.password}
              onChange={handleInputChange}
              className="w-full outline-none"
              placeholder="Password"
              required
              minLength={4}
            />
          </div>
          <button
            type="submit"
            className="p-3 bg-primary text-white rounded-md w-full mt-4"
            disabled={loading}
            style={{ cursor: loading ? "not-allowed" : "pointer" }}
          >
            {!loading ? (
              "Create User"
            ) : (
              <div className="flex justify-center">
                <ColorRing
                  visible={true}
                  height="30"
                  width="30"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={[
                    "#e15b64",
                    "#f47e60",
                    "#f8b26a",
                    "#abbd81",
                    "#849b87",
                  ]}
                />
              </div>
            )}
          </button>
        </form>
      </section>
    </main>
  );
}
