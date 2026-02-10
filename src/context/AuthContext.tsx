"use client";
import dotenv from "dotenv";
dotenv.config();
import React from "react";
import { createContext, useState } from "react";
import { setCookie } from "nookies";
import { useRouter } from "next/navigation";

interface AuthContextProps {
  isAuthenticated: boolean;
  LoginAdmin: (data: { email: string; password: string }) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const URL = `${API_URL}/login`;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  async function LoginAdmin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro no login");
      }

      const { token } = await response.json();

      setCookie(undefined, "nextauth.token", token, {
        maxAge: 60 * 60 * 24,
        path: "/",
      });
      setIsAuthenticated(true);
      router.push("/protected/allcategories");
    } catch (error: any) {
      console.error("Erro ao fazer login:", error.message);
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, LoginAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}
