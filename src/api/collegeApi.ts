import { CollegeFilter, PageResponse, CollegeList, CollegeDetails } from "@/types/college";
import axiosInstance from "./axiosInstance";

/* ============================================================
 * API
 * ============================================================ */

export const collegeApi = {
  getAll: (
    examCode: string,
    params?: CollegeFilter & {
      page?: number;
      size?: number;
      sort?: string;
    },
  ) =>
    axiosInstance.get<PageResponse<CollegeList>>(
      `/api/public/colleges/exams/${examCode}`,
      { params },
    ),

  getCollegeDetails: (examCode: string, collegeCode: string) =>
    axiosInstance.get<CollegeDetails>(
      `/api/public/colleges/exams/${examCode}/colleges/${collegeCode}`,
    ),

  /* ---------------- Admin APIs ---------------- */

  // create: (data: Partial<College>) =>
  //   axiosInstance.post("/api/admin/colleges/admin", data),

  // update: (data: Partial<College>) =>
  //   axiosInstance.put("/api/admin/colleges/admin", data),

  // delete: (collegeCode: string) =>
  //   axiosInstance.delete(`/api/admin/colleges/admin/${collegeCode}`),
};
