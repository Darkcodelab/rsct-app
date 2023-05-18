import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";

// actions
import { updateAcknowledgmentMessage } from "../../context/acknowledgment/AcknowledgmentAction";

export default function AcknowledgmentMessage({ _message, id }) {
  const [message, setMessage] = useState(_message);
  const handleMessageSubmit = async () => {
    if (_message === message) return;
    const res = await updateAcknowledgmentMessage({ message, id });
    if (res.success === true) {
      toast.success("Message Updated!");
    } else {
      toast.error(res.error);
    }
  };

  return (
    <section className="mt-8 shadow-md p-2 border-t">
      <h3 className="text-lg font-semibold mb-2">Acknowledgment Message</h3>
      <textarea
        name="message"
        className="w-full border p-2 min-h-[200px] max-h-[400px] overflow-auto outline-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button
        className="px-4 py-2 mt-2 bg-primary text-white rounded-md"
        onClick={handleMessageSubmit}
      >
        Save
      </button>
    </section>
  );
}

AcknowledgmentMessage.propTypes = {
  _message: PropTypes.string,
  id: PropTypes.string,
};
