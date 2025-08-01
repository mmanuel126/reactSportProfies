import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import {
  getStates,
  getSchools,
  getYears,
} from "../../../services/commonService"; 

type Props = {
  show: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (formData: any) => void;
};

type School = { schoolId: string; schoolName: string };
type StateItem = { abbreviation: string; name: string };

const AddNewSchoolModal: React.FC<Props> = ({ show, onClose, onSave }) => {
  const [form, setForm] = useState({
    schoolType: "3",
    schoolAddress: "",
    schoolID: "",
    major: "",
    degree: "",
    yearClass: "",
    sportLevelType: "",
  });

  const [states, setStates] = useState<StateItem[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getStates().then(setStates);
    getYears(2040, 1900).then(setYears);
  }, []);

  useEffect(() => {
    if (form.schoolAddress) {
      getSchools(form.schoolAddress, form.schoolType).then(setSchools);
    } else {
      setSchools([]);
    }
  }, [form.schoolID, form.schoolType, form.schoolAddress]);

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const markTouched = (name: string) =>
    setTouched((prev) => ({ ...prev, [name]: true }));

  const isInvalid = (field: string) => {
    return touched[field] && !form[field as keyof typeof form];
  };

  const isFormValid = () =>
    form.schoolAddress &&
    form.schoolID &&
    form.major &&
    form.degree &&
    form.yearClass &&
    form.sportLevelType;

  const handleSubmit = async () => {
    if (!isFormValid()) {
      setTouched({
        schoolAddress: true,
        schoolID: true,
        major: true,
        degree: true,
        yearClass: true,
        sportLevelType: true,
      });
      return;
    }

    setIsSaving(true);
    try {
      await onSave(form);
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New School</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate>
          <Form.Group className="mb-2">
            <Form.Label>
              <strong>Institution Type:</strong>
            </Form.Label>
            <Form.Select
              name="schoolType"
              value={form.schoolType}
              onChange={handleChange}
              autoFocus
            >
              <option value="3">Colleges</option>
              <option value="1">Public High Schools</option>
              <option value="2">Private High Schools</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>
              <strong>State:</strong>
            </Form.Label>
            <Form.Select
              name="schoolAddress"
              value={form.schoolAddress}
              onChange={handleChange}
              onBlur={() => markTouched("schoolAddress")}
              isInvalid={isInvalid("schoolAddress")}
            >
              <option value="">Select State...</option>
              {states.map((s) => (
                <option key={s.abbreviation} value={s.abbreviation}>
                  {s.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              State is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>
              <strong>School</strong>{" "}
              <span style={{ fontSize: "8pt" }}>
                (If not listed, let us know!)
              </span>
            </Form.Label>
            <Form.Select
              name="schoolID"
              value={form.schoolID}
              onChange={handleChange}
              onBlur={() => markTouched("schoolID")}
              isInvalid={isInvalid("schoolID")}
              style={{ width: "320px" }}
            >
              <option value="">Select school...</option>
              {schools.map((s) => (
                <option key={s.schoolId} value={s.schoolId}>
                  {s.schoolName}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              School is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>
              <strong>Field of Study (or Major):</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="major"
              value={form.major}
              placeholder="Enter Major"
              onChange={handleChange}
              onBlur={() => markTouched("major")}
              isInvalid={isInvalid("major")}
            />
            <Form.Control.Feedback type="invalid">
              Major required.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>
              <strong>Degree:</strong>
            </Form.Label>
            <Form.Select
              name="degree"
              value={form.degree}
              onChange={handleChange}
              onBlur={() => markTouched("degree")}
              isInvalid={isInvalid("degree")}
            >
              <option value="">Select...</option>
              <option value="2">Post Graduate</option>
              <option value="1">Undergraduate</option>
              <option value="3">High School Diploma</option>
              <option value="4">GED</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Degree is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>
              <strong>Year:</strong>
            </Form.Label>
            <Form.Select
              name="yearClass"
              value={form.yearClass}
              onChange={handleChange}
              onBlur={() => markTouched("yearClass")}
              isInvalid={isInvalid("yearClass")}
            >
              <option value="">Select Year...</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Year is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>
              <strong>Sport Competition Level:</strong>
            </Form.Label>
            <Form.Select
              name="sportLevelType"
              value={form.sportLevelType}
              onChange={handleChange}
              onBlur={() => markTouched("sportLevelType")}
              isInvalid={isInvalid("sportLevelType")}
            >
              <option value="">Select...</option>
              <option value="Division I">Division I</option>
              <option value="Division II">Division II</option>
              <option value="Division III">Division III</option>
              <option value="Club Sports">Club Sports</option>
              <option value="Intramurals Sports">Intramural Sports</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Competition level required.
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!isFormValid() || isSaving}
        >
          {isSaving ? (
            <>
              <Spinner size="sm" animation="border" /> Saving...
            </>
          ) : (
            "Add"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNewSchoolModal;
