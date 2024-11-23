"use client";

import axiosInstance from "@/app/helper/axiosInstance";
import React, { useState } from "react";
import { FaSpinner, FaPaperPlane } from "react-icons/fa";

// Reusable Submit Button Component
const SubmitButton = ({ isSubmitting }: { isSubmitting: boolean }) => (
  <button
    type="submit"
    className={`bg-[#1877F2] text-white p-2 rounded-lg flex items-center justify-center w-full ${isSubmitting ? "bg-[#125bb2] cursor-not-allowed" : ""}`}
    disabled={isSubmitting}
  >
    {isSubmitting ? (
      <>
        <FaSpinner className="animate-spin mr-2" />
        Submitting...
      </>
    ) : (
      <>
        <FaPaperPlane className="mr-2" />
        Submit Feedback
      </>
    )}
  </button>
);

// Form Submission Handler
const handleFormSubmit = async (
  formData: { useInFuture: string; feedback: string },
  setErrors: (message: string) => void,
  setSuccessMessage: (message: string) => void,
  setIsSubmitting: (value: boolean) => void,
  resetForm: () => void
) => {
  const { useInFuture, feedback } = formData;

  // Validate form fields
  if (!useInFuture || !feedback) {
    setErrors("All fields are required!");
    return;
  }

  try {
    setIsSubmitting(true);
    const postData = {
      agreeToPay: useInFuture === "true",
      feedback,
    };

    const res = await axiosInstance.post(
      "auth/api/feedback/create_feedback/",
      postData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    setSuccessMessage("Thank you for your feedback!");
    resetForm();
  } catch (error) {
    setErrors("An error occurred while submitting feedback. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    useInFuture: "",
    feedback: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle form data changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Reset form fields
  const resetForm = () => {
    setFormData({ useInFuture: "", feedback: "" });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFormSubmit(formData, setErrors, setSuccessMessage, setIsSubmitting, resetForm);
  };

  return (
    <div className="w-full p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">We'd love your feedback!</h2>
      <h3 className="text-lg text-gray-600 mb-4 text-center">Scroll Down to Test out the Features.</h3>

      {errors && <p className="text-red-500 mb-4">{errors}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        {/* Yes/No Select */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            This is the testing version only. When the full version of this product is released, would you consider paying for it?
          </label>
          <select
            name="useInFuture"
            value={formData.useInFuture}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select an option</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        {/* Feedback Textarea */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Please share your thoughts or suggestions on how we can improve this product and what features you'd like to see in the future.
          </label>
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            required
            rows={4}
            placeholder="e.g., I would love to see a feature that does..."
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <SubmitButton isSubmitting={isSubmitting} />
      </form>
    </div>
  );
}
