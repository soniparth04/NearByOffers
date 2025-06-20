import React, { useEffect, useState } from "react";
import axios from "axios";
import Filter from "../../../assets/Home/Filter.png"
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const LatestOffers = () => {
  const [offers, setOffers] = useState([]);  // State to hold the fetched offers
  const [loading, setLoading] = useState(true);  // Loading state to show spinner while fetching

  useEffect(() => {
    // Fetch offers from the backend
    const fetchCommonOffers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user/latest-offers", {
          withCredentials: true, // Pass cookies if needed
        });
        setOffers(response.data); // Update the state with the fetched offers
        setLoading(false);  // Set loading to false after the fetch completes
      } catch (err) {
        console.error("Error fetching common offers:", err);
        setLoading(false);  // Even if error occurs, stop loading
      }
    };

    fetchCommonOffers();
  }, []);  // Empty dependency array means this runs only once on component mount

  return (
    <div className="bg-gray-50 p-3 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-3" >
        <h2 className="text-l font-bold text-gray-900">Latest Offers Nearby</h2>
        <div className="flex space-x-2">
          <img src={Filter} alt="Filter offers" className="w-16" />
        </div>
      </div>
      {/* Display loading spinner while offers are being fetched */}
      {loading ? (
        <div className="text-center text-gray-500">Loading offers...</div>
      ) : (
        // If there are no offers, show a message
        offers.length === 0 ? (
          <p className="text-center text-gray-500">No common offers available.</p>
        ) : (
          // Display the offers in a responsive grid
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-5 lg:gap-5">
            {offers.map((offer) => (
              <Link to={`/offer/${offer._id}`} key={offer._id} className=" rounded-lg  overflow-hidden w-full max-w-[180px] mx-auto">
              {offer.image && (
                <img src={offer.image} alt={offer.title} className="w-full object-cover" />
              )}
              <div className="m-2">
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 text-xs">{offer.ownerId?.shopName}</p>
                  <Heart className="w-4 h-4 text-gray-400 cursor-pointer hover:text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-blue-900">{offer.title}</h3>
                <div className="flex items-center mt-1">
                  <span className="inline-flex items-center px-1.5 py-0.5 bg-gray-200 text-gray-700 text-xs font-medium rounded-full">
                    {offer.category}
                  </span>
                </div>
                <p className="text-sm">{offer.description}</p>
                <p className="text-gray-500 text-xs mt-1">
                  Valid Till: {new Date(offer.validTill).toLocaleDateString()}
                </p>
              </div>
              </Link>
            ))}
          </div>
        )
      )}

    </div>
  );
};

export default LatestOffers;
