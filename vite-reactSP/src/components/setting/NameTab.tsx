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
    first_name: "",
    middle_name: "",
    last_name: "",
  });

  const [errors, setErrors] = useState<{
    first_name?: string;
    last_name?: string;
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
    const errs: { first_name?: string; last_name?: string } = {};
    if (!formData.first_name!.trim()) errs.first_name = "First name required.";
    if (!formData.last_name!.trim()) errs.last_name = "Last name required.";
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
        formData.first_name!.trim(),
        formData.middle_name!.trim(),
        formData.last_name!.trim()
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
          name="first_name"
          className="form-control"
          placeholder="Enter first name"
          value={formData!.first_name}
          onChange={handleChange}
          required
        />
        {errors.first_name && (
          <small className="text-danger">{errors.first_name}</small>
        )}
      </div>

      <div className="form-group mb-3">
        <label>
          <strong>Middle Name:</strong>
        </label>
        <input
          type="text"
          name="middle_name"
          className="form-control"
          placeholder="Enter middle name"
          value={formData!.middle_name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group mb-3">
        <label>
          <strong>Last Name:</strong>
        </label>
        <input
          type="text"
          name="last_name"
          className="form-control"
          placeholder="Enter last name"
          value={formData!.last_name}
          onChange={handleChange}
          required
        />
        {errors.last_name && (
          <small className="text-danger">{errors.last_name}</small>
        )}
      </div>

      <div className="form-group mb-3">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSaving || !formData!.first_name || !formData!.last_name}
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
