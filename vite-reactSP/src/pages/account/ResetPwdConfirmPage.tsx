import React from "react";
import { Link } from "react-router-dom";

const ResetPwdConfirmPage: React.FC = () => {
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
          <h2
            className="text-center mb-4 fw-bold"
            style={{
              color: "red",
              fontFamily: "Arial, Helvetica,sans-serif",
            }}
          >
            Sport Profiles
          </h2>
          <h5 className="text-center">Reset Password Confirmation</h5>
          <span className="text-center">
            Your password has been successfully reset.{" "}
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                cursor: "pointer !important",
              }}
            >
              Click here to log in.
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResetPwdConfirmPage;
