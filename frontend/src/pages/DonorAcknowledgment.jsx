import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/user/UserContext";
import { ColorRing } from "react-loader-spinner";

// components
import AcknowledgmentMessage from "../components/DonorAcknowledgment/AcknowledgmentMessage";
import AcknowledgmentMedia from "../components/DonorAcknowledgment/AcknowledgmentMedia";

// actions
import { getAcknowledgmentConfig } from "../context/acknowledgment/AcknowledgmentAction";
import { toast } from "react-toastify";

export default function DonorAcknowledgment() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [acknowledgmentConfig, setAcknowledgmentConfig] = useState({});

  useEffect(() => {
    if (!user?._id || !user?.admin) {
      navigate("/login");
    }
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
  }, [navigate, user]);

  if (loading || !acknowledgmentConfig._id) {
    return (
      <main className="container mx-auto p-2 flex justify-center">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </main>
    );
  }

  return (
    <main className="container mx-auto p-2">
      <section>
        <Link to="/" className="text-primary text-lg font-semibold">
          &lt; Go to dashboard
        </Link>
      </section>
      <AcknowledgmentMessage
        _message={acknowledgmentConfig.message}
        id={acknowledgmentConfig._id}
      />
      <AcknowledgmentMedia
        _selectedMedia={acknowledgmentConfig.media || []}
        id={acknowledgmentConfig._id}
      />
    </main>
  );
}
