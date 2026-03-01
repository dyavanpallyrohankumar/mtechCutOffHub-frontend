import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

interface AuthState {
  token: string | null;
  email: string | null;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (token: string, email: string) => void;
  logout: () => void;
  setPendingEmail: (email: string) => void;
  pendingEmail: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(() => {
    const token = sessionStorage.getItem("auth_token");
    const email = sessionStorage.getItem("auth_email");
    return {
      token,
      email,
      isAuthenticated: !!token,
    };
  });
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);

  const login = useCallback((token: string, email: string) => {
    sessionStorage.setItem("auth_token", token);
    sessionStorage.setItem("auth_email", email);
    setState({ token, email, isAuthenticated: true });
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem("auth_token");
    sessionStorage.removeItem("auth_email");
    setState({ token: null, email: null, isAuthenticated: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, pendingEmail, setPendingEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
