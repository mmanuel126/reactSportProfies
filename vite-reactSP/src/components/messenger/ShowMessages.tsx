import React, { useEffect, useState } from "react";
import type { SearchMessageInfo } from "../../types/messages";
import {
  deleteMessage,
  getMemberMessages,
  toggleMessageState,
} from "../../services/messengerService";
import { Button, Spinner } from "react-bootstrap";

import { useSelector } from "react-redux";
import type { RootState } from "../../store";

import { Link } from "react-router-dom";
import CreateMessageModal from "./CreateMessageModal";
import OpenMessageModal from "./OpenMessageModal";

const BASE_URL = import.meta.env.VITE_BASE_URL;

type Props = {
  showType: string;
  showModal: boolean;
  setShowModal: (val: boolean) => void;
  showOpenModal: boolean;
  setShowOpenModal: (val: boolean) => void;
};

const ShowMessages: React.FC<Props> = ({
  showType,
  showModal,
  setShowModal,
  showOpenModal,
  setShowOpenModal,
}) => {
  const memberID = useSelector(
    (state: RootState) => state.auth.user?.member_id
  );
  const [messages, setMessages] = useState<SearchMessageInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedMessage, setSelectedMessage] =
    useState<SearchMessageInfo | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const data = await getMemberMessages(memberID!, showType);
      setMessages(data);
    } catch (err) {
      console.error("Failed to load posts", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleOpenMessage = async (msg: SearchMessageInfo) => {
    try {
      // Call API to toggle message state to "read"
      await toggleMessageState("1", msg.message_id);

      // Update local state to unbold the subject
      setMessages((prevMessages) =>
        prevMessages.map((m) =>
          m.message_id === msg.message_id
            ? { ...m, messageState: "1" } // mark as read
            : m
        )
      );

      // Show the message in modal
      setSelectedMessage({ ...msg, message_state: "1" });
      setShowOpenModal(true);
    } catch (err) {
      console.error("Failed to mark message as read:", err);
    }
  };

  const handleDeleteMessage = async (msgID: string) => {
    try {
      // Call API to delete message
      await deleteMessage(msgID);

      // Remove the deleted message from local state
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.message_id !== msgID)
      );
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
  };

  return (
    <div
      className="card p-0 mb-3"
      style={{ borderRadius: "1rem", width: "100%", maxWidth: "650px" }}
    >
      <div
        className="card-header d-flex align-items-center justify-content-between bg-white"
        style={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}
      >
        <div>
          <span className="card-header-title font-weight-normal text-body-tertiary">
            {messages.length > 0
              ? `${messages.length} message${
                  messages.length > 1 ? "s" : ""
                } found`
              : "No messages found"}
          </span>
        </div>
        <div>
          <Button
            className="fs-5 text-dark text-primary"
            variant="link"
            title="Refresh"
            onClick={fetchMessages}
          >
            <i className={`bi bi-arrow-clockwise ${loading ? "spin" : ""}`} />
          </Button>
          <span className="text-muted">|</span>
          <Button
            className="fs-5 text-dark text-primary"
            title="Create new message"
            variant="link"
            onClick={() => {
              setShowModal(true);
            }}
          >
            <i className="fa fa-edit"></i>
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center p-3 " style={{ fontSize: "10pt" }}>
          <Spinner animation="border" size="sm" /> Refreshing posts...
        </div>
      ) : (
        <div className="p-3">
          {messages.map((res, index) => (
            <div
              key={res.message_id}
              className="d-flex justify-content-between align-items-start pb-3 mb-3"
              style={{
                borderBottom:
                  index !== messages.length - 1 ? "1px solid #e0e0e0" : "none",
              }}
            >
              <div className="d-flex">
                <a
                  href=""
                  id="lbDelete"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteMessage(res.message_id);
                  }}
                >
                  <i
                    title="Delete Message"
                    className="fa fa-trash text-dark"
                  ></i>
                </a>
                &nbsp;
                <Link to={`/profile/${res.from_id}`}>
                  <img
                    src={`${BASE_URL}/static/images/members/${
                      res.sender_image || "default.png"
                    }`}
                    alt="User"
                    title="View Profile"
                    className="rounded-circle"
                    style={{ width: "35px", height: "35px" }}
                  />
                </Link>
                <div className="ms-3" style={{ maxWidth: "600px" }}>
                  <div
                    style={{
                      borderRadius: "10px",
                      padding: "0px",
                      fontSize: "10pt",
                      color: "#36454f",
                    }}
                  >
                    <strong>
                      <Link
                        to={`/profile/${res.from_id}`}
                        style={{ textDecoration: "none", fontWeight: "bold" }}
                        title="View Profile"
                      >
                        {res.sender_id}
                      </Link>
                    </strong>
                    <br />
                    <a
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenMessage(res);
                      }}
                      title="View Message"
                      style={{
                        textDecoration: "none",
                        fontWeight:
                          res.message_state === "0" ? "bold" : "normal",
                      }}
                    >
                      {res.subject}
                    </a>
                    <br />
                    {res.msg_date}
                    <br />
                    {res.body}
                    <br />
                  </div>
                </div>
              </div>

              {/* Right-side Open button with black background */}
              <div className="ms-3">
                <Button
                  style={{ backgroundColor: "black", borderColor: "black" }}
                  size="sm"
                  onClick={() => handleOpenMessage(res)}
                >
                  Open
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateMessageModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        title={"Compose New Message"}
      />

      <OpenMessageModal
        show={showOpenModal}
        onClose={() => {
          setShowOpenModal(false);
          setSelectedMessage(null);
        }}
        message={selectedMessage}
      />
    </div>
  );
};
export default ShowMessages;
