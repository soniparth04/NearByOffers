import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Catalogs = () => {
    const [catalogs, setCatalogs] = useState([]);
    const [currentIndexes, setCurrentIndexes] = useState({});

    useEffect(() => {
        const fetchCatalogs = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/owner/view-catalog",
                    { withCredentials: true }
                );
                setCatalogs(response.data);

                const initialIndexes = {};
                response.data.forEach((catalog) => {
                    initialIndexes[catalog._id] = 0;
                });
                setCurrentIndexes(initialIndexes);
            } catch (err) {
                console.log("Error fetching catalogs", err);
            }
        };

        fetchCatalogs();
    }, []);

    const handlePrev = (id) => {
        setCurrentIndexes((prev) => ({
            ...prev,
            [id]: prev[id] > 0 ? prev[id] - 1 : prev[id],
        }));
    };

    const handleNext = (id, totalImages) => {
        setCurrentIndexes((prev) => ({
            ...prev,
            [id]: prev[id] < totalImages - 1 ? prev[id] + 1 : prev[id],
        }));
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 ">
            {catalogs.length === 0 ? (
                <p className="text-center text-gray-500">No catalogs available.</p>
            ) : (
                <div className="grid grid-cols-2 gap-4">
                    {catalogs.map((catalog) => {
                        const images = catalog.image || [];
                        const currentImage = currentIndexes[catalog._id] || 0;

                        return (
                            <div
                                key={catalog._id}
                                className="rounded-xl flex flex-col"
                            >
                                <div className="relative bg-green-500 w-full h-40 rounded-xl flex items-center justify-center overflow-hidden">
                                    {images.length > 0 ? (
                                        <>
                                            <img
                                                src={images[currentImage]}
                                                alt={`catalog-${currentImage}`}
                                                className="w-full h-full object-cover"
                                            />

                                            {/* Image count badge (only if more than 1 image) */}
                                            {images.length > 1 && (
                                                <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-0.5 rounded-full">
                                                    {currentImage + 1} / {images.length}
                                                </div>
                                            )}

                                            {/* Left arrow (only if not first image) */}
                                            {images.length > 1 && currentImage > 0 && (
                                                <button
                                                    onClick={() => handlePrev(catalog._id)}
                                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 text-black px-1 py-1 rounded-full text-xs"
                                                >
                                                    <ChevronLeft size={20} />
                                                </button>
                                            )}

                                            {/* Right arrow (only if not last image) */}
                                            {images.length > 1 && currentImage < images.length - 1 && (
                                                <button
                                                    onClick={() =>
                                                        handleNext(catalog._id, images.length)
                                                    }
                                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 text-black px-1 py-1 rounded-full text-xs"
                                                >
                                                    <ChevronRight size={20} />
                                                </button>
                                            )}
                                        </>
                                    ) : (
                                        <p className="text-gray-400">No image</p>
                                    )}
                                </div>

                                <div className="pl-2 pb-4">
                                    <p className="text-sm text-green-700 font-bold mt-1">Price: ₹{catalog.price}</p>

                                    <h3 className="text-sm font-semibold">{catalog.title}</h3>
                                    <p className="text-xs text-gray-500">{catalog.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <div className="mt-8 text-center">
                <Link to="/shop-owner/add-catalogs" >
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-20 rounded-xl transition duration-300"
                    onClick={() => {
                        // Handle navigation or modal open logic here
                        // e.g., navigate("/upload-catalog") or openUploadModal()
                        console.log("Upload Catalogue button clicked");
                    }}
                >
                    Upload Catalogue
                </button>
                </Link>
            </div>
        </div>
    )
}

export default Catalogs;