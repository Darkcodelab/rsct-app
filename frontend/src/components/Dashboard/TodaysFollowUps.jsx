import { useState, useEffect } from "react";

// actions
import { getTodaysTC } from "../../context/tc/TCAction";
import TCCard from "../shared/TCCard";
import { toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner";

export default function TodaysFollowUps() {
  const [TCFromDB, setTCFromDB] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTodaysTC()
      .then((res) => {
        setLoading(false);
        if (res.success === true) {
          setTCFromDB(res.tc);
        } else {
          toast.error(res.error);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) {
    return (
      <div className="mt-4 p-4 rounded-md shadow-md border-t">
        <h2 className="font-bold text-lg">Today&apos;s Follow Up</h2>
        <div className="flex justify-center">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      </div>
    );
  }

  if (TCFromDB.length < 1) {
    return (
      <div className="mt-4 p-4 rounded-md shadow-md border-t">
        <h2 className="font-bold text-lg">Today&apos;s Follow Up</h2>
        <p className="text-center mt-2">No follow up for today</p>
      </div>
    );
  }

  return (
    <div className="mt-4 p-4 rounded-md shadow-md border-t">
      <h2 className="font-bold text-lg">Today&apos;s Follow Ups</h2>
      <ul className="mt-4 max-h-[400px] overflow-y-auto">
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
