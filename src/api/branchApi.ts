import axiosInstance from "./axiosInstance";

export interface Branch {
    id: number;
    branchName: string;
    // branchCode: string;
    collegeProgramCode: string;
    // collegeId: number;
}

export interface BranchSummary {
    branchCode: string;
    branchName: string;
    count: number;
    colleges: BranchCollege[];
}

export interface BranchCollege {
    collegeName: string;
    collegeAddress: string;
    collegeCode: string;
    universityName: string;
    collegeType: string;
}

export const branchApi = {
    getAll: () =>
        axiosInstance.get<Branch[]>("/api/admin/branches"),

    create: (data: Omit<Branch, "id">) =>
        axiosInstance.post<Branch>("/api/admin/branches", data),

    createBranch: (collegeCode: string, data: Partial<Branch>[]) =>
        axiosInstance.post(`/api/admin/colleges/${collegeCode}/branches`, data),


    getAllBranches: () =>
        axiosInstance.get<BranchSummary[]>("/api/public/branches"),

    getCollegesByBranch: (code: string) =>
        axiosInstance.get<BranchSummary>(`/api/public/branches/${code}`),
};