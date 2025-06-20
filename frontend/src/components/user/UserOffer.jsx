import React, { useState, useEffect } from "react"; 
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const UserOffer = () => {
    const { shopName, ownerId } = useParams();
    const [claimedOffers, setClaimedOffers] = useState([]);
    const [timeLeft, setTimeLeft] = useState({}); // Store timers for each offer
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClaimedOffers = async () => {
            try {
                console.log(`Fetching offers for shop: ${shopName}, ownerId: ${ownerId}`);
                const response = await axios.get(`http://localhost:5000/api/user/user-offers/${shopName}/${ownerId}`, {
                    withCredentials: true, 
                });

                console.log("Fetched Claimed Offers:", response.data.claimedOffers);
                setClaimedOffers(response.data.claimedOffers);

                // Initialize countdown timers for each offer
                const initialTimers = {};
                response.data.claimedOffers.forEach(offer => {
                    initialTimers[offer._id] = calculateTimeLeft(offer.expiry);
                });
                setTimeLeft(initialTimers);
            } catch (error) {
                console.error("Error fetching claimed offers:", error);
            }
        };

        fetchClaimedOffers();
    }, [shopName, ownerId]);

    // Function to calculate remaining time
    const calculateTimeLeft = (expiry) => {
        const difference = new Date(expiry) - new Date();
        if (difference <= 0) return "Expired";

        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    // Update all countdown timers every second
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTimers => {
                const updatedTimers = {};
                claimedOffers.forEach(offer => {
                    updatedTimers[offer._id] = calculateTimeLeft(offer.expiry);
                });
                return updatedTimers;
            });
        }, 1000);

        return () => clearInterval(timer); // Cleanup interval on unmount
    }, [claimedOffers]);

    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <h2 className="text-2xl font-bold mb-4">Your Offers</h2>
                {claimedOffers.length > 0 ? (
                    <ul className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
                        {claimedOffers.map((offer) => (
                            <li 
                                key={offer._id} 
                                className={`border-b py-2 text-center ${timeLeft[offer._id] === "Expired" ? "text-red-500" : "text-black"}`}
                            >
                                <strong>{offer.label}</strong> <br />
                                {offer.description} <br />
                                <span className="text-sm">
                                    {timeLeft[offer._id] === "Expired" ? (
                                        <span className="text-red-500">Expired</span>
                                    ) : (
                                        <span className="text-red-600">Expires in:<strong>  {timeLeft[offer._id]}</strong></span>
                                    )}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No offers yet....</p>
                )}
                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default UserOffer;
