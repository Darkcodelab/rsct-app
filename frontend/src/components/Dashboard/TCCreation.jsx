import { useState } from "react";
import { toast } from "react-toastify";

// actions
import { createTC } from "../../context/tc/TCAction";

export default function TCCreation() {
  const initalFormFields = {
    donorName: "",
    phoneNumber: "",
    followUpDate: new Date().toLocaleDateString(),
    note: "",
  };
  const [formFields, setFormFields] = useState(initalFormFields);
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const res = await createTC(formFields);
    if (res.success === true) {
      toast.success("Donor created!");
      setFormFields(initalFormFields);
    } else {
      toast.error(res.error);
    }
  };

  const handleInputChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };

  return (
    <section className="p-2">
      <h2 className="text-xl font-semibold text-primary max-w-[600px] mx-auto my-4">
        Donor Creation
      </h2>
      <form
        onSubmit={handleFormSubmit}
        className="bg-gray-100 border shadow-md p-4 rounded-md mt-4 max-w-[600px] mx-auto"
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
          className="p-2 w-full bg-primary text-white rounded-md mt-4"
        >
          Follow Up Donor
        </button>
      </form>
    </section>
  );
}
