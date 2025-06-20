import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from '../Other/DatePicker';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, X, FileText, Sparkles, FilePenLine, Eye } from 'lucide-react';

const AddCommonOffer = () => {
    const navigate = useNavigate();
    const [ownerId, setOwnerId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [StartDate, SetStartDate] = useState("");
    const [EndDate, SetEndDate] = useState("");
    const [MinimumPurchase, SetMinimumPurchase] = useState("");
    const [NuRedemption, SetNuRedemption] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [category, setCategory] = useState("");
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const fetchOwnerInfo = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/owner/owner-info", {
                    withCredentials: true,
                });
                setOwnerId(response.data._id);
            } catch (error) {
                console.error("Error fetching owner info:", error);
                navigate("/shop-owner-login");
            }
        };
        fetchOwnerInfo();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !StartDate || !EndDate || !imageFile || !category) {
            alert("Please fill in all fields including category and image");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("StartDate", StartDate);
        formData.append("EndDate", EndDate);
        formData.append("MinimumPurchase", MinimumPurchase)
        formData.append("NuRedemption", NuRedemption);
        formData.append("ownerId", ownerId);
        formData.append("image", imageFile);
        formData.append("category", category); formData

        try {
            await axios.post("http://localhost:5000/api/owner/create-offer", formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Common offer added successfully!");
            navigate("/shop-owner-dashboard");
        } catch (error) {
            console.error("Error adding common offer:", error);
            alert("Failed to add common offer");
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };


    return (
        <div className="p-4 bg-white mb-20">
            <form onSubmit={handleSubmit} className="flex flex-col py-5 gap-6 bg-white mx-auto max-w-md rounded-xl relative z-10 mt-0">
                <div className="mb-1">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                        <Sparkles size={18} className="text-blue-600 mr-2" />
                        Spotlight Details
                    </h2>
                    <p className="text-sm text-gray-500">Create a special promotional offer to highlight your products or services</p>
                </div>
                <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">Offer Title<span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded-xl border bg-gray-50 px-4 py-3.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all outline-none"
                        placeholder="e.g. 10% OFF on all services"
                    />
                    <p className="text-xs text-gray-500 mt-1">Create a clear, attractive title for your offer</p>
                </div>
                <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">Description<span className="text-red-500">*</span></label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full rounded-xl border bg-gray-50 px-4 py-3.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all outline-none"
                        placeholder="Enter offer details..."
                        rows={2}
                    />
                    <p className="text-xs text-gray-500 mt-1">Briefly describe what customers will get with this offer</p>
                </div>
                <div>
                    <label className="block text-base font-medium text-gray-700 mb-2"> Select Category <span className="text-red-500">*</span></label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded-xl border bg-gray-50 px-4 py-3.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all outline-none"
                    >
                        <option value="">Select category</option>
                        <option value="Food">Food</option>
                        <option value="Salon">Salon</option>
                        <option value="Property">Property</option>
                        <option value="Vehicle">Vehicle</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Choose a category that best fits your offer</p>
                </div>

                <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
                        Start Date <span className="text-red-500">*</span>
                    </label>
                    <DatePicker
                        value={StartDate}
                        onChange={(date) => SetStartDate(date)}

                        placeholder="Start Date"
                    />
                    <p className="text-xs text-gray-500 mt-1">Choose the date when this offer becomes active and visible to customers</p>
                </div>
                <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
                        End Date <span className="text-red-500">*</span>
                    </label>
                    <DatePicker
                        value={EndDate}
                        onChange={(date) => SetEndDate(date)}
                        placeholder="Start Date"
                    />
                    <p className="text-xs text-gray-500 mt-1">Choose the date when this offer becomes active and visible to customers</p>
                </div>

                <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">Min Purchase (optional)</label>
                    <div className="relative w-full rounded-xl border bg-gray-50 px-4 py-3.5 flex items-center focus-within:ring-2 focus-within:ring-blue-300 focus-within:border-blue-500 transition-all">
                        <span className="text-gray-500 mr-2">₹</span>
                        <input
                            name="minPurchase"
                            value={MinimumPurchase}
                            onChange={(e) => SetMinimumPurchase(e.target.value)}
                            className="flex-1 bg-transparent outline-none"
                            placeholder="199"
                            type="number"
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Set a minimum purchase amount required to use this offer</p>
                </div>
                <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">Number of Redemptions</label>
                    <input
                        name="redemptionsAllowed"
                        value={NuRedemption}
                        onChange={(e) => SetNuRedemption(e.target.value)}
                        className="w-full rounded-xl border bg-gray-50 px-4 py-3.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all outline-none"
                        placeholder="100"
                        type="number"
                        min="0"
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter the maximum number of redemptions (leave empty for unlimited)</p>
                </div>

                <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
                        Upload Image<span className="text-red-500">*</span> <span className="text-xs text-gray-500 ml-1">Best size: 300x200 px, max 10MB</span>
                    </label>
                    <div className="w-full space-y-2">
                        {imagePreview ? (
                            <div className="w-full">
                                <div className="flex items-center justify-center py-2">
                                    <div className="relative w-full max-w-sm h-48">
                                        <img
                                            src={imagePreview}
                                            alt="Offer preview"
                                            className="w-full h-full object-cover rounded-xl"
                                        />
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setImageFile(null);
                                                setImagePreview(null);
                                            }}
                                            className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <label htmlFor="offerImageUpload" className="w-full h-32 bg-gray-50 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors">
                                <div className="flex flex-col items-center">
                                    <div className="p-3 bg-blue-100 rounded-full mb-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm text-gray-600 font-medium">Click to upload image</span>
                                    <span className="text-xs text-gray-500 mt-1">Accepted formats: JPG, PNG or JPEG</span>
                                </div>
                            </label>
                        )}
                        <input
                            id="offerImageUpload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Upload an attractive image to showcase your offer</p>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl mt-2">
                    <div>
                        <span className="font-medium text-gray-700">Notify Followers</span>
                        <p className="text-xs text-gray-500">Send a notification when this offer goes live</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
                <div className="flex gap-4 mt-6">
                    {/* Save as Draft */}
                    <button
                        type="button"
                        className="flex items-center gap-2 border border-gray-300 text-gray-700 font-medium px-2 rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
                    >
                        <FilePenLine size={18} />
                        Save as Draft
                    </button>

                    {/* Preview Offer */}
                    <button
                        type="button"
                        className="flex items-center gap-2 text-white font-medium px-5 py-2.5 rounded-lg shadow-sm bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-colors"
                    >
                        <Eye size={18} />
                        Preview Offer
                    </button>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 w-full"
                >
                    Add Common Offer
                </button>
                <div
                    className="flex justify-between items-center py-4 cursor-pointer border-t border-gray-200 rounded-xl transition-colors hover:bg-gray-50"
                >
                    <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-lg mr-3">
                            <FileText size={20} className="text-blue-600" />
                        </div>
                        <div>
                            <span className="text-base font-medium text-gray-800">Saved Drafts</span>
                            <p className="text-xs text-gray-500">View and edit your saved offer drafts</p>
                        </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                </div>
            </form>
        </div>
    );
};

export default AddCommonOffer;
