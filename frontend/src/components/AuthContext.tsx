import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

// Create interface for user
export interface User {
  _id: string;
  email: string;
  role: string;
  name?: string;
}

export interface AuthData {
  user: User | null;
  token: string | null;
}

interface AuthContextType extends AuthData {
  login: (data: AuthData) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Load from localStorage on refresh
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      const parsed: AuthData = JSON.parse(saved);
      setUser(parsed.user);
      setToken(parsed.token);
    }
  }, []);

  // When logging in, give data to local storage
  const login = (data: AuthData) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data.user);
    setToken(data.token);
  };

  // When logging out, remove data from local storage
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
