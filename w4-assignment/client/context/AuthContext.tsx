"use client";

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import axios from "axios";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
  login: (userData: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:4000/api/profile", {
          withCredentials: true,
        });
        setUser(response.data.user);
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (userData: any) => {
    if (userData) {
      setIsAuthenticated(true);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
