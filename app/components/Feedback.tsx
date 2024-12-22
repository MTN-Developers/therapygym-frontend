import React, { useEffect, useState } from "react";
import axiosInstance from "@/app/utils/axiosInstance"; // Replace with the correct path for your axios instance

const Feedback = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [errors, setErrors] = useState<{
    feedback?: string;
    rating?: string[];
  }>({});

  useEffect(() => {
    const feedbackGiven = localStorage.getItem("feedbackGiven");

    if (!feedbackGiven) {
      const timer = setTimeout(() => {
        setShowFeedback(true);
        setTimeout(() => setFadeIn(true), 100); // Trigger fade-in animation
      }, 10000); // Wait 1 minute

      return () => clearTimeout(timer); // Cleanup timeout on unmount
    }
  }, []);

  const handleFeedbackSubmit = async () => {
    try {
      setErrors({}); // Clear previous errors

      const payload = {
        feedback,
        rating,
      };

      // Validate required fields
      if (!feedback || !rating) {
        setErrors({
          feedback: !feedback ? "Feedback is required." : undefined,
          rating: !rating ? ["Rating is required."] : undefined,
        });
        return;
      }

      // Make the API call
      const response = await axiosInstance.post("/feedback", payload);

      console.log("API response:", response);

      // On successful submission, close the feedback and set localStorage
      localStorage.setItem("feedbackGiven", "true");
      handleClose();
    } catch (err: any) {
      console.error("API Error:", err.response);
      if (err.response?.status === 422) {
        // Set validation errors returned by the API
        setErrors(err.response.data.errors || {});
      } else {
        console.error("Unexpected error:", err);
      }
    }
  };

  const handleClose = () => {
    setFadeIn(false); // Trigger fade-out animation
    setTimeout(() => setShowFeedback(false), 300); // Remove component after fade-out
  };

  if (!showFeedback) return null;

  return (
    <div
      className={`fixed bottom-0 right-4 z-[999] w-[350px] h-[400px] rounded-xl bg-gray-100 shadow-xl p-4 transition-all duration-300 ${
        fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">We love your feedback!</h1>
        <button
          onClick={handleClose}
          className="text-gray-500 hover:text-gray-800 text-lg font-bold"
        >
          &times;
        </button>
      </div>

      <textarea
        placeholder="Your feedback here..."
        className="w-full h-[150px] p-2 border rounded-lg"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      {errors.feedback && (
        <p className="text-red-500 text-sm mt-1">{errors.feedback}</p>
      )}

      <div className="mt-4">
        <p className="font-bold">Rate us:</p>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className={`w-8 h-8 rounded-full ${
                rating === star ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setRating(star)}
            >
              {star}
            </button>
          ))}
        </div>
        {errors.rating && (
          <p className="text-red-500 text-sm mt-1">
            {errors.rating.join(", ")}
          </p>
        )}
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleFeedbackSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Feedback;
