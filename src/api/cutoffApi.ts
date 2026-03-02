import axiosInstance from "./axiosInstance";

export interface Branch {
  id: number;
  branchName: string;
  branchCode: string;
  collegeProgramCode: string;
}
export interface CollegeDetails {
  collegeName: string;
  collegeAddress: string;
  collegeCode: string;
  universityName: string;
  collegeType: string;
  branches: Branch[];
}
export interface CutoffData {
  exam: string;
  year: number;
  phase: string;
  gender: string;
  category: string;
  startRank: number;
  endRank: number;
  startPercentile: number | null;
  endPercentile: number | null;
}

export const cutoffApi = {
  getBranches: (collegeId: string) =>
    axiosInstance.get<CollegeDetails>(`/api/public/colleges/${collegeId}/branches`),




  getCutoffs: (
    collegeId: string,
    branchId: string,
    params?: Record<string, string>
  ) =>
    axiosInstance.get<CutoffData[]>(
      `/api/public/cutoffs/college/${collegeId}/branch/${branchId}`,
      { params }
    ),

  createBranch: (collegeCode: string, data: Partial<Branch>[]) =>
    axiosInstance.post(`/api/admin/colleges/${collegeCode}/branches`, data),
};

