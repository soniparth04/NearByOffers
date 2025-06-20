import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Home/Header"
import Navbar from "./Navbar"
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const AllShops = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div >
      <Header />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 sm:gap-1 lg:gap-5 mt-6">
        {shops.map((shop) => (
          <Link
          to={`/shop/${shop._id}`} 
          key={shop._id} 
            className="bg-white rounded-lg overflow-hidden w-full max-w-[195px] mx-auto"
          >
            <img
              src={shop.profileImage}
              alt={shop.shopName}
              className="w-full h-44 object-cover"
            />
            <div className="m-2">
              <div className="flex items-center justify-between">
                <p className="text-gray-600 text-xs">{shop.shopName}</p>
                <Heart className="w-4 h-4 text-gray-400 cursor-pointer hover:text-red-500" />
              </div>
              <p className="text-sm">
                {shop.city}, {shop.state}
              </p>
             
            </div>
          </Link>
        ))}
      </div>
      <Navbar />

    </div>
  );
};

export default AllShops;
