import axiosInstance from "./axiosInstance";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface OtpPayload {
  username: string;
  otp: string;
}

export const authApi = {
  login: (data: LoginPayload) =>
    axiosInstance.post("/api/auth/login", data),

  verifyOtp: (data: OtpPayload) =>
    axiosInstance.post("/api/auth/verify-otp", data),


};
