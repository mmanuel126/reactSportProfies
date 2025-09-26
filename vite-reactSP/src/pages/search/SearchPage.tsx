import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { setQuery, fetchUsers } from "./searchSlice";
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
import { followContact } from "../../services/contactService";
import { useState } from "react";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const SearchPage: React.FC = () => {
  const memberID = useSelector(
    (state: RootState) => state.auth.user?.member_id
  );
  const dispatch: AppDispatch = useDispatch();
  const { query, results } = useSelector((state: RootState) => state.search);

  useEffect(() => {
    if (query.trim()) {
      dispatch(fetchUsers(query));
    }
  }, [query, dispatch]);

  const [followingIds, setFollowingIds] = useState<number[]>([]);

  return (
    <div style={{ background: "#fafafa", minHeight: "100vh" }}>
      {/* Sticky Header */}
      <div
        className="sticky-top py-2"
        style={{
          zIndex: 1000,
          backgroundColor: "#fafafa",
          textAlign: "center",
        }}
      >
        <h4
          className="mb-0"
          style={{
            fontSize: "14pt",
            fontWeight: "normal",
            margin: "10px 10px 0px 10px",
          }}
        >
          Search
        </h4>
      </div>

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
                placeholder="Search by name, sport, or profile type..."
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
                  <ListGroup.Item key={user.entity_id}>
                    <Row className="align-items-center">
                      <Col xs="auto">
                        <Link to={`/profile/${user.entity_id}`}>
                          <Image
                            src={`${BASE_URL}/static/images/members/${
                              user.picture_path || "default.png"
                            }`}
                            roundedCircle
                            fluid
                            style={{ width: "40px", height: "40px" }}
                          />
                        </Link>
                      </Col>
                      <Col style={{ marginLeft: "-12px" }}>
                        {/*<h6 className="mb-0">{user.entityName}</h6>*/}
                        <strong>
                          <Link
                            to={`/profile/${user.entity_id}`}
                            style={{
                              textDecoration: "none",
                              fontWeight: "bold",
                            }}
                          >
                            {user.entity_name}
                          </Link>
                        </strong>
                        <br />
                        <small className="text-muted">{user.city_state}</small>
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
                          onClick={async () => {
                            try {
                              // Replace with actual IDs
                              if (!memberID) return;
                              const contactId = user.entity_id;

                              await followContact(memberID, String(contactId));

                              // Update UI
                              setFollowingIds((prev) => [...prev, contactId]);
                            } catch (err) {
                              console.error("Failed to follow user:", err);
                              // Optionally show an alert or toast
                            }
                          }}
                          disabled={
                            followingIds.includes(user.entity_id) ||
                            user.show_cancel == "following"
                          }
                        >
                          {followingIds.includes(user.entity_id) ||
                          user.show_cancel == "following"
                            ? "Following"
                            : "Follow"}
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

export default SearchPage;
