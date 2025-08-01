import React, { useState, useEffect } from 'react';
import { getMemberNotifications, saveNotificationSettings } from '../../services/settingService';
import type { NotificationBody } from '../../types/settings';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

type Props = {
  memberId: string;
};

const NotificationsTab: React.FC<Props> = ({ memberId }) => {
  const [form, setForm] = useState<Omit<NotificationBody, 'memberId'>>({
    sendMsg: false,
    addAsFriend: false,
    confirmFriendShipRequest: false,
    repliesToYourHelpQuest: false,
  });
 
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const userEmail = useSelector((state: RootState) => state.auth.user?.email);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await getMemberNotifications(memberId);
        setForm({
          sendMsg: data.sendMsg,
          addAsFriend: data.addAsFriend,
          confirmFriendShipRequest: data.confirmFriendShipRequest,
          repliesToYourHelpQuest: data.repliesToYourHelpQuest,
        });
      } catch (err) {
        console.error('Failed to load notification settings', err);
      }
    };

    loadNotifications();
  }, [memberId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setIsSuccess(false);
    try {
      const body: NotificationBody = { memberId, ...form };
      await saveNotificationSettings(memberId, body);
      setIsSuccess(true);
    } catch (err) {
      console.error('Error saving notification settings:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <p className="text-muted">
          We will notify you by email whenever actions that involve you are taken. Each site application has its own email
          notification settings. Use this section to change these settings as necessary.
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
              id="sendMsg"
              name="sendMsg"
              checked={form.sendMsg}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="sendMsg">
              Sends you a message
            </label>
          </div>

          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="addAsFriend"
              name="addAsFriend"
              checked={form.addAsFriend}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="addAsFriend">
              Adds you as a contact
            </label>
          </div>

          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="confirmFriendShipRequest"
              name="confirmFriendShipRequest"
              checked={form.confirmFriendShipRequest}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="confirmFriendShipRequest">
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
              id="repliesToYourHelpQuest"
              name="repliesToYourHelpQuest"
              checked={form.repliesToYourHelpQuest}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="repliesToYourHelpQuest">
              Replies to your help questions
            </label>
          </div>
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary" disabled={isSaving}>
            {isSaving ? <i className="fa fa-spinner fa-spin me-2" /> : null}
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>

        {isSuccess && (
          <div className="mb-5">
            <span style={{ color: 'green' }}>Saved successfully.</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default NotificationsTab;
