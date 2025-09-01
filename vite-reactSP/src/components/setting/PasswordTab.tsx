import React, { useState } from "react";
import type { FormEvent } from "react";
import { savePasswordInfo } from "../../services/settingService";

type Props = {
  memberId: string;
};

const PasswordTab: React.FC<Props> = ({ memberId }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValidPwd, setIsValidPwd] = useState(true);
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const validate = () => {
    const newErrors: typeof errors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required.";
    }

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "Password is required.";
    } else if (formData.newPassword.length < 5) {
      newErrors.newPassword = "Password must be 5 characters or more.";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please re-enter password.";
    } else if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => !err);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSaving(true);
    setIsSuccess(false);
    setIsValidPwd(true); // reset

    try {
      await savePasswordInfo(memberId, formData.newPassword);
      setIsSuccess(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Password save failed:", error);
      setIsValidPwd(true); // Assume backend signals invalid current password
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form className="form-horizontal" onSubmit={handleSubmit}>
      <div className="mb-3 pt-3">
        <span style={{ color: "#484830", fontWeight: "bold" }}>
          Please follow the below guidelines when changing password:
        </span>
        <ul>
          <li>Your new password must be between 5–12 characters in length.</li>
          <li>Use a combination of letters, numbers, and punctuation.</li>
          <li>
            Passwords are case-sensitive. Remember to check your CAPS LOCK key.
          </li>
        </ul>
      </div>

      {/* Current Password */}
      <div className="form-group mb-3">
        <label>
          <b>Current Password:</b>
        </label>
        <input
          type="password"
          name="currentPassword"
          className="form-control"
          placeholder="Enter current password"
          value={formData.currentPassword}
          onChange={handleChange}
          autoComplete="off"
          required
        />
        {errors.currentPassword && (
          <small className="text-danger">{errors.currentPassword}</small>
        )}
        {!isValidPwd && (
          <small className="text-danger">
            The current password you entered is not correct.
          </small>
        )}
      </div>

      {/* New Password */}
      <div className="form-group mb-3">
        <label>
          <b>New Password:</b>
        </label>
        <input
          type="password"
          name="newPassword"
          className="form-control"
          placeholder="Enter new password"
          value={formData.newPassword}
          onChange={handleChange}
          autoComplete="off"
          required
        />
        {errors.newPassword && (
          <small className="text-danger">{errors.newPassword}</small>
        )}
      </div>

      {/* Confirm Password */}
      <div className="form-group mb-3">
        <label>
          <b>Confirm Password:</b>
        </label>
        <input
          type="password"
          name="confirmPassword"
          className="form-control"
          placeholder="Re-enter password"
          value={formData.confirmPassword}
          onChange={handleChange}
          autoComplete="off"
          required
        />
        {errors.confirmPassword && (
          <small className="text-danger">{errors.confirmPassword}</small>
        )}
      </div>

      <div className="form-group mb-3">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={
            isSaving ||
            !formData.currentPassword ||
            !formData.newPassword ||
            !formData.confirmPassword
          }
        >
          {isSaving ? (
            <>
              <i className="fa fa-spinner fa-spin"></i> Saving...
            </>
          ) : (
            "Save"
          )}
        </button>
      </div>

      {isSuccess && (
        <div className="text-success mb-4">Saved successfully.</div>
      )}
    </form>
  );
};

export default PasswordTab;
