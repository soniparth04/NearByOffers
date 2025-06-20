import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditOffer = () => {
    const { offerId } = useParams();  // Get offerId from URL
    const navigate = useNavigate();

    const [label, setLabel] = useState("");
    const [description, setDescription] = useState("");
    const [expiryDate, setExpiryDate] = useState("");

    // Helper function to format date
    const formatDate = (isoDate) => {
        return isoDate ? isoDate.split("T")[0] : ""; // Extracts "YYYY-MM-DD"
    };

    useEffect(() => {
        if (!offerId) {
            console.error("No offerId found in URL.");
            return;
        }

        const fetchOffer = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/owner/view-offer/${offerId}`, {
                    method: "GET",
                    credentials: "include", // Ensure cookies/session are sent
                });

                if (!response.ok) {
                    throw new Error(`Error fetching offer: ${response.statusText}`);
                }

                const data = await response.json();
                setLabel(data.label);
                setDescription(data.description);
                setExpiryDate(formatDate(data.expiryDate)); // Convert date format
            } catch (error) {
                console.error("Error fetching offer:", error.message);
                alert("Unauthorized. Please log in.");
                navigate("/owner-login"); // Redirect to login if unauthorized
            }
        };

        fetchOffer();
    }, [offerId, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/owner/edit-offer/${offerId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ label, description, expiryDate }),
            });

            if (!response.ok) {
                throw new Error("Failed to update offer");
            }

            alert("Offer updated successfully!");
            navigate("/shop-owner/view-offers");

        } catch (error) {
            console.error("Error updating offer:", error);
            alert("Error updating offer");
        }
    };

    return (
        <div className="container mx-auto mt-10 p-5">
            <h1 className="text-2xl font-bold mb-4">Edit Offer</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold">Offer Title</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold">Description</label>
                    <textarea
                        className="w-full p-2 border rounded"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold">Expiry Date</label>
                    <input
                        type="date"
                        className="w-full p-2 border rounded"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        required
                    />
                </div>
                <div className="flex gap-2">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Update Offer
                    </button>
                    <button type="button" onClick={() => navigate("/view-offers")} className="bg-gray-500 text-white px-4 py-2 rounded">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditOffer;
