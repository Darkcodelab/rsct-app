import { useContext, useEffect } from "react";
import UserContext from "../context/user/UserContext";
import { useNavigate } from "react-router-dom";

// components
import AdminDashboard from "../components/Dashboard/AdminDashboard";
import UserDashboard from "../components/Dashboard/UserDashboard";

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?._id) {
      navigate("/login");
    }
  });
  if (!user?._id) {
    return <div className="text-center text-xl my-4">Loading...</div>;
  }
  return user.admin ? <AdminDashboard /> : <UserDashboard />;
}
