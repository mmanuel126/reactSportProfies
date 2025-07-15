import React from "react";
import { useLocation, Link } from "react-router-dom";
import logo from "../../assets/spLongWithBG.jpg";

const ConfirmSignUpPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  return (
    <div
      className="d-flex justify-content-center align-items-center px-3"
      style={{
        padding: "4rem",
        width: "100vw",
        top: 0,
        left: 0,
        overflowY: "auto",
      }}
    >
      <div style={{ maxWidth: "500px" }}>
        <div>
          <h4 className="text-center mb-3 fw-bold">
            <img
              src={logo}
              width="160px"
              height="40px"
              alt="A sport social networking site for athletes, agents, and fans to connect."
            />
          </h4>
          <br></br>
          <h5 className="text-center">Registration Confirmation</h5>

          <p className="text-center">
            Thank you for signing up on SportProfiles! A confirmation email was
            sent to you at <b>{email}</b>. Please check your email and click on
            the confirmation link in the email to complete your registration.
          </p>
          <p className="text-center">
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                cursor: "pointer !important",
              }}
            >
              Return to login page.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSignUpPage;
