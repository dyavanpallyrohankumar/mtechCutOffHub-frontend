import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  GraduationCap,
  Mail,
  Lock,
  ArrowRight,
  Smartphone,
} from "lucide-react";

import { authApi, OtpMethod, LoginPayload } from "@/api/authApi";

import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

interface LoginForm {
  username: string;
  password: string;
  method: OtpMethod;
  otp?: string;
}

const AdminLoginPage = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { login, setPendingUsername } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      method: "EMAIL",
    },
  });

  const selectedMethod = watch("method");

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);

    try {
      /*
       * Build login request
       */
      const payload: LoginPayload = {
        username: data.username,
        password: data.password,
        method: data.method,
      };

      /*
       * Authenticator login
       *
       * The authenticator OTP is sent together
       * with the username, password and method.
       */
      if (data.method === "AUTHENTICATOR" && data.otp) {
        payload.otp = Number(data.otp);
      }

      console.log("Login request:", {
        username: payload.username,
        method: payload.method,
        hasOtp: !!payload.otp,
      });

      /*
       * Call backend login API
       */
      const response = await authApi.login(payload);

      const result = response.data;

      console.log("Login response:", result);

      /*
       * ==================================================
       * CASE 1: OTP VERIFICATION REQUIRED
       * ==================================================
       *
       * Usually this happens for EMAIL OTP.
       *
       * Backend response:
       *
       * {
       *   "otpRequired": true,
       *   "method": "EMAIL",
       *   "message": "OTP sent...",
       *   "jwt": null
       * }
       */
      if (result.otpRequired) {
        setPendingUsername(data.username);

        toast.success(result.message || "OTP sent successfully.");

        navigate("/admin/verify-otp");

        return;
      }

      /*
       * ==================================================
       * CASE 2: LOGIN SUCCESSFUL
       * ==================================================
       *
       * This happens when the backend has already
       * verified everything.
       *
       * Example:
       *
       * {
       *   "otpRequired": false,
       *   "method": "AUTHENTICATOR",
       *   "message": "Login successful.",
       *   "jwt": {
       *      "token": "...",
       *      "expiresIn": 43200000
       *   }
       * }
       */

      if (result.jwt?.token) {
        /*
         * IMPORTANT:
         *
         * Use AuthContext login().
         *
         * This stores:
         *
         * auth_token
         * auth_username
         *
         * in sessionStorage and updates React state.
         */
        login(result.jwt.token, data.username, result.twoFactorEnabled);

        toast.success(result.message || "Login successful.");

        /*
         * Go directly to admin dashboard.
         */
        navigate("/admin/dashboard");

        return;
      }

      /*
       * ==================================================
       * CASE 3: UNEXPECTED RESPONSE
       * ==================================================
       */
      toast.error("Authentication token was not received.");
    } catch (err: any) {
      console.error("Login failed:", err);

      toast.error(
        err.response?.data?.message || "Invalid username, password, or OTP.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      {/* Background glow */}

      <div
        className="
          absolute
          top-1/3
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[400px]
          h-[400px]
          rounded-full
          opacity-15
          blur-[100px]
        "
        style={{
          background: "hsl(234 89% 64% / 0.4)",
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="text-center mb-8">
          <div
            className="
              w-14
              h-14
              rounded-2xl
              btn-gradient
              flex
              items-center
              justify-center
              mx-auto
              mb-4
            "
          >
            <GraduationCap
              className="
                w-7
                h-7
                text-primary-foreground
              "
            />
          </div>

          <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>

          <p className="text-sm text-muted-foreground mt-1">
            Sign in to manage CutoffHub
          </p>
        </div>

        {/* ==================================================
            LOGIN FORM
        ================================================== */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="glass-card p-6 space-y-4"
        >
          {/* ==================================================
              USERNAME
          ================================================== */}

          <div>
            <label
              className="
                text-xs
                font-medium
                text-muted-foreground
                mb-1.5
                block
              "
            >
              Username
            </label>

            <div className="relative">
              <Mail
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  w-4
                  h-4
                  text-muted-foreground
                "
              />

              <input
                type="text"
                autoComplete="username"
                {...register("username", {
                  required: "Username is required",
                })}
                placeholder="Enter username"
                className="
                  w-full
                  pl-10
                  pr-4
                  py-2.5
                  rounded-lg
                  bg-background
                  border
                  border-border
                  text-sm
                  text-foreground
                  placeholder:text-muted-foreground
                  focus:outline-none
                  focus:ring-2
                  focus:ring-primary/50
                "
              />
            </div>

            {errors.username && (
              <p className="text-xs text-destructive mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* ==================================================
              PASSWORD
          ================================================== */}

          <div>
            <label
              className="
                text-xs
                font-medium
                text-muted-foreground
                mb-1.5
                block
              "
            >
              Password
            </label>

            <div className="relative">
              <Lock
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  w-4
                  h-4
                  text-muted-foreground
                "
              />

              <input
                type="password"
                autoComplete="current-password"
                {...register("password", {
                  required: "Password is required",

                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
                placeholder="••••••••"
                className="
                  w-full
                  pl-10
                  pr-4
                  py-2.5
                  rounded-lg
                  bg-background
                  border
                  border-border
                  text-sm
                  text-foreground
                  placeholder:text-muted-foreground
                  focus:outline-none
                  focus:ring-2
                  focus:ring-primary/50
                "
              />
            </div>

            {errors.password && (
              <p className="text-xs text-destructive mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* ==================================================
              AUTHENTICATION METHOD
          ================================================== */}

          <div>
            <label
              className="
                text-xs
                font-medium
                text-muted-foreground
                mb-2
                block
              "
            >
              Authentication Method
            </label>

            <div className="grid grid-cols-2 gap-2">
              {/* ==================================================
                  EMAIL OTP
              ================================================== */}

              <label
                className={`
                  cursor-pointer
                  border
                  rounded-lg
                  p-3
                  transition

                  ${
                    selectedMethod === "EMAIL"
                      ? "border-primary bg-primary/10"
                      : "border-border"
                  }
                `}
              >
                <input
                  type="radio"
                  value="EMAIL"
                  {...register("method")}
                  className="sr-only"
                />

                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />

                  <div>
                    <div className="text-sm font-medium">Email OTP</div>

                    <div className="text-[11px] text-muted-foreground">
                      Receive code by email
                    </div>
                  </div>
                </div>
              </label>

              {/* ==================================================
                  AUTHENTICATOR
              ================================================== */}

              <label
                className={`
                  cursor-pointer
                  border
                  rounded-lg
                  p-3
                  transition

                  ${
                    selectedMethod === "AUTHENTICATOR"
                      ? "border-primary bg-primary/10"
                      : "border-border"
                  }
                `}
              >
                <input
                  type="radio"
                  value="AUTHENTICATOR"
                  {...register("method")}
                  className="sr-only"
                />

                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />

                  <div>
                    <div className="text-sm font-medium">Authenticator</div>

                    <div className="text-[11px] text-muted-foreground">
                      Use authenticator code
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* ==================================================
              AUTHENTICATOR OTP
          ================================================== */}

          {selectedMethod === "AUTHENTICATOR" && (
            <div>
              <label
                className="
                  text-xs
                  font-medium
                  text-muted-foreground
                  mb-1.5
                  block
                "
              >
                Authenticator OTP
              </label>

              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                {...register("otp", {
                  required: "Authenticator OTP is required",

                  pattern: {
                    value: /^\d{6}$/,

                    message: "OTP must be 6 digits",
                  },
                })}
                placeholder="Enter 6-digit code"
                className="
                  w-full
                  px-4
                  py-2.5
                  rounded-lg
                  bg-background
                  border
                  border-border
                  text-sm
                  text-center
                  tracking-[0.4em]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-primary/50
                "
              />

              {errors.otp && (
                <p className="text-xs text-destructive mt-1">
                  {errors.otp.message}
                </p>
              )}
            </div>
          )}

          {/* ==================================================
              SUBMIT BUTTON
          ================================================== */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              flex
              items-center
              justify-center
              gap-2
              py-2.5
              rounded-lg
              btn-gradient
              text-sm
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading
              ? "Authenticating..."
              : selectedMethod === "AUTHENTICATOR"
                ? "Sign In"
                : "Continue"}

            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
