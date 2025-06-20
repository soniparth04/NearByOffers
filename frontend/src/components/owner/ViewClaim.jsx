import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewClaim = () => {
    const { userId } = useParams();
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timeLeft, setTimeLeft] = useState({}); // Timer for each offer

    useEffect(() => {
        if (!userId) {
            setError("No user ID provided");
            setLoading(false);
            return;
        }

        const fetchOffers = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/owner/users/${userId}/claimed-offers`);
                setOffers(response.data.claimedOffers);

                // Initialize timers for each offer
                const initialTimers = {};
                response.data.claimedOffers.forEach(offer => {
                    initialTimers[offer._id] = calculateTimeLeft(offer.expiry);
                });
                setTimeLeft(initialTimers);
            } catch (err) {
                setError("Failed to fetch claimed offers");
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, [userId]);

    // Function to calculate remaining time
    const calculateTimeLeft = (expiry) => {
        const difference = new Date(expiry) - new Date();
        if (difference <= 0) return "Expired";

        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    // Update countdown timers every second
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTimers => {
                const updatedTimers = {};
                offers.forEach(offer => {
                    updatedTimers[offer._id] = calculateTimeLeft(offer.expiry);
                });
                return updatedTimers;
            });
        }, 1000);

        return () => clearInterval(timer); // Cleanup on unmount
    }, [offers]);

    const handleDelete = async (offerId) => {
        if (!window.confirm("Are you sure you want to delete this offer?")) return;

        try {
            await axios.delete(`http://localhost:5000/api/owner/users/${userId}/claimed-offers/${offerId}`);
            setOffers(prevOffers => prevOffers.filter(offer => offer._id !== offerId));
        } catch (err) {
            alert("Error deleting offer");
        }
    };

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="container mx-auto mt-10 ml-2">
            <h1 className="text-2xl font-bold mb-4 ml-2">Claimed Offers</h1>
            {offers.length > 0 ? (
                <ul className="list-none pl-5 ">
                    {offers.map((offer) => (
                        <li 
                            key={offer._id} 
                            className={`mb-4 ${timeLeft[offer._id] === "Expired" ? "text-red-500" : "text-black"}`}
                        >
                            <strong>Offer:-</strong> {offer.label} <br />
                            <strong>Description:</strong> {offer.description} <br />
                            <p className='font-semibold'>(Claimed on: {new Date(offer.claimedAt).toLocaleDateString()})</p>
                            <p className="text-sm">
                                {timeLeft[offer._id] === "Expired" ? (
                                    <span className="text-red-500">Expired</span>
                                ) : (
                                    <span className="text-red-600">Expires in: <strong> {timeLeft[offer._id]}</strong></span>
                                )}
                            </p>
                            <button onClick={() => handleDelete(offer._id)} className="bg-red-500 text-white px-3 py-1 rounded mb-2">Remove</button> 
                            <hr />
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No offers claimed yet.</p>
            )}
        </div>
    );
};

export default ViewClaim;
