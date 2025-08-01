import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";

type PostModalProps = {
  show: boolean;
  onClose: () => void;
  onSubmit: (text: string) => void;
  title?: string;
};

const MAX_CHARS = 350;

const PostModal: React.FC<PostModalProps> = ({
  show,
  onClose,
  onSubmit,
  title,
}) => {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (show) {
      setText(""); // reset on open
      setTimeout(() => textareaRef.current?.focus(), 100); // slight delay for animation
    }
  }, [show]);

  const charsRemaining = MAX_CHARS - text.length;
  const isNearLimit = charsRemaining <= 20;

  const handlePost = () => {
    const trimmed = text.trim();
    if (trimmed) {
      onSubmit(trimmed);
      setText("");
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title || "New Post"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="postTextarea">
          <Form.Control
            ref={textareaRef}
            as="textarea"
            rows={4}
            maxLength={MAX_CHARS}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your post here..."
          />
          <div
            className={`text-end small mt-1 ${
              isNearLimit ? "text-danger fw-bold" : "text-muted"
            }`}
          >
            {charsRemaining} character{charsRemaining !== 1 ? "s" : ""} left
          </div>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handlePost} disabled={!text.trim()}>
          Post
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PostModal;
