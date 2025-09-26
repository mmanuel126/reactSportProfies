import { useEffect, useState } from "react";
import { getBasicInfo } from "../../services/memberService";
import type { BasicInfo } from "../../types/member";
import "./ViewMember.css";

type Props = {
  memberId: string;
};

const BasicInfoTab = ({ memberId }: Props) => {
  const [basicInfo, setBasicInfo] = useState<BasicInfo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBasicInfo(memberId);
      setBasicInfo(data);
    };

    fetchData();
  }, [memberId]);

  if (!basicInfo)
    return (
      <div style={{ fontSize: "10pt" }}>
        <br />
        <i className="fa fa-spinner fa-spin" /> Loading basic info...
      </div>
    );

  const isAthelete =
    basicInfo.current_status === "Athlete (Amateur)" ||
    basicInfo.current_status === "Athlete (Professional)";

  const showSex =
    basicInfo.show_sex_in_profile == "true" && basicInfo.sex != "";
  const showDOB = basicInfo.show_dob_type == "true" && basicInfo.dob_day != "";

  let str = "";
  if (basicInfo.looking_for_employment) str = "Employment, ";
  if (basicInfo.looking_for_networking) str = str + "Networking, ";

  if (basicInfo.looking_for_partnership) str = str + "Partnership, ";

  if (basicInfo.looking_for_recruitment) str = str + "Recruitment, ";
  str = str.slice(0, -2);

  const memLookingFor = str;

  return (
    <div style={{ fontSize: "10pt" }}>
      <br />
      {basicInfo.sport && (
        <>
          <span className="padded-span">
            <span style={{ borderBottom: " solid 1px #e7eadf" }}>
              <b>Sport:</b> {basicInfo.sport}
            </span>
          </span>
          <br />
        </>
      )}
      {basicInfo.current_status && (
        <>
          <span className="padded-span">
            <span style={{ borderBottom: " solid 1px #e7eadf" }}>
              <b>Status:</b> {basicInfo.current_status}
            </span>
          </span>
          <br />
        </>
      )}

      {isAthelete && (
        <>
          {basicInfo.left_right_hand_foot && (
            <>
              <span className="padded-span">
                <span style={{ borderBottom: " solid 1px #e7eadf" }}>
                  <b>Preferred Hand/Foot:</b> {basicInfo.left_right_hand_foot}
                </span>
              </span>
              <br />
            </>
          )}

          {basicInfo.preferred_position && (
            <>
              <span className="padded-span">
                <span style={{ borderBottom: " solid 1px #e7eadf" }}>
                  <b>Preferred Position:</b> {basicInfo.preferred_position}
                </span>
              </span>
              <br />
            </>
          )}

          {basicInfo.secondary_position && (
            <>
              <span className="padded-span">
                <span style={{ borderBottom: " solid 1px #e7eadf" }}>
                  <b>Secondary Position:</b> {basicInfo.secondary_position}
                </span>
              </span>
              <br />
            </>
          )}

          {basicInfo.height && (
            <>
              <span className="padded-span">
                <span style={{ borderBottom: " solid 1px #e7eadf" }}>
                  <b>Height:</b> {basicInfo.height}
                </span>
              </span>
              <br />
            </>
          )}

          {basicInfo.weight && (
            <>
              <span className="padded-span">
                <span style={{ borderBottom: " solid 1px #e7eadf" }}>
                  <b>Weight:</b> {basicInfo.weight}
                </span>
              </span>
              <br />
            </>
          )}
        </>
      )}

      {showSex && (
        <>
          <span className="padded-span">
            <span style={{ borderBottom: " solid 1px #e7eadf" }}>
              <b>Gender:</b> {basicInfo.sex}
            </span>
          </span>
          <br />
        </>
      )}

      {showDOB && (
        <>
          <span className="padded-span">
            <span style={{ borderBottom: " solid 1px #e7eadf" }}>
              <b>Birth Date:</b> {basicInfo.dob_month}/{basicInfo.dob_day}/
              {basicInfo.dob_year}
            </span>
          </span>
          <br />
        </>
      )}

      {memLookingFor && (
        <>
          <span className="padded-span">
            <span style={{ borderBottom: " solid 1px #e7eadf" }}>
              <b>Looking for:</b> {memLookingFor}
            </span>
          </span>
          <br />
        </>
      )}

      {basicInfo.bio && (
        <>
          <span className="padded-span">
            <span style={{ borderBottom: " solid 1px #e7eadf" }}>
              <b>Biography:</b> {basicInfo.bio}
            </span>
          </span>
          <br />
        </>
      )}
    </div>
  );
};

export default BasicInfoTab;
