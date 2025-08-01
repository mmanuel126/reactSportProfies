import React, { useEffect, useState } from 'react';
import { getChannelID, saveChannelID } from "../../../services/memberService";

type Props = {
  memberId: string;
};

const EditVideosTab: React.FC<Props> = ({memberId}) => {
  const [channelID, setChannelID] = useState('');
  const [touched, setTouched] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Load channel ID when component mounts
    getChannelID(memberId).then((id) => {
      setChannelID(id);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!channelID.trim()) return;

    setIsSaving(true);
    setIsSaved(false);

    try {
      await saveChannelID(memberId, channelID.trim());
      setIsSaved(true);
    } catch (err) {
      console.error('Failed to save Channel ID:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const isValid = channelID.trim() !== '';

  return (
    <div className="container mt-4">
      <p>
        SportProfiles uses a member's public YouTube playlists to show and play their videos.
        To enable this, follow the steps below:
      </p>

      <p><strong>Go to YouTube.com and:</strong></p>
      <ol>
        <li>Create or use an existing YouTube account.</li>
        <li>Log into your account.</li>
        <li>Click the profile icon (top right corner).</li>
        <li>Select <em>Channel</em> from the menu.</li>
        <li>Click on <em>Customize Channel</em>.</li>
        <li>Create/manage playlists and videos.</li>
        <li>Go to <em>Settings</em> {'>'} <em>View Advanced Settings</em>.</li>
        <li>Copy the <strong>Channel ID</strong>.</li>
      </ol>

      <p><strong>Then come back here and:</strong></p>
      <ol>
        <li>Paste your <strong>Channel ID</strong> below.</li>
        <li>Click Save to store it in our system.</li>
      </ol>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="channelID" className="form-label"><strong>YouTube Channel ID:</strong></label>
          <input
            type="text"
            id="channelID"
            name="channelID"
            className={`form-control ${touched && !isValid ? 'is-invalid' : ''}`}
            placeholder="Enter YouTube Channel ID"
            value={channelID}
            onChange={(e) => setChannelID(e.target.value)}
            onBlur={() => setTouched(true)}
            required
          />
          {touched && !isValid && (
            <div className="invalid-feedback">Channel ID is required.</div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={!isValid || isSaving}
        >
          {isSaving ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Saving...
            </>
          ) : (
            'Save'
          )}
        </button>

        {isSaved && (
          <div className="mt-3 text-success">
            Saved successfully.
          </div>
        )}
      </form>
    </div>
  );
};

export default EditVideosTab;