import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// actions
import { getTCById } from "../context/tc/TCAction";
import { toast } from "react-toastify";
import UserContext from "../context/user/UserContext";
import { ColorRing } from "react-loader-spinner";

export default function TCDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [TCFromDB, setTCFromDB] = useState({});
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user?._id) {
      navigate("/login");
      return;
    }
    setLoading(true);
    getTCById(id)
      .then((res) => {
        setLoading(false);
        if (res.success === true) {
          setTCFromDB(res.tc[0]);
        } else {
          toast.error(res.error);
        }
      })
      .catch((err) => console.error(err));
  }, [id, user, navigate]);

  if (loading) {
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
          <div className="flex justify-center">
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </div>
        </section>
      </main>
    );
  }

  if (!TCFromDB.id) {
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
