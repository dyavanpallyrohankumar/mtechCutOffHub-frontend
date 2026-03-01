import axiosInstance from "./axiosInstance";

export interface Allotment {
  id: number;
  studentName: string;
  rank: number;
  percentile: number;
  collegeCode: string;
  branchCode: string;
  exam: string;
  year: number;
  phase: string;
  gender: string;
  category: string;
}

export const allotmentApi = {
  create: (data: Partial<Allotment>) =>
    axiosInstance.post("/api/admin/allotments", data),

  getByCollege: (collegeId: number, params?: { page?: number; size?: number }) =>
    axiosInstance.get(`/api/admin/allotments/college/${collegeId}`, { params }),

  getByBranch: (branchCode: string, params?: { page?: number; size?: number }) =>
    axiosInstance.get(`/api/admin/allotments/branch/${branchCode}`, { params }),
};
