import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Tag, Eye, Zap } from 'lucide-react';

const ViewSpotlightOffer = () => {
    const [offers, setOffers] = useState([]);
    const navigate = useNavigate(); // Add this

    useEffect(() => {
        const fetchCommonOffers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/owner/common-offers", {
                    withCredentials: true,
                });
                setOffers(response.data);
            } catch (err) {
                console.error("Error fetching common offers:", err);
            }
        };

        fetchCommonOffers();
    }, []);

    const handleBoostClick = (offerId) => {
        navigate(`/shop-owner/boost-spotlight/${offerId}`);
    };

    return (
        <div className="max-w-6xl  px-4 py-8 mb-20">
            {offers.length === 0 ? (
                <p className="text-center text-gray-500">No Spotlight offers added by you.</p>
            ) : (
                <div className="space-y-4">
                    {offers.map((offer) => (
                        <div
                            key={offer._id}
                            className="flex flex-row sm:flex-row bg-white rounded-lg shadow overflow-hidden"
                        >
                            {offer.image && (
                                <img
                                    src={offer.image}
                                    alt={offer.title}
                                    className=" w-32 h-36 object-cover"
                                />
                            )}
                            <div className="pl-2 py-2  flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-bold">{offer.title}</h3>
                                    <span className="inline-block bg-gray-200 text-gray-700 text-xs font-medium rounded-full px-2 py-0.5 mt-1">
                                        {offer.category}
                                    </span>
                                    <p className="text-sm mt-2">{offer.description}</p>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    Valid Till: {offer.validTill}
                                </p>
                                <div className="flex items-center justify-between text-xs text-gray-600 p-2">
                                    <div className="flex items-center gap-1 ">
                                        <Eye size={18} />
                                        <span>68</span>
                                    </div>
                                    <div className="flex items-center cursor-pointer" onClick={() => handleBoostClick(offer._id)}>
                                        <Zap size={14} />
                                        <span className='pl-1'>Boost</span>
                                    </div>
                                    <div>
                                        <label className="relative inline-flex items-center cursor-pointer ml-1">
                                            <input type="checkbox" defaultChecked className="sr-only peer" />
                                            <div className="w-9 h-4 bg-gray-200 rounded-full peer-checked:bg-indigo-600 transition"></div>
                                            <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform"></div>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewSpotlightOffer;
    