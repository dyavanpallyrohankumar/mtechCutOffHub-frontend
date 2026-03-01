import axiosInstance from "./axiosInstance";

export interface College {
  id: number;
  collegeCode: string;
  collegeName: string;
  collegeType: string;
  university: string;
}

export const collegeApi = {
  getAll: (params?: { page?: number; size?: number; search?: string }) =>
    axiosInstance.get<{ content: College[]; totalPages: number; totalElements: number }>(
      "/api/public/colleges",
      { params }
    ),

  create: (data: Partial<College>) =>
    axiosInstance.post("/api/admin/colleges", data),

  update: (data: Partial<College>) =>
    axiosInstance.put("/api/admin/colleges", data),

  delete: (collegeCode: string) =>
    axiosInstance.delete(`/api/admin/colleges/${collegeCode}`),
};
