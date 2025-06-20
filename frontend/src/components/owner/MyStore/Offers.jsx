import React, { useEffect, useState } from "react";
import axios from "axios";
import OfferTimer from "../Offers/OfferTimer";

const Offers = () => {
    const [offers, setOffers] = useState([]);
    const [happyoffers, setHappyoffers] = useState([]);
    const [offerStatuses, setOfferStatuses] = useState({});

    // Fetch Spotlight Offers
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

    // Fetch Happy Hour Offers
    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/owner/get-all-happy-hours", {
                    withCredentials: true,
                });
                setHappyoffers(res.data);
            } catch (error) {
                console.error("Error fetching happy hour offers:", error);
            }
        };

        fetchOffers();
    }, []);

    const handleStatusChange = (offerId, status) => {
        setOfferStatuses((prev) => ({ ...prev, [offerId]: status }));
    };

    return (
        <div className="max-w-6xl mx-auto px-4 space-y-10 mb-20">
            {/* Spotlight Offers */}
            <div>
                {offers.length === 0 ? (
                    <p className="text-center text-gray-500">No Spotlight offers added by you.</p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {offers.map((offer) => (
                            <div
                                key={offer._id}
                                className="rounded-lg overflow-hidden w-full max-w-[180px] mx-auto shadow-md bg-white"
                            >
                                {offer.image && (
                                    <img
                                        src={offer.image}
                                        alt={offer.title}
                                        className="w-full h-40 object-cover"
                                    />
                                )}
                                <div className="p-2">
                                    <h3 className="font-bold text-blue-900 text-sm">{offer.title}</h3>
                                    <span className="inline-block bg-gray-200 text-gray-700 text-xs font-medium rounded-full px-2 py-0.5 mt-1">
                                        {offer.category}
                                    </span>
                                    <p className="text-xs mt-1">{offer.description}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Valid Till: {new Date(offer.validTill).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {happyoffers.map((offer) => {
                            const status = offerStatuses[offer._id];
                            return (
                                <div
                                    key={offer._id}
                                    className="rounded-lg overflow-hidden w-full max-w-[180px] mx-auto shadow-md bg-white"
                                >
                                    <img
                                        src={offer.offerImage}
                                        alt={offer.offerTitle}
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="p-2">
                                        <h3 className="text-lg font-bold text-gray-800">{offer.offerTitle}</h3>
                                        <span className="inline-block bg-gray-200 text-gray-700 text-xs font-medium rounded-full px-2 py-0.5 mt-1">
                                            {offer.category}
                                        </span>
                                        <p className="text-sm mt-1">{offer.description}</p>
                                       
                                        <OfferTimer
                                            startTime={offer.startTime}
                                            endTime={offer.endTime}
                                            date={offer.Date}
                                            onStatusChange={(status) => handleStatusChange(offer._id, status)}
                                        />
                                         {status === 'Starts In' && (
                                            <p className="text-xs -mt-2 text-red-700 font-semibold">Start: {offer.startTime}</p>
                                        )}
                                        {status === 'Time Remaining' && (
                                            <p className="text-xs text-red-800">End: {offer.endTime}</p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>



        </div>
    );
};

export default Offers;
