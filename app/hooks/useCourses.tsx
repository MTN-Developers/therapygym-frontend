import { Course } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCourses = () => {
  return useQuery<Course[], Error>({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await axios.get<Course[]>(
        "https://efficaciousleadership.com/leadershiplms/api/getAllCourses"
      );
      return data;
    },
  });
};
