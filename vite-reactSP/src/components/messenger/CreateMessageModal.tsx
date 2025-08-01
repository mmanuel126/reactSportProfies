import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import type { TypeaheadRef } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import type { Contact } from "../../types/contact";
import { getMyContacts } from "../../services/contactService";
import { sendMessage } from "../../services/messengerService";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

type CreateMsgModalProps = {
  show: boolean;
  onClose: () => void;
  title?: string;
};

const MAX_CHARS = 350;

const CreateMessageModal: React.FC<CreateMsgModalProps> = ({
  show,
  onClose,
  title,
}) => {
  const [text, setText] = useState("");
  const [subject, setSubject] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact[]>([]);
  const [touched, setTouched] = useState({
    to: false,
    subject: false,
    text: false,
  });

  const memberID = useSelector((state: RootState) => state.auth.user?.memberID);

  const typeaheadRef = useRef<TypeaheadRef>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        if (!memberID) {
          throw new Error("Missing memberID");
        }
        const data = await getMyContacts(memberID, "");
        setContacts(data);
      } catch (err) {
        console.error("Failed to fetch contacts", err);
      }
    };

    if (show) {
      setText("");
      setSubject("");
      setSelectedContact([]);
      setTouched({ to: false, subject: false, text: false });
      fetchContacts();
      setTimeout(() => typeaheadRef.current?.focus(), 100);
    }
  }, [show, memberID]);

  const charsRemaining = MAX_CHARS - text.length;
  const isNearLimit = charsRemaining <= 20;

  const isToValid = selectedContact.length > 0;
  const isSubjectValid = subject.trim().length > 0;
  const isTextValid = text.trim().length > 0;
  const isFormValid = isToValid && isSubjectValid && isTextValid;

  const handleSendMessage = async () => {
    if (!isFormValid) return;
    const contactId = selectedContact[0]?.contactID;
    if (!contactId) return;
    await sendMessage(memberID!, contactId, subject.trim(), text.trim());
    setText("");
    setSubject("");
    setSelectedContact([]);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title || "New Message"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate>
          {/* To Field - Autocomplete */}
          <Form.Group controlId="toInput" className="mb-3">
            <Form.Label>To:</Form.Label>
            <Typeahead
              id="contact-autocomplete"
              ref={typeaheadRef}
              labelKey="friendName"
              options={contacts}
              selected={selectedContact}
              onChange={(selected: Contact[]) => setSelectedContact(selected)}
              placeholder="Start typing a name..."
              onBlur={() => setTouched((prev) => ({ ...prev, to: true }))}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              renderMenuItemChildren={(option: any) => (
                <div className="d-flex align-items-center">
                  <img
                    src={option.picturePath || "/Images/members/default.png"}
                    alt={option.friendName}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      marginRight: 10,
                    }}
                  />
                  <div>
                    <div className="fw-bold">{option.friendName}</div>
                    <div className="text-muted small">{option.titleDesc}</div>
                  </div>
                </div>
              )}
            />
            {touched.to && selectedContact.length === 0 && (
              <div className="text-danger small mt-1">
                Recipient is required.
              </div>
            )}
          </Form.Group>

          {/* Subject Field */}
          <Form.Group controlId="subjectInput" className="mb-3">
            <Form.Label>Subject:</Form.Label>
            <Form.Control
              type="text"
              value={subject}
              placeholder="Enter subject..."
              onChange={(e) => setSubject(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, subject: true }))}
              isInvalid={touched.subject && !isSubjectValid}
            />
            <Form.Control.Feedback type="invalid">
              Subject is required.
            </Form.Control.Feedback>
          </Form.Group>

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
          onClick={handleSendMessage}
          disabled={!isFormValid}
        >
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateMessageModal;
