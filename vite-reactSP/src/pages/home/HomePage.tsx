import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import HomePopoverMenu from "../../components/HomePopoverMenu";
import RecentNews from "../../components/RecentNews";
import Following from "../../components/Following";
import RecentPosts from "../../components/RecentPosts";
//import SiteGuide from "../SiteGuide";
import AdsCarousel from "../../components/AdsCarousel";
import SuggestedForYou from "../../components/contact/SuggestedForYou";

export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [selected, setSelected] = useState("Recent News");
  const [showPostModal, setShowPostModal] = useState(false);
  const [modalMode, setModalMode] = useState<"new" | "reply">("new");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pstate = params.get("pstate");

    if (pstate === "Posts") {
      setSelected("Posts");
      setModalMode("new");
      setShowPostModal(true);
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#fafafa",
      }}
    >
      {/* Top Menu */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "#fafafa",
          padding: "0.5rem 0",
          borderBottom: "1px solid #ddd",
        }}
      >
        <div className="d-flex justify-content-center align-items-center">
          <HomePopoverMenu selected={selected} onSelect={setSelected} />
        </div>
      </div>

      {/* Main Content Area */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "20px",
          width: "100%",
          maxWidth: "1100px",
          margin: "20px auto",
          padding: "0 15px",
          flexWrap: "wrap", // 👈 allows wrapping on small screens
        }}
      >
        {/* LEFT SIDE */}
        <div
          style={{
            flex: "1 1 600px", // prefers 600px but shrinks
            minWidth: "300px",
            maxWidth: "680px",
          }}
        >
          {renderContent()}
        </div>

        {/* RIGHT SIDE */}
        <div
          style={{
            flex: "1 1 300px", // prefers 300px but shrinks and wraps
            minWidth: "280px",
            maxWidth: "360px",
          }}
        >
          <AdsCarousel />
          <SuggestedForYou />
        </div>
      </div>
    </div>
  );
}
