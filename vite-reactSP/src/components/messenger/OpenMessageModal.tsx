import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import type { SearchMessageInfo } from "../../types/messages";
import { sendMessage } from "../../services/messengerService";

const BASE_URL = import.meta.env.VITE_BASE_URL;

type Props = {
  show: boolean;
  onClose: () => void;
  message: SearchMessageInfo | null;
};

const MAX_CHARS = 350;

const OpenMessageModal: React.FC<Props> = ({ show, onClose, message }) => {
  const [text, setText] = useState("");
  const [touched, setTouched] = useState({
    text: false,
  });

  const charsRemaining = MAX_CHARS - text.length;
  const isNearLimit = charsRemaining <= 20;
  const isTextValid = text.trim().length > 0;
  const isFormValid = isTextValid;

  const memberID = useSelector((state: RootState) => state.auth.user?.memberID);

  if (!message) return;

  const handleMessageReply = async () => {
    if (!memberID) return;
    const ensureStartsWith = (str: string, prefix: string): string => {
      return str.startsWith(prefix) ? str : prefix + str;
    };
    const newSubject = ensureStartsWith(message.Subject.trim(), "RE: ");
    if (!message) return;
    await sendMessage(memberID!, message.FromID!, newSubject, text.trim());
    setText("");
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <h5 className="modal-title" id="openMsgModalTitle">
            <img
              src={`${BASE_URL}/Images/members/${
                message!.SenderImage || "default.png"
              }`}
              style={{
                color: "#596A7D",
                borderColor: "LightGrey",
                borderWidth: "1px",
                borderStyle: "None",
                height: "40px",
                width: "40px",
                borderRadius: "50%",
              }}
            />
            &nbsp; {message!.SenderID}
          </h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate>
          {message!.Subject}
          <br />
          {message!.MsgDate}
          <hr />
          {message!.Body}
          <hr />
          Reply:
          <br />
          {/* Message Body Textarea */}
          <Form.Group controlId="postTextarea" className="mb-3">
            <Form.Control
              as="textarea"
              rows={4}
              maxLength={MAX_CHARS}
              value={text}
              placeholder="Write your message here..."
              onChange={(e) => setText(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, text: true }))}
              isInvalid={touched.text && !isTextValid}
            />
            <Form.Control.Feedback type="invalid">
              Message is required.
            </Form.Control.Feedback>
            <div
              className={`text-end small mt-1 ${
                isNearLimit ? "text-danger fw-bold" : "text-muted"
              }`}
            >
              {charsRemaining} character{charsRemaining !== 1 ? "s" : ""} left
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleMessageReply}
          disabled={!isFormValid}
        >
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OpenMessageModal;
