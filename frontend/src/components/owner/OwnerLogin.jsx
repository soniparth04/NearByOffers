import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const OwnerLogin = () => {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

   const handleLogin = async (event) => {
    event.preventDefault();

    try {
        const response = await axios.post(
            "http://localhost:5000/api/owner/owner-login",
            { phone, password },
            { withCredentials: true }
        );

        console.log("Login response:", response.data);

        const ownerId = response?.data?.ownerId;

        if (ownerId) {
            navigate(`/shop-owner-dashboard?ownerId=${ownerId}`);
        } else {
            alert("Login successful but owner ID not found in response.");
        }
    } catch (error) {
        console.error("Login failed:", error);
        alert("Invalid credentials!");
    }
};

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Shop Owner Login</h2>
                <form onSubmit={handleLogin} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="p-2 border rounded"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-2 border rounded"
                        required
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                        Login
                    </button>
                </form>
                {message && <p className="mt-2 text-red-500">{message}</p>}
                <p className="text-center mt-4 text-sm">
                    Don't have an account?{" "}
                    <Link to="/shop-owner-registration" className="text-blue-500 hover:underline">
                        Click here to Register
                    </Link>
                </p>
                <p className="text-center mt-2 text-sm">
                    <Link to="/forgot-password" className="text-blue-500 hover:underline">
                        Forgot Password?
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default OwnerLogin;
