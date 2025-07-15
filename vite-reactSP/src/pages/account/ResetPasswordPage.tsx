import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/spLongLogo.jpg";
import type { ResetPasswordFormInputs } from "../../types/account";
import { useNotification } from "../../hooks/useNotification";
import { isResetCodeExpired } from "../../services/accountService";

// Yup validation schema
const schema = yup
  .object({
    code: yup.string().required("Reset Code is required"),
  })
  .required();

const ResetPasswordPage: React.FC = () => {
  const notify = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ResetPasswordFormInputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: ResetPasswordFormInputs) => {
    try {
      const result = await isResetCodeExpired(data.code);
      if (result == "yes") {
        notify(
          <span>
            The code you entered is invalid or expired. Try again or click{" "}
            <Link
              to="/forgot-password"
              style={{ textDecoration: "underline", color: "blue" }}
            >
              here
            </Link>{" "}
            to get a new code.
          </span>
        );
      } else {
        navigate("/change-password?email=" + email + "&code=" + data.code);
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
        overflowY: "auto",
      }}
    >
      <div className="card shadow-sm w-100" style={{ maxWidth: "400px" }}>
        <div className="card-body p-4">
          <h4 className="text-center mb-3 fw-bold">
            <img
              src={logo}
              width="160px"
              height="40px"
              alt="A sport social networking site for athletes, agents, and fans to connect."
            />
          </h4>
          <p className="text-center mb-4">
            An email describing how to get to your new password has been sent to
            you at <b>{email}</b>.
          </p>
          <p>
            The delivery of the email may be delayed so please be patient.
            Confirm that the email above is correct and check your junk or spam
            folder if you did not received it in your inbox folder.
          </p>
          <p>
            A confirmation <b>reset code</b> is provided with the email. Please
            enter this code below to continue with resetting your password.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* code Field */}
            <div className="mb-3">
              <input
                type="text"
                placeholder="Enter code"
                className={`form-control ${errors.code ? "is-invalid" : ""}`}
                {...register("code")}
              />
              {errors.code && (
                <div className="invalid-feedback">{errors.code.message}</div>
              )}
            </div>

            {/* Submit */}
            <div className="d-grid mb-3">
              <button
                type="submit"
                className="btn btn-dark"
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? (<><i className='fa fa-spinner fa-spin'/> Resetting. Please wait...</>) : ("Reset")}
              </button>
            </div>

            {/* Links */}
            <div className="text-center small">
              <Link to="/" className="me-2 text-decoration-none">
                Return to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
