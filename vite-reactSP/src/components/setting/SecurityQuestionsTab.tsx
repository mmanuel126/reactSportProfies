import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  getMemberNameInfo,
  saveSecurityQuestionInfo,
} from "../../services/settingService";
import type { AccountSettings } from "../../types/settings";

type Props = {
  memberId: string;
};

const SecurityQuestionsTab: React.FC<Props> = ({ memberId }) => {
  const [form, setForm] = useState<AccountSettings>({
    security_question: "",
    security_answer: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [touched, setTouched] = useState<{
    question: boolean;
    answer: boolean;
  }>({
    question: false,
    answer: false,
  });

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const data = await getMemberNameInfo(memberId);
        // Assuming data looks like { securityQuestion: '1', securityAnswer: 'My Answer' }
        setForm({
          security_question: data.security_question || "",
          security_answer: data.security_answer || "",
        });
      } catch (error) {
        console.error("Failed to load member info:", error);
      }
    };

    fetchMember();
  }, [memberId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field: "question" | "answer") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const isFormValid =
    form.security_question &&
    form.security_question !== "select" &&
    form.security_answer!.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setIsSuccess(false);
    try {
      await saveSecurityQuestionInfo(
        memberId,
        form.security_question!,
        form.security_answer!
      );
      setIsSuccess(true);
    } catch (error) {
      console.error("Failed to save security question:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <p>
            In case you ever need our help (such as forgetting your password),
            we will use this to identify you as the account owner.
          </p>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="ddlQuestion">
            <strong>Question:</strong>
          </label>
          <select
            className="form-control"
            name="SecurityQuestion"
            id="ddlQuestion"
            value={form.security_question}
            onChange={handleChange}
            onBlur={() => handleBlur("question")}
            required
            style={{ width: "320px", height: "29px", paddingTop: "1px" }}
          >
            <option value="select">Select Question...</option>
            <option value="1">Who was your first love?</option>
            <option value="2">Who was your favorite teacher?</option>
            <option value="3">What is your mother's name?</option>
            <option value="4">What was the name of your first pet?</option>
            <option value="5">What neighborhood did you grow up on?</option>
            <option value="6">What is your father's nickname?</option>
          </select>
          {touched.question &&
            (!form.security_question ||
              form.security_question === "select") && (
              <div className="text-danger">Security question required.</div>
            )}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="txtAnswer">
            <strong>Answer:</strong>
          </label>
          <input
            type="text"
            className="form-control"
            id="txtAnswer"
            name="SecurityAnswer"
            value={form.security_answer}
            onChange={handleChange}
            onBlur={() => handleBlur("answer")}
            placeholder="Enter answer"
            required
            style={{ width: "320px", height: "29px", paddingTop: "1px" }}
          />
          {touched.answer && !form.security_answer!.trim() && (
            <div className="text-danger">Your answer is required.</div>
          )}
        </div>

        <div className="mb-3">
          <button
            type="submit"
            className="btn btn-primary btn-md"
            disabled={!isFormValid || isSaving}
          >
            {isSaving ? <i className="fa fa-spinner fa-spin"></i> : null}{" "}
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>

        {isSuccess && (
          <div className="mb-5">
            <span style={{ color: "green" }}>Saved successfully.</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default SecurityQuestionsTab;
