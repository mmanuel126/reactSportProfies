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

  if (!basicInfo) return <div style ={{fontSize:"10pt"}}><br/><i className="fa fa-spinner fa-spin" /> Loading basic info...</div>;

  const isAthelete =
    basicInfo.currentStatus === "Athlete (Amateur)" ||
    basicInfo.currentStatus === "Athlete (Professional)";

  const showSex = basicInfo.showSexInProfile == "true" && basicInfo.sex != "";
  const showDOB = basicInfo.showDOBType =="true" && basicInfo.memProfileDOB != "";

  let str = "";
    if (basicInfo.lookingForEmployment)
      str = "Employment, ";
    if (basicInfo.lookingForNetworking)
      str = str + "Networking, ";

    if (basicInfo.lookingForPartnership)
      str = str + "Partnership, ";

    if (basicInfo.lookingForRecruitment)
      str = str + "Recruitment, ";
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
      {basicInfo.currentStatus && (
        <>
          <span className="padded-span">
            <span style={{ borderBottom: " solid 1px #e7eadf" }}>
              <b>Status:</b> {basicInfo.currentStatus}
            </span>
          </span>
          <br />
        </>
      )}

      {isAthelete && (
        <>
          {basicInfo.leftRightHandFoot && (
            <>
              <span className="padded-span">
                <span style={{ borderBottom: " solid 1px #e7eadf" }}>
                  <b>Preferred Hand/Foot:</b> {basicInfo.leftRightHandFoot}
                </span>
              </span>
              <br />
            </>
          )}

          {basicInfo.preferredPosition && (
            <>
              <span className="padded-span">
                <span style={{ borderBottom: " solid 1px #e7eadf" }}>
                  <b>Preferred Position:</b> {basicInfo.preferredPosition}
                </span>
              </span>
              <br />
            </>
          )}

          {basicInfo.secondaryPosition && (
            <>
              <span className="padded-span">
                <span style={{ borderBottom: " solid 1px #e7eadf" }}>
                  <b>Secondary Position:</b> {basicInfo.secondaryPosition}
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
              <b>Birth Date:</b> {basicInfo.memProfileDOB}
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
