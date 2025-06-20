import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, TrendingUp, Zap, Users, Eye, BarChart3, Calendar, ChevronDown, Info } from 'lucide-react';

const BoostSpotlightOffer = () => {
    const { offerId } = useParams();
    const [budget, setBudget] = useState(1200);
    const [agree, setAgree] = useState(false);
    const [loading, setLoading] = useState(false);
    const REACH_PER_RUPEE = 3;
    const reach = budget * REACH_PER_RUPEE;

    const handleBoost = async () => {
        if (!agree || loading) return;
        setLoading(true);
        try {
            await axios.post(`/api/boost-offer/${offerId}`, { amount: budget });
            alert("Offer Boosted!");
        } catch (err) {
            alert("Boost failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative bg-gray-50">
            <div className="bg-white px-4 py-3 shadow-sm flex items-center justify-between sticky top-0 z-20 border-b border-gray-200">
                {/* Left Section: Back Button + Title */}
                <div className="flex items-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="mr-3 rounded-full p-2 hover:bg-gray-100 active:bg-gray-200 text-gray-700 transition-all"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-lg sm:text-xl font-bold text-gray-800">
                            Boost Your Offer
                        </h1>
                        <p className="text-xs text-gray-500 hidden xs:block">
                            Increase visibility and reach
                        </p>
                    </div>
                </div>

                {/* Right Section: Indicator */}
                <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse mr-2"></div>
                    <span className="text-xs font-medium text-purple-700 hidden xs:block">
                        Campaign Builder
                    </span>
                </div>
            </div>

            {/* Offer Preview Card - Enhanced mobile layout */}
            <div className="p-4 pt-6 mt-1  z-10 relative">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4 relative overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-100 to-transparent rounded-bl-full opacity-50"></div>

                    <div className="flex items-start space-x-4 relative z-10">
                        <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                            <Zap size={22} className="text-white" />
                        </div>


                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-800 text-lg leading-tight mb-1">offer title</h3>
                            <div className="flex items-center mb-3">
                                <Eye size={14} className="text-gray-500 mr-1" />
                                <p className="text-sm text-gray-600">Currently reaching users 0</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 ">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></div>
                                    'Active'
                                </span>
                                <div className="text-xs text-gray-500">
                                    spotlight
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 
             p-4 mb-4 relative overflow-hidden mx-4 mb-40">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <div className="w-6 h-6 rounded-full bg-purple-700 mr-2 flex items-center 
justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 
24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                            strokeLinecap="round" strokeLinejoin="round" className="text-white">
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                    </div>
                    Set Your Budget
                </h2>
                <p className="text-sm text-gray-600 mb-4">Adjust your spend to reach more users in your area</p>
                <div className="flex justify-between text-sm font-medium text-gray-500 
mb-4">
                    <span className="text-sm font-medium text-gray-600">₹0</span>
                    <span className="text-lg font-bold text-purple-700">₹{budget}</span>
                    <span className="text-sm font-medium text-gray-600" >₹5000</span>
                </div>

                {/* Slider */}
                <input
                    type="range"
                    min={0}
                    max={5000}
                    step={100}
                    value={budget}
                    onChange={(e) => setBudget(parseInt(e.target.value))}
                    className="w-full mb-2 accent-purple-600"
                />

                {/* Budget & Reach Boxes */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-purple-700 mb-1">💸 Budget (₹)</label>
                    <input
                        type="number"
                        value={budget}
                        onChange={(e) => {
                            const value = parseInt(e.target.value) || 0;
                            setBudget(Math.max(0, value)); // 👈 prevent negative
                        }}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl 
focus:outline-none focus:ring-2 focus:ring-purple-300 
focus:border-purple-400 transition-all text-lg font-medium bg-gray-50 "
                    />

                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-blue-700 mb-1">👥 Reach (Users)</label>
                    <input
                        type="text"
                        value={reach}
                        readOnly
                        className="w-full p-4 border-2 border-gray-200 rounded-xl 
focus:outline-none focus:ring-2 focus:ring-purple-300 
focus:border-purple-400 transition-all text-lg font-medium bg-gray-50 
focus:bg-white"
                    />
                </div>


                <div className="mt-4 p-4 bg-gradient-to-br from-purple-50 to-indigo-50 
rounded-xl border border-purple-100">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <h3 className="text-lg font-bold text-purple-700">Est. Reach: <span
                                className="text-gray-800">{reach.toLocaleString()} </span></h3>
                            <p className="text-gray-600 text-sm">users in your area</p>
                        </div>
                        <div className="flex items-center bg-white/50 px-2 py-1 rounded-lg">
                            <Eye size={16} className="text-gray-600 mr-1" />
                            <span className="text-gray-600 text-xs">Visible to all nearby</span>
                        </div>
                    </div>

                    {/* Performance indicators with icons */}
                    <div className="flex items-center justify-between text-xs text-gray-600">
                        <div className="flex items-center">
                            <BarChart3 size={14} className="mr-1 text-purple-600" />
                            <span>High visibility campaign</span>
                        </div>
                        <div className="flex items-center">
                            <TrendingUp size={14} className="mr-1 text-green-600" />
                            <span>Peak hours boost</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 
rounded-xl border border-purple-200">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Total Campaign
                                Budget</h3>
                            <p className="text-xs text-gray-500 mt-1">For immediate boost</p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-purple-700">₹{budget}
                            </p>
                            <p className="text-xs text-gray-500"></p>
                        </div>
                    </div>
                </div>

                <div className="mt-5 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <div className="flex items-start">
                        <input
                            type="checkbox"
                            id="agree"
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                            className="mr-2"
                        />
                        <div className="flex-1">
                            <label htmlFor="termsAgreement" className="text-gray-700 text-sm 
leading-relaxed cursor-pointer">
                                I agree to the <span className="text-purple-700 font-medium 
underline">Sponsored Ads Terms</span> and understand that charges will
                                apply to my account.
                            </label>
                            <div className="flex items-center mt-2">
                                <Info size={14} className="text-amber-600 mr-1" />
                                <span className="text-xs text-amber-700">Your campaign will start
                                    immediately after payment</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between items-center max-w-md mx-auto">
                <div>
                    <p className="text-sm text-gray-600">Campaign Ready</p>
                    <p className="font-semibold">{reach.toLocaleString()} reach <span className="text-purple-600">₹{budget}</span></p>
                </div>
                <button
                    disabled={!agree || budget == 0}
                    onClick={handleBoost}
                    className={`px-4 py-2 rounded-lg font-medium text-white transition ${agree && budget > 0 ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-400 cursor-not-allowed"
                        }`}
                >
                    ⚡ Boost for ₹{budget}
                </button>
            </div>


        </div>
    );
};

export default BoostSpotlightOffer;
