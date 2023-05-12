import { useState, useEffect } from "react";

// actions
import { getTodaysTC } from "../../context/tc/TCAction";
import TCCard from "../shared/TCCard";

export default function TodaysFollowUps() {
  const [TCFromDB, setTCFromDB] = useState([]);

  useEffect(() => {
    getTodaysTC()
      .then((res) => {
        if (res.success === true) {
          setTCFromDB(res.tc);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  if (TCFromDB.length < 1) {
    return (
      <div className="mt-4 p-4 rounded-md shadow-md border-t">
        <h2 className="font-bold text-lg">Today&apos;s Follow Ups</h2>
        <p className="text-center mt-2">No follow up for today</p>
      </div>
    );
  }

  return (
    <div className="mt-4 p-4 rounded-md shadow-md border-t">
      <h2 className="font-bold text-lg">Today&apos;s Follow Ups</h2>
      <ul className="mt-4 max-h-[300px] overflow-y-auto">
        {TCFromDB.length > 0 &&
          TCFromDB.map((tc) => {
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
    </div>
  );
}
