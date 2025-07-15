import { useLocation, useNavigate } from "react-router-dom";
import { Button, Image } from "react-bootstrap";
import { useState } from "react";

import "./Sidebar.css";
import BurgerMenu from "./BurgerMenu";

type NavItem =
  | {
      key: string;
      icon: string;
      path: string;
      hasSubmenu?: false;
    }
  | {
      key: string;
      icon: string;
      hasSubmenu: true;
      submenu: { label: string; path: string }[];
    };

const navItems: NavItem[] = [
  { key: "home", icon: "bi-house", path: "/" },
  { key: "search", icon: "bi-search", path: "/search" },
  { key: "posts", icon: "bi-plus-lg", path: "/posts" },
  { key: "contacts", icon: "bi-people", path: "/contacts" },
  { key: "messenger", icon: "bi-messenger", path: "/messenger" },
  { key: "profile", icon: "bi-person", path: "/profile" },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const handleNav = (path: string) => {
    setExpandedMenu(null);
    navigate(path);
  };

  const renderNavItem = (item: NavItem, isMobile = false) => {
    const isActive = "path" in item && location.pathname.startsWith(item.path);

    return (
      <div
        key={item.key}
        className={`position-relative ${
          isMobile
            ? "text-center flex-fill"
            : "w-100 d-flex flex-column align-items-center"
        }`}
      >
        <Button
          variant="link"
          className={`fs-4 ${isMobile ? "text-dark w-100" : "text-dark my-3"} ${
            isActive ? "text-primary" : ""
          }`}
          title={item.key}
          onClick={() =>
            item.hasSubmenu
              ? setExpandedMenu(expandedMenu === item.key ? null : item.key)
              : handleNav(item.path)
          }
        >
          <i className={`bi ${item.icon}`} />
        </Button>

        {/* Desktop submenu popup */}
        {!isMobile && item.hasSubmenu && expandedMenu === item.key && (
          <div
            className="bg-white text-dark rounded shadow-sm position-absolute"
            style={{
              left: "60px",
              top: 0,
              minWidth: "140px",
              zIndex: 10,
            }}
          >
            <div className="d-flex flex-column p-2">
              {item.submenu.map((sub) => (
                <Button
                  key={sub.label}
                  variant="light"
                  className="text-start"
                  onClick={() => handleNav(sub.path)}
                >
                  {sub.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Desktop sidebar */}
      <div
        className="d-none d-md-flex flex-column align-items-center py-3 position-relative"
        style={{ width: "60px", height: "100vh", backgroundColor: "#fafafa" }}
      >
        {/* Logo */}
        <div className="mb-5 mt-2">
          <Image
            src="/src/assets/siteico.png" title="Sport Profiles"
            alt="Logo"
            width={32}
            height={32}
            rounded
          />
        </div>
        {navItems.map((item) => renderNavItem(item, false))}

        <div className="mt-auto">
          <BurgerMenu />
        </div>
        
      </div>

      {/* Mobile bottom nav */}
      <div
        className="d-flex d-md-none justify-content-around align-items-center border-top"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "60px",
          backgroundColor: "#fafafa",
          zIndex: 1000,
        }}
      >
        {navItems.map((item) => renderNavItem(item, true))}

        {/* Add BurgerMenu here for mobile */}
        <div className="d-flex justify-content-center align-items-center flex-fill">
          <BurgerMenu />
        </div>
      </div>
    </>
  );
}
