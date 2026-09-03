import { useState } from "react";
import {
  Lock,
  Smartphone,
  User,
  ShieldCheck,
  ShieldOff,
  KeyRound,
  RefreshCw,
  QrCode,
  CheckCircle2,
  AlertTriangle,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";

import { authApi } from "@/api/authApi";
import { useAuth } from "@/context/AuthContext";

type SettingsTab = "profile" | "password" | "two-factor";

const PasswordInput = ({
  value,
  onChange,
  placeholder,
  show,
  setShow,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  show: boolean;
  setShow: (value: boolean) => void;
}) => {
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
            w-full
            px-4
            py-2.5
            pr-11
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

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-muted-foreground
            hover:text-foreground
          "
      >
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  );
};

const AdminSettings = () => {
  const { username, twoFactorEnabled, setTwoFactorEnabled } = useAuth();

  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  /*
   * Password
   */
  const [oldPassword, setOldPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [changingPassword, setChangingPassword] = useState(false);

  /*
   * Password visibility
   */
  const [showOldPassword, setShowOldPassword] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /*
   * 2FA
   */
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  const [otp, setOtp] = useState("");

  const [loading2FA, setLoading2FA] = useState(false);

  const [show2FASetup, setShow2FASetup] = useState(false);

  const [showResetConfirm, setShowResetConfirm] = useState(false);

  /*
   * =====================================================
   * CHANGE PASSWORD
   * =====================================================
   */

  const handleChangePassword = async () => {
    if (!username) {
      toast.error("Username not available.");
      return;
    }

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all password fields.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must contain at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation password do not match.");
      return;
    }

    if (oldPassword === newPassword) {
      toast.error("New password must be different from the old password.");
      return;
    }

    try {
      setChangingPassword(true);

      await authApi.changePassword({
        username,
        oldPassword,
        newPassword,
      });

      toast.success("Password changed successfully.");

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      console.error("Password change failed:", err);

      toast.error(err.response?.data?.message || "Failed to change password.");
    } finally {
      setChangingPassword(false);
    }
  };

  /*
   * =====================================================
   * SETUP 2FA
   * =====================================================
   */

  const handleSetup2FA = async () => {
    if (!username) {
      toast.error("Username not available.");
      return;
    }

    try {
      setLoading2FA(true);

      const response = await authApi.setup2FA(username);

      const blob = response.data;

      const url = URL.createObjectURL(blob);

      setQrCodeUrl(url);
      setOtp("");
      setShow2FASetup(true);

      toast.success("Authenticator setup QR code generated.");
    } catch (err: any) {
      console.error("2FA setup failed:", err);

      toast.error(
        err.response?.data?.message || "Failed to setup authenticator.",
      );
    } finally {
      setLoading2FA(false);
    }
  };

  /*
   * =====================================================
   * ENABLE 2FA
   * =====================================================
   */

  const handleEnable2FA = async () => {
    if (!username) {
      toast.error("Username not available.");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      setLoading2FA(true);

      await authApi.enable2FA({
        username,
        otp: Number(otp),
      });

      /*
       * Update AuthContext immediately.
       */
      setTwoFactorEnabled(true);

      toast.success("Two-factor authentication enabled successfully.");

      setOtp("");
      setShow2FASetup(false);

      /*
       * Release the object URL.
       */
      if (qrCodeUrl) {
        URL.revokeObjectURL(qrCodeUrl);
        setQrCodeUrl(null);
      }
    } catch (err: any) {
      console.error("Enable 2FA failed:", err);

      toast.error(
        err.response?.data?.message || "Invalid OTP or failed to enable 2FA.",
      );
    } finally {
      setLoading2FA(false);
    }
  };

  /*
   * =====================================================
   * RESET 2FA
   * =====================================================
   */

  const handleReset2FA = async () => {
    try {
      setLoading2FA(true);

      const response = await authApi.reset2FA();

      /*
       * Backend returns a PNG image.
       */
      const blob = response.data;

      const url = URL.createObjectURL(blob);

      /*
       * Reset means the old authenticator
       * configuration is no longer valid.
       */
      setTwoFactorEnabled(false);

      /*
       * Show the new QR code immediately.
       */
      setQrCodeUrl(url);

      setOtp("");

      setShow2FASetup(true);

      setShowResetConfirm(false);

      toast.success(
        "Authenticator reset. Scan the new QR code to configure 2FA.",
      );
    } catch (err: any) {
      console.error("Reset 2FA failed:", err);

      toast.error(
        err.response?.data?.message || "Failed to reset authenticator.",
      );
    } finally {
      setLoading2FA(false);
    }
  };

  /*
   * =====================================================
   * CLOSE 2FA SETUP
   * =====================================================
   */

  const close2FASetup = () => {
    setShow2FASetup(false);

    setOtp("");

    if (qrCodeUrl) {
      URL.revokeObjectURL(qrCodeUrl);
      setQrCodeUrl(null);
    }
  };

  /*
   * =====================================================
   * TAB BUTTON
   * =====================================================
   */
  const TabButton = ({
    id,
    icon,
    title,
    description,
    activeTab,
    setActiveTab,
  }: {
    id: SettingsTab;
    icon: React.ReactNode;
    title: string;
    description: string;
    activeTab: SettingsTab;
    setActiveTab: (tab: SettingsTab) => void;
  }) => {
    const active = activeTab === id;

    return (
      <button
        type="button"
        onClick={() => setActiveTab(id)}
        className={`
          w-full
          text-left
          flex
          items-center
          gap-3
          px-4
          py-3
          rounded-xl
          border
          transition-all
          ${
            active
              ? "border-primary bg-primary/10 text-primary"
              : "border-transparent hover:bg-muted/50 text-muted-foreground"
          }
        `}
      >
        <div
          className={`
            w-9
            h-9
            rounded-lg
            flex
            items-center
            justify-center
            shrink-0
            ${active ? "bg-primary/15" : "bg-muted"}
          `}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <div className="text-sm font-semibold">{title}</div>

          <div className="text-[11px] text-muted-foreground mt-0.5">
            {description}
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>

        <p className="text-sm text-muted-foreground mt-1">
          Manage your account, password and authentication settings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6">
        {/* =====================================================
            LEFT TABS
        ===================================================== */}

        <aside className="space-y-2">
          <TabButton
            id="profile"
            icon={<User className="w-4 h-4" />}
            title="Profile"
            description="Account information"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <TabButton
            id="password"
            icon={<Lock className="w-4 h-4" />}
            title="Password"
            description="Change your password"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <TabButton
            id="two-factor"
            icon={<Smartphone className="w-4 h-4" />}
            title="Two-Factor"
            description="Authenticator security"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </aside>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <section
          className="
            bg-card
            border
            border-border
            rounded-2xl
            p-6
            min-h-[500px]
          "
        >
          {/* ===================================================
              PROFILE
          =================================================== */}

          {activeTab === "profile" && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="
                    w-11
                    h-11
                    rounded-xl
                    bg-primary/10
                    text-primary
                    flex
                    items-center
                    justify-center
                  "
                >
                  <User className="w-5 h-5" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold">Profile</h2>

                  <p className="text-xs text-muted-foreground">
                    Your administrator account
                  </p>
                </div>
              </div>

              <div className="max-w-xl space-y-5">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    Username
                  </label>

                  <div
                    className="
                      mt-1.5
                      px-4
                      py-3
                      rounded-lg
                      bg-muted/40
                      border
                      border-border
                      text-sm
                    "
                  >
                    {username || "Not available"}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    Two-Factor Authentication
                  </label>

                  <div
                    className="
                      mt-1.5
                      flex
                      items-center
                      gap-2
                      px-4
                      py-3
                      rounded-lg
                      bg-muted/40
                      border
                      border-border
                    "
                  >
                    {twoFactorEnabled ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-green-500" />

                        <span className="text-sm text-green-500">Enabled</span>
                      </>
                    ) : (
                      <>
                        <ShieldOff className="w-4 h-4 text-muted-foreground" />

                        <span className="text-sm text-muted-foreground">
                          Not configured
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================
              PASSWORD
          =================================================== */}

          {activeTab === "password" && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="
                    w-11
                    h-11
                    rounded-xl
                    bg-primary/10
                    text-primary
                    flex
                    items-center
                    justify-center
                  "
                >
                  <KeyRound className="w-5 h-5" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold">Change Password</h2>

                  <p className="text-xs text-muted-foreground">
                    Update your administrator password
                  </p>
                </div>
              </div>

              <div className="max-w-xl space-y-5">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    Current Password
                  </label>

                  <div className="mt-1.5">
                    <PasswordInput
                      value={oldPassword}
                      onChange={setOldPassword}
                      placeholder="Enter current password"
                      show={showOldPassword}
                      setShow={setShowOldPassword}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    New Password
                  </label>

                  <div className="mt-1.5">
                    <PasswordInput
                      value={newPassword}
                      onChange={setNewPassword}
                      placeholder="Enter new password"
                      show={showNewPassword}
                      setShow={setShowNewPassword}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    Confirm New Password
                  </label>

                  <div className="mt-1.5">
                    <PasswordInput
                      value={confirmPassword}
                      onChange={setConfirmPassword}
                      placeholder="Confirm new password"
                      show={showConfirmPassword}
                      setShow={setShowConfirmPassword}
                    />
                  </div>
                </div>

                <div
                  className="
                    flex
                    gap-2
                    p-3
                    rounded-lg
                    bg-muted/40
                    border
                    border-border
                    text-xs
                    text-muted-foreground
                  "
                >
                  <ShieldCheck className="w-4 h-4 shrink-0 text-primary" />

                  <span>
                    Use a strong password with at least 6 characters. Avoid
                    reusing passwords from other services.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleChangePassword}
                  disabled={changingPassword}
                  className="
                    px-5
                    py-2.5
                    rounded-lg
                    btn-gradient
                    text-sm
                    font-medium
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                  "
                >
                  {changingPassword
                    ? "Changing Password..."
                    : "Change Password"}
                </button>
              </div>
            </div>
          )}

          {/* ===================================================
              TWO FACTOR
          =================================================== */}

          {activeTab === "two-factor" && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="
                    w-11
                    h-11
                    rounded-xl
                    bg-primary/10
                    text-primary
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Smartphone className="w-5 h-5" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold">
                    Two-Factor Authentication
                  </h2>

                  <p className="text-xs text-muted-foreground">
                    Protect your administrator account with an authenticator
                    app.
                  </p>
                </div>
              </div>

              {/* =============================================
                  CURRENT STATUS
              ============================================= */}

              <div
                className={`
                  flex
                  items-center
                  justify-between
                  gap-4
                  p-4
                  rounded-xl
                  border
                  mb-6

                  ${
                    twoFactorEnabled
                      ? "border-green-500/20 bg-green-500/5"
                      : "border-amber-500/20 bg-amber-500/5"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`
                      w-10
                      h-10
                      rounded-lg
                      flex
                      items-center
                      justify-center

                      ${
                        twoFactorEnabled
                          ? "bg-green-500/10 text-green-500"
                          : "bg-amber-500/10 text-amber-500"
                      }
                    `}
                  >
                    {twoFactorEnabled ? (
                      <ShieldCheck className="w-5 h-5" />
                    ) : (
                      <ShieldOff className="w-5 h-5" />
                    )}
                  </div>

                  <div>
                    <div className="text-sm font-semibold">
                      {twoFactorEnabled
                        ? "Two-factor authentication is enabled"
                        : "Two-factor authentication is not enabled"}
                    </div>

                    <div className="text-xs text-muted-foreground mt-0.5">
                      {twoFactorEnabled
                        ? "Your account is protected by an authenticator."
                        : "Add an authenticator to improve account security."}
                    </div>
                  </div>
                </div>

                {twoFactorEnabled && (
                  <span
                    className="
                      hidden
                      sm:inline-flex
                      px-2.5
                      py-1
                      rounded-full
                      text-[11px]
                      font-semibold
                      bg-green-500/10
                      text-green-500
                    "
                  >
                    ENABLED
                  </span>
                )}
              </div>

              {/* =============================================
                  SETUP / RESET
              ============================================= */}

              {!show2FASetup ? (
                <div className="max-w-xl">
                  {!twoFactorEnabled ? (
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-sm font-semibold">
                          Set up an authenticator
                        </h3>

                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          Use an authenticator application such as Google
                          Authenticator, Microsoft Authenticator, Authy or
                          another compatible TOTP application.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleSetup2FA}
                        disabled={loading2FA}
                        className="
                          inline-flex
                          items-center
                          gap-2
                          px-5
                          py-2.5
                          rounded-lg
                          btn-gradient
                          text-sm
                          font-medium
                          disabled:opacity-50
                          disabled:cursor-not-allowed
                        "
                      >
                        <QrCode className="w-4 h-4" />

                        {loading2FA
                          ? "Generating QR..."
                          : "Set Up Authenticator"}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-sm font-semibold">
                          Authenticator configured
                        </h3>

                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          Your account is currently protected by an
                          authenticator application.
                        </p>
                      </div>

                      <div
                        className="
                          flex
                          items-start
                          gap-3
                          p-4
                          rounded-xl
                          border
                          border-amber-500/20
                          bg-amber-500/5
                        "
                      >
                        <AlertTriangle
                          className="
                            w-4
                            h-4
                            text-amber-500
                            mt-0.5
                            shrink-0
                          "
                        />

                        <div>
                          <div className="text-sm font-medium">
                            Reset authenticator
                          </div>

                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                            Resetting will invalidate your current authenticator
                            configuration. You will need to scan a new QR code
                            and verify a new OTP.
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowResetConfirm(true)}
                        disabled={loading2FA}
                        className="
                          inline-flex
                          items-center
                          gap-2
                          px-5
                          py-2.5
                          rounded-lg
                          border
                          border-destructive/30
                          text-destructive
                          hover:bg-destructive/10
                          text-sm
                          font-medium
                          transition-colors
                          disabled:opacity-50
                        "
                      >
                        <RefreshCw className="w-4 h-4" />
                        Reset Authenticator
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* =============================================
                                                   QR SETUP
                                                ============================================= */

                <div className="max-w-xl">
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold">
                      Configure your authenticator
                    </h3>

                    <p className="text-xs text-muted-foreground mt-1">
                      Scan the QR code using your authenticator application and
                      enter the 6-digit code generated by the app.
                    </p>
                  </div>

                  <div
                    className="
                      border
                      border-border
                      rounded-xl
                      p-6
                      flex
                      flex-col
                      items-center
                      bg-muted/20
                    "
                  >
                    {qrCodeUrl && (
                      <div
                        className="
                          bg-white
                          p-4
                          rounded-xl
                          shadow-sm
                          mb-6
                        "
                      >
                        <img
                          src={qrCodeUrl}
                          alt="Authenticator QR Code"
                          className="
                            w-52
                            h-52
                            object-contain
                          "
                        />
                      </div>
                    )}

                    <div className="w-full max-w-xs">
                      <label className="text-xs font-medium text-muted-foreground block mb-2">
                        Authenticator Code
                      </label>

                      <input
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => {
                          const value = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 6);

                          setOtp(value);
                        }}
                        placeholder="Enter 6-digit code"
                        className="
                          w-full
                          px-4
                          py-3
                          rounded-lg
                          bg-background
                          border
                          border-border
                          text-center
                          text-lg
                          tracking-[0.45em]
                          focus:outline-none
                          focus:ring-2
                          focus:ring-primary/50
                        "
                      />
                    </div>

                    <div className="flex items-center gap-3 mt-6">
                      <button
                        type="button"
                        onClick={close2FASetup}
                        disabled={loading2FA}
                        className="
                          px-4
                          py-2.5
                          rounded-lg
                          border
                          border-border
                          text-sm
                          font-medium
                          hover:bg-muted
                          disabled:opacity-50
                        "
                      >
                        Cancel
                      </button>

                      <button
                        type="button"
                        onClick={handleEnable2FA}
                        disabled={loading2FA || otp.length !== 6}
                        className="
                          px-5
                          py-2.5
                          rounded-lg
                          btn-gradient
                          text-sm
                          font-medium
                          disabled:opacity-50
                          disabled:cursor-not-allowed
                        "
                      >
                        {loading2FA ? "Verifying..." : "Verify & Enable"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </div>

      {/* =====================================================
          RESET CONFIRMATION MODAL
      ===================================================== */}

      {showResetConfirm && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-background/70
            backdrop-blur-sm
            px-4
          "
        >
          <div
            className="
              w-full
              max-w-md
              bg-card
              border
              border-border
              rounded-2xl
              shadow-2xl
              p-6
            "
          >
            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-destructive/10
                text-destructive
                flex
                items-center
                justify-center
                mb-4
              "
            >
              <AlertTriangle className="w-5 h-5" />
            </div>

            <h3 className="text-lg font-semibold">Reset Authenticator?</h3>

            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              This will invalidate your current authenticator configuration. You
              will receive a new QR code and must configure your authenticator
              again.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                disabled={loading2FA}
                className="
                  px-4
                  py-2.5
                  rounded-lg
                  border
                  border-border
                  text-sm
                  font-medium
                  hover:bg-muted
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleReset2FA}
                disabled={loading2FA}
                className="
                  px-4
                  py-2.5
                  rounded-lg
                  bg-destructive
                  text-destructive-foreground
                  text-sm
                  font-medium
                  hover:bg-destructive/90
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                {loading2FA ? "Resetting..." : "Yes, Reset 2FA"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSettings;
