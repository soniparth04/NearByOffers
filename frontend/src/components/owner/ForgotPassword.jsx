import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [phone, setPhone] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleResetPassword = async () => {
        if (!phone || !newPassword || !confirmPassword) {
            setMessage("Please fill all fields.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/owner/owner-reset-password", {
                phone,
                newPassword,
            });

            if (response.status === 200) {
                setMessage("Password updated successfully. ");
                setTimeout(() => navigate("/owner-login"), 3000);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "Failed to reset password.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Reset Password</h2>

                {message && <div className="text-red-500 mb-3">{message}</div>}

                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                    type="text"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button
                    onClick={handleResetPassword}
                    className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    Reset Password
                </button>
            </div>
        </div>
    );
};

export default ForgotPassword;
