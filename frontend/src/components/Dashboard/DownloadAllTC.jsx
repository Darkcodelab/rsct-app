import { useState } from "react";
import { toast } from "react-toastify";
import { CSVLink } from "react-csv";

// actions
import { downloadAllTCs } from "../../context/tc/TCAction";

export default function DownloadAllTC() {
  const fileHeaders = [
    { label: "Created Date", key: "createdAt" },
    { label: "Donor Name", key: "donorName" },
    { label: "Follow Up Date", key: "followUpDate" },
    { label: "Phone", key: "phoneNumber" },
    { label: "Note", key: "note" },
    { label: "Created By", key: "createdBy" },
    { label: "TC id", key: "id" },
  ];

  const [loading, setLoading] = useState(false);
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [TCFromDB, setTCFromDB] = useState([]);

  const handleDownloadAllTC = async () => {
    setLoading(true);
    const res = await downloadAllTCs();
    setLoading(false);
    if (res.success === true) {
      const allTCs = res.tc;
      if (allTCs.length < 1) {
        toast.error("No TCs found");
        return;
      }
      console.log(allTCs);
      setTCFromDB(allTCs);
      setShowDownloadPopup(true);
    } else {
      toast.error(res.error);
    }
  };

  return (
    <div className="mt-2">
      <button
        className="p-2 rounded-md bg-primary text-white w-full"
        onClick={handleDownloadAllTC}
        disabled={loading}
        style={{ cursor: loading ? "not-allowed" : "pointer" }}
      >
        Download All TCs
      </button>
      {showDownloadPopup && (
        <section className="max-w-[300px] w-full p-4 bg-black text-white rounded-md fixed top-[20%] left-[50%] translate-x-[-50%] shadow-xl">
          <h2 className="text-lg font-semibold text-center">
            Do you want to download all TCs?
          </h2>
          <CSVLink
            className="p-2 rounded-md w-full block text-center bg-primary text-white mt-4"
            data={TCFromDB}
            filename="AllTCs.csv"
            headers={fileHeaders}
          >
            Yes
          </CSVLink>
          <button
            className="p-2 rounded-md w-full bg-gray-200 mt-2 text-black"
            onClick={() => setShowDownloadPopup(false)}
          >
            Cancel
          </button>
        </section>
      )}
    </div>
  );
}
