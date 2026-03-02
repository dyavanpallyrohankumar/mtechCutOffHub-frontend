import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  username: string | null;
  pendingUsername: string | null;
  setPendingUsername: (username: string | null) => void;
  login: (token: string, username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    sessionStorage.getItem("auth_token")
  );

  const [username, setUsername] = useState<string | null>(
    sessionStorage.getItem("auth_username")
  );

  const [pendingUsername, setPendingUsername] = useState<string | null>(null);

  const login = (jwtToken: string, user: string) => {
    sessionStorage.setItem("auth_token", jwtToken);
    sessionStorage.setItem("auth_username", user);

    setToken(jwtToken);
    setUsername(user);
    setPendingUsername(null);
  };

  const logout = () => {
    sessionStorage.clear();
    setToken(null);
    setUsername(null);
    setPendingUsername(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        username,
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