import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { ChangePasswordFormInputs } from "../../types/account";
import { useLocation, useNavigate } from "react-router-dom";
import { changePassword } from "../../services/accountService";
import { useNotification } from "../../hooks/useNotification";

// Validation schema
const schema = yup
  .object({
    password: yup
      .string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
  })
  .required();

const ChangePasswordPage: React.FC = () => {
  const notify = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const code = queryParams.get("code");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ChangePasswordFormInputs>({
    resolver: yupResolver(schema),
    mode: "onChange", // this is important!
  });

  const onSubmit = async (data: ChangePasswordFormInputs) => {
    if (!email || !code) {
      notify(
        "Missing reset parameters. Please use the link sent to your email."
      );
      return;
    }
    try {
      const result = await changePassword(data, email, code); // API call
      if (result != "") {
        navigate("/reset-password-confirm");
      } else {
        notify("An unexpected error occured. Please try again.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      notify(error.message || "An unexpected error occurred. Try again later.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center px-3"
      style={{
        padding: "2rem",
        width: "100vw",
        top: 0,
        left: 0,
      }}
    >
      <div
        className="card shadow-sm w-100"
        style={{ maxWidth: "400px", borderRadius: "1.5rem" }}
      >
        <div className="card-body p-4 text-center">
          <h2
            className="text-center mb-4 fw-bold"
            style={{
              color: "red",
              fontFamily: "Arial, Helvetica,sans-serif",
            }}
          >
            Sport Profiles
          </h2>
          <p>
            Please use the form below to change your password. It is required
            that you follow the guideline below:
          </p>
          <p>
            Your new password must be between 6-12 characters in length. Use a
            combination of letters and numbers. Passwords are case-sensitive.
            Remember to check your CAPS lock key.
          </p>
          <p className="text-center mb-4">
            <b>Change Password</b>
            <br />
            {email}
          </p>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Password */}
            <div className="mb-3">
              <input
                type="password"
                placeholder="Password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                {...register("password")}
              />
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-3">
              <input
                type="password"
                placeholder="Confirm Password"
                className={`form-control ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>

            <div className="d-grid mb-3">
              <button
                type="submit"
                className="btn btn-dark"
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? (
                  <>
                    <i className="fa fa-spinner fa-spin" /> Changing password.
                    Please wait...
                  </>
                ) : (
                  "Change Password"
                )}
              </button>
            </div>

            <div className="text-center small">
              <a href="/" className="me-2 text-decoration-none">
                Return to Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
