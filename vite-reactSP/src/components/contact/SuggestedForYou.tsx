import React, { useEffect, useState } from "react";
import { getMySuggestions, followContact } from "../../services/contactService";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import type { RootState } from "../../store";
import { useSelector } from "react-redux";
import type { Contact } from "../../types/contact";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Suggesting: React.FC = () => {
  const memberID = useSelector((state: RootState) => state.auth.user?.memberID);
  const [suggesting, setSuggesting] = useState<Contact[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchSuggesting = async () => {
    if (!memberID) return;
    setIsRefreshing(true);
    try {
      const data = await getMySuggestions(memberID);
      setSuggesting(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load the following list:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSuggesting();
  }, []);

  const handleFollow = async (contactID: string) => {
    if (!memberID) return;

    try {
      await followContact(memberID, contactID);
      setSuggesting((prev) =>
        prev.filter((contact) => contact.ContactID !== contactID)
      );
    } catch (error) {
      console.error("Error following contact:", error);
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
        <div className="card-header-title font-weight-normal text-body-tertiary ">
          Suggested contacts based on your profile.
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
            onClick={fetchSuggesting}
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
        {suggesting.map((res, index) => (
          <div
            key={res.ContactID}
            className="d-flex align-items-center justify-content-between pb-3 mb-3"
            style={{
              borderBottom:
                index !== suggesting.length - 1 ? "1px solid #e0e0e0" : "none",
            }}
          >
            <div className="d-flex align-items-center">
              <Link to={`/profile/${res.ContactID}`}>
                <img
                  src={`${BASE_URL}/static/images/members/${
                    res.PicturePath || "default.png"
                  }`}
                  alt="User"
                  className="rounded-circle"
                  style={{ width: "35px", height: "35px" }}
                />
              </Link>
              <div className="ms-3">
                <strong>
                  <Link
                    to={`/profile/${res.ContactID}`}
                    style={{ textDecoration: "none", fontWeight: "bold" }}
                  >
                    {res.FriendName}
                  </Link>
                </strong>
                <br />
                <span style={{ color: "gray", fontSize: "10pt" }}>
                  {res.TitleDesc}
                </span>
              </div>
            </div>

            {res.ShowFollow === "true" && (
              <Button
                size="sm"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                }}
                onClick={() => handleFollow(res.ContactID)}
              >
                <b>Follow</b>
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggesting;
