import React, { useRef, useState } from "react";
import {
  Popover,
  Overlay,
  Button,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

type ContactPopoverMenuProps = {
  selected: string;
  onSelect: (value: string) => void;
};

const ContactPopoverMenu: React.FC<ContactPopoverMenuProps> = ({
  selected,
  onSelect,
}) => {
  const options = [
    "My Contacts",
    "Requests",
    "Find Contacts",
    "Suggested For Me",
    "People I Follow",
    "People Following Me",
  ];
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const handleSelect = (option: string) => {
    onSelect(option);
    setShow(false); // Close after selection
  };

  const popover = (
    <Popover
      id="popover-animated"
      className="fade show shadow"
      style={{
        border: "1px solid #ddd",
        borderRadius: "1rem",
        minWidth: "200px",
        overflow: "hidden",
      }}
    >
      <div
        className="px-3 py-2 fw-semibold"
        style={{
          backgroundColor: "#fafafa",
          borderBottom: "1px solid #eee",
          fontSize: "16px",
        }}
      >
        <i className="fa fa-user-group"></i>&nbsp;&nbsp;<b>Contacts</b>
      </div>
      <Popover.Body className="p-0">
        <ListGroup variant="flush">
          {options.map((option) => (
            <React.Fragment key={option}>
              <ListGroupItem
                onClick={() => handleSelect(option)}
                className="popover-item border-0"
                style={{
                  cursor: "pointer",
                  padding: "0.75rem 1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {option}
                {selected === option && (
                  <i className="fa-solid fa-check text-success ms-2"></i>
                )}
              </ListGroupItem>

              {/* Insert separator after "Requests" */}
              {(option === "Find Contacts" || option === "Suggested For Me") && (
                <div
                  style={{
                    borderBottom: "1px solid #eee",
                    margin: "0 1rem",
                  }}
                ></div>
              )}
            </React.Fragment>
          ))}
        </ListGroup>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <Button
        variant="link"
        className="d-flex align-items-center gap-2 p-0 text-decoration-none"
        ref={target}
        onClick={() => setShow(!show)}
      >
        <span className="text-dark">{selected}</span>
        <i className="fa-solid fa-circle-chevron-down fa-lg" style={{color:"red"}}></i>
      </Button>

      <Overlay
        target={target.current}
        show={show}
        placement="bottom"
        transition={true}
        rootClose
        onHide={() => setShow(false)}
      >
        {popover}
      </Overlay>
    </div>
  );
};

export default ContactPopoverMenu;
