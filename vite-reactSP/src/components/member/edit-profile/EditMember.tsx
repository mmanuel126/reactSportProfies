import React, { lazy, Suspense, useEffect, useState } from "react";
import { Tabs, Tab, Card, Container } from "react-bootstrap";
import { getBasicInfo } from "../../../services/memberService";
import "./EditMember.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Lazy-loaded tab components
const EditBasicInfoTab = lazy(() => import("./EditBasicInfoTab"));
const EditContactInfoTab = lazy(() => import("./EditContactInfoTab"));
const EditEducationTab = lazy(() => import("./EditEducationTab"));
const EditPhotosTab = lazy(() => import("./EdiitPhotosTab"));
const EditVideosTab = lazy(() => import("./EditVideosTab"));

export type ViewMemberProps = {
  memberId: string;
  mode: string;
};

const EditMember: React.FC<ViewMemberProps> = ({ memberId, mode }) => {
  const [memImage, setMemImage] = useState<string>("");
  const [memName, setMemName] = useState<string>("");
  const [memTitle, setMemTitle] = useState<string>("");

  // Get basic info data
  useEffect(() => {
    const fetchBasicInfo = async () => {
      try {
        const data = await getBasicInfo(memberId);
        setMemImage(data.picture_path!);
        setMemName(data.first_name! + " " + data.last_name!);
        setMemTitle(data.title_desc!);
      } catch (error) {
        console.error("Failed to fetch member basic info", error);
      }
    };

    fetchBasicInfo();
  }, [memberId, mode]);

  const getInitialTab = (mode: string): string => {
    if (mode === "2") return "videos";
    return "basic";
  };

  const [activeTab, setActiveTab] = useState<string>(() => getInitialTab(mode));

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
      >
        <h4
          className="mb-0"
          style={{
            fontSize: "14pt",
            fontWeight: "normal",
            margin: "10px 10px 0px 10px",
          }}
        >
          Edit Profile
        </h4>
      </div>

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
            <div style={{ fontSize: "10pt", padding: "5px" }}>
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
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k || "basic")}
                id="materials-tabs"
                className="material-tabs nav-justified"
              >
                <Tab eventKey="basic" title="Basic Info.">
                  <Suspense fallback={<div>Loading...</div>}>
                    <EditBasicInfoTab memberId={memberId} />
                  </Suspense>
                </Tab>
                <Tab eventKey="contact" title="Contact Info.">
                  <Suspense fallback={<div>Loading...</div>}>
                    <EditContactInfoTab memberId={memberId} />
                  </Suspense>
                </Tab>
                <Tab eventKey="education" title="Education">
                  <Suspense fallback={<div>Loading...</div>}>
                    <EditEducationTab memberId={memberId} />
                  </Suspense>
                </Tab>
                <Tab eventKey="photos" title="Photos">
                  <Suspense fallback={<div>Loading...</div>}>
                    <EditPhotosTab memberId={memberId} />
                  </Suspense>
                </Tab>
                <Tab eventKey="videos" title="Videos">
                  <Suspense fallback={<div>Loading...</div>}>
                    <EditVideosTab memberId={memberId} />
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

export default EditMember;
