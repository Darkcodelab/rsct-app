import { useState } from "react";
import { rangeDownloadTC } from "../../context/tc/TCAction";
import { toast } from "react-toastify";
import { CSVLink } from "react-csv";

export default function DownloadTC() {
  const fileHeaders = [
    { label: "Created Date", key: "createdAt" },
    { label: "Donor Name", key: "donorName" },
    { label: "Follow Up Date", key: "followUpDate" },
    { label: "Phone", key: "phoneNumber" },
    { label: "Note", key: "note" },
    { label: "Created By", key: "createdBy" },
    { label: "TC id", key: "id" },
  ];

  const initialState = {
    startDate: "",
    endDate: "",
  };
  const [formFields, setFormFields] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [TCFromDB, setTCFromDB] = useState([]);
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);

  const handleInputChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const res = await rangeDownloadTC(formFields);
    setLoading(false);
    if (res.success === true) {
      const allTCs = res.tc;
      if (allTCs.length < 1) {
        toast.error("No TCs found");
        return;
      }
      setTCFromDB(allTCs);
      setShowDownloadPopup(true);
    } else {
      toast.error(res.error);
    }
  };

  return (
    <>
      <form className="bg-gray-100 p-4 rounded-md" onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="startDate" className="font-semibold">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={formFields.startDate}
            onChange={handleInputChange}
            className="border p-2 rounded-md outline-none w-full mt-1"
            required
          />
        </div>
        <div className="mt-3">
          <label htmlFor="endDate" className="font-semibold">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={formFields.endDate}
            onChange={handleInputChange}
            className="border p-2 rounded-md outline-none w-full mt-1"
            required
          />
        </div>
        <button
          type="submit"
          className="p-2 rounded-md mt-6 bg-primary text-white w-full"
          disabled={loading}
          style={{ cursor: loading ? "not-allowed" : "pointer" }}
        >
          Download TCs
        </button>
      </form>
      {showDownloadPopup && (
        <section className="max-w-[300px] w-full p-4 bg-black text-white rounded-md fixed top-[20%] left-[50%] translate-x-[-50%] shadow-xl">
          <h2 className="text-lg font-semibold text-center">
            Download TC from{" "}
            {new Date(formFields.startDate).toLocaleDateString()} to{" "}
            {new Date(formFields.endDate).toLocaleDateString()}{" "}
          </h2>
          <CSVLink
            data={TCFromDB}
            headers={fileHeaders}
            filename="TCs.csv"
            className="p-2 rounded-md w-full mt-4 block text-center bg-primary text-white"
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
    </>
  );
}
