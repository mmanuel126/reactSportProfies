import React, { useState } from "react";
import type { ChangeEvent } from "react";
import { Button, Spinner } from "react-bootstrap";
import { UploadProfilePhoto } from "../../services/settingService";

type Props = {
  memberId: string;
};

const ChangePhotoTab: React.FC<Props> = ({ memberId }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setErrorMsg("");
  };

  const validateFile = (file: File): string | null => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/svg",
      "image/gif",
    ];

    if (!file) return "Upload file is required. Please choose a file!";
    if (!allowedTypes.includes(file.type)) {
      return "Only image file types .jpg, .png, .svg, and .gif are allowed!";
    }
    if (file.size > 3000000) {
      return "The chosen image file size is too big! Only file size of 3 megabytes or less allowed.";
    }
    return null;
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      setErrorMsg("Upload file is required. Please choose a file!");
      return;
    }

    const validationError = validateFile(selectedFile);
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setIsSaving(true);
    try {
      await UploadProfilePhoto(memberId, selectedFile);
      window.location.reload(); // Optional: reload to reflect new image
    } catch (err) {
      console.error("Upload failed:", err);
      setErrorMsg("Upload failed. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mt-4">
      <form className="form-horizontal" onSubmit={handleUpload}>
        <br />
        {/* File input */}
        <div className="form-group mb-3">
          <input
            type="file"
            className="form-control-file"
            name="txtFile"
            onChange={handleFileChange}
          />
          {errorMsg && (
            <div style={{ color: "red", marginTop: "5px" }}>{errorMsg}</div>
          )}
        </div>

        {/* Upload button */}
        <div className="mb-5">
          <Button
            type="submit"
            disabled={isSaving}
            className="btn btn-primary btn-md"
          >
            {isSaving ? (
              <>
                <Spinner size="sm" animation="border" className="me-2" />
                Uploading...
              </>
            ) : (
              "Upload Photo"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePhotoTab;
