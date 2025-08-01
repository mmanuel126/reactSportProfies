import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { SignUpFormInputs } from "../../types/account";
import ModalComponent from "../../components/ModalComponent";
import termsText from "../../constants/terms";
import { createUserAccount } from "../../services/accountService";
import { useNotification } from "../../hooks/useNotification";
import { useNavigate } from "react-router-dom";

// Validation schema
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  gender: yup.string().oneOf(["Male", "Female"], "Select gender").required(),
  birthMonth: yup.string().required("Month is required"),
  birthDay: yup.string().required("Day is required"),
  birthYear: yup.string().required("Year is required"),
  profileType: yup.string().required("Select a profile type"),
  termsAccepted: yup.boolean().oneOf([true], "You must accept the terms"),
});

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
const years = Array.from({ length: 100 }, (_, i) =>
  (new Date().getFullYear() - i).toString()
);

const SignUpPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const notify = useNotification();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignUpFormInputs>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(schema as any),
    mode: "onChange",
  });

  const onSubmit = async (data: SignUpFormInputs) => {
    try {
      const result = await createUserAccount(data); // API call
      if (result == "ExistingEmail") {
        //system cannot create an existing email for a new account
        notify(
          <div style={{ textAlign: "center" }}>
            The email you entered already exists on this site. You may have
            already created an account. Try to recover the password or use a
            different email!
          </div>
        );
      } else if (result == "NewEmail") {
        //redirect to confirm page
        navigate("/confirm-signup?email=" + data.email);
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
        padding: "0rem",
        width: "100vw",
        top: 0,
        left: 0,
      }}
    >
      <div
        className="card shadow-sm w-100"
        style={{ maxWidth: "500px", borderRadius: "1.5rem" }}
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
          <h6 className="mt-0 text-center">
            <span>
              It only takes a <span className="text-success">few seconds</span>{" "}
              to create your account.
            </span>
          </h6>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* First Name */}
            <div className="mb-3">
              <input
                type="text"
                placeholder="First Name"
                className={`form-control ${
                  errors.firstName ? "is-invalid" : ""
                }`}
                {...register("firstName")}
              />
              {errors.firstName && (
                <div className="invalid-feedback">
                  {errors.firstName.message}
                </div>
              )}
            </div>

            {/* Last Name */}
            <div className="mb-3">
              <input
                type="text"
                placeholder="Last Name"
                className={`form-control ${
                  errors.lastName ? "is-invalid" : ""
                }`}
                {...register("lastName")}
              />
              {errors.lastName && (
                <div className="invalid-feedback">
                  {errors.lastName.message}
                </div>
              )}
            </div>

            {/* Email */}
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

            {/* Gender */}
            <div className="mb-3">
              <select
                className={`form-select ${errors.gender ? "is-invalid" : ""}`}
                {...register("gender")}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && (
                <div className="invalid-feedback">{errors.gender.message}</div>
              )}
            </div>

            {/* Birth Date */}
            <div className="mb-3 d-flex gap-2">
              <select
                className={`form-select ${
                  errors.birthMonth ? "is-invalid" : ""
                }`}
                {...register("birthMonth")}
              >
                <option value="">Month</option>
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                className={`form-select ${errors.birthDay ? "is-invalid" : ""}`}
                {...register("birthDay")}
              >
                <option value="">Day</option>
                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <select
                className={`form-select ${
                  errors.birthYear ? "is-invalid" : ""
                }`}
                {...register("birthYear")}
              >
                <option value="">Year</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            {(errors.birthMonth || errors.birthDay || errors.birthYear) && (
              <div className="text-danger small mb-2">
                Complete birth date is required
              </div>
            )}

            {/* Profile Type */}
            <div className="mb-3">
              <select
                className={`form-select ${
                  errors.profileType ? "is-invalid" : ""
                }`}
                {...register("profileType")}
              >
                <option value="">Select Profile Type</option>
                <option value="agent">Agent</option>
                <option value="Athlete (Amateur)">Athlete (Amateur)</option>
                <option value="Athlete (Professional)">
                  Athlete (Professional)
                </option>
                <option value="Athletic Trainer">Athletic Trainer</option>
                <option value="Coach">Coach</option>
                <option value="Management">Management</option>
                <option value="Referee">Referee</option>
                <option value="Retired">Retired</option>
                <option value="Scout">Scout</option>
                <option value="Sport Fanatic">Sport Fanatic</option>
              </select>
              {errors.profileType && (
                <div className="invalid-feedback">
                  {errors.profileType.message}
                </div>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className={`form-check-input ${
                  errors.termsAccepted ? "is-invalid" : ""
                }`}
                id="terms"
                {...register("termsAccepted")}
              />
              I accept the{" "}
              <label className="form-check-label" htmlFor="terms">
                <span
                  className="text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsModalOpen(true)}
                >
                  terms and conditions
                </span>
              </label>
              .
              {errors.termsAccepted && (
                <div className="text-danger small">
                  {errors.termsAccepted.message}
                </div>
              )}
            </div>

            {/* Links */}
            <div className="mb-3 text-center small">
              <a href="/login" className="me-2 text-decoration-none">
                Return to Login
              </a>
              <span>
                <b>·</b>
              </span>
              <a href="/forgot-password" className="ms-2 text-decoration-none">
                Forgot Password?
              </a>
            </div>

            {/* Submit */}
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-dark"
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? (
                  <>
                    <i className="fa fa-spinner fa-spin" /> Creating Account.
                    Please wait...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <ModalComponent
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Terms of Use"
      >
        <div dangerouslySetInnerHTML={{ __html: termsText }} />
      </ModalComponent>
    </div>
  );
};

export default SignUpPage;
