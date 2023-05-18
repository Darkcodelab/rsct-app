import { useState } from "react";

// actions
import { sendWassengerMessage } from "../../context/tc/TCAction";

/* eslint-disable react/prop-types */
export default function SendMessage({ showPopup, setShowPopup }) {
  const [loading, setLoading] = useState(false);
  const handleSendMessage = async () => {
    setLoading(true);
    const res = await sendWassengerMessage(showPopup.phoneNumber);
    setLoading(false);
    console.log(res);
  };

  return (
    showPopup.show && (
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-black text-white max-w-[300px] p-4 rounded-md shadow-lg">
        <div>
          <h2 className="text-lg">Do you want to send message to the Donor?</h2>
          <button
            className="mt-4 p-2 bg-primary text-white rounded-md block w-full"
            onClick={handleSendMessage}
            disabled={loading}
          >
            {loading ? "Processing" : "Yes"}
          </button>
          <button
            className="mt-2 p-2 bg-slate-200 text-black rounded-md block w-full"
            onClick={() => setShowPopup({ showPopup, show: false })}
          >
            No
          </button>
        </div>
      </div>
    )
  );
}
