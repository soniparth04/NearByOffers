import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Toggle from "./Toggle";

const MyStore = () => {
    const [shop, setShop] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOwnerInfo = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/owner/owner-info", {
                    withCredentials: true,
                });
                setShop(response.data);
            } catch (error) {
                console.error("Error fetching owner info:", error);
                navigate("/shop-owner-login");
            }
        };
        fetchOwnerInfo();
    }, [navigate]);

    if (!shop) return <div>Loading...</div>; // <- prevents null access error

    return (
        <div>
            <img
                src={shop.profileImage}
                alt={shop.shopName}
                className="w-full h-[500px] object-cover"
            />
            <div className="bg-white rounded-t-3xl -mt-40 p-6 relative">
                <div className="flex justify-center absolute -top-10 left-1/2 transform -translate-x-1/2">
                    {shop.shopImage && (
                        <img src={shop.shopImage} alt={shop.shopName} className="w-20 h-20 rounded-full border-4 border-white shadow-md" />
                    )}
                </div>
                <h2 className="text-center text-xl font-bold mb-2 pt-12 px-2">
                    "Here's How Your Store Looks to Customers"
                </h2>
                <h2 className="text-center text-xl mb-2">
                    {shop.shopName}
                </h2>
                <h2 className="text-center text-l mb-2 ">
                    {shop.city}, {shop.state}, {shop.country}
                </h2>
            </div>
            <Toggle/>
        </div>
    );
};

export default MyStore;
