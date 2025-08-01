import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import HomePopoverMenu from "../../components/HomePopoverMenu";
import RecentNews from "../../components/RecentNews";
import Following from "../../components/Following";
import RecentPosts from "../../components/RecentPosts";

export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [selected, setSelected] = useState("Recent News");

  // Controls for the PostModal
  const [showPostModal, setShowPostModal] = useState(false);
  const [modalMode, setModalMode] = useState<"new" | "reply">("new");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pstate = params.get("pstate");

    if (pstate === "Posts") {
      setSelected("Posts");
      setModalMode("new");
      setShowPostModal(true);

      // Optional: Clean up URL
      navigate("/", { replace: true });
    } else if (pstate === "Following" || pstate === "Recent News") {
      setSelected(pstate);
    }
  }, [location.search, navigate]);

  const renderContent = () => {
    switch (selected) {
      case "Posts":
        return (
          <RecentPosts
            showModal={showPostModal}
            setShowModal={setShowPostModal}
            modalMode={modalMode}
            setModalMode={setModalMode}
          />
        );
      case "Following":
        return <Following />;
      case "Recent News":
      default:
        return <RecentNews />;
    }
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
          <HomePopoverMenu selected={selected} onSelect={setSelected} />
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
