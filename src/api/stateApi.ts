import axiosInstance from "./axiosInstance";

import { State } from "@/types/state";
import { ExamSummary } from "@/types/exam";

export const stateApi = {
  getAllStates: () => axiosInstance.get<State[]>("/api/public/states"),

  getExams: (stateCode: string) =>
    axiosInstance.get<ExamSummary[]>(`/api/public/states/${stateCode}/exams`),
};
