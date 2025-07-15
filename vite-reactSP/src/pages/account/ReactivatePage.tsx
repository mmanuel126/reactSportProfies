import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import logo from "../../assets/spLongLogo.jpg";
import type { LoginFormInputs } from "../../types/account";
import { loginUser, setMemberStatus } from "../../services/accountService";
import { loginSuccess } from "../../store/authSlice";
import { useNotification } from "../../hooks/useNotification";
import { useAppDispatch } from "../../hooks";
import { useNavigate } from "react-router-dom";

// Validation schema
const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  })
  .required();

const ReactivatePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const notify = useNotification();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
    mode: "onChange", // this is important!
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const result = await loginUser(data); // API call
      if (result.memberID != "") {
        if (result.currentStatus == "3") {
          //deactivated
          //reset active flag to activated
          await setMemberStatus(result.memberID, "2");
        }

        if (result.currentStatus == "2" || result.currentStatus == "3") {
          //active or not check this if you land on this page
          dispatch(loginSuccess(result)); // Update Redux
          navigate("/");
        } else {
          notify("An unexpected error occurred.");
        }
      } else {
        notify(
          <div style={{ textAlign: "center" }}>
            Incorrect email or password.
          </div>
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      notify(error.message || "Unexpected error occurred");
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
      }}
    >
      <div className="card shadow-sm w-100" style={{ maxWidth: "400px" }}>
        <div className="card-body p-4">
          <h2 className="text-center mb-4 fw-bold">
            <img
              src={logo}
              width="160px"
              height="40px"
              alt="A sport social networking site for athletes, agents, and fans to connect."
            />
          </h2>
          <h5 className="text-center">Reactivate Account</h5>
          <h6 className="mt-2 text-center">
            Use the form below to reactivate your existing account.
          </h6>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-3">
              <input
                id="email"
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Email address"
                aria-label="Email address"
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
                aria-label="Password"
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
                {isSubmitting ? (<><i className='fa fa-spinner fa-spin'/> Reactivating. Please wait...</>) : ("Reactivate")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReactivatePage;
