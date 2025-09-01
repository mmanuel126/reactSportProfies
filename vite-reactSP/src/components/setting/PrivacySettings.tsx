import React, { lazy, Suspense, useEffect, useState } from "react";
import { Tabs, Tab, Card, Container } from "react-bootstrap";
import { getBasicInfo } from "../../services/memberService";

import "./PrivacySettings.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Lazy-loaded tab components
const ProfileTab = lazy(() => import("./ProfileTab"));
const SearchTab = lazy(() => import("./SearchTab"));

const PrivacySettings: React.FC = () => {
  const memberId = useSelector((state: RootState) => state.auth.user?.memberID);
  const [memImage, setMemImage] = useState<string>("");
  const [memName, setMemName] = useState<string>("");
  const [memTitle, setMemTitle] = useState<string>("");

  // Get basic info data
  useEffect(() => {
    const fetchBasicInfo = async () => {
      try {
        const data = await getBasicInfo(memberId!);
        setMemImage(data.PicturePath!);
        setMemName(data.FirstName! + " " + data.LastName!);
        setMemTitle(data.TitleDesc!);
      } catch (error) {
        console.error("Failed to fetch member basic info", error);
      }
    };
    fetchBasicInfo();
  }, [memberId]);

  return (
    <div
      style={{ background: "#fafafa", minHeight: "100vh", paddingTop: "0px" }}
    >
      {/* Sticky Header */}
      <div
        className="sticky-top py-2"
        style={{
          zIndex: 1000,
          backgroundColor: "#fafafa",
          textAlign: "center",
        }}
      ></div>

      <Container className="mt-0">
        <Card
          className="mx-auto"
          style={{
            borderRadius: "1rem",
            maxWidth: "700px",
            backgroundColor: "#fff",
            padding: "20px",
          }}
        >
          <Card.Header
            style={{
              paddingTop: "8px",
              paddingBottom: "8px",
              borderRadius: "1rem",
              border: "none",
            }}
            className="show_member_pic_bg"
          >
            <div style={{ fontSize: "12pt", padding: "5px" }}>
              <div style={{ textAlign: "center", paddingTop: "0px" }}>
                {memImage && (
                  <img
                    id="memberImg"
                    width="90"
                    height="90"
                    src={`${BASE_URL}/static/images/members/${
                      memImage || "default.png"
                    }`}
                    alt="Member"
                    style={{
                      borderRadius: "50%",
                      borderColor: "white",
                      borderStyle: "solid",
                      borderWidth: "thick",
                      objectFit: "cover",
                    }}
                  />
                )}

                <div style={{ textAlign: "center" }}>
                  <span
                    style={{
                      paddingTop: "5px",
                      color: "#484830",
                      verticalAlign: "middle",
                      textAlign: "center",
                      paddingLeft: "6px",
                    }}
                  >
                    <b>{memName}</b>

                    {memTitle && (
                      <>
                        <br />
                        {memTitle}
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </Card.Header>

          <Card.Body>
            <div className="material-tabs">
              <Tabs
                defaultActiveKey="profile"
                id="materials-tabs"
                className="material-tabs nav-justified"
              >
                <Tab
                  eventKey="profile"
                  title={<span style={{ fontSize: "large" }}>Profile</span>}
                >
                  <Suspense fallback={<div>Loading...</div>}>
                    <ProfileTab memberId={memberId!} />
                  </Suspense>
                </Tab>
                <Tab
                  eventKey="search"
                  title={<span style={{ fontSize: "large" }}>Search</span>}
                >
                  <Suspense fallback={<div>Loading...</div>}>
                    <SearchTab memberId={memberId!} />
                  </Suspense>
                </Tab>
              </Tabs>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default PrivacySettings;
