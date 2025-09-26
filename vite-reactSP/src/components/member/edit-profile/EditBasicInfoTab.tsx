import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { BasicInfo } from "../../../types/member";
import { getBasicInfo, saveBasicInfo } from "../../../services/memberService";
import { getSportsList } from "../../../services/commonService";
import type { Sports } from "../../../types/common";

type Props = {
  memberId: string;
};

const EditBasicInfoTab = ({ memberId }: Props) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [sportsList, setSportsList] = useState<Sports[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, touchedFields, isValid },
  } = useForm<BasicInfo>({
    mode: "onChange",
    defaultValues: {},
  });

  const isAthlete = watch("current_status")?.includes("Athlete");

  useEffect(() => {
    getBasicInfo(memberId).then((data) => {
      Object.entries(data).forEach(([key, value]) =>
        setValue(key as keyof BasicInfo, value)
      );
    });
  }, [memberId, setValue]);

  useEffect(() => {
    getSportsList().then((data) => {
      setSportsList(data);
    });
  }, []);

  const onSubmit = async (data: BasicInfo) => {
    setIsSaving(true);
    try {
      await saveBasicInfo(memberId, data); // your save service call
      setIsSuccess(true);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group pb-3 pt-3">
        <b>First Name:</b>
        <input
          className="form-control"
          placeholder="Enter First Name"
          {...register("first_name", { required: true })}
        />
        {errors.first_name && touchedFields.first_name && (
          <span className="text-danger">First name required.</span>
        )}
      </div>

      <div className="form-group pb-3">
        <b>Middle Name:</b>
        <input
          className="form-control"
          placeholder="Enter Middle Name"
          {...register("middle_name")}
        />
      </div>

      <div className="form-group pb-3">
        <b>Last Name:</b>
        <input
          className="form-control"
          placeholder="Enter Last Name"
          {...register("last_name", { required: true })}
        />
        {errors.last_name && touchedFields.last_name && (
          <span className="text-danger">Last name required.</span>
        )}
      </div>

      <div className="form-group pb-3">
        <b>Title:</b>
        <input
          className="form-control"
          placeholder="Basketball Player, Sport Enthusiast..."
          {...register("title_desc", { required: true })}
        />
        {errors.title_desc && (
          <span className="text-danger">Title required.</span>
        )}
      </div>

      <div className="form-group pb-3">
        <b>Your Main Sport:</b>
        <select
          className="form-control"
          {...register("sport", { required: true })}
        >
          <option value="">Select sport...</option>
          {sportsList.map((sport) => (
            <option key={sport.id} value={sport.name}>
              {sport.name}
            </option>
          ))}
        </select>
        {errors.sport && (
          <span className="text-danger">Sport is required.</span>
        )}
      </div>

      <div className="form-group pb-3">
        <b>Current Status:</b>
        <select
          className="form-control"
          {...register("current_status", { required: true })}
        >
          <option value="">Select status...</option>
          {[
            "Agent",
            "Athlete (Amateur)",
            "Athlete (Professional)",
            "Athletic Trainer",
            "Coach",
            "Management",
            "Referee",
            "Retired",
            "Scout",
            "Sports Fanatic",
          ].map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        {errors.current_status && (
          <span className="text-danger">Status is required.</span>
        )}
      </div>

      {/* Conditional Athlete Fields */}
      {isAthlete && (
        <>
          <div className="form-group pb-3">
            <b>Preferred Hand/Foot:</b>
            <select
              className="form-control"
              {...register("left_right_hand_foot")}
            >
              <option value="Left">Left</option>
              <option value="Right">Right</option>
            </select>
          </div>

          <div className="form-group pb-3">
            <b>Preferred Position:</b>
            <input
              className="form-control"
              placeholder="Enter preferred position..."
              {...register("preferred_position")}
            />
          </div>

          <div className="form-group pb-3">
            <b>Secondary Position:</b>
            <input
              className="form-control"
              placeholder="Enter secondary position..."
              {...register("secondary_position")}
            />
          </div>

          <div className="form-group pb-3">
            <b>Height:</b>
            <select className="form-control" {...register("height")}>
              <option value="">Select height...</option>
              {[...Array(37)].map((_, i) => {
                const feet = Math.floor(i / 12) + 4;
                const inches = i % 12;
                return (
                  <option key={i}>
                    {feet}' {inches}"
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group pb-3">
            <b>Weight:</b>
            <select className="form-control" {...register("weight")}>
              <option value="">Select weight...</option>
              {[...Array(251)].map((_, i) => (
                <option key={i} value={`${i + 50} lbs`}>
                  {i + 50} lbs
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      <div className="form-group pb-3">
        <b>Bio:</b>
        <textarea
          className="form-control"
          style={{ height: "70px" }}
          {...register("bio")}
        />
      </div>

      {/* Additional fields (gender, DOB, checkboxes, etc.) would go here */}
      {/* You can expand based on the same pattern */}

      <button
        type="submit"
        className="btn btn-primary"
        disabled={!isValid || isSaving}
      >
        {isSaving ? (
          <>
            <i className="fa fa-spinner fa-spin" /> Saving...
          </>
        ) : (
          "Save"
        )}
      </button>

      {isSuccess && (
        <div style={{ color: "green", marginTop: "10px" }}>
          Saved successfully.
        </div>
      )}
    </form>
  );
};

export default EditBasicInfoTab;
