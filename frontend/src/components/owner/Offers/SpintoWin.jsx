import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const SpinToWin = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/owner/view-offers", {
          withCredentials: true,
        });
        if (Array.isArray(res.data)) {
          setOffers(res.data);
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (err) {
        console.error("Error fetching offers:", err);
        setError("Failed to fetch offers");
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  const handleDelete = async (offerId) => {
    if (window.confirm("Are you sure you want to delete this offer?")) {
      try {
        await axios.delete(`http://localhost:5000/api/owner/delete-offer/${offerId}`, {
          withCredentials: true,
        });
        setOffers((prev) => prev.filter((offer) => offer._id !== offerId));
      } catch (error) {
        console.error("Error deleting offer:", error);
      }
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 mb-20">
      {offers.length > 0 ? (
        offers.map((offer) => (
          <div key={offer._id} className="relative  p-4 mb-4 bg-white">
            {/* Top Right Icons */}
            <div className="absolute top-2 right-2 flex space-x-3">
              <Link to={`/edit-offer/${offer._id}`} className="text-blue-500 hover:text-blue-700 text-lg">
                <FaEdit />
              </Link>
              <button onClick={() => handleDelete(offer._id)} className="text-red-500 hover:text-red-700 text-lg">
                <FaTrash />
              </button>
            </div>

            {/* Offer Details */}
            <h3 className="text-lg font-bold">{offer.label}</h3>
            <p className="text-sm mt-1">{offer.description}</p>
            <p className="text-xs text-gray-500 mt-2">
              Valid Till: {new Date(offer.expiryDate).toLocaleDateString()}
            </p>
          </div>
        ))
      ) : (
        <div className="text-center p-4 text-gray-500">No offers found</div>
      )}
    </div>
  );
};

export default SpinToWin;
