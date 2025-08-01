import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Spinner } from "react-bootstrap";
import type { PhotosData } from "../../../types/member";
import {
  getInstagramURL,
  saveInstagramURL,
} from "../../../services/memberService";

type Props = {
  memberId: string;
};

const EditPhotosTab: React.FC<Props> = ({ memberId }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<PhotosData>({ mode: "onTouched" });

  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const loadPhotosInfo = async () => {
      try {
        const data = await getInstagramURL(memberId);
        reset({ instagramURL: data });
      } catch (error) {
        console.error("Failed to fetch Instagram URL:", error);
      }
    };
    loadPhotosInfo();
  }, [memberId, reset]);

  const onSubmit = async (data: PhotosData) => {
    setIsSaving(true);
    setIsSuccess(false);

    try {
      await saveInstagramURL(memberId, data);
      setIsSuccess(true);
    } catch (error) {
      console.error("Save failed", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="pt-3">
      <p>
        SportProfiles uses a member's public Instagram posts to show their
        images.
      </p>
      <p>
        In order for this feature to work, you will need to do the following:
      </p>
      <p>
        <strong>Go to instagram.com and do:</strong>
      </p>
      <ol>
        <li>Create or use an existing Instagram account.</li>
        <li>Log into the account.</li>
        <li>Add photos of yourself by creating public posts.</li>
        <li>
          Note your Instagram username and your Instagram URL{" "}
          <strong>
            <u>(i.e., www.instagram.com/username)</u>
          </strong>
        </li>
      </ol>
      <p>
        <strong>Return here and do:</strong>
      </p>
      <ol>
        <li>Enter or paste your Instagram URL to the text box below.</li>
        <li>
          Click the save button to store it in our system. We will use it to
          redirect people who want to view your photos to Instagram.
        </li>
      </ol>

      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Form.Group controlId="instagramURL" className="pb-3">
          <Form.Label>
            <strong>Instagram URL:</strong>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Instagram URL (i.e., www.instagram.com/username)"
            isInvalid={!!errors.instagramURL}
            {...register("instagramURL", {
              required: "Instagram URL is required",
              pattern: {
                value:
                  /^https?:\/\/(www\.)?instagram\.com\/[A-Za-z0-9._%-]+\/?$/,
                message: "Invalid Instagram URL format",
              },
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.instagramURL?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="mb-3">
          <Button
            type="submit"
            variant="primary"
            disabled={!isValid || isSubmitting || isSaving}
          >
            {isSaving ? (
              <>
                <Spinner size="sm" animation="border" /> Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>

        {isSuccess && (
          <div style={{ color: "green", marginTop: "10px" }}>
            Saved successfully.
          </div>
        )}
      </Form>
    </div>
  );
};

export default EditPhotosTab;
