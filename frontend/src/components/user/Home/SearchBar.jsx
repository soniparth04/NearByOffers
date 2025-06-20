import React from "react";
import { useNavigate } from "react-router-dom"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Bell from "../../../assets/Home/bell.png"
import GiftBox from "../../../assets/Home/gift.png"

const SearchBar = () => {
    const navigate = useNavigate(); // Initialize navigate function

    const handleBellClick = () => {
        navigate("/notification"); // Navigate to /notification
    };

    return (
        <div
            className="flex items-center justify-between w-full px-4 py-3 gap-2 overflow-x-hidden"
            style={{ backgroundColor: '#ffffff' }} // Explicitly set white background
        >
            <div className="flex items-center space-x-2 border border-gray-300 rounded px-3 py-2 flex-grow max-w-full" style={{ backgroundColor: '#ffffff' }}>
                <span className="text-gray-600">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />

                </span>
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full border-none outline-none text-sm bg-transparent text-black"
                />
                <button className="text-gray-600">
                    <FontAwesomeIcon icon={faMicrophone} />
                </button>
            </div>

            {/* Icons Section */}
            <div className="flex items-center gap-4 shrink-0">
                <button onClick={handleBellClick} className="text-gray-600 focus:outline-none">
                    <img src={Bell} alt="Bell" className="w-7 h-7 " />
                </button>
                <button className="text-gray-600 focus:outline-none">
                    <img src={GiftBox} alt="Bell" className="w-7 h-7 " />
                </button>
            </div>
        </div>
    );
};

export default SearchBar;