import { useState } from "react";
import { toast } from "react-toastify";
import { phone } from "phone";

// actions
import { createTC } from "../../context/tc/TCAction";
import SendMessage from "./SendMessage";
import { ColorRing } from "react-loader-spinner";

export default function TCCreation() {
  const initalFormFields = {
    donorName: "",
    phoneNumber: "",
    followUpDate: new Date().toLocaleDateString(),
    note: "",
  };
  const [showPopup, setShowPopup] = useState({ show: false, phoneNumber: "" });
  const [formFields, setFormFields] = useState(initalFormFields);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const validatedPhone = phone(formFields.phoneNumber, { country: "IND" });
    if (!validatedPhone.isValid) {
      toast.error("Invalid Phone Number");
      return;
    }
    let tcObj = { ...formFields, phoneNumber: validatedPhone.phoneNumber };
    const res = await createTC(tcObj);
    setLoading(false);
    if (res.success === true) {
      toast.success("Donor created!");
      setFormFields(initalFormFields);
      setShowPopup({ show: true, phoneNumber: res.tc.phoneNumber });
    } else {
      toast.error(res.error);
    }
  };

  const handleInputChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };

  return (
    <section className="p-2 relative">
      <h2 className="text-xl font-semibold text-primary max-w-[600px] w-full mx-auto my-4">
        Donor Creation
      </h2>
      <form
        onSubmit={handleFormSubmit}
        className="bg-gray-100 border shadow-md p-4 rounded-md mt-4 max-w-[600px] w-full mx-auto"
      >
        <div>
          <label htmlFor="donorName">Donor Name</label>
          <input
            type="text"
            name="donorName"
            value={formFields.donorName}
            onChange={handleInputChange}
            className="border outline-none w-full p-2 rounded-md mt-2 bg-white"
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formFields.phoneNumber}
            onChange={handleInputChange}
            className="border outline-none w-full p-2 rounded-md mt-2 bg-white"
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="followUpDate">Follow Up Date</label>
          <input
            type="date"
            name="followUpDate"
            value={formFields.followUpDate}
            onChange={handleInputChange}
            className="border outline-none w-full p-2 rounded-md mt-2 bg-white"
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="note">Note</label>
          <textarea
            name="note"
            cols="30"
            rows="10"
            value={formFields.note}
            onChange={handleInputChange}
            className="border outline-none w-full p-2 rounded-md mt-2 bg-white"
          ></textarea>
        </div>
        <button
          type="submit"
          className="p-2 w-full bg-primary text-white rounded-md mt-4 flex justify-center"
        >
          {!loading ? (
            "Follow Up Donor"
          ) : (
            <ColorRing
              visible={true}
              height="30"
              width="30"
              ariaLabel="blocks-loading"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          )}
        </button>
      </form>
      <SendMessage showPopup={showPopup} setShowPopup={setShowPopup} />
    </section>
  );
}
