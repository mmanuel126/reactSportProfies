import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { SignUpFormInputs } from "../../types/account";
import ModalComponent from "../../components/ModalComponent";
import termsText from "../../constants/terms";
import { useNotification } from "../../hooks/useNotification";
import {
  setMemberStatus,
  validateNewRegisteredUser,
} from "../../services/accountService";
import { loginSuccess } from "../../store/authSlice";
import { useAppDispatch } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";

// Validation schema
const schema = yup.object().shape({
  terms_accepted: yup.boolean().oneOf([true], "You must accept the terms"),
});

const SignUpPage: React.FC = () => {
  const notify = useNotification();
  const dispatch = useAppDispatch();
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = async (data: SignUpFormInputs) => {
    console.log("Submitted:", data);
    alert("Signup successful!");

    const params = new URLSearchParams(location.search);
    const codeParam = params.get("code");
    const emailParam = params.get("email");

    if (!codeParam || !emailParam) {
      notify(
        <div style={{ textAlign: "center" }}>
          Invalid singup completion link.
          <br />
          We can not confirm your registration completion with this link. If you
          recently signed up, check your email for the correct link to to
          complete the registration process.
        </div>
      );
    } else {
      const response = await validateNewRegisteredUser(emailParam, codeParam);
      if (response.member_id != null) {
        setMemberStatus(response.member_id, "2");
        dispatch(loginSuccess(response)); // Update Redux
        navigate("/");
      } else {
        notify(
          <div style={{ textAlign: "center" }}>
            Invalid singup completion link.
            <br />
            We can not confirm your registration completion with this link. If
            you recently signed up, check your email for the correct link to to
            complete the registration process.
          </div>
        );
      }
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
      <div className="card shadow-sm w-100" style={{ maxWidth: "500px" }}>
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
          <h5 className="mt-2 text-center">Welecome Back!</h5>
          <h6 className="text-center">
            Thank you again for joining Sport Profles!
          </h6>
          <p className="text-center">
            Before you can start using the site you must complete your
            registration by confirming below your acknowledgement to the
            site&nbsp;
            <span
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => setIsModalOpen(true)}
            >
              Terms
            </span>
            &nbsp;of use.
          </p>

          <ModalComponent
            show={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Terms of Use"
          >
            <div dangerouslySetInnerHTML={{ __html: termsText }} />
          </ModalComponent>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Terms & Conditions */}
            <div className="form-check mb-3 text-center">
              <input
                type="checkbox"
                className={`form-check-input ${
                  errors.terms_accepted ? "is-invalid" : ""
                }`}
                id="terms"
                {...register("terms_accepted")}
              />
              <label className="form-check-label" htmlFor="terms">
                I have read an agree to follow the rules as pertained in the
                Sport Profiles site <b>Terms of Use.</b>
              </label>
              {errors.terms_accepted && (
                <div className="text-danger small">
                  {errors.terms_accepted.message}
                </div>
              )}
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
                    <i className="fa fa-spinner fa-spin" /> Signing. Please
                    wait...
                  </>
                ) : (
                  "Accept"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
