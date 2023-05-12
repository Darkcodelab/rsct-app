import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// actions
import { getTCById } from "../context/tc/TCAction";

export default function TCDetails() {
  const { id } = useParams();
  const [TCFromDB, setTCFromDB] = useState({});

  useEffect(() => {
    getTCById(id)
      .then((res) => {
        if (res.success === true) {
          console.log(res);
          setTCFromDB(res.tc[0]);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!TCFromDB.id) {
    return (
      <main>
        <section className="container mx-auto p-2">
          <h2 className="text-center font-bold text-lg my-2">TC Details</h2>
          <p>No TC Found with that ID</p>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="container mx-auto p-2">
        <Link
          className="bg-primary text-white p-2 rounded-md my-4 inline-block"
          to="/"
        >
          Back To Dashboard
        </Link>
        <h2 className="text-center font-bold text-lg">TC Details</h2>
        <div className="p-4 shadow-md rounded-md mt-4 border-t flex flex-col gap-2">
          <p className="font-bold">
            Donor Name:{" "}
            <span className="font-normal">{TCFromDB.donorName}</span>
          </p>
          <p className="font-bold">
            Follow Up Date:{" "}
            <span className="font-normal">{TCFromDB.followUpDate}</span>
          </p>
          <p className="font-bold">
            Phone Number:{" "}
            <span className="font-normal">{TCFromDB.phoneNumber}</span>
          </p>
          <p className="font-bold">
            Note: <span className="font-normal">{TCFromDB.note}</span>
          </p>
          <p className="font-bold">
            Created By:{" "}
            <span className="font-normal">{TCFromDB.createdBy}</span>
          </p>
          <p className="font-bold">
            Created At:{" "}
            <span className="font-normal">{TCFromDB.createdAt}</span>
          </p>
        </div>
      </section>
    </main>
  );
}
