import { useState, useEffect, useContext } from "react";
import UserContext from "../../context/user/UserContext";
import dayjs from "dayjs";

// components
import TCCard from "../shared/TCCard";

// actions
import { getTCByUser } from "../../context/tc/TCAction";

export default function UserFollowUps() {
  const [TCFromDB, setTCFromDB] = useState([]);
  const { user } = useContext(UserContext);
  useEffect(() => {
    getTCByUser(user._id)
      .then((res) => {
        if (res.success === true) {
          setTCFromDB(
            res.tc.filter((tc) => dayjs(tc.followUpDate).isSame(dayjs(), "day"))
          );
        }
      })
      .catch((err) => console.error(err));
  }, [user]);

  if (!user) return null;

  if (TCFromDB.length < 1) {
    return (
      <section className="mt-4 max-w-[800px] mx-auto bg-gray-100 p-3 rounded-md">
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
    <section className="mt-8 max-w-[800px] mx-auto p-3 rounded-md border">
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
