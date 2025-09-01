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
    basicInfo.CurrentStatus === "Athlete (Amateur)" ||
    basicInfo.CurrentStatus === "Athlete (Professional)";

  const showSex = basicInfo.ShowSexInProfile == "true" && basicInfo.Sex != "";
  const showDOB =
    basicInfo.ShowDOBType == "true" && basicInfo.MemProfileDOB != "";

  let str = "";
  if (basicInfo.LookingForEmployment) str = "Employment, ";
  if (basicInfo.LookingForNetworking) str = str + "Networking, ";

  if (basicInfo.LookingForPartnership) str = str + "Partnership, ";

  if (basicInfo.LookingForRecruitment) str = str + "Recruitment, ";
  str = str.slice(0, -2);

  const memLookingFor = str;

  return (
    <div style={{ fontSize: "10pt" }}>
      <br />
      {basicInfo.Sport && (
        <>
          <span className="padded-span">
            <span style={{ borderBottom: " solid 1px #e7eadf" }}>
              <b>Sport:</b> {basicInfo.Sport}
            </span>
          </span>
          <br />
        </>
      )}
      {basicInfo.CurrentStatus && (
        <>
          <span className="padded-span">
            <span style={{ borderBottom: " solid 1px #e7eadf" }}>
              <b>Status:</b> {basicInfo.CurrentStatus}
            </span>
          </span>
          <br />
        </>
      )}

      {isAthelete && (
        <>
          {basicInfo.LeftRightHandFoot && (
            <>
              <span className="padded-span">
                <span style={{ borderBottom: " solid 1px #e7eadf" }}>
                  <b>Preferred Hand/Foot:</b> {basicInfo.LeftRightHandFoot}
                </span>
              </span>
              <br />
            </>
          )}

          {basicInfo.PreferredPosition && (
            <>
              <span className="padded-span">
                <span style={{ borderBottom: " solid 1px #e7eadf" }}>
                  <b>Preferred Position:</b> {basicInfo.PreferredPosition}
                </span>
              </span>
              <br />
            </>
          )}

          {basicInfo.SecondaryPosition && (
            <>
              <span className="padded-span">
                <span style={{ borderBottom: " solid 1px #e7eadf" }}>
                  <b>Secondary Position:</b> {basicInfo.SecondaryPosition}
                </span>
              </span>
              <br />
            </>
          )}

          {basicInfo.Height && (
            <>
              <span className="padded-span">
                <span style={{ borderBottom: " solid 1px #e7eadf" }}>
                  <b>Height:</b> {basicInfo.Height}
                </span>
              </span>
              <br />
            </>
          )}

          {basicInfo.Weight && (
            <>
              <span className="padded-span">
                <span style={{ borderBottom: " solid 1px #e7eadf" }}>
                  <b>Weight:</b> {basicInfo.Weight}
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
              <b>Gender:</b> {basicInfo.Sex}
            </span>
          </span>
          <br />
        </>
      )}

      {showDOB && (
        <>
          <span className="padded-span">
            <span style={{ borderBottom: " solid 1px #e7eadf" }}>
              <b>Birth Date:</b> {basicInfo.MemProfileDOB}
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

      {basicInfo.Bio && (
        <>
          <span className="padded-span">
            <span style={{ borderBottom: " solid 1px #e7eadf" }}>
              <b>Biography:</b> {basicInfo.Bio}
            </span>
          </span>
          <br />
        </>
      )}
    </div>
  );
};

export default BasicInfoTab;
