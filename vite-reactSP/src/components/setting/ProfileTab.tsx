import React, { useEffect, useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import type { PrivacySettings } from "../../types/settings";
import {
  getProfileSettings,
  saveProfileSettings,
} from "../../services/settingService";

const visibilityOptions = [
  { value: "1", label: "Public" },
  { value: "2", label: "Private" },
  { value: "3", label: "Only Contacts" },
];

type Props = {
  memberId: string;
};

const ProfileTab: React.FC<Props> = ({ memberId }) => {
  const [settings, setSettings] = useState<PrivacySettings>();
  const [isSaving, setIsSaving] = useState(false);
  const [isProfileSuccess, setIsProfileSuccess] = useState(false);

  useEffect(() => {
    getProfileSettings(memberId).then(setSettings);
  }, [memberId]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev!, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await saveProfileSettings(memberId, settings!);
      setIsProfileSuccess(true);
    } catch {
      setIsProfileSuccess(false);
    } finally {
      setIsSaving(false);
    }
  };

  const renderSelect = (label: string, name: keyof PrivacySettings) => (
    <tr>
      <td
        className="pe-2 text-end align-middle"
        style={{ whiteSpace: "nowrap" }}
      >
        {label}:
      </td>
      <td>
        <Form.Select
          name={name}
          value={settings![name]}
          onChange={handleChange}
          className="form-control"
          style={{ width: "auto", height: "auto" }}
        >
          {visibilityOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Form.Select>
      </td>
    </tr>
  );

  //Prevent render until settings is loaded
  if (!settings) {
    return <div>Loading profile settings...</div>;
  }

  return (
    <Form className="form-horizontal" onSubmit={handleSubmit}>
      <p style={{ padding: "10px 18px 10px 6px" }}>
        You can control who can view your profile and related information by
        adjusting these settings.
      </p>

      <table className="mb-3" style={{ paddingLeft: "30px" }}>
        <tbody>
          {renderSelect("Basic Information", "BasicInfo")}
          {renderSelect("Personal Information", "PersonalInfo")}
          {renderSelect("Contacts", "ContactInfo")}
          {renderSelect("Education", "Education")}
          {renderSelect("Mobile Phone", "MobilePhone")}
          {renderSelect("Other Phone", "OtherPhone")}
          {renderSelect("Email Address", "EmailAddress")}
        </tbody>
      </table>

      <div className="mb-3">
        <Button type="submit" className="btn btn-primary" disabled={isSaving}>
          {isSaving && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}{" "}
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>

      <div style={{ paddingBottom: "60px" }}>
        {isProfileSuccess && (
          <span style={{ color: "green" }}>Saved successfully.</span>
        )}
      </div>
    </Form>
  );
};

export default ProfileTab;
