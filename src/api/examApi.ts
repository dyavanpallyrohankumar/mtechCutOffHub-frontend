import axiosInstance from "./axiosInstance";

import { ExamDetails } from "@/types/exam";

export const examApi = {
  getDetails: (examCode: string) =>
    axiosInstance.get<ExamDetails>(`/api/public/exams/${examCode}`),
};
