import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import type { ForgotPasswordFormInputs } from "../../types/account";
import { resetPassword } from "../../services/accountService";
import { useNotification } from "../../hooks/useNotification";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
  })
  .required();

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const notify = useNotification();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ForgotPasswordFormInputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: ForgotPasswordFormInputs) => {
    try {
      await resetPassword(data); // API call
      navigate("/reset-password?email=" + data.email);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      notify(error.message || "An unexpected error occurred. Try again later.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center px-3"
      style={{
        padding: "8rem",
        width: "100vw",
        top: 0,
        left: 0,
        overflowY: "auto",
      }}
    >
      <div
        className="card shadow-sm w-100"
        style={{ maxWidth: "400px", borderRadius: "1.5rem" }}
      >
        <div className="card-body p-4">
          <h2
            className="text-center mb-3 fw-bold"
            style={{
              color: "red",
              fontFamily: "Arial, Helvetica,sans-serif",
            }}
          >
            Sport Profiles
          </h2>
          <p className="text-muted text-center mb-4">
            Enter your email address below so we can help you get back into your
            account.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Email Field */}
            <div className="mb-3">
              <input
                type="email"
                placeholder="Email Address"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                {...register("email")}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>

            {/* Submit */}
            <div className="d-grid mb-3">
              <button
                type="submit"
                className="btn btn-dark"
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? (
                  <>
                    <i className="fa fa-spinner fa-spin" /> Resetting. Please
                    wait...
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>

            {/* Links */}
            <div className="text-center small">
              <Link to="/" className="me-2 text-decoration-none">
                Return to Login
              </Link>
              <span>
                <b>·</b>
              </span>
              <Link to="/signup" className="ms-2 text-decoration-none">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
