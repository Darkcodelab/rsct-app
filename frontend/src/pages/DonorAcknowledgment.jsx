import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/user/UserContext";

// components
import AcknowledgmentMessage from "../components/DonorAcknowledgment/AcknowledgmentMessage";
import AcknowledgmentMedia from "../components/DonorAcknowledgment/AcknowledgmentMedia";

// actions
import { getAcknowledgmentConfig } from "../context/acknowledgment/AcknowledgmentAction";

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
          console.log(res);
          setAcknowledgmentConfig(res.acknowledgment[0]);
        }
      })
      .catch((err) => console.error(err));
    setLoading(false);
  }, [navigate, user]);

  if (loading || !acknowledgmentConfig._id) {
    return <p>Loading...</p>;
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
