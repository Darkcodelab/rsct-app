import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

// actions
import {
  getSingleMedia,
  deleteSingleMedia,
} from "../context/acknowledgment/AcknowledgmentAction";
import { backendURL } from "../config";
import { toast } from "react-toastify";

export default function ViewMedia() {
  const [file, setFile] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { docId, mediaId } = useParams();
  useEffect(() => {
    getSingleMedia({ docId, mediaId })
      .then((res) => {
        if (res.success === true) {
          setFile(res.file);
        } else {
          toast.error(res.error);
        }
      })
      .catch(console.error);
  }, [docId, mediaId]);

  const handleDelete = async () => {
    setLoading(true);
    const res = await deleteSingleMedia({ docId, mediaId });
    setLoading(false);
    if (res.success === true) {
      toast.success("Media Deleted successfully");
      navigate("/donorAcknowledgment");
    } else {
      toast.error(res.error);
    }
  };

  if (!file) {
    return (
      <main className="container mx-auto p-2">
        <section>
          <Link
            to="/donorAcknowledgment"
            className="text-primary text-lg font-semibold"
          >
            &lt; View all media
          </Link>
        </section>
        <section>
          <p className="p-2 text-center text-lg">Media Not Found!</p>
        </section>
      </main>
    );
  }

  if (!file._id) {
    return (
      <main className="container mx-auto p-2">
        <section>
          <Link
            to="/donorAcknowledgment"
            className="text-primary text-lg font-semibold"
          >
            &lt; View all media
          </Link>
        </section>
        <section>
          <p className="p-2 text-center text-lg">Loading...</p>
        </section>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-2">
      <section>
        <Link
          to="/donorAcknowledgment"
          className="text-primary text-lg font-semibold"
        >
          &lt; View all media
        </Link>
      </section>
      <section className="mt-4">
        <div className="flex justify-between flex-col my-4">
          <h2 className="text-lg font-semibold">Filename: {file.filename}</h2>
          <button
            className="p-2 text-white cursor-pointer bg-red-600 mt-2 rounded-md"
            disabled={loading}
            onClick={handleDelete}
          >
            Delete Media
          </button>
        </div>
        <img
          src={backendURL + "/uploads/" + file.filename}
          alt=""
          className="mt-4 max-w-full w-full"
        />
      </section>
    </main>
  );
}
