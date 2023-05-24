import { useEffect, useState } from "react";
import { getAcknowledgmentConfig } from "../../context/acknowledgment/AcknowledgmentAction";
import { toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner";

/* eslint-disable react/prop-types */
export default function SendMessage({ showPopup, setShowPopup }) {
  // send message from wassenger API
  // const handleSendMessage = async () => {
  //   setLoading(true);
  //   const res = await sendWassengerMessage(showPopup.phoneNumber);
  //   setLoading(false);
  //   if (res.success === true) {
  //     toast.success("Message Sent!");
  //     setShowPopup(false);
  //   } else {
  //     toast.error(res.error);
  //   }
  // };

  const [acknowledgmentConfig, setAcknowledgmentConfig] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAcknowledgmentConfig()
      .then((res) => {
        if (res.success === true) {
          setAcknowledgmentConfig(res.acknowledgment[0]);
        } else {
          toast.error(res.error);
        }
      })
      .catch((err) => console.error(err));
    setLoading(false);
  }, []);

  const sendMessageLink = `https://wa.me/${showPopup.phoneNumber}?text=${acknowledgmentConfig.message}`;

  return (
    showPopup.show && (
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-black text-white max-w-[300px] w-full p-4 rounded-md shadow-lg">
        <div>
          <h2 className="text-lg">Do you want to send message to the Donor?</h2>
          {loading ? (
            <button className="mt-2 p-2 bg-slate-200 text-black rounded-md flex justify-center w-full">
              <ColorRing
                visible={true}
                height="30"
                width={30}
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            </button>
          ) : (
            <a
              className="mt-4 p-2 bg-primary text-white rounded-md block w-full text-center cursor-pointer"
              href={sendMessageLink}
              target="_blank"
              rel="noreferrer"
            >
              Yes
            </a>
          )}

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
