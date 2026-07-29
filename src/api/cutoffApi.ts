import { BranchCutoffStructuredResponseDTO, CutoffSummaryDTO } from "@/types/cutoff";
import axiosInstance from "./axiosInstance";

export const cutoffApi = {

  // GET /api/public/cutoffs/exam/{examCode}/college/{collegeID}
  getCollegeCutoffs: (examCode: string, collegeId: string) =>
    axiosInstance.get<CutoffSummaryDTO[]>(
      `/api/public/cutoffs/exam/${examCode}/college/${collegeId}`,
    ),

  // GET /api/public/cutoffs/program/{programCode}
  getProgramCutoffs: (programCode: string) =>
    axiosInstance.get<BranchCutoffStructuredResponseDTO>(
      `/api/public/cutoffs/program/${programCode}`,
    ),
};
