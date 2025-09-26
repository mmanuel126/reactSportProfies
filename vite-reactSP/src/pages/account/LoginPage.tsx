import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { loginSuccess } from "../../store/authSlice";
import { loginUser } from "../../services/accountService";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { LoginFormInputs } from "../../types/account";

import { useNotification } from "../../hooks/useNotification";

// Validation schema
const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
});

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const notify = useNotification();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const result = await loginUser(data); // API call
      if (result.current_status == "2") {
        //active member
        dispatch(loginSuccess(result)); // Update Redux
        navigate("/");
      } else if (result.current_status == "3") {
        //deactivated user
        notify(
          <span>
            Your account is deactivated. Click{" "}
            <Link
              to="/reactivate"
              style={{ textDecoration: "underline", color: "blue" }}
            >
              here
            </Link>{" "}
            to reactivate.
          </span>
        );
      } else {
        notify(
          <div style={{ textAlign: "center" }}>
            Incorrect email or password.
            <br />
            If you recently signed up, check your email to complete the
            registration process.
          </div>
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      notify(error.message || "An unexpected error occurred. Try again later.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center px-3"
      style={{ padding: "2rem", width: "100vw" }}
    >
      <div
        className=" card shadow-sm w-100"
        style={{ maxWidth: "400px", borderRadius: "1.5rem" }}
      >
        <div className="card-body p-4">
          <h2
            className="text-center mb-4 fw-bold"
            style={{
              color: "red",
              fontFamily: "Arial, Helvetica,sans-serif",
            }}
          >
            Sport Profiles
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-3">
              <input
                id="email"
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Email address"
                {...register("email")}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>
            <div className="mb-3">
              <input
                id="password"
                type="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
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
                    <i className="fa fa-spinner fa-spin" /> Logging. Please
                    wait...
                  </>
                ) : (
                  "Log In"
                )}
              </button>
            </div>
            <div className="text-center small">
              <a href="/forgot-password" className="me-2 text-decoration-none">
                Forgot password?
              </a>
              <b>·</b>
              <a href="/signup" className="ms-2 text-decoration-none">
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
