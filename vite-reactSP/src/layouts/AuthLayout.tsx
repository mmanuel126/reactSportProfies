import { Outlet } from "react-router-dom";
import PageFooter from "../components/PageFooter";

export default function AuthLayout() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-fafafa overflow-hidden">
      <main className="flex-grow-1 d-flex justify-content-center align-items-center p-4 overflow-auto">
        <Outlet />
      </main>
      <PageFooter />
    </div>
  );
}
