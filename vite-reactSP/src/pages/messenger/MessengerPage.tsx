import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MessagePopoverMenu from "../../components/messenger/MessagePopoverMenu";
import ShowMessages from "../../components/messenger/ShowMessages";

export default function MessengerPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [selected, setSelected] = useState("All Messages");

  // Controls for the PostModal
  const [showModal, setShowModal] = useState(false);
   const [showOpenModal, setShowOpenModal] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pstate = params.get("pstate");

    if (pstate === "Unread") {
      setSelected("Un-read Messages");

      // Optional: Clean up URL
      navigate("/", { replace: true });
    } else if (pstate === "All Messages") {
      setSelected(pstate);
    }
  }, [location.search, navigate]);

  const renderContent = () => {
    const showType = selected === "Un-read Messages" ? "UnRead" : "All";

    return <ShowMessages key={showType} showType={showType}  showModal={showModal} setShowModal={setShowModal} showOpenModal={showOpenModal} setShowOpenModal={setShowOpenModal}/>;
  };

  return (
    <div className="d-flex flex-column h-100">
      <div
        className="position-sticky top-0 z-3 w-100"
        style={{
          backgroundColor: "#fafafa",
          paddingTop: "0.0rem",
          paddingBottom: "0.5rem",
        }}
      >
        <div className="d-flex justify-content-center align-items-center">
          <MessagePopoverMenu selected={selected} onSelect={setSelected} />
        </div>
      </div>

      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ maxWidth: "900px" }}
      >
        {renderContent()}
      </div>
    </div>
  );
}
