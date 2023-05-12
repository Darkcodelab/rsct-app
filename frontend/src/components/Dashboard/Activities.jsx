import { useEffect, useState } from "react";
import { downloadAllTCs } from "../../context/tc/TCAction";
import TCCard from "../shared/TCCard";

export default function Activities() {
  const [TCFromDB, setTCFromDB] = useState([]);
  const [TCLimit, setTCLimit] = useState(20);
  useEffect(() => {
    downloadAllTCs()
      .then((res) => {
        if (res.success === true) {
          setTCFromDB(res.tc.reverse());
        }
      })
      .catch((err) => console.error(err));
  }, []);

  if (TCFromDB.length < 1) {
    return (
      <div className="shadow-md border-t p-5 rounded-md">
        <h2 className="text-xl font-bold">Recent Activites</h2>
        <p className="text-center mt-4">No Activity</p>
      </div>
    );
  }

  const handleLoadMore = () => {
    setTCLimit((prev) => {
      let newState = prev + 20;
      if (newState > TCFromDB.length) {
        newState = TCFromDB.length;
      }
      return newState;
    });
  };

  return (
    <div className="shadow-md border-t p-4 rounded-md">
      <h2 className="text-xl font-bold">Recent Activites</h2>
      <ul className="mt-4 max-h-[300px] overflow-y-auto">
        {TCFromDB.length > 0 &&
          TCFromDB.slice(0, TCLimit).map((tc) => {
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
        <button
          className="p-2 w-full bg-primary text-white mt-4 rounded-md"
          onClick={handleLoadMore}
        >
          Load more
        </button>
      </ul>
    </div>
  );
}
