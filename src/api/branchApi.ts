import axiosInstance from "./axiosInstance";

export interface Branch {
    id: number;
    branchName: string;
    // branchCode: string;
    collegeProgramCode: string;
    // collegeId: number;
}

export const branchApi = {
    getAll: () =>
        axiosInstance.get<Branch[]>("/api/admin/branches"),

    create: (data: Omit<Branch, "id">) =>
        axiosInstance.post<Branch>("/api/admin/branches", data),

    createBranch: (collegeCode: string, data: Partial<Branch>[]) =>
        axiosInstance.post(`/api/admin/colleges/${collegeCode}/branches`, data),
};