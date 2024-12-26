import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
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
      frequency: "weekly",
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
      frequency: "weekly",
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
        if (shouldShowWeeklyFeedback(lastShownProfile)) {
          setCurrentQuestions(FEEDBACK_CONFIG.profile.questions);
          setIsVisible(true);
          updateLastShownDate("profile", currentDate);
        }
      } else if (pathname === "/en" || pathname === "/ar") {
        const lastShownHome = lastShownDates.home;
        if (shouldShowWeeklyFeedback(lastShownHome)) {
          setCurrentQuestions(FEEDBACK_CONFIG.home.questions);
          setIsVisible(true);
          updateLastShownDate("home", currentDate);
        }
      }
    };

    checkAndShowFeedback();
  }, [pathname]);

  const shouldShowWeeklyFeedback = (lastShownDate) => {
    if (!lastShownDate) return true;
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    return new Date().getTime() - new Date(lastShownDate).getTime() >= oneWeek;
  };

  const updateLastShownDate = (page, date) => {
    const lastShownDates = JSON.parse(
      localStorage.getItem("feedbackLastShown") || "{}"
    );
    lastShownDates[page] = date;
    localStorage.setItem("feedbackLastShown", JSON.stringify(lastShownDates));
  };

  const handleResponse = (questionId, value) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Transform responses into array of {question, answer} objects
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

      console.log("feedData", feedData);

      const data = await axiosInstance.post("/feedback", feedData);

      console.log(data);

      setIsVisible(false);
      setResponses({});
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative w-full h-full ">
        <div
          className={`absolute ${
            locale === "en" ? "bottom-4 right-4" : "bottom-4 left-4"
          }  bg-white rounded-2xl px-4 py-8  !w-[375px]`}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold"></h2>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              {/* <div className="w-5 bg-red-500 h-5" /> */}
              <Image src={closeIcon} alt="close" width={20} height={20} />
            </button>
          </div>

          <div className="space-y-4">
            {currentQuestions.map((question) => (
              <div
                key={question.id}
                className="space-y-2 mb-4 text-center flex flex-col justify-center items-center"
              >
                <label className=" text-black text-center  text-lg font-bold leading-[normal] ">
                  {question.text}
                </label>
                {question.type === "rating" && (
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => handleResponse(question.id, rating)}
                        className={`w-[50px] h-[50px] flex items-center justify-center rounded-full ${
                          responses[question.id] === rating
                            ? "bg-gradient-to-bl from-[#546cfd] to-[#ea06fc] text-white"
                            : "bg-gray-100"
                        }`}
                      >
                        {/* {rating} */}
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
            ))}
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
