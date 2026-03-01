import axiosInstance from "./axiosInstance";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface OtpPayload {
  email: string;
  otp: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}

export const authApi = {
  login: (data: LoginPayload) =>
    axiosInstance.post("/api/admin/auth/login", data),

  verifyOtp: (data: OtpPayload) =>
    axiosInstance.post("/api/admin/auth/verify-otp", data),

  register: (data: RegisterPayload) =>
    axiosInstance.post("/api/admin/auth/register", data),
};
