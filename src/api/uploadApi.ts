import axiosInstance from "./axiosInstance";

export const uploadApi = {
  importMaster: (file: File) => {
    const formData = new FormData();

    formData.append("file", file);

    return axiosInstance.post("/api/admin/uploads/master", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  importStudents: (file: File) => {
    const formData = new FormData();

    formData.append("file", file);

    return axiosInstance.post("/api/admin/uploads/students", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
