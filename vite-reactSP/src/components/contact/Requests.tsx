import React, { useEffect, useState } from "react";
import {
  getContactRequests,
  acceptRequest,
  rejectRequest,
} from "../../services/contactService";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import type { RootState } from "../../store";
import { useSelector } from "react-redux";
import type { Contact } from "../../types/contact";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Requests: React.FC = () => {
  const memberID = useSelector((state: RootState) => state.auth.user?.memberID);
  const [following, setRequest] = useState<Contact[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchRequests = async () => {
    if (!memberID) return;
    setIsRefreshing(true);
    try {
      const data = await getContactRequests(memberID);
      setRequest(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load the following list:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAccept = async (contactID: string) => {
    if (!memberID) return;

    try {
      await acceptRequest(memberID, contactID);
      setRequest((prev) =>
        prev.filter((contact) => contact.contactID !== contactID)
      );
    } catch (error) {
      console.error("Error accept contact:", error);
    }
  };

  const handleReject = async (contactID: string) => {
    if (!memberID) return;

    try {
      await rejectRequest(memberID, contactID);
      setRequest((prev) =>
        prev.filter((contact) => contact.contactID !== contactID)
      );
    } catch (error) {
      console.error("Error rejecting contact:", error);
    }
  };

  return (
    <div
      className="card mb-3 p-0"
      style={{ borderRadius: "1rem", width: "640px" }}
    >
      {/* Header */}
      <div
        className="card-header d-flex align-items-center justify-content-between bg-white"
        style={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}
      >
        <div
          className="card-header-title font-weight-normal text-body-tertiary "
          style={{ paddingTop: "20px", paddingBottom: "10px" }}
        >
          This is list of members who are requesting to make you a connection.
          If you accept the request then you will be able to communicate and
          share posts with the member.
        </div>

        <OverlayTrigger
          placement="left"
          delay={{ show: 200, hide: 100 }}
          overlay={
            <Tooltip id="refresh-tooltip">
              {isRefreshing ? "Refreshing. Please wait..." : "Refresh"}
            </Tooltip>
          }
        >
          <Button
            variant="link"
            className="fs-5 text-dark text-primary"
            title="Refresh"
            onClick={fetchRequests}
            disabled={isRefreshing}
          >
            <i
              className={`bi bi-arrow-clockwise ${isRefreshing ? "spin" : ""}`}
            />
          </Button>
        </OverlayTrigger>
      </div>

      {/* Following list */}
      <div className="px-3 pt-3">
        {following.map((res, index) => (
          <div
            key={res.contactID}
            className="d-flex align-items-center justify-content-between pb-3 mb-3"
            style={{
              borderBottom:
                index !== following.length - 1 ? "1px solid #e0e0e0" : "none",
            }}
          >
            <div className="d-flex align-items-center">
              <Link to={`/profile/${res.contactID}`}>
                <img
                  src={`${BASE_URL}/Images/members/${
                    res.picturePath || "default.png"
                  }`}
                  alt="User"
                  className="rounded-circle"
                  style={{ width: "35px", height: "35px" }}
                />
              </Link>
              <div className="ms-3">
                <strong>
                  <Link
                    to={`/profile/${res.contactID}`}
                    style={{ textDecoration: "none", fontWeight: "bold" }}
                  >
                    {res.friendName}
                  </Link>
                </strong>
                <br />
                <span style={{ color: "gray", fontSize: "10pt" }}>
                  {res.titleDesc}
                </span>
              </div>
            </div>
            <div className="d-flex gap-2 ms-auto">
              <Button
                size="sm"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                }}
                onClick={() => handleAccept(res.contactID)}
              >
                <b>Accept</b>
              </Button>
              <Button
                size="sm"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                }}
                onClick={() => handleReject(res.contactID)}
              >
                <b>Reject</b>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
