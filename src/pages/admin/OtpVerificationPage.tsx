import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { authApi } from "@/api/authApi";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const OTP_LENGTH = 6;

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const { pendingUsername, login } = useAuth();

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const code = otp.join("");

    if (!pendingUsername) {
      toast.error("Session expired. Please login again.");
      navigate("/admin/login");
      return;
    }

    if (code.length !== OTP_LENGTH) {
      toast.error("Please enter the complete OTP");
      return;
    }

    setLoading(true);

    try {
      const res = await authApi.verifyOtp({
        username: pendingUsername,
        otp: code,
      });

      login(res.data.token, pendingUsername);

      toast.success("Login successful!");
      navigate("/admin/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">

      {/* Background Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 
        w-[400px] h-[400px] rounded-full opacity-15 blur-[100px]"
        style={{ background: "hsl(234 89% 64% / 0.4)" }}
      />

      <div className="relative w-full max-w-sm text-center">

        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-accent/10 
                        flex items-center justify-center mx-auto mb-4">
          <ShieldCheck className="w-7 h-7 text-accent" />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-1">
          Verify OTP
        </h1>

        <p className="text-sm text-muted-foreground mb-8">
          Enter the 6-digit code sent to{" "}
          <span className="text-foreground font-medium">
            {pendingUsername || "your email"}
          </span>
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mb-8">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-12 h-14 rounded-xl bg-card border border-border 
                         text-center text-xl font-bold text-foreground
                         focus:outline-none focus:ring-2 
                         focus:ring-primary/50 focus:border-primary/50
                         transition-all"
            />
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full max-w-xs mx-auto flex items-center justify-center gap-2
                     py-3 rounded-xl btn-gradient text-sm disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify & Login"}
        </button>
      </div>
    </div>
  );
};

export default OtpVerificationPage;