import React, { useEffect, useState } from "react";
import { getPeopleFollowingMe } from "../../services/contactService";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import type { RootState } from "../../store";
import { useSelector } from "react-redux";
import type { Contact } from "../../types/contact";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const PeopleFollowingMe: React.FC = () => {
  const memberID = useSelector(
    (state: RootState) => state.auth.user?.member_id
  );
  const [following, setFollowing] = useState<Contact[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchFollowing = async () => {
    if (!memberID) return;
    setIsRefreshing(true);
    try {
      const data = await getPeopleFollowingMe(memberID);
      setFollowing(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load the following list:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFollowing();
  }, []);

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
          Who is following you these days?
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
            onClick={fetchFollowing}
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
            key={res.contact_id}
            className="d-flex align-items-center justify-content-between pb-3 mb-3"
            style={{
              borderBottom:
                index !== following.length - 1 ? "1px solid #e0e0e0" : "none",
            }}
          >
            <div className="d-flex align-items-center">
              <Link to={`/profile/${res.contact_id}`}>
                <img
                  src={`${BASE_URL}/static/images/members/${
                    res.picture_path || "default.png"
                  }`}
                  alt="User"
                  className="rounded-circle"
                  style={{ width: "35px", height: "35px" }}
                />
              </Link>
              <div className="ms-3">
                <strong>
                  <Link
                    to={`/profile/${res.contact_id}`}
                    style={{ textDecoration: "none", fontWeight: "bold" }}
                  >
                    {res.friend_name}
                  </Link>
                </strong>
                <br />
                <span style={{ color: "gray", fontSize: "10pt" }}>
                  {res.title_desc}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeopleFollowingMe;
