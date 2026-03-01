import axiosInstance from "./axiosInstance";

export interface Branch {
  id: number;
  branchName: string;
  branchCode: string;
  collegeProgramCode: string;
}

export interface CutoffData {
  id: number;
  exam: string;
  year: number;
  phase: string;
  gender: string;
  category: string;
  openingRank: number;
  closingRank: number;
  openingPercentile: number;
  closingPercentile: number;
}

export const cutoffApi = {
  getBranches: (collegeId: number) =>
    axiosInstance.get<Branch[]>(`/api/public/colleges/${collegeId}/branches`),

  getCutoffs: (collegeId: number, branchId: number, params?: Record<string, string>) =>
    axiosInstance.get<CutoffData[]>(
      `/api/public/cutoffs/college/${collegeId}/branch/${branchId}`,
      { params }
    ),

  createBranch: (collegeId: number, data: Partial<Branch>[]) =>
    axiosInstance.post(`/api/admin/colleges/${collegeId}/branches`, data),
};
