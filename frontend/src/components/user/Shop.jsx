import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SwitchOffer from "./SwitchOffer";

const ShopDetails = () => {
    const { id } = useParams();
    const [shop, setShop] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShop = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/user/shop/${id}`);
                setShop(res.data);
            } catch (error) {
                console.error("Error fetching shop details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchShop();
    }, [id]);

    const handleGetDirections = () => {
        if (shop) {
            let mapUrl = '';
            if (shop.latitude && shop.longitude) {
                mapUrl = `https://www.google.com/maps/search/?api=1&query=${shop.latitude},${shop.longitude}`;
            } else {
                const address = `${shop.shopName}, ${shop.city}, ${shop.state}, ${shop.country}`;
                const encodedAddress = encodeURIComponent(address);
                mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
            }
            window.open(mapUrl, '_blank');
        }
    };


    if (loading) return <p>Loading...</p>;
    if (!shop) return <p>Shop not found</p>;

    return (
        <div >
            <div >
                <img src={shop.profileImage}
                    alt={shop.shopName} className="w-full h-[500px] object-cover" />
            </div>
            <div className="bg-white  rounded-t-3xl  -mt-40 p-6 relative">
                <div className="flex justify-center absolute -top-10 left-1/2 transform -translate-x-1/2">
                    {shop.shopImage && <img src={shop.shopImage} alt={shop.shopName} className="w-20 h-20 rounded-full border-4 border-white shadow-md" />}

                </div>
                <h2 className="text-center text-xl font-bold mb-2 pt-12">
                    {shop.shopName}
                </h2>
                <h2 className="text-center text-l mb-2 ">
                    {shop.city}, {shop.state}, {shop.country}
                </h2>
                <div className="text-center text-yellow-400">
                    <span className="text-xl">★★★★★</span>
                </div>
                <div className="text-center mt-4">
                    <button
                        onClick={handleGetDirections}
                        className="bg-blue-800 text-white font-semibold py-2 px-28 rounded-full"
                    >
                        Get Directions
                    </button>
                </div>

            </div>
            <SwitchOffer shopId={shop._id} />
        </div>
    );
};

export default ShopDetails;
