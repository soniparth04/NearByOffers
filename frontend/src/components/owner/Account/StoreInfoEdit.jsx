import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OwnerEditPage = () => {
    const navigate = useNavigate();
    const ownerId = sessionStorage.getItem("ownerId");

    const categories = [
        'Restaurant', 'Salon', 'Retail', 'Cafe', 'Gym', 'Spa',
        'Electronics', 'Fashion', 'Grocery', 'Bakery', 'Pharmacy', 'Other'
    ];


    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        shopName: '',
        category: '',
    });

    useEffect(() => {
        if (ownerId) {
            axios.get(`http://localhost:5000/api/owner/${ownerId}`)
                .then(res => setFormData(res.data))
                .catch(err => console.error("Error fetching owner data", err));
        }
    }, [ownerId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/owner/${ownerId}`, formData);
            alert("Owner profile updated successfully!");
        } catch (err) {
            console.error("Error updating owner:", err);
            alert("Failed to update profile.");
        }
    };


    return (
        <div className="max-w-5xl mx-auto mt-2 p-4 bg-white rounded-2xl shadow-xl">
            <div className="flex items-center mb-6 ">
                <button onClick={() => navigate(-1)} className="mr-2">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-2xl font-bold">Edit Store Information</h1>
                <div className="ml-auto">
                </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
                {[
                    { label: 'Full Name', name: 'name' },
                    { label: 'Phone Number', name: 'phone' },
                    { label: 'Email Address', name: 'email' },
                    { label: 'Shop Name', name: 'shopName' },
                ].map(({ label, name }) => (
                    <div key={name}>
                        <label className="block text-sm font-medium text-black-700">{label}</label>
                        <input
                            type="text"
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                            className="w-full mt-4 p-4 bg-transparent rounded-xl pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-100"
                            required={['name', 'phone', 'email', 'shopName'].includes(name)}
                        />
                    </div>
                ))}

                {/* Category */}
                <div className="relative rounded-xl shadow-sm transition-all duration-300 hover:shadow-md" >
                    <label className="block text-sm font-medium ">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full mt-2 p-4 rounded-xl flex justify-between items-center  focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer border border-gray-100 text-black"
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>


                <div className="md:col-span-2">
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OwnerEditPage;
