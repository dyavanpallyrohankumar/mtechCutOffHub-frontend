import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  username: string | null;

  twoFactorEnabled: boolean;
  setTwoFactorEnabled: (enabled: boolean) => void;

  pendingUsername: string | null;
  setPendingUsername: (username: string | null) => void;

  login: (token: string, username: string, twoFactorEnabled: boolean) => void;

  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  /*
   * JWT token
   */
  const [token, setToken] = useState<string | null>(
    sessionStorage.getItem("auth_token"),
  );

  /*
   * Logged-in username
   */
  const [username, setUsername] = useState<string | null>(
    sessionStorage.getItem("auth_username"),
  );

  /*
   * 2FA status
   *
   * Stored as a string in sessionStorage,
   * therefore convert it back to boolean.
   */
  const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(
    sessionStorage.getItem("two_factor_enabled") === "true",
  );

  /*
   * Username waiting for email OTP verification.
   */
  const [pendingUsername, setPendingUsername] = useState<string | null>(null);

  /*
   * Login
   *
   * Called only after the backend has successfully
   * authenticated the user and returned a JWT.
   */
  const login = (jwtToken: string, user: string, enabled: boolean) => {
    sessionStorage.setItem("auth_token", jwtToken);

    sessionStorage.setItem("auth_username", user);

    sessionStorage.setItem("two_factor_enabled", String(enabled));

    setToken(jwtToken);

    setUsername(user);

    setTwoFactorEnabled(enabled);

    setPendingUsername(null);
  };

  /*
   * Logout
   */
  const logout = () => {
    sessionStorage.clear();

    setToken(null);

    setUsername(null);

    setTwoFactorEnabled(false);

    setPendingUsername(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        username,

        twoFactorEnabled,
        setTwoFactorEnabled,

        pendingUsername,
        setPendingUsername,

        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
