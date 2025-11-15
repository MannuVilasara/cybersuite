"use client";

import { useState } from "react";
import { LoginForm, RegisterForm } from "./auth-forms";
import { Button } from "@/components/ui/button";

export function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSuccess = (data: {
    user?: { email: string };
    token?: string;
  }) => {
    if (mode === "login") {
      setSuccessMessage(`Welcome back, ${data.user?.email || "User"}!`);
      // Redirect or update UI as needed
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } else {
      setSuccessMessage("Registration successful! You can now login.");
      setMode("login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-600 via-purple-700 to-purple-900 p-4">
      <div className="w-full max-w-md space-y-4">
        {successMessage && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center">
            {successMessage}
          </div>
        )}

        {mode === "login" ? (
          <LoginForm onSuccess={handleSuccess} />
        ) : (
          <RegisterForm onSuccess={handleSuccess} />
        )}

        <div className="text-center">
          <Button
            variant="link"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="text-white hover:text-purple-200"
          >
            {mode === "login"
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </Button>
        </div>
      </div>
    </div>
  );
}
