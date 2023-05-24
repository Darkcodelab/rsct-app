import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/user/UserContext";

// components
import DownloadTC from "./DownloadTC";
import DownloadAllTC from "./DownloadAllTC";
import Activities from "./Activities";
import TodaysFollowUps from "./TodaysFollowUps";

export default function AdminDashboard() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?._id) {
      navigate("/login");
    }
  });

  if (!user?._id) {
    return <h3 className="text-center text-xl my-4">Loading...</h3>;
  }
  return (
    <main className="container mx-auto px-1">
      <section className="max-w-[500px] w-full mx-auto my-4 p-4 rounded-md shadow-md border">
        <Link
          to="/createUser"
          className="p-2 rounded-md bg-primary text-white w-full block text-center"
        >
          Create New User
        </Link>
        <Link
          to="/donorAcknowledgment"
          className="p-2 mt-2 rounded-md bg-primary text-white w-full block text-center"
        >
          Donor Acknowledgment
        </Link>
        <DownloadAllTC />
        <div className="my-4 max-w-[400px] w-full h-[1px] mx-auto shadow bg-gray-300"></div>
        <DownloadTC />
      </section>
      <section className="mt-6">
        <Activities />
        <TodaysFollowUps />
      </section>
    </main>
  );
}
