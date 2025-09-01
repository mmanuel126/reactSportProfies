import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { setQuery, fetchMyContacts } from "../contact/myContactsSlice";
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
import { deleteContact } from "../../services/contactService";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const MyContacts: React.FC = () => {
  const memberID = useSelector((state: RootState) => state.auth.user?.memberID);
  const dispatch: AppDispatch = useDispatch();
  const { query, results, loading, error } = useSelector(
    (state: RootState) => state.contact
  );

  const [localResults, setLocalResults] = useState(results);

  useEffect(() => {
    dispatch(fetchMyContacts(query)); // Always run, even if empty
  }, [query, dispatch]);

  useEffect(() => {
    setLocalResults(results);
  }, [results]);

  const handleDrop = async (contactID: string) => {
    if (!memberID) return;
    try {
      await deleteContact(memberID, contactID);
      setLocalResults((prev) => prev.filter((c) => c.ContactID !== contactID));
    } catch (err) {
      console.error("Failed to drop member:", err);
    }
  };

  return (
    <div
      style={{ background: "#fafafa", minHeight: "100vh", minWidth: "500px" }}
    >
      <Container className="mt-0">
        <Card
          className="mx-auto"
          style={{
            borderRadius: "1rem",
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
            {/* Search input with icon */}
            <div className="position-relative">
              <Form.Control
                type="text"
                placeholder="Search your contacts..."
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
            {loading ? (
              <div className="text-center py-4">
                <i className="fa fa-spinner fa-spin" /> &nbsp;Loading...
              </div>
            ) : error ? (
              <div className="text-center py-4 text-danger">{error}</div>
            ) : localResults.length === 0 ? (
              <div className="text-center py-4 text-muted">
                No contacts found...
              </div>
            ) : (
              <ListGroup variant="flush">
                {localResults.map((user) => (
                  <ListGroup.Item key={user.ContactID}>
                    <Row className="align-items-center">
                      <Col xs="auto">
                        <Link to={`/profile/${user.ContactID}`}>
                          <Image
                            src={`${BASE_URL}/static/images/members/${
                              user.PicturePath || "default.png"
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
                            to={`/profile/${user.ContactID}`}
                            style={{
                              textDecoration: "none",
                              fontWeight: "bold",
                            }}
                          >
                            {user.FriendName}
                          </Link>
                        </strong>
                        <br />
                        <small className="text-muted">{user.TitleDesc}</small>
                      </Col>
                      <Col xs="auto" className="text-end">
                        <Button
                          size="sm"
                          style={{
                            backgroundColor: "#000",
                            color: "#fff",
                            fontWeight: "bold",
                            border: "none",
                            borderRadius: "6px",
                          }}
                          onClick={() => handleDrop(user.ContactID)}
                        >
                          Drop
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default MyContacts;
