import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import PageFooter from "../components/PageFooter";

export default function MainLayout() {
  return (
    <div className="d-flex flex-row vh-100 overflow-auto">
      {/* Sidebar */}
      <div style={{ width: "60px", backgroundColor: "#fafafa" }}>
        <Sidebar />
      </div>

      {/* Main area */}
      <div
        className="d-flex flex-column flex-grow-1 overflow-hidden"
        style={{ backgroundColor: "#fafafa" }}
      >
        {/* Content */}
        <main className="flex-grow-1 overflow-auto px-4">
          <Outlet />
        </main>

        {/* Footer */}
        <PageFooter />
      </div>
    </div>
  );
}
