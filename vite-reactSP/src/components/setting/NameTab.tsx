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
    FirstName: "",
    MiddleName: "",
    LastName: "",
  });

  const [errors, setErrors] = useState<{
    FirstName?: string;
    LastName?: string;
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
    const errs: { FirstName?: string; LastName?: string } = {};
    if (!formData.FirstName!.trim()) errs.FirstName = "First name required.";
    if (!formData.LastName!.trim()) errs.LastName = "Last name required.";
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
        formData.FirstName!.trim(),
        formData.MiddleName!.trim(),
        formData.LastName!.trim()
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
          name="FirstName"
          className="form-control"
          placeholder="Enter first name"
          value={formData!.FirstName}
          onChange={handleChange}
          required
        />
        {errors.FirstName && (
          <small className="text-danger">{errors.FirstName}</small>
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
          value={formData!.MiddleName}
          onChange={handleChange}
        />
      </div>

      <div className="form-group mb-3">
        <label>
          <strong>Last Name:</strong>
        </label>
        <input
          type="text"
          name="LastName"
          className="form-control"
          placeholder="Enter last name"
          value={formData!.LastName}
          onChange={handleChange}
          required
        />
        {errors.LastName && (
          <small className="text-danger">{errors.LastName}</small>
        )}
      </div>

      <div className="form-group mb-3">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSaving || !formData!.FirstName || !formData!.LastName}
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
