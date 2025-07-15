import { useState } from "react";
import HomePopoverMenu from "../../components/HomePopoverMenu";
import RecentNews from "../../components/RecentNews";
import Following from "../../components/Following"; // same here
import RecentPosts from "../../components/RecentPosts";

export default function HomePage() {
  const [selected, setSelected] = useState("Recent News");

  const renderContent = () => {
    switch (selected) {
      case "Posts":
        return <RecentPosts />;
      case "Following":
        return <Following />;
      case "Recent News":
      default:
        return <RecentNews />;
    }
  };

  return (
    <div className="d-flex flex-column h-100">
      {/* Sticky topbar centered at the top */}
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

      {/* Dynamic content */}
      <div className="container d-flex justify-content-center align-items-center" style={{ maxWidth: "900px" }}>
        {renderContent()}
      </div>
    </div>
  );
}
