import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";
import { backendURL } from "../../config";

// actions
import { addAcknowledgmentMedia } from "../../context/acknowledgment/AcknowledgmentAction";
import { useNavigate } from "react-router-dom";

export default function AcknowledgmentMedia({ _selectedMedia, id }) {
  const [loading, setLoading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(_selectedMedia.slice());
  const navigate = useNavigate();
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);
    formData.append("id", id);
    const res = await addAcknowledgmentMedia(formData);
    setLoading(false);
    if (res.success === true) {
      toast.success("Media added!");
      setSelectedMedia([...selectedMedia, res.file]);
    } else {
      toast.error(res.error);
    }
  };

  const handleViewMedia = (event) => {
    navigate(`/viewMedia/${id}/${event.target.id}`);
  };

  return (
    <>
      <section className="mt-8 shadow-md p-2 border-t">
        <h3 className="text-lg font-semibold mb-2">
          Selected Media - {selectedMedia.length + " file(s)"}
        </h3>
        <form
          className="flex flex-col mt-4 max-w-[500px] mx-auto"
          onSubmit={handleFormSubmit}
        >
          <input
            type="file"
            name="uploadedFile"
            className="border p-2 rounded-md bg-gray-200"
            required
          />
          <button
            type="submit"
            className="w-full block bg-primary text-white rounded-md p-2 mt-2"
            disabled={loading}
          >
            Upload
          </button>
        </form>
        {selectedMedia.length > 0 ? (
          <div className="max-h-[400px] overflow-auto mt-4 flex gap-5">
            {selectedMedia.map((media) => {
              return (
                <img
                  key={media._id}
                  id={media._id}
                  src={backendURL + "/uploads/" + media.filename}
                  className="w-80 object-cover rounded-md cursor-pointer"
                  onClick={handleViewMedia}
                />
              );
            })}
          </div>
        ) : (
          <p className="my-2">No media selected</p>
        )}
      </section>
    </>
  );
}

AcknowledgmentMedia.propTypes = {
  _selectedMedia: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.string,
};
