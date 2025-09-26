import React, { useEffect, useState } from "react";
import {
  getEducationInfo,
  saveNewSchool,
  removeSchool,
  updateSchool,
} from "../../../services/memberService";
import type { EducationInfo } from "../../../types/member";
import AddNewSchoolModal from "./AddNewSchoolModal";
import CommonBaseModal from "../../CommonBaseModal";
import EditSchoolModal from "./EditSchoolModal";

type Props = {
  memberId: string;
};

const EducationTab: React.FC<Props> = ({ memberId }) => {
  const [education, setEducation] = useState<EducationInfo[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemovePopup, setShowRemovePopup] = useState(false);
  const [schoolToRemove, setSchoolToRemove] = useState<EducationInfo | null>(
    null
  );
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [schoolToEdit, setSchoolToEdit] = useState<EducationInfo | null>(null);

  useEffect(() => {
    getEducationInfo(memberId).then(setEducation);
  }, [memberId]);

  if (!education.length)
    return (
      <div style={{ fontSize: "10pt" }}>
        <br />
        No educational information found.
      </div>
    );

  const normalizeUrl = (url: string) => {
    if (!url) return "#"; // fallback
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return `https://${url}`;
    }
    return url;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doSaveEducationInfo = async (data: any) => {
    await saveNewSchool(memberId, data);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doEditEducationInfo = async (data: any) => {
    await updateSchool(memberId, data);
  };

  const handleRemoveSchool = async () => {
    if (!schoolToRemove) return;

    try {
      await removeSchool(memberId, schoolToRemove.school_id, "3"); // or whatever field identifies the school
      const updatedEducation = await getEducationInfo(memberId);
      setEducation(updatedEducation);
    } catch (error) {
      console.error("Failed to remove school", error);
    } finally {
      setSchoolToRemove(null);
      setShowRemovePopup(false);
    }
  };

  return (
    <div style={{ fontSize: "10pt" }}>
      <br />
      {/* Add School button */}
      <div>
        <a
          title="Add a school you attended."
          style={{
            color: "#0066CC",
            fontSize: "10pt",
            fontWeight: "normal",
            textDecoration: "none",
            cursor: "pointer",
          }}
          onClick={() => {
            setShowAddModal(true);
          }}
        >
          <i className="fa fa-plus" style={{ color: "black" }}></i>&nbsp;Add
          School
        </a>
      </div>
      <div>
        <hr style={{ color: "darkgray", border: "solid 1px #e7eadf" }} />
      </div>
      {education.map((edu, idx) => (
        <div
          key={idx}
          className="mb-3 border-bottom pb-2"
          style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}
        >
          <a href={edu.web_site!} target="_blank" rel="noreferrer">
            <img
              src={edu.school_image}
              style={{ width: "35px", height: "35px", borderRadius: "50%" }}
            />
          </a>
          <div>
            <a
              href={normalizeUrl(edu.web_site!)}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              <b>{edu.school_name}</b>
            </a>
            <div>{edu.school_address}</div>
            <div>
              {edu.year_class} - {edu.major}
            </div>
            <div>{edu.degree}</div>
            {edu.sport_level_type && <div>Played {edu.sport_level_type}</div>}

            <div>
              <a
                onClick={() => {
                  setSchoolToEdit(edu);
                  setShowEditPopup(true);
                }}
                id="lbEdit"
                style={{
                  color: "#0066CC",
                  fontSize: "10pt",
                  fontWeight: "normal",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                title="Edit information on this school you attended."
              >
                <i className="fa fa-edit" style={{ color: "black" }}></i>Edit
              </a>

              <span id="lblBreak">&nbsp;|&nbsp;</span>

              <a
                onClick={() => {
                  setSchoolToRemove(edu);
                  setShowRemovePopup(true);
                }}
                id="lbRemove"
                style={{
                  color: "#0066CC",
                  fontSize: "10pt",
                  fontWeight: "normal",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                title="Remove this from your list of attended schools."
              >
                <i className="fa fa-trash-alt"></i>Remove
              </a>
              <br />
              <br />
            </div>
          </div>
        </div>
      ))}

      <AddNewSchoolModal
        show={showAddModal}
        onClose={() => {
          setShowAddModal(false);
        }}
        onSave={async (formData) => {
          await doSaveEducationInfo(formData);
          const updatedEducation = await getEducationInfo(memberId);
          setEducation(updatedEducation);
          setShowAddModal(false);
        }}
      />

      <CommonBaseModal
        show={showRemovePopup}
        onHide={() => setShowRemovePopup(false)}
        onSend={handleRemoveSchool}
        titleText="Remove School"
        bodyText={`Do you really want to remove the school?`}
        actionButtonText="Remove"
      />

      <EditSchoolModal
        show={showEditPopup}
        onClose={() => {
          setShowEditPopup(false);
        }}
        onSave={async (formData) => {
          await doEditEducationInfo(formData);
          const updatedEducation = await getEducationInfo(memberId);
          setEducation(updatedEducation);
          setShowEditPopup(false);
        }}
        schoolToEdit={schoolToEdit}
      />
    </div>
  );
};

export default EducationTab;
