import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { setQuery, fetchFindContacts } from "./findContactsSlice";
import {
  Card,
  Form,
  ListGroup,
  Button,
  Row,
  Col,
  Image,
  Container,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { addContact } from "../../services/contactService";
import CommonBaseModal from "../CommonBaseModal";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const FindContacts: React.FC = () => {
  const memberID = useSelector((state: RootState) => state.auth.user?.memberID);
  const dispatch: AppDispatch = useDispatch();
  const { query, results } = useSelector(
    (state: RootState) => state.findContact
  );

  const [showAddContactPopup, setShowAddContactPopup] = useState(false);
  const [,setIsContactAdded] = useState(false);
  const [selectedContactID, setSelectedContactID] = useState<string | null>(
    null
  );
  const [addedContacts, setAddedContacts] = useState<string[]>([]);


  useEffect(() => {
    if (query.trim()) {
      dispatch(fetchFindContacts(query));
    }
  }, [query, dispatch]);

  const handleAddAsContact = async () => {
    if (!selectedContactID) return;

    try {
      await addContact(memberID!, selectedContactID);
      setIsContactAdded(true);
      setAddedContacts((prev) => [...prev, selectedContactID]); 
      setShowAddContactPopup(false);
      setSelectedContactID(null); // Reset after action
    } catch (err) {
      console.error("Failed to add contact:", err);
    }
  };

  return (
    <div style={{ background: "#fafafa", minHeight: "100vh" }}>
      <Container className="mt-0">
        <Card
          className="mx-auto"
          style={{
            borderRadius: "1rem",
            minWidth: "400px",
            maxWidth: "600px",
            backgroundColor: "#fff",
          }}
        >
          <Card.Header
            style={{
              paddingTop: "18px",
              paddingBottom: "18px",
              backgroundColor: "#fff",
              borderTopLeftRadius: "1rem",
              borderTopRightRadius: "1rem",
            }}
          >
            <div
              className="card-header-title font-weight-normal text-body-tertiary "
              style={{ paddingTop: "5px", paddingBottom: "15px" }}
            >
              You can find people that you know and request to add them to your
              contacts list. You can use the search box by typing in a person's
              name, and email address, college, or high schoool attended below.
            </div>

            {/* Search input with icon */}
            <div className="position-relative">
              <Form.Control
                type="text"
                placeholder="Search for contacts..."
                value={query}
                onChange={(e) => dispatch(setQuery(e.target.value))}
                style={{
                  backgroundColor: "#fafafa",
                  borderRadius: "999px", // rounder edges
                  paddingLeft: "2.2rem",
                  border: "1px solid #ccc",
                  outline: "none", // removes the blue outline on focus
                  boxShadow: "none", // removes any shadow on focus (some browsers)
                }}
              />
              <FaSearch
                className="position-absolute text-muted"
                style={{
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
            </div>
          </Card.Header>

          <Card.Body>
            {query.trim() !== "" && (
              <ListGroup variant="flush">
                {results.map((user) => (
                  <ListGroup.Item key={user.contactID}>
                    <Row className="align-items-center">
                      <Col xs="auto">
                        <Link to={`/profile/${user.contactID}`}>
                          <Image
                            src={`${BASE_URL}/Images/members/${
                              user.picturePath || "default.png"
                            }`}
                            roundedCircle
                            fluid
                            style={{ width: "40px", height: "40px" }}
                          />
                        </Link>
                      </Col>
                      <Col style={{ marginLeft: "-12px" }}>
                        <strong>
                          <Link
                            to={`/profile/${user.contactID}`}
                            style={{
                              textDecoration: "none",
                              fontWeight: "bold",
                            }}
                          >
                            {user.friendName}
                          </Link>
                        </strong>
                        <br />
                        <small className="text-muted">{user.titleDesc}</small>
                      </Col>
                      <Col xs="auto" className="text-end">
                        {user.labelText === "Add as Contact" && !addedContacts.includes(user.contactID) &&  (
                          <Button
                            size="sm"
                            style={{
                              backgroundColor: "#000",
                              color: "#fff",
                              fontWeight: "bold",
                              border: "none",
                              borderRadius: "6px",
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedContactID(user.contactID);
                              setShowAddContactPopup(true);
                            }}
                          >
                            Add as Contact
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Card.Body>
        </Card>
      </Container>

      <CommonBaseModal
        show={showAddContactPopup}
        onHide={() => setShowAddContactPopup(false)}
        onSend={handleAddAsContact}
        titleText="Requesting to Add Contact"
        bodyText={`This member will have to confirm your request. Are you sure you want to send this contact request?`}
        actionButtonText="Send Request"
      />
    </div>
  );
};

export default FindContacts;
