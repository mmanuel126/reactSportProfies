import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { getYears } from "../../../services/commonService"; 

type Props = {
  show: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (formData: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schoolToEdit: any;
};

type FormState = {
  major: string;
  degree: string;
  yearClass: string;
  sportLevelType: string;
};

const EditSchoolModal: React.FC<Props> = ({ show, onClose, onSave, schoolToEdit }) => {
  const [form, setForm] = useState<FormState>({
    major: "",
    degree: "",
    yearClass: "",
    sportLevelType: "",
  });

  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSaving, setIsSaving] = useState(false);
  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    if (schoolToEdit) {
      setForm({
        major: schoolToEdit.major || "",
        degree: schoolToEdit.degreeTypeID || "",
        yearClass: schoolToEdit.yearClass || "",
        sportLevelType: schoolToEdit.sportLevelType || "",
      });
    }
  }, [schoolToEdit]);

  useEffect(() => {
    getYears(2040, 1900).then(setYears);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const markTouched = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const isInvalid = (field: keyof FormState) => touched[field] && !form[field];

  const isFormValid = () =>
    form.major && form.degree && form.yearClass && form.sportLevelType;

  const handleSubmit = async () => {
    if (!isFormValid()) {
      setTouched({
        major: true,
        degree: true,
        yearClass: true,
        sportLevelType: true,
      });
      return;
    }

    setIsSaving(true);
    try {
      await onSave({ ...schoolToEdit, ...form });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update School</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label><strong>{schoolToEdit?.schoolName}</strong></Form.Label>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><strong>Field of Study (or Major):</strong></Form.Label>
            <Form.Control
              type="text"
              name="major"
              value={form.major}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(e: React.ChangeEvent<any>) => handleChange(e)}
              onBlur={() => markTouched("major")}
              isInvalid={isInvalid("major")}
              placeholder="Enter Major"
            />
            <Form.Control.Feedback type="invalid">
              Major required.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><strong>Degree:</strong></Form.Label>
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

          <Form.Group className="mb-3">
            <Form.Label><strong>Year:</strong></Form.Label>
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

          <Form.Group className="mb-3">
            <Form.Label><strong>Sport Competition Level:</strong></Form.Label>
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
              Competition level is required.
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
            "Update"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditSchoolModal;
