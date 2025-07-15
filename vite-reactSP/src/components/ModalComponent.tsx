import React from "react";
import { Modal, Button } from "react-bootstrap";

interface ModalComponentProps {
  show: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  closeButtonText?: string;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  show,
  onClose,
  title,
  children,
  closeButtonText = "Close",
}) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      {title && (
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
      )}
      <Modal.Body
          style={{
          maxHeight: "calc(100vh - 200px)", // prevent modal from overflowing screen
          overflowY: "auto",
          }}
        >
        {children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          {closeButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
