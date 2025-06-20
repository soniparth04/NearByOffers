import React, { useEffect, useState } from 'react';
import { Pencil, ChevronRight, User, Clock, HelpCircle, Info, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../Navbar/BottomNav';
import axios from 'axios';

const AccountPage = () => {
  const navigate = useNavigate();
  const [shopName, setShopName] = useState("");
  const [shopImage, setShopImage] = useState("");
  const ownerId = sessionStorage.getItem("ownerId");

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/owner/owner-logout", {}, { withCredentials: true });
      navigate("/shop-owner-login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const fetchOwnerInfo = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/owner/owner-info", {
          withCredentials: true,
        });

        setShopName(response.data.shopName);
        setShopImage(response.data.shopImage);
      } catch (error) {
        console.error("Error fetching owner info:", error);
        navigate("/shop-owner-login");
      }
    };

    fetchOwnerInfo();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center w-full bg-gray-100 min-h-screen pb-20">
      <div className="w-full max-w-md mx-auto">
        {/* Profile Header */}
        <div className="bg-gray-100 w-full p-4 pb-0">
          <h1 className="text-2xl font-bold mb-4">Profile</h1>

          <div className="bg-blue-700 w-full rounded-xl p-4 flex items-center justify-between relative" onClick={() => navigate(`/shop-owner/my-store?ownerId=${ownerId}`)}>
            <div className="flex items-center" >
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center overflow-hidden mr-3">
                <img
                  src={shopImage}
                  alt="Store Logo"
                  className="w-full h-full object-cover" 
                  />
              </div>
              <div className="text-white">
                <h2 className="font-medium text-lg">My Store</h2>
                <p className="text-sm text-white opacity-80">{shopName}</p>
              </div>
            </div>
            <button
              className="text-white"
              onClick={() => navigate('')}
            >
              <Pencil size={20} />
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="w-full bg-white mt-4">
          {/* Store Information */}
          <div
            className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer"
            onClick={() => navigate(`/shop-owner/edit?ownerId=${ownerId}`)}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                <User size={20} className="text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium">Store Information</h3>
                <p className="text-sm text-gray-400">Make changes to your account</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>

          {/* Location & Branch */}
          <div
            className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer"
            onClick={() => navigate(`/shop-owner/Locationandbranch?ownerId=${ownerId}`)}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Location & Branch</h3>
                <p className="text-sm text-gray-400">Manage store location details</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>

         
          <div
            className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer"
            onClick={() => navigate(`/shop-owner/Wallet?ownerId=${ownerId}`)}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                <User size={20} className="text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium">Wallet</h3>
                <p className="text-sm text-gray-400">Manage your balance and transactions</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>

          {/* Timing & Availability */}
          <div
            className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer"
            onClick={() => navigate('')}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                <Clock size={20} className="text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium">Timing & Availability</h3>
                <p className="text-sm text-gray-400">Further secure your account for safety</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>

          {/* Settings */}
          <div
            className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer"
            onClick={() => navigate('')}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                <Settings size={20} className="text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium">Settings</h3>
                <p className="text-sm text-gray-400">Manage app settings</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>

          {/* Help & Support */}
          <div
            className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer"
            onClick={() => navigate('')}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                <HelpCircle size={20} className="text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium">Help & Support</h3>
                <p className="text-sm text-gray-400"></p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>

          {/* About App */}
          <div
            className="flex items-center justify-between p-4 cursor-pointer"
            onClick={() => navigate('')}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                <Info size={20} className="text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium">About App</h3>
                <p className="text-sm text-gray-400"></p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </div>

        {/* Create Account Button */}
        <div className="w-full p-4 mt-4">
          <button
            onClick={handleLogout}
            className="w-full bg-red-700 text-white py-3 rounded-lg font-medium text-lg flex items-center justify-center"
          >

            LogOut
          </button>
        </div>

        {/* Footer Links */}
        <div className="w-full p-4">
          <div className="flex flex-col space-y-4">
            <a href="" className="text-gray-600 font-medium">FAQs</a>
            <a href="" className="text-gray-600 font-medium">ABOUT US</a>
            <a href="" className="text-gray-600 font-medium">TERMS OF USE</a>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default AccountPage;