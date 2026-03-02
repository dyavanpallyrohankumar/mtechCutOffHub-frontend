import axiosInstance from "./axiosInstance";

export interface College {
  id: number;
  collegeCode: string;
  collegeName: string;
  collegeType: string;
  universityName: string;
  collegeAddress: string;
}

export const collegeApi = {
  getAll: (params?: { page?: number; size?: number; search?: string }) =>
    axiosInstance.get<{
      content: College[];
      totalPages: number; totalElements: number
    }>(
      "/api/public/colleges",
      { params }
    ),

  getAllColleges: () =>
    axiosInstance.get<College[]>("/api/admin/colleges"),


  create: (data: Partial<College>) =>
    axiosInstance.post("/api/admin/colleges", data),

  update: (data: Partial<College>) =>
    axiosInstance.put("/api/admin/colleges", data),

  delete: (collegeCode: string) =>
    axiosInstance.delete(`/api/admin/colleges/${collegeCode}`),
};
