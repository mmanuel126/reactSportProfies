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
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  gender: yup.string().oneOf(["Male", "Female"], "Select gender").required(),
  month: yup.string().required("Month is required"),
  day: yup.string().required("Day is required"),
  year: yup.string().required("Year is required"),
  profile_type: yup.string().required("Select a profile type"),
  terms_accepted: yup.boolean().oneOf([true], "You must accept the terms"),
});

const months = [
  { number: "01", name: "January" },
  { number: "02", name: "February" },
  { number: "03", name: "March" },
  { number: "04", name: "April" },
  { number: "05", name: "May" },
  { number: "06", name: "June" },
  { number: "07", name: "July" },
  { number: "08", name: "August" },
  { number: "09", name: "September" },
  { number: "10", name: "October" },
  { number: "11", name: "November" },
  { number: "12", name: "December" },
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
                  errors.first_name ? "is-invalid" : ""
                }`}
                {...register("first_name")}
              />
              {errors.first_name && (
                <div className="invalid-feedback">
                  {errors.first_name.message}
                </div>
              )}
            </div>

            {/* Last Name */}
            <div className="mb-3">
              <input
                type="text"
                placeholder="Last Name"
                className={`form-control ${
                  errors.last_name ? "is-invalid" : ""
                }`}
                {...register("last_name")}
              />
              {errors.last_name && (
                <div className="invalid-feedback">
                  {errors.last_name.message}
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
                  errors.confirm_password ? "is-invalid" : ""
                }`}
                {...register("confirm_password")}
              />
              {errors.confirm_password && (
                <div className="invalid-feedback">
                  {errors.confirm_password.message}
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
                className={`form-select ${errors.month ? "is-invalid" : ""}`}
                {...register("month")}
              >
                <option value="">Month</option>
                {months.map((month) => (
                  <option key={month.number} value={month.number}>
                    {month.name}
                  </option>
                ))}
              </select>

              <select
                className={`form-select ${errors.day ? "is-invalid" : ""}`}
                {...register("day")}
              >
                <option value="">Day</option>
                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <select
                className={`form-select ${errors.year ? "is-invalid" : ""}`}
                {...register("year")}
              >
                <option value="">Year</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            {(errors.month || errors.day || errors.year) && (
              <div className="text-danger small mb-2">
                Complete birth date is required
              </div>
            )}

            {/* Profile Type */}
            <div className="mb-3">
              <select
                className={`form-select ${
                  errors.profile_type ? "is-invalid" : ""
                }`}
                {...register("profile_type")}
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
              {errors.profile_type && (
                <div className="invalid-feedback">
                  {errors.profile_type.message}
                </div>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className={`form-check-input ${
                  errors.terms_accepted ? "is-invalid" : ""
                }`}
                id="terms"
                {...register("terms_accepted")}
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
              {errors.terms_accepted && (
                <div className="text-danger small">
                  {errors.terms_accepted.message}
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
