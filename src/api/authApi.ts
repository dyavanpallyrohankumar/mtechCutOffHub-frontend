import axiosInstance from "./axiosInstance";

export type OtpMethod = "EMAIL" | "AUTHENTICATOR";

export interface LoginPayload {
  username: string;
  password: string;
  method: OtpMethod;
  otp?: number;
}

export interface JwtResponse {
  token: string;
  expiresIn: number;
}

export interface LoginResponse {
  otpRequired: boolean;
  twoFactorEnabled: boolean;
  method: OtpMethod;
  message: string;
  jwt: JwtResponse | null;
}

export interface OtpVerifyPayload {
  username: string;
  otp: number;
}

export interface EnableTwoFactorPayload {
  username: string;
  otp: number;
}
/* =========================================================
   PASSWORD
========================================================= */

export interface PasswordChangeRequest {
  username: string;
  oldPassword: string;
  newPassword: string;
}

export const authApi = {
  // -------------------------
  // LOGIN
  // -------------------------

  login: (data: LoginPayload) =>
    axiosInstance.post<LoginResponse>("/api/auth/login", data),

  // -------------------------
  // EMAIL OTP VERIFICATION
  // -------------------------

  verifyOtp: (data: OtpVerifyPayload) =>
    axiosInstance.post<JwtResponse>("/api/auth/verify-otp", data),

  // -------------------------
  // SETUP 2FA
  // Returns QR code image
  // -------------------------

  setup2FA: (username: string) =>
    axiosInstance.get<Blob>(
      `/api/auth/setup-2fa/${encodeURIComponent(username)}`,
      {
        responseType: "blob",
      },
    ),

  // -------------------------
  // ENABLE 2FA
  // -------------------------

  enable2FA: (data: EnableTwoFactorPayload) =>
    axiosInstance.post<string>("/api/auth/enable-2fa", data),

  // -------------------------
  // RESET 2FA
  // Returns new QR code image
  // -------------------------

  reset2FA: () =>
    axiosInstance.post<Blob>(
      "/api/auth/reset-2fa",
      {},
      {
        responseType: "blob",
      },
    ),

  changePassword: (data: PasswordChangeRequest) =>
    axiosInstance.post("/api/auth/change-password", data),
};
