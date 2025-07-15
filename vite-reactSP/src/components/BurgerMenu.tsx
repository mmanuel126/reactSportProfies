import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { logout } from "../store/authSlice"; // adjust this path
import "./BurgerMenu.css";

const BurgerMenu: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="mt-auto mb-3 d-flex justify-content-end position-relative">
      <Dropdown align="end">
        <Dropdown.Toggle as={CustomToggle} id="dropdown-burger" title="More" />

        <Dropdown.Menu className="burger-dropdown shadow-sm">
          <Dropdown.Item onClick={() => handleNavigate("/suggested-for-you")}>
            <i className="bi bi-lightbulb me-2" />
            Suggested for You
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleNavigate("/site-guide")}>
            <i className="bi bi-info-circle me-2" />
            Site Guide
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleNavigate("/settings")}>
            <i className="bi bi-gear me-2" />
            Settings
          </Dropdown.Item>
          <Dropdown.Item className="text-danger" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-2" />
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default BurgerMenu;

// CustomToggle to use only the burger icon with no dropdown arrow
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomToggle = React.forwardRef<HTMLDivElement, any>(
  ({ onClick, title }, ref) => (
    <div
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="text-dark fs-4 px-3 pt-0 cursor-pointer"
      style={{ display: "inline-block" }}
      title={title}
    >
      <i className="bi bi-list" />
    </div>
  )
);
