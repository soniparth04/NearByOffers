import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LocationAndBranch = () => {
    const navigate = useNavigate();
    const ownerId = sessionStorage.getItem("ownerId");


    const [formData, setFormData] = useState({
        address: '',
        addressline: '',
        city: '',
        state: '',
        pinCode: '',
    });

    useEffect(() => {
        if (ownerId) {
            axios.get(`http://localhost:5000/api/owner/${ownerId}`)
                .then(res => setFormData(res.data))
                .catch(err => console.error("Error fetching owner data", err));
        }
    }, [ownerId]);

    return (
        <div className="max-w-5xl mx-auto mt-2 p-4 bg-white rounded-2xl ">

            <div className="flex items-center mb-6 ">
                <button onClick={() => navigate(-1)} className="mr-2">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-2xl font-bold">Location & Branch</h1>
                <div className="ml-auto">
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-black-700">Address</label>
                <input
                    type="text"
                    value={formData.address || ""}
                    readOnly
                    className="w-full mt-2 rounded-xl p-4 bg-gray-100 text-gray-600 cursor-not-allowed"
                />

            </div>
             <div className='mt-6'>
                <label className="block text-sm font-medium text-black-700">Shop Address</label>
                <input
                    type="text"
                    value={formData.addressline || ""}
                    readOnly
                    className="w-full mt-2 rounded-xl p-4 bg-gray-100 text-gray-600 cursor-not-allowed"
                />

            </div>
              <div className='mt-6'>
                <label className="block text-sm font-medium text-black-700">City</label>
                <input
                    type="text"
                    value={formData.city || ""}
                    readOnly
                    className="w-full mt-2 rounded-xl p-4 bg-gray-100 text-gray-600 cursor-not-allowed"
                />

            </div>
              <div className='mt-6'>
                <label className="block text-sm font-medium text-black-700">Pincode</label>
                <input
                    type="text"
                    value={formData.pinCode || ""}
                    readOnly
                    className="w-full mt-2 rounded-xl p-4 bg-gray-100 text-gray-600 cursor-not-allowed"
                />

            </div>
              <div className='mt-6'>
                <label className="block text-sm font-medium text-black-700">State</label>
                <input
                    type="text"
                    value={formData.state || ""}
                    readOnly
                    className="w-full mt-2 rounded-xl p-4 bg-gray-100 text-gray-600 cursor-not-allowed"
                />

            </div>

            <div className="md:col-span-2 mt-4">
                <button
                    className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    Submit request
                </button>
                <p className="text-xs text-gray-500 mt-1">If you want to change your Location so send request to admin</p>

            </div>

        </div>
    )
}

export default LocationAndBranch;