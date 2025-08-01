import React, { useState, useEffect } from "react";
import type { FormEvent } from "react";
import {
  getMemberNameInfo,
  saveMemberNameInfo,
} from "../../services/settingService";
import type { AccountSettings } from "../../types/settings";

type Props = {
  memberId: string;
};

const NameTab: React.FC<Props> = ({ memberId }) => {
  const [formData, setFormData] = useState<AccountSettings>({
    firstName: "",
    middleName: "",
    lastName: "",
  });

  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
  }>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Load initial data
    getMemberNameInfo(memberId).then((data) => {
      setFormData(data);
    });
  }, [memberId]);

  const validate = () => {
    const errs: { firstName?: string; lastName?: string } = {};
    if (!formData.firstName!.trim()) errs.firstName = "First name required.";
    if (!formData.lastName!.trim()) errs.lastName = "Last name required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev!, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSaving(true);
    setIsSuccess(false);

    try {
      await saveMemberNameInfo(
        memberId,
        formData.firstName!.trim(),
        formData.middleName!.trim(),
        formData.lastName!.trim()
      );

      setIsSuccess(true);
    } catch (error) {
      console.error("Failed to save member name info:", error);
      // Optionally, show an error to the user
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form className="form-horizontal" onSubmit={handleSubmit}>
      <div className="form-group mb-3 pt-3">
        <label>
          <strong>First Name:</strong>
        </label>
        <input
          type="text"
          name="firstName"
          className="form-control"
          placeholder="Enter first name"
          value={formData!.firstName}
          onChange={handleChange}
          required
        />
        {errors.firstName && (
          <small className="text-danger">{errors.firstName}</small>
        )}
      </div>

      <div className="form-group mb-3">
        <label>
          <strong>Middle Name:</strong>
        </label>
        <input
          type="text"
          name="middleName"
          className="form-control"
          placeholder="Enter middle name"
          value={formData!.middleName}
          onChange={handleChange}
        />
      </div>

      <div className="form-group mb-3">
        <label>
          <strong>Last Name:</strong>
        </label>
        <input
          type="text"
          name="lastName"
          className="form-control"
          placeholder="Enter last name"
          value={formData!.lastName}
          onChange={handleChange}
          required
        />
        {errors.lastName && (
          <small className="text-danger">{errors.lastName}</small>
        )}
      </div>

      <div className="form-group mb-3">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSaving || !formData!.firstName || !formData!.lastName}
        >
          {isSaving ? (
            <>
              <i className="fa fa-spinner fa-spin" /> Saving...
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

export default NameTab;
