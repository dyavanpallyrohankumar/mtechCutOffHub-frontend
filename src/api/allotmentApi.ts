import axiosInstance from "./axiosInstance";

export interface Allotment {
  id: number;
  studentName: string;
  category: string;
  gender: string;
  region: string;
  exam: string;
  scoreOrPercentile: string;
  rank: number;
  allotedCategory: string;
  phase: string;
  year: number;
  collegeProgramCode: string;
  branchId: number;
}

export const allotmentApi = {
  create: (data: Partial<Allotment>) =>
    axiosInstance.post("/api/admin/allotments", data),


  getAll: () =>
    axiosInstance.get("/api/admin/allotments"),

  getByCollege: (collegeId: number, params?: { page?: number; size?: number }) =>
    axiosInstance.get(`/api/admin/allotments/college/${collegeId}`, { params }),

  getByBranch: (branchCode: string, params?: { page?: number; size?: number }) =>
    axiosInstance.get(`/api/admin/allotments/branch/${branchCode}`, { params }),


  uploadCsv: (formData: FormData) =>
    axiosInstance.post(
      "/api/admin/allotments/upload",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    ),
};

