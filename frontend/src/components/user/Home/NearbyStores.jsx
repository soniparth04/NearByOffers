import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import { ChevronRight } from "lucide-react";
import "../../../../src/index.css";

const NearbyStores = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   const navigate = useNavigate(); // Initialize navigate function
  
      const handleViewClick = () => {
          navigate("/All-shops"); // Navigate to /notification
      };

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/all-shops");
        setShops(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to load shops", err);
        setError("Failed to load shops");
      } finally {
        setLoading(false);
      }
    }; 

    fetchShops();
  }, []);

  if (loading) return <div className="text-center p-4">Loading nearby stores...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="bg-white px-4 py-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold text-gray-900">Nearby Stores</h2>
        <button onClick={handleViewClick} className="flex items-center text-sm text-gray-500 hover:text-black">
          View all <ChevronRight className="ml-1 w-4 h-4" />
        </button>
      </div>

      <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
        {shops.map((shop) => (
          <div
            key={shop._id}  // ✅ important: unique key
            className="min-w-[180px] max-w-[180px] flex-shrink-0 rounded-xl overflow-hidden"
          >
            <div className="relative">
              <img
                src={shop.profileImage} 
                alt={shop.shopName}
                className="w-full h-48 object-cover rounded-xl"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/180x192?text=Image+Error";
                }}
              />
              {/* Discount inside image */}
              <div className="absolute bottom-2 left-0 right-0 text-white text-sm font-semibold px-2 text-center">
                20% OFF
              </div>
            </div>

            {/* Store name + distance below image */}
            <div className="mt-2 text-center text-xs font-medium text-black">
              {shop.shopName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyStores;
