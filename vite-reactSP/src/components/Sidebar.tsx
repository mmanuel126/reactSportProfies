import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useState } from "react";

import "./Sidebar.css";
import BurgerMenu from "./BurgerMenu";

import { useEffect, useRef } from "react";

import { useSelector } from "react-redux";
import type { RootState } from "../store";

import logo from "../assets/mylogo.png";

type NavItem =
  | {
      key: string;
      icon: string;
      path: string;
      pstate?: string;
      hasSubmenu?: false;
    }
  | {
      key: string;
      icon: string;
      hasSubmenu: true;
      submenu: { label: string; path: string }[];
    };

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const memberID = useSelector(
    (state: RootState) => state.auth.user?.member_id
  );

  const navItems: NavItem[] = [
    { key: "home", icon: "bi-house", path: "/" },
    { key: "search", icon: "bi-search", path: "/search" },
    { key: "posts", icon: "bi-plus-lg", path: "/", pstate: "Posts" },
    { key: "contacts", icon: "bi-people", path: "/contacts" },
    { key: "messenger", icon: "bi-messenger", path: "/messenger" },
    {
      key: "profile",
      icon: "bi-person",
      hasSubmenu: true,
      submenu: [
        { label: "My profile", path: `/profile/${memberID}` },
        { label: "Edit profile...", path: "/edit-profile" },
      ],
    },
  ];

  const mobileSubmenuRef = useRef<HTMLDivElement>(null);
  const desktopSubmenuRef = useRef<HTMLDivElement>(null);

  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  // Handle outside click to close submenu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const clickedOutsideMobile =
        mobileSubmenuRef.current && !mobileSubmenuRef.current.contains(target);
      const clickedOutsideDesktop =
        desktopSubmenuRef.current &&
        !desktopSubmenuRef.current.contains(target);

      const shouldClose =
        (isMobileView && clickedOutsideMobile) ||
        (!isMobileView && clickedOutsideDesktop);

      if (shouldClose) {
        setExpandedMenu(null);
      }
    };

    if (expandedMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [expandedMenu, isMobileView]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNav = (path: string, queryParams?: Record<string, string>) => {
    setExpandedMenu(null);
    const search = queryParams
      ? "?" + new URLSearchParams(queryParams).toString()
      : "";
    navigate(path + search);
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
          className={`fs-4 ${isMobile ? "text-dark w-100" : "text-dark my-2"} ${
            isActive ? "text-primary" : ""
          }`}
          title={item.key}
          onClick={() => {
            if (item.hasSubmenu) {
              setExpandedMenu(expandedMenu === item.key ? null : item.key);
            } else if (
              item.key === "posts" &&
              "pstate" in item &&
              item.pstate
            ) {
              handleNav(item.path, { pstate: item.pstate });
            } else {
              handleNav(item.path);
            }
          }}
        >
          <i className={`bi ${item.icon}`} />
        </Button>

        {/* Desktop submenu popup */}
        {!isMobile && item.hasSubmenu && expandedMenu === item.key && (
          <div
            ref={desktopSubmenuRef}
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
        <div
          className="mb-5 p-1 rounded-circle"
          style={{
            backgroundColor: "#fafafa" /*"#1877F2",*/,
            color: "White",
            fontFamily: "'Courier New'",
            fontSize: "16pt",
            fontWeight: "bold",
            borderRadius: ".5rem",
          }}
          title="Sport Profiles"
        >
          <img src={logo} style={{ width: "55px", height: "70px" }}></img>
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
        <div
          className="d-flex justify-content-center align-items-center flex-fill"
          style={{ paddingTop: "14px" }}
        >
          <BurgerMenu />
        </div>
      </div>

      {/* Mobile submenu + overlay */}
      {isMobileView &&
        expandedMenu &&
        navItems.find(
          (item) => item.key === expandedMenu && item.hasSubmenu
        ) && (
          <>
            {/* Background overlay for mobile only */}
            <div
              className="position-fixed top-0 start-0 w-100 h-100"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                zIndex: 1000,
              }}
            />

            {/* Submenu popup */}
            <div
              ref={mobileSubmenuRef}
              className="position-fixed w-100 bg-white border-top shadow-sm"
              style={{
                bottom: "60px",
                left: 0,
                zIndex: 1001,
              }}
            >
              {(
                navItems.find(
                  (item) => item.key === expandedMenu && item.hasSubmenu
                ) as Extract<NavItem, { hasSubmenu: true }>
              ).submenu.map((sub) => (
                <Button
                  key={sub.label}
                  variant="light"
                  className="w-100 text-start px-3 py-2"
                  onClick={() => handleNav(sub.path)}
                >
                  {sub.label}
                </Button>
              ))}
            </div>
          </>
        )}
    </>
  );
}
