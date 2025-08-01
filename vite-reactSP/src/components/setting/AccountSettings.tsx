import React, { lazy, Suspense, useEffect, useState } from "react";
import { Tabs, Tab, Card, Container } from "react-bootstrap";
import { getBasicInfo } from "../../services/memberService";

import "./AccountSettings.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Lazy-loaded tab components
const ChangePhotoTab = lazy(() => import("./ChangePhotoTab"));
const NameTab = lazy(() => import("./NameTab"));
const PasswordTab = lazy(() => import("./PasswordTab"));
const SecurityQuestionsTab = lazy(() => import("./SecurityQuestionsTab"));
const NotificationsTab = lazy(() => import("./NotificationsTab"));
const DeactivateTab = lazy(() => import("./DeactivateTab"));

const AccountSettings: React.FC = () => {
  const memberId = useSelector((state: RootState) => state.auth.user?.memberID);
  const [memImage, setMemImage] = useState<string>("");
  const [memName, setMemName] = useState<string>("");
  const [memTitle, setMemTitle] = useState<string>("");

  // Get basic info data
  useEffect(() => {
    const fetchBasicInfo = async () => {
      try {
        const data = await getBasicInfo(memberId!);
        setMemImage(data.picturePath!);
        setMemName(data.firstName! + " " + data.lastName!);
        setMemTitle(data.titleDesc!);
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
            maxWidth: "720px",
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
                    src={`${BASE_URL}/Images/members/${
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
                defaultActiveKey="changephoto"
                id="materials-tabs"
                className="material-tabs nav-justified"
              >
                <Tab eventKey="changephoto" title="Change Photo">
                  <Suspense fallback={<div>Loading...</div>}>
                    <ChangePhotoTab memberId={memberId!} />
                  </Suspense>
                </Tab>
                <Tab eventKey="name" title="Name">
                  <Suspense fallback={<div>Loading...</div>}>
                    <NameTab memberId={memberId!} />
                  </Suspense>
                </Tab>
                <Tab eventKey="password" title="Password">
                  <Suspense fallback={<div>Loading...</div>}>
                    <PasswordTab memberId={memberId!} />
                  </Suspense>
                </Tab>
                <Tab eventKey="secquestions" title="Security Questions">
                  <Suspense fallback={<div>Loading...</div>}>
                    <SecurityQuestionsTab memberId={memberId!} />
                  </Suspense>
                </Tab>
                <Tab eventKey="notifications" title="Notifications">
                  <Suspense fallback={<div>Loading...</div>}>
                    <NotificationsTab memberId={memberId!} />
                  </Suspense>
                </Tab>
                <Tab eventKey="deactivation" title="Deactivate">
                  <Suspense fallback={<div>Loading...</div>}>
                    <DeactivateTab memberId={memberId!} />
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

export default AccountSettings;
