import React, { useEffect, useState } from "react";
import { getEducationInfo } from "../../services/memberService";
import type { EducationInfo} from "../../types/member";

type Props = {
  memberId: string;
};

const EducationTab: React.FC<Props> = ({ memberId }) => {
  const [education, setEducation] = useState<EducationInfo[]>([]);

  useEffect(() => {
    getEducationInfo(memberId).then(setEducation);
  }, [memberId]);

  if (!education.length) return <div style={{fontSize:"10pt"}}><br/>No educational information found.</div>;

  const normalizeUrl = (url: string) => {
    if (!url) return "#"; // fallback
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return `https://${url}`;
    }
    return url;
  };

  return (
    <div style={{ maxHeight: "400px", overflowY: "auto", fontSize: "10pt" }}>
      <br />
      {education.map((edu, idx) => (
        <div
          key={idx}
          className="mb-3 border-bottom pb-2"
          style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}
        >
          <a href={edu.webSite!} target="_blank" rel="noreferrer">
            <img
              src={edu.schoolImage}
              style={{ width: "35px", height: "35px", borderRadius: "50%" }}
            />
          </a>
          <div>
            <a
              href={normalizeUrl(edu.webSite!)}
              target="_blank"
              rel="noreferrer"
              style={{textDecoration:"none"}}
            >
              <b>{edu.schoolName}</b>
            </a>
            <div>{edu.schoolAddress}</div>
            <div>
              {edu.yearClass} - {edu.major}
            </div>
            <div>{edu.degree}</div>
            {edu.sportLevelType && <div>Played {edu.sportLevelType}</div>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EducationTab;
