// components/pages/ResetPassword.jsx

import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { auth } from "../services/authService";
import ErrorMessage from "../components/common/ErrorMessage";

import Button from "../components/ui/Button";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const oobCode = searchParams.get("oobCode");

  useEffect(() => {
    const verifyCode = async () => {
      if (!oobCode) {
        setError("Invalid password reset link");
        return;
      }

      try {
        await verifyPasswordResetCode(auth, oobCode);
        setIsValid(true);
      } catch (error) {
        setError("This password reset link has expired or is invalid");
      }
    };

    verifyCode();
  }, [oobCode]);

  useEffect(() => {
    if (newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        setError("");
      } else {
        setError("Passwords do not match");
      }
    }
  }, [newPassword, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      navigate("/user", {
        state: {
          message: "Password successfully reset. Please log in with your new password.",
        },
      });
    } catch (error) {
      setError("Error resetting password. Please try again.");
    }
  };

  if (!isValid) {
    return (
      <div className="min-h-screen bg-lightBeige flex items-center justify-center">
        <ErrorMessage message="Verifying reset link..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lightBeige flex items-center justify-center">
      <div className="w-full max-w-lg md:max-w-lg lg:max-w-xl p-8">
        <h2 className="text-3xl font-oldstyle italic text-center mb-6">
          Reset Password
        </h2>

        <ErrorMessage message={error} />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="w-full px-4 py-3 border-b-2 bg-transparent border-gray-300 focus:border-darkRed focus:outline-none"
              required
            />
          </div>

          <div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              className="w-full px-4 py-3 border-b-2 bg-transparent border-gray-300 focus:border-darkRed focus:outline-none"
              required
            />
          </div>

          <div>
          <Button
            text="Reset Password"
            type="submit"
            size="medium"
            textColor="text-white"
            bgColor="bg-darkRed"
            className="w-full hover:bg-lightRed"
          />
        </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;