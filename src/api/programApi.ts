import axiosInstance from "./axiosInstance";
import { CourseSummary } from "@/types/program";

export const programApi = {
  getCourses: (examCode: string) =>
    axiosInstance.get<CourseSummary[]>(
      `/api/public/programs/exam/${examCode}/courses`,
    ),

  getCourseColleges: (examCode: string, courseCode: string) =>
    axiosInstance.get<CourseSummary>(
      `/api/public/programs/exam/${examCode}/course/${courseCode}`,
    ),
};
