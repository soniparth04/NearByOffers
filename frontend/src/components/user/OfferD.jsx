import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Filter } from 'lucide-react';
import Navbar from "./Navbar";

const offerItems = [
    "🎁", "🎡", "🛍️", "🎯", "🎉",
    "🏆", "🎫", "💎", "🧩", "🚀"
];

const OfferDetail = () => {
    const { id } = useParams();
    const [offer, setOffer] = useState(null);


    useEffect(() => {
        const fetchOffer = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/user/offer/${id}`);
                setOffer(response.data);
            } catch (err) {
                console.error("Error fetching offer details:", err);
            }
        };

        fetchOffer();
    }, [id]);

    if (!offer) {
        return <div className="text-center text-gray-500 mt-10">Loading offer details...</div>;
    }

    return (
        <div className="min-h-screen bg-white-100 pb-0">
            <div className="relative">
            {offer.image && <img src={offer.image} alt={offer.title} className="w-full  object-cover" />}
            </div>
            <div className="bg-white rounded-t-3xl shadow-lg -mt-16 p-6 relative">
                {/* Logo */}
                <div className="flex justify-center absolute -top-10 left-1/2 transform -translate-x-1/2">
                    {offer.image && <img src={offer.image} alt={offer.title} className="w-20 h-20 rounded-full border-4 border-white shadow-md" />}
                </div>
                <h2 className="text-center text-xl font-bold mb-2 pt-12">
                    {offer.title} [ by {offer.ownerId?.shopName}]
                </h2>
                <p className="text-center text-gray-600 text-sm mb-4">
                    Valid Till: {new Date(offer.validTill).toLocaleDateString()}
                </p>

                {/* Divider */}
                <hr className="my-4 border-gray-200" />

                <div className="px-6 pt-4">
                    <h3 className="text-sm font-semibold mb-2 text-left">Steps to Redeem:</h3>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-2 mb-6">
                        <li>Visit the store at [Store Address]</li>
                        <li>Walk into the store and shop normally.</li>
                        <li>{offer.description}</li>
                        <li>Enjoy instant savings!</li>
                    </ul>
                </div>

                <div className="bg-white flex flex-col h-full px-4 py-4">
                    {/* Title + Filter Icon */}
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-md font-semibold">More offers from this store</h3>
                        <Filter className="w-5 h-5 text-gray-600" />
                    </div>

                    {/* Offer Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 flex-grow">
                        {offerItems.map((item, index) => (
                            <div
                                key={index}
                                className="aspect-square bg-gradient-to-r from-pink-200 via-yellow-200 to-green-200 rounded-xl flex items-center justify-center text-5xl"
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <Navbar/>
        </div>
    );
};

export default OfferDetail;
