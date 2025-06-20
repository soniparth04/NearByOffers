import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const { ownerId } = useParams(); // Get ownerId from URL
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/user/check-auth", {
                    withCredentials: true
                });

                if (response.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    throw new Error("Not authenticated");
                }
            } catch (error) {
                alert("Please login first!");
                navigate(`/login/${ownerId}`); // Redirect to login page
            }
        };

        checkAuth();
    }, [navigate, ownerId]);

    if (isAuthenticated === null) return <div>Loading...</div>; // Prevent flickering

    return children;
};

export default ProtectedRoute;
