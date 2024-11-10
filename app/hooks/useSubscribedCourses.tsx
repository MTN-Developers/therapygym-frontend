import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";

const useSubscribedCourses = () => {
  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["subscribedCourses"],
    queryFn: async () => {
      const response = await axiosInstance.get("/user/approved-courses");
      return response.data.courses;
    },
  });

  return { data, error, isLoading, isFetching };
};

export default useSubscribedCourses;
