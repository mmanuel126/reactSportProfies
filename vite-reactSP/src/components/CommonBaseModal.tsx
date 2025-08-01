import { Modal, Button } from "react-bootstrap";

const CommonBaseModal: React.FC<{
  show: boolean;
  onHide: () => void;
  onSend: () => void;
  titleText: string;
  bodyText: string;
  actionButtonText: string;
}> = ({ show, onHide, onSend, titleText, bodyText, actionButtonText }) => (
  <Modal show={show} onHide={onHide} centered>
    <Modal.Header closeButton>
      <Modal.Title>{titleText}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{bodyText}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Cancel
      </Button>
      <Button variant="primary" onClick={onSend}>
        {actionButtonText}
      </Button>
    </Modal.Footer>
  </Modal>
);

export default CommonBaseModal;
