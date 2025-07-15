import React, { useState } from "react";
import { Container, Modal, Button } from "react-bootstrap";

const PageFooter: React.FC = () => {
  const [showAbout, setShowAbout] = useState(false);

  const handleShow = () => setShowAbout(true);
  const handleClose = () => setShowAbout(false);

  return (
    <>
      <footer className="text-center py-3">
        <Container>
          <p className="mb-0" style={{ fontSize: "10pt", color: "gray" }}>
            A sport social networking site for athletes, agents, and fanatics to
            connect.
            <br />
            &copy; {new Date().getFullYear()} MarcManMedia. |{" "}
            <Button
              variant="link"
              className="p-0 align-baseline"
              style={{
                fontSize: "10pt",
                color: "green",
                textDecoration: "none",
              }}
              onClick={handleShow}
            >
              <i className="fa-solid fa-info-circle text-success me-2"></i>About
              SportProfiles...
            </Button>
          </p>
        </Container>
      </footer>

      <Modal show={showAbout} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>About SportProfiles</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            SportProfiles is a social networking site for the athletes, sport
            agents, and of course sports fans all over the world.
          </p>
          <p>
            You can create an account, setup your profile, and connect with
            other members of the site to share and showcase your skill sets.
          </p>
          <p>
            If you are an amateur or professional athlete, you can reach out to
            agents to let them know about your talent and availability. If you
            are an agent, you can reach out to athletes as potential clients.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PageFooter;
