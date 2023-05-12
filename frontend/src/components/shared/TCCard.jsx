import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function TCCard({
  id,
  donorName,
  followUpDate,
  createdBy,
  createdAt,
}) {
  return (
    <li className="py-4 bg-gray-100 px-2 rounded-md my-2">
      <Link to={"/tcDetails/" + id}>
        <p className="text-sm">
          Donor Name: <span className="font-semibold">{donorName}</span>
        </p>
        <p className="text-sm">
          Follow Up Date: <span className="font-semibold">{followUpDate}</span>
        </p>
        <p className="text-sm">
          Created By: <span className="font-semibold">{createdBy}</span>
        </p>
        <p className="text-sm">
          Created At: <span className="font-semibold">{createdAt}</span>
        </p>
      </Link>
    </li>
  );
}

TCCard.propTypes = {
  id: PropTypes.string.isRequired,
  donorName: PropTypes.string.isRequired,
  followUpDate: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  createdBy: PropTypes.string.isRequired,
};
