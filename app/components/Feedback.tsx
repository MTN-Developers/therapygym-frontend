import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import closeIcon from "@/assets/images/feedback-close-circle.svg";
import emojyOne from "@/assets/images/emojy01.svg";
import emojyTwo from "@/assets/images/emojy02.svg";
import emojyThree from "@/assets/images/emojy03.svg";
import emojyFour from "@/assets/images/emojy04.svg";
import emojyFive from "@/assets/images/emojy05.svg";
import { useTranslations } from "next-intl";
import { useTranslationContext } from "@/contexts/TranslationContext";
import axiosInstance from "../utils/axiosInstance";

const Feedback = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const pathname = usePathname();
  const t = useTranslations("Feedback");
  const { locale } = useTranslationContext();

  const emojies = [emojyOne, emojyTwo, emojyThree, emojyFour, emojyFive];

  const FEEDBACK_CONFIG = {
    coursePayment: {
      questions: [
        {
          id: 1,
          text: t("How easy was it to complete the payment process?"),
          type: "rating",
        },
        {
          id: 2,
          text: t("How easy was it to navigate and use the platform?"),
          type: "rating",
        },
      ],
      showDuration: 3000,
    },
    profile: {
      questions: [
        {
          id: 1,
          text: t(
            "How would you rate your overall experience with our platform?"
          ),
          type: "rating",
        },
        {
          id: 2,
          text: t("How easy was it to sign up for our platform?"),
          type: "rating",
        },
        {
          id: 3,
          text: t(
            "How satisfied are you with the speed and performance of the platform?"
          ),
          type: "rating",
        },
        {
          id: 4,
          text: t("How easy was it to navigate and use the platform?"),
          type: "rating",
        },
      ],
      frequency: "15days",
    },
    home: {
      questions: [
        {
          id: 1,
          text: t(
            "How would you rate your overall experience with our platform?"
          ),
          type: "rating",
        },
        {
          id: 2,
          text: t("How easy was it to sign up for our platform?"),
          type: "rating",
        },
        {
          id: 3,
          text: t(
            "How satisfied are you with the speed and performance of the platform?"
          ),
          type: "rating",
        },
        {
          id: 4,
          text: t("How easy was it to navigate and use the platform?"),
          type: "rating",
        },
      ],
      frequency: "15days",
    },
  };

  useEffect(() => {
    const checkAndShowFeedback = () => {
      const lastShownDates = JSON.parse(
        localStorage.getItem("feedbackLastShown") || "{}"
      );
      const currentDate = new Date().toISOString();

      if (
        pathname.includes("/course") &&
        sessionStorage.getItem("showCourseFeedback")
      ) {
        setTimeout(() => {
          setCurrentQuestions(FEEDBACK_CONFIG.coursePayment.questions);
          setIsVisible(true);
          sessionStorage.removeItem("showCourseFeedback");
        }, FEEDBACK_CONFIG.coursePayment.showDuration);
      } else if (pathname.includes("/profile")) {
        const lastShownProfile = lastShownDates.profile;
        if (shouldShowFeedback(lastShownProfile)) {
          setCurrentQuestions(FEEDBACK_CONFIG.profile.questions);
          setIsVisible(true);
          updateLastShownDate("profile", currentDate);
        }
      } else if (pathname === "/en" || pathname === "/ar") {
        const lastShownHome = lastShownDates.home;
        if (shouldShowFeedback(lastShownHome)) {
          setCurrentQuestions(FEEDBACK_CONFIG.home.questions);
          setIsVisible(true);
          updateLastShownDate("home", currentDate);
        }
      }
    };

    checkAndShowFeedback();
  }, [pathname]);

  const shouldShowFeedback = (lastShownDate) => {
    if (!lastShownDate) return true;
    const fifteenDays = 15 * 24 * 60 * 60 * 1000;
    return (
      new Date().getTime() - new Date(lastShownDate).getTime() >= fifteenDays
    );
  };

  const updateLastShownDate = (page, date) => {
    const lastShownDates = JSON.parse(
      localStorage.getItem("feedbackLastShown") || "{}"
    );
    lastShownDates[page] = date;
    localStorage.setItem("feedbackLastShown", JSON.stringify(lastShownDates));
  };

  const handleResponse = async (questionId, value) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    // Move to next question or submit if it's the last question
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 500); // Small delay for better UX
    } else {
      // If it's the last question, submit after a brief delay
      setTimeout(handleSubmit, 500);
    }
  };

  const handleSubmit = async () => {
    try {
      const transformedQuestions = currentQuestions.reduce((acc, question) => {
        if (responses[question.id]) {
          acc.push({
            question: question.text,
            answer: responses[question.id],
          });
        }
        return acc;
      }, []);

      const feedData = {
        feedback: "optional",
        questions: transformedQuestions,
      };

      const _data = await axiosInstance.post("/feedback", feedData);

      // Reset and close feedback
      setIsVisible(false);
      setResponses({});
      setCurrentQuestionIndex(0);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  if (!isVisible) return null;

  const currentQuestion = currentQuestions[currentQuestionIndex];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative w-full h-full">
        <div
          className={`absolute ${
            locale === "en" ? "bottom-4 right-4" : "bottom-4 left-4"
          } bg-white rounded-2xl px-4 py-8 !w-[375px]`}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold"></h2>
            <button
              onClick={() => {
                setIsVisible(false);
                setCurrentQuestionIndex(0);
                setResponses({});
              }}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <Image src={closeIcon} alt="close" width={20} height={20} />
            </button>
          </div>

          <div className="space-y-4">
            <div
              key={currentQuestion.id}
              className="space-y-2 mb-4 text-center flex flex-col justify-center items-center"
            >
              <div className="text-sm text-gray-500 mb-2">
                Question {currentQuestionIndex + 1} of {currentQuestions.length}
              </div>
              <label className="text-black text-center text-lg font-bold leading-normal">
                {currentQuestion.text}
              </label>
              {currentQuestion.type === "rating" && (
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => handleResponse(currentQuestion.id, rating)}
                      className={`w-[50px] h-[50px] flex items-center justify-center rounded-full ${
                        responses[currentQuestion.id] === rating
                          ? "bg-gradient-to-bl from-[#546cfd] to-[#ea06fc] text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      <Image
                        src={emojies[rating - 1]}
                        alt="emojy"
                        width={30}
                        height={30}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
