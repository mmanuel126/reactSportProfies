import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { ContactInfo } from "../../../types/member";
import {
  getContactInfo,
  saveContactInfo,
} from "../../../services/memberService";

interface EditContactInfoTabProps {
  memberId: string;
}

const EditContactInfoTab: React.FC<EditContactInfoTabProps> = ({
  memberId,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactInfo>({
    mode: "onBlur", // optional: enables blur-based validation
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const email = watch("Email");

  useEffect(() => {
    const loadContactInfo = async () => {
      try {
        const data = await getContactInfo(memberId);
        // Explicitly set each field's value
        for (const key in data) {
          setValue(key as keyof ContactInfo, data[key as keyof ContactInfo]);
        }
      } catch (error) {
        console.error("Failed to fetch contact info:", error);
      }
    };
    loadContactInfo();
  }, [setValue, memberId]);

  const onSubmit = async (data: ContactInfo) => {
    setIsSaving(true);
    setIsSuccess(false);
    try {
      await saveContactInfo(memberId, data);
      setIsSuccess(true);
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group pb-3 pt-3">
        <b>Email:</b>
        <input
          className="form-control"
          placeholder="Enter Email"
          {...register("Email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
        />
        {errors.Email && (
          <small className="text-danger">{errors.Email.message}</small>
        )}
      </div>

      <div className="form-group pb-2">
        <input type="checkbox" {...register("ShowEmailToMembers")} />
        <label>&nbsp;Show this to other members</label>
      </div>

      <div className="form-group pb-3">
        <b>Other Email:</b>
        <input
          className="form-control"
          placeholder="Enter Other Email"
          {...register("OtherEmail")}
        />
      </div>

      <hr className="text-secondary border" />

      <div className="form-group pb-3">
        <b>Facebook:</b>
        <input
          className="form-control"
          placeholder="Enter Facebook link"
          {...register("Facebook")}
        />
      </div>

      <div className="form-group pb-3">
        <b>Instagram:</b>
        <input
          className="form-control"
          placeholder="Enter Instagram link"
          {...register("Instagram")}
        />
      </div>

      <div className="form-group pb-3">
        <b>Twitter Handle:</b>
        <input
          className="form-control"
          placeholder="Enter Twitter handle"
          {...register("Twitter")}
        />
      </div>

      <div className="form-group pb-3">
        <b>Website Url:</b>
        <input
          className="form-control"
          placeholder="Enter website Url"
          {...register("Website")}
        />
      </div>

      <hr className="text-secondary border" />

      <div className="form-group pb-3">
        <b>Cell Phone:</b>
        <input
          className="form-control"
          style={{ width: 200 }}
          placeholder="Enter Cell Phone"
          {...register("CellPhone")}
        />
      </div>

      <div className="form-group pb-2">
        <input type="checkbox" {...register("ShowCellPhone")} />
        <label>&nbsp;Show cell phone to other members</label>
      </div>

      <div className="form-group pb-3">
        <b>Home Phone:</b>
        <input
          className="form-control"
          style={{ width: 200 }}
          placeholder="Enter Home Phone"
          {...register("HomePhone")}
        />
      </div>

      <div className="form-group pb-2">
        <input type="checkbox" {...register("ShowHomePhone")} />
        <label>&nbsp;Show home phone to other members</label>
      </div>

      <hr className="text-secondary border" />

      <div className="form-group pb-3">
        <b>Address:</b>
        <input
          className="form-control"
          placeholder="Enter Address"
          {...register("Address")}
        />
      </div>

      <div className="form-group pb-2">
        <input type="checkbox" {...register("ShowAddress")} />
        <label>&nbsp;Show address to other members</label>
      </div>

      <div className="form-group pb-3">
        <b>City:</b>
        <input
          className="form-control"
          style={{ width: 250 }}
          placeholder="Enter City"
          {...register("City")}
        />
      </div>

      <div className="form-group pb-3">
        <b>State:</b>
        <input
          className="form-control"
          style={{ width: 200 }}
          placeholder="Enter State"
          {...register("State")}
        />
      </div>

      <div className="form-group pb-3">
        <b>Zip Code:</b>
        <input
          className="form-control"
          style={{ width: 200 }}
          placeholder="Enter Zip Code"
          {...register("Zip")}
        />
      </div>

      <hr className="text-secondary border" />

      <div>
        <button
          type="submit"
          className="btn btn-primary btn-md"
          disabled={isSaving || !email}
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

      <div className="pb-5">
        {isSuccess && <span className="text-success">Saved successfully.</span>}
      </div>

      <div className="clearfix" />
    </form>
  );
};

export default EditContactInfoTab;
