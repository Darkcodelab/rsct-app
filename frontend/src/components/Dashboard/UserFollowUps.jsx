import { useState, useEffect, useContext } from "react";
import UserContext from "../../context/user/UserContext";
import dayjs from "dayjs";

// components
import TCCard from "../shared/TCCard";

// actions
import { getTCByUser } from "../../context/tc/TCAction";
import { toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner";

export default function UserFollowUps() {
  const [TCFromDB, setTCFromDB] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);
  useEffect(() => {
    setLoading(true);
    getTCByUser(user._id)
      .then((res) => {
        setLoading(false);
        if (res.success === true) {
          setTCFromDB(
            res.tc.filter((tc) => dayjs(tc.followUpDate).isSame(dayjs(), "day"))
          );
        } else {
          toast.error(res.error);
        }
      })
      .catch((err) => console.error(err));
  }, [user]);

  if (!user) return null;

  if (loading) {
    return (
      <section className="mt-4 max-w-[800px] w-full mx-auto bg-gray-100 p-3 rounded-md flex justify-center">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </section>
    );
  }

  if (TCFromDB.length < 1) {
    return (
      <section className="mt-4 max-w-[800px] w-full mx-auto bg-gray-100 p-3 rounded-md">
        <div className="py-2">
          <h2 className="text-lg font-bold">Your Follow Ups For Today</h2>
        </div>
        <ul>
          <li>
            <p>No Follow up today</p>
          </li>
        </ul>
      </section>
    );
  }
  return (
    <section className="mt-8 max-w-[800px] w-full mx-auto p-3 rounded-md border">
      <div className="py-2">
        <h2 className="text-lg font-bold">Your Follow Ups For Today</h2>
      </div>
      <ul className="max-h-[400px] overflow-auto mt-4">
        {TCFromDB.map((tc) => {
          return (
            <TCCard
              key={tc.id}
              id={tc.id}
              donorName={tc.donorName}
              followUpDate={tc.followUpDate}
              createdBy={tc.createdBy}
              createdAt={tc.createdAt}
            />
          );
        })}
      </ul>
    </section>
  );
}
