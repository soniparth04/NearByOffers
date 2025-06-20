import React from 'react';
import Navbar from '../Navbar';
import {
    User2, ChevronRight, Receipt,
    Briefcase,
    ShieldCheck,
    Settings,
    Bell, 
    MessageCircleQuestion, UserRound
} from "lucide-react";


const UserProfile = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100 w-full">
            <div className="m-4 mt-10 text-2xl font-bold text-gray-800 text-left">Profile</div>
            <div className="relative flex items-center bg-blue-600 rounded-2xl mx-4 mb-5 p-4 text-white shadow-lg">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-xl mr-4">
                    <UserRound/>
                </div>
                <div className="flex-col justify-start">
                    <h2 className="text-lg font-semibold">xyx</h2>
                    <p className="text-sm">@xyz</p>
                </div>
            </div>
            <div className='m-2 mx-4 bg-white p-4 rounded-xl'>
                <div className="flex items-center justify-between py-4 ">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <User2 className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-black">My Account</p>
                            <p className="text-xs text-gray-500">Make changes to your account</p>
                        </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <Receipt className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-black">Coupon History</p>
                            <p className="text-xs text-gray-500">View all previous coupons</p>
                        </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <Briefcase className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-black">Create Business Account</p>
                            <p className="text-xs text-gray-500">Create Business Account</p>
                        </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-black">Two-Factor Authenticationt</p>
                            <p className="text-xs text-gray-500">Further secure you account for safety</p>
                        </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <Settings className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-black">Settings</p>
                            <p className="text-xs text-gray-500">Manage app settings</p>
                        </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <Bell className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-black">Help and Support</p>
                        </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <MessageCircleQuestion className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-black">About App</p>
                        </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
            </div>

            <div className="mt-4 mb-4 items-start p-6 bg-white shadow-sm hover:bg-gray-50 cursor-pointer mx-4 rounded-xl">
                <p className="text-black font-normal text-sm content-start">FAQs</p>
                <p className="text-black font-normal text-sm content-start">ABOUT US</p>
                <p className="text-black font-normal text-sm content-start">TERMS OF USE</p>
                <p className="text-black font-normal text-sm content-start"
                >PRIVACY POLICY</p>
            </div>
            <button
                className="p-2  mb-20 border-2 border-black rounded text-center bg-white text-black outline-none ml-4 mr-4"
                style={{ border: '2px solid black' }} // Inline style as fallback
            >
                Log out
            </button>
            <Navbar />
        </div>
    );
};

export default UserProfile;