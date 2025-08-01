import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { logout } from "../store/authSlice"; 
import "./BurgerMenu.css";
import type { RootState } from "../store";

const BurgerMenu: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const picturePath = useSelector(
    (state: RootState) => state.auth.user?.picturePath
  );
  const myEmail = useSelector((state: RootState) => state.auth.user?.email);
  const myPic = `${BASE_URL}/Images/members/${picturePath || "default.png"}`;
  console.log(myPic);
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div
      className="mt-auto mb-3 d-flex justify-content-end position-relative"
      style={{ fontSize: "7pt" }}
    >
      <Dropdown align="end">
        <Dropdown.Toggle as={CustomToggle} id="dropdown-burger" title="More" />

        <Dropdown.Menu className="burger-dropdown shadow-sm">
          <div className="dropdown-header-info px-3 py-2 d-flex align-items-center">
            <img
              src={myPic} 
              alt="Profile"
              className="rounded-circle me-2"
              style={{ width: "32px", height: "32px" }}
            />
            <div style={{ fontSize: "10pt", color: "GrayText" }}>{myEmail}</div>
          </div>
          <Dropdown.Divider />

          <Dropdown.Item
            className="burger-item"
            onClick={() => handleNavigate("/settings/account")}
          >
            <i className="bi bi-gear me-2" />
            Settings
          </Dropdown.Item>

          <Dropdown.Divider />

          <Dropdown.Item
            className="burger-item"
            onClick={() => handleNavigate("/site-guide")}
          >
            <i className="bi bi-info-circle me-2" />
            Help (Site Guide)
          </Dropdown.Item>

          <Dropdown.Item
            className="burger-item text-danger"
            onClick={handleLogout}
          >
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
