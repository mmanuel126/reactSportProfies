import React, { useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { deactivateAccount } from "../../services/settingService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";

type Props = {
  memberId: string;
};

const DeactivateTab: React.FC<Props> = ({ memberId }) => {
  const [reason, setReason] = useState<string>("select");
  const [explanation, setExplanation] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Validation state
  const [errors, setErrors] = useState<{
    reason?: string;
    explanation?: string;
  }>({});

  const validate = () => {
    const newErrors: { reason?: string; explanation?: string } = {};
    if (reason === "select") {
      newErrors.reason = "Please select a reason.";
    }
    if (!explanation.trim()) {
      newErrors.explanation = "Explanation is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setShowModal(true);
    }
  };

  const handleDeactivate = async () => {
    setIsSaving(true);
    try {
      await deactivateAccount(memberId, reason, explanation);
      setShowModal(false);
      handleLogout();
    } catch (error) {
      console.log("Deactivation failed: " + error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group mb-3">
          <b>Reason for deactivating account:</b>
          <select
            className={`form-control mt-2 ${errors.reason ? "is-invalid" : ""}`}
            style={{ width: "320px" }}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            <option value="select">Select Reason...</option>
            <option value="1">I am leaving temporarily. I will be back.</option>
            <option value="2">
              I have another account that I will start using.
            </option>
            <option value="3">
              I get too many emails, invites, and requests.
            </option>
            <option value="4">
              I do not have enough privacy and security.
            </option>
            <option value="5">I do not understand how to use it.</option>
            <option value="0">Other</option>
          </select>
          {errors.reason && (
            <div className="invalid-feedback">{errors.reason}</div>
          )}
        </div>

        <div className="form-group mb-3">
          <b>Further Explanation:</b>
          <textarea
            className={`form-control mt-2 ${
              errors.explanation ? "is-invalid" : ""
            }`}
            style={{ width: "400px", height: "50px" }}
            placeholder="Explain deactivation"
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
          />
          {errors.explanation && (
            <div className="invalid-feedback">{errors.explanation}</div>
          )}
        </div>

        <div className="mb-5">
          <button type="submit" className="btn btn-primary btn-md">
            Deactivate
          </button>
        </div>
      </form>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Deactivate Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to deactivate your account?</p>
        </Modal.Body>
        <Modal.Footer className="pb-4">
          <Button
            variant="primary"
            onClick={handleDeactivate}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Spinner size="sm" animation="border" /> Deactivating...
              </>
            ) : (
              "Yes"
            )}
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeactivateTab;
