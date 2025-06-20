import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BottomNavigation from './Navbar/BottomNav';
import StatGrid from './DashboardComponent/StateGrid';
import Management from './DashboardComponent/Manage';
import { MapPin, HelpCircle } from 'lucide-react';

const OwnerDashboard = () => {
    const navigate = useNavigate();
    const [shopName, setShopName] = useState("");
    const [shopImage, setShopImage] = useState("");
    const [ownerId, setOwnerId] = useState("");

    useEffect(() => {
        const fetchOwnerInfo = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/owner/owner-info", {
                    withCredentials: true,
                });

                setShopName(response.data.shopName);
                setShopImage(response.data.shopImage);
                setOwnerId(response.data._id); 
                sessionStorage.setItem("ownerId", response.data._id);
            } catch (error) {
                console.error("Error fetching owner info:", error);
                navigate("/shop-owner-login");
            }
        };

        fetchOwnerInfo();
    }, [navigate]);
    return (
        <div>
            <div className="bg-gradient-to-b from-indigo-200 to-white pl-2 rounded-b-xl shadow-sm">
                <div className="flex justify-between items-center">
                    {/* Left side: Store image + name */}
                    <div
                        className="flex items-center space-x-2 cursor-pointer"

                    >
                        <div className="w-14 h-14 mb-4 rounded-full overflow-hidden shadow-md border-2 border-white transition-all transform group-hover:scale-105 group-hover:shadow-lg">
                            <img
                                src={shopImage}
                                alt="Store Logo"
                                className="w-full h-full object-cover" onClick={() => navigate(`/shop-owner/my-store?ownerId=${ownerId}`)}
                            />
                        </div>

                        <div className="ml-5 mt-6">
                            <h2 className="text-2xl ml-2 font-extrabold text-gray-800 tracking-tight group-hover:text-indigo-800 transition-colors">
                                {shopName ? `${shopName} ` : "Loading..."}
                            </h2>
                            <div className="flex items-center text-gray-500 ml-2 mt-1">
                                <MapPin size={14} className="mr-1" />
                                <span className="text-sm">Merchant Dashboard</span>
                            </div>
                            <p className="-ml-14 pb-4 font-extrabold text-[10px] text-gray-500 leading-none">
                                My Store
                            </p>
                        </div>
                    </div>

                    {/* Right side: Help button */}
                    <button
                        className="relative p-2.5 bg-white rounded-full shadow-sm border border-gray-100 hover:bg-gray-50 transition-all hover:shadow-md mr-2"
                        onClick={() => navigate(`/help-support?ownerId=${ownerId}`)}
                    >
                        <HelpCircle size={20} className="text-gray-600" />
                        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                </div>
            </div>
            <StatGrid  />
            <Management ownerId={ownerId} />
            <BottomNavigation ownerId={ownerId} />
        </div>
    );
};

export default OwnerDashboard;
