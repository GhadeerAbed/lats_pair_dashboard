"use client";

import { useContext, createContext, useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getAuthData, setAuthData } from "@/utils/page";


interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  userData: any;
  updateUserData: (newData: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<any>({});
  const router = useRouter();
  const pathname = usePathname();


  // Define public routes with locale
  const publicRoutes = [
    `/`,
    `/login`,
  ];

  // Load user data on initial mount
  useEffect(() => {
    const authData = getAuthData();
    if (authData) {
       setUserData(authData);
      setIsAuthenticated(true);

      if (publicRoutes.includes(pathname)) {
        router.replace(`/dashboard`);
      }
    } else if (!publicRoutes.includes(pathname)) {
      router.replace(`/`);
    }
  }, [pathname]);

  const updateUserData = (newData: any) => {
    setUserData((prevData: any) => ({
      ...prevData,
      ...newData,
    }));
    setAuthData({ ...userData, ...newData });
  };

  const logout = () => {
    localStorage.removeItem("authUser");
    setIsAuthenticated(false);
    router.replace(`/login`);
  };

  if (typeof window === "undefined") return null; // Prevent SSR mismatch

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userData, updateUserData, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
