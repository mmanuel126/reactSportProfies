import React, { lazy, Suspense, useEffect, useState } from "react";
import { Tabs, Tab, Card, Container } from "react-bootstrap";
import {
  getBasicInfo,
  checkIfToShowAsContact,
  checkIfToShowFollowMember,
} from "../../services/memberService";

import { addContact, followContact } from "../../services/contactService";

import "./ViewMember.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

import CommonBaseModal  from "../CommonBaseModal";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Lazy-loaded tab components
const BasicInfoTab = lazy(() => import("./BasicInfoTab"));
const ContactInfoTab = lazy(() => import("./ContactInfoTab"));
const EducationTab = lazy(() => import("./EducationTab"));
const PhotosTab = lazy(() => import("./PhotosTab"));
const VideosTab = lazy(() => import("./VideosTab"));

export type ViewMemberProps = {
  memberId: string;
};

const ViewMember: React.FC<ViewMemberProps> = ({ memberId }) => {
  const [memImage, setMemImage] = useState<string>("");
  const [memName, setMemName] = useState<string>("");
  const [memTitle, setMemTitle] = useState<string>("");
  const [,setShowAddAsContact] = useState<boolean>(false);
  const [showFollowMember, setShowFollowMember] = useState<boolean>(false);

  const [showAddContactPopup, setShowAddContactPopup] = useState(false);
  const [,setIsContactAdded] = useState(false);

  const loggedInUserId = useSelector(
    (state: RootState) => state.auth.user?.memberID
  );

  // Get basic info data
  useEffect(() => {
    const fetchBasicInfo = async () => {
      try {
        const data = await getBasicInfo(memberId);
        setMemImage(data.picturePath!); 
        setMemName(data.firstName! + " " + data.lastName!); 
        setMemTitle(data.titleDesc!);
      } catch (error) {
        console.error("Failed to fetch member basic info", error);
      }
    };

    fetchBasicInfo();
  }, [memberId]);

  useEffect(() => {
    const checkContactVisibility = async () => {
      if (loggedInUserId) {
        try {
          const result = await checkIfToShowAsContact(loggedInUserId, memberId);
          setShowAddAsContact(result);
        } catch (err) {
          console.error("Failed to check contact visibility", err);
        }
      }
    };

    checkContactVisibility();
  }, [loggedInUserId, memberId]);

  useEffect(() => {
    const checkFollowMemberVisibility = async () => {
      if (loggedInUserId) {
        try {
          const result = await checkIfToShowFollowMember(
            loggedInUserId,
            memberId
          );
          setShowFollowMember(result);
        } catch (err) {
          console.error("Failed to check contact visibility", err);
        }
      }
    };

    checkFollowMemberVisibility();
  }, [loggedInUserId, memberId]);

  const doFollowMember = async () => {
    if (!loggedInUserId) return;

    try {
      await followContact(loggedInUserId, memberId);
      setShowFollowMember(false); // hide the link
    } catch (error) {
      console.error("Failed to follow member", error);
    }
  };

  const handleAddContact = async () => {
    try {
      await addContact(loggedInUserId!, memberId); 
      setIsContactAdded(true); 
      setShowAddContactPopup(false);
    } catch (err) {
      console.error("Failed to add contact:", err);
    }
  };

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
          Member Profile
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

                    {showAddContactPopup && (
                      <span style={{ fontSize: "10pt" }}>
                        <br />
                        <a
                          style={{textDecoration:"none"}}
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowAddContactPopup(true);
                          }}
                        >
                          Add as Contact
                        </a>
                      </span>
                    )}

                    {showFollowMember && (
                      <span style={{ fontSize: "10pt" }}>
                        <br />
                        <a 
                          style={{textDecoration:"none"}}
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            doFollowMember();
                          }}
                        >
                          Follow this Member
                        </a>
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </Card.Header>

          <Card.Body>
            <div className="material-tabs">
              <Tabs
                defaultActiveKey="basic"
                id="materials-tabs"
                className="material-tabs nav-justified"
              >
                <Tab eventKey="basic" title="Basic Info.">
                  <Suspense fallback={<div>Loading...</div>}>
                    <BasicInfoTab memberId={memberId} />
                  </Suspense>
                </Tab>
                <Tab eventKey="contact" title="Contact Info.">
                  <Suspense fallback={<div>Loading...</div>}>
                    <ContactInfoTab memberId={memberId} />
                  </Suspense>
                </Tab>
                {/* More tabs */}
                <Tab eventKey="education" title="Education">
                  <Suspense fallback={<div>Loading...</div>}>
                    <EducationTab memberId={memberId} />
                  </Suspense>
                </Tab>
                <Tab eventKey="photos" title="Photos">
                  <Suspense fallback={<div>Loading...</div>}>
                    <PhotosTab memberId={memberId} />
                  </Suspense>
                </Tab>
                <Tab eventKey="videos" title="Videos">
                  <Suspense fallback={<div>Loading...</div>}>
                    <VideosTab memberId={memberId} />
                  </Suspense>
                </Tab>
              </Tabs>
            </div>
          </Card.Body>
        </Card>
      </Container>

      <CommonBaseModal
        show={showAddContactPopup}
        onHide={() => setShowAddContactPopup(false)}
        onSend={handleAddContact}
        titleText="Requesting to Add Contact"
        bodyText= {`${memName} will have to confirm your request. Are you sure you want to send this contact request?`}
        actionButtonText="Send Request"
      />
    </div>
  );
};

export default ViewMember;
