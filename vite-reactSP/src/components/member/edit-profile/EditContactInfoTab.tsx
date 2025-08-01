import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { ContactInfo } from "../../../types/member";
import { getContactInfo, saveContactInfo } from "../../../services/memberService";

interface EditContactInfoTabProps {
  memberId: string;
}

const EditContactInfoTab: React.FC<EditContactInfoTabProps> = ({ memberId }) => {
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

  const email = watch("email");

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
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <small className="text-danger">{errors.email.message}</small>
        )}
      </div>

      <div className="form-group pb-2">
        <input type="checkbox" {...register("showEmailToMembers")} />
        <label>&nbsp;Show this to other members</label>
      </div>

      <div className="form-group pb-3">
        <b>Other Email:</b>
        <input
          className="form-control"
          placeholder="Enter Other Email"
          {...register("otherEmail")}
        />
      </div>

      <hr className="text-secondary border" />

      <div className="form-group pb-3">
        <b>Facebook:</b>
        <input
          className="form-control"
          placeholder="Enter Facebook link"
          {...register("facebook")}
        />
      </div>

      <div className="form-group pb-3">
        <b>Instagram:</b>
        <input
          className="form-control"
          placeholder="Enter Instagram link"
          {...register("instagram")}
        />
      </div>

      <div className="form-group pb-3">
        <b>Twitter Handle:</b>
        <input
          className="form-control"
          placeholder="Enter Twitter handle"
          {...register("twitter")}
        />
      </div>

      <div className="form-group pb-3">
        <b>Website Url:</b>
        <input
          className="form-control"
          placeholder="Enter website Url"
          {...register("website")}
        />
      </div>

      <hr className="text-secondary border" />

      <div className="form-group pb-3">
        <b>Cell Phone:</b>
        <input
          className="form-control"
          style={{ width: 200 }}
          placeholder="Enter Cell Phone"
          {...register("cellPhone")}
        />
      </div>

      <div className="form-group pb-2">
        <input type="checkbox" {...register("showCellPhone")} />
        <label>&nbsp;Show cell phone to other members</label>
      </div>

      <div className="form-group pb-3">
        <b>Home Phone:</b>
        <input
          className="form-control"
          style={{ width: 200 }}
          placeholder="Enter Home Phone"
          {...register("homePhone")}
        />
      </div>

      <div className="form-group pb-2">
        <input type="checkbox" {...register("showHomePhone")} />
        <label>&nbsp;Show home phone to other members</label>
      </div>

      <hr className="text-secondary border" />

      <div className="form-group pb-3">
        <b>Address:</b>
        <input
          className="form-control"
          placeholder="Enter Address"
          {...register("address")}
        />
      </div>

      <div className="form-group pb-2">
        <input type="checkbox" {...register("showAddress")} />
        <label>&nbsp;Show address to other members</label>
      </div>

      <div className="form-group pb-3">
        <b>City:</b>
        <input
          className="form-control"
          style={{ width: 250 }}
          placeholder="Enter City"
          {...register("city")}
        />
      </div>

      <div className="form-group pb-3">
        <b>State:</b>
        <input
          className="form-control"
          style={{ width: 200 }}
          placeholder="Enter State"
          {...register("state")}
        />
      </div>

      <div className="form-group pb-3">
        <b>Zip Code:</b>
        <input
          className="form-control"
          style={{ width: 200 }}
          placeholder="Enter Zip Code"
          {...register("zip")}
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
