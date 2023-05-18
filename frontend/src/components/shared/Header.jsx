import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/user/UserContext";

// actions
import { logoutUser } from "../../context/user/UserAction";
import { toast } from "react-toastify";

export default function Header() {
  const { user, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    const res = logoutUser(dispatch);
    if (res.success === true) {
      navigate("/login");
    } else {
      toast.error(res.error);
    }
  };

  return (
    <header className="bg-gray-50 py-2 shadow-md">
      <div className="container mx-auto flex items-center justify-around">
        <Link to="/" className="text-lg font-bold">
          RSCT App
        </Link>
        {user?._id && (
          <button className="p-2 bg-gray-200 rounded-md" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
