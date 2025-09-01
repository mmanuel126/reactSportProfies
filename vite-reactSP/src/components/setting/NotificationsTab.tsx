import React, { useState, useEffect } from "react";
import {
  getMemberNotifications,
  saveNotificationSettings,
} from "../../services/settingService";
import type { NotificationBody } from "../../types/settings";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

type Props = {
  memberId: string;
};

const NotificationsTab: React.FC<Props> = ({ memberId }) => {
  const [form, setForm] = useState<Omit<NotificationBody, "memberId">>({
    SendMsg: false,
    AddAsFriend: false,
    ConfirmFriendShipRequest: false,
    RepliesToYourHelpQuest: false,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const userEmail = useSelector((state: RootState) => state.auth.user?.email);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await getMemberNotifications(memberId);
        setForm({
          SendMsg: data.SendMsg,
          AddAsFriend: data.AddAsFriend,
          ConfirmFriendShipRequest: data.ConfirmFriendShipRequest,
          RepliesToYourHelpQuest: data.RepliesToYourHelpQuest,
        });
      } catch (err) {
        console.error("Failed to load notification settings", err);
      }
    };

    loadNotifications();
  }, [memberId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setIsSuccess(false);
    try {
      const body: NotificationBody = { MemberID: memberId, ...form };
      await saveNotificationSettings(memberId, body);
      setIsSuccess(true);
    } catch (err) {
      console.error("Error saving notification settings:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <p className="text-muted">
          We will notify you by email whenever actions that involve you are
          taken. Each site application has its own email notification settings.
          Use this section to change these settings as necessary.
        </p>

        <p>
          You will be emailed at <strong>{userEmail}</strong> whenever someone:
        </p>

        <div className="mb-4">
          <h5>SportProfiles</h5>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="SendMsg"
              name="SendMsg"
              checked={form.SendMsg}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="SendMsg">
              Sends you a message
            </label>
          </div>

          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="AddAsFriend"
              name="AddAsFriend"
              checked={form.AddAsFriend}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="AddAsFriend">
              Adds you as a contact
            </label>
          </div>

          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="ConfirmFriendShipRequest"
              name="ConfirmFriendShipRequest"
              checked={form.ConfirmFriendShipRequest}
              onChange={handleChange}
            />
            <label
              className="form-check-label"
              htmlFor="ConfirmFriendShipRequest"
            >
              Confirms a contact request
            </label>
          </div>
        </div>

        <div className="mb-4">
          <h5>Help</h5>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="RepliesToYourHelpQuest"
              name="RepliesToYourHelpQuest"
              checked={form.RepliesToYourHelpQuest}
              onChange={handleChange}
            />
            <label
              className="form-check-label"
              htmlFor="RepliesToYourHelpQuest"
            >
              Replies to your help questions
            </label>
          </div>
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary" disabled={isSaving}>
            {isSaving ? <i className="fa fa-spinner fa-spin me-2" /> : null}
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>

        {isSuccess && (
          <div className="mb-5">
            <span style={{ color: "green" }}>Saved successfully.</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default NotificationsTab;
