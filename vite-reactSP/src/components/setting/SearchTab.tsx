import React, { useEffect, useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import type { SearchSettings } from "../../types/settings";
import {
  getSearchSettings,
  saveSearchSettings,
} from "../../services/settingService";

const visibilityOptions = [
  { value: "1", label: "Everyone" },
  { value: "2", label: "Only Contacts" },
];

type Props = {
  memberId: string;
};

const SearchTab: React.FC<Props> = ({ memberId }) => {
  const [settings, setSettings] = useState<SearchSettings | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSearchSuccess, setIsSearchSuccess] = useState(false);

  useEffect(() => {
    getSearchSettings(memberId).then(setSettings);
  }, [memberId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;

    setSettings((prev) => ({
      ...prev!,
      [name]:
        type === "checkbox" && target instanceof HTMLInputElement
          ? target.checked
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setIsSaving(true);
    try {
      await saveSearchSettings(memberId, settings);
      setIsSearchSuccess(true);
    } catch (error) {
      console.error("Save failed:", error);
      setIsSearchSuccess(false);
    } finally {
      setIsSaving(false);
    }
  };

  if (!settings) {
    return <div>Loading search settings...</div>;
  }

  return (
    <Form className="form-horizontal" onSubmit={handleSubmit}>
      <p style={{ padding: "10px 18px 10px 6px" }}>
        You can control who can find you while they are searching by adjusting
        the settings below.
      </p>

      <h5 className="mb-2">Visibility</h5>
      <Form.Group controlId="ddlVisible" className="mb-4">
        <Form.Label>
          <strong>You are visible to:</strong>
        </Form.Label>
        <Form.Select
          name="Visibility"
          value={settings.Visibility}
          onChange={handleChange}
          style={{ width: "auto", height: "auto", paddingTop: "10px" }}
        >
          {visibilityOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <h5 className="mb-2">Result Content</h5>
      <Form.Group className="mb-4">
        <Form.Check
          id="chkProfile"
          name="ViewProfilePicture"
          checked={settings.ViewProfilePicture}
          onChange={handleChange}
          label="Your profile picture"
        />
        <Form.Check
          id="chkContactList"
          name="ViewFriendsList"
          checked={settings.ViewFriendsList}
          onChange={handleChange}
          label="Your Contacts list"
        />
        <Form.Check
          id="chkAddContactLink"
          name="ViewLinksToRequestAddingYouAsFriend"
          checked={settings.ViewLinksToRequestAddingYouAsFriend}
          onChange={handleChange}
          label="A link to request adding you as a Contact"
        />
        <Form.Check
          id="chkSendMessage"
          name="ViewLinkTSendYouMsg"
          checked={settings.ViewLinkTSendYouMsg}
          onChange={handleChange}
          label="A link to send you a message"
        />
      </Form.Group>

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
        {isSearchSuccess && (
          <span style={{ color: "green" }}>Saved successfully.</span>
        )}
      </div>
    </Form>
  );
};

export default SearchTab;
