import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddCatalogs = () => {
    const navigate = useNavigate();
    const [ownerId, setOwnerId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageFiles, setImageFiles] = useState([]); // multiple files
    const [price, setPrice] = useState("");

    useEffect(() => {
        const fetchOwnerInfo = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/owner/owner-info", {
                    withCredentials: true,
                });
                setOwnerId(response.data.ownerId);
            } catch (error) {
                console.error("Error fetching owner info:", error);
                navigate("/shop-owner-login");
            }
        };
        fetchOwnerInfo();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (!title || !description || !imageFiles.length || !price) {
          alert("Please fill in all fields");
          return;
        }
      
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("ownerId", ownerId);
        formData.append("price", price);
      
        // Append each image to the FormData
        imageFiles.forEach((file) => formData.append("images", file));
      
        try {
          await axios.post("http://localhost:5000/api/owner/add-catalog", formData, {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          alert("Catalog added successfully!");
          navigate("/shop-owner-dashboard");
        } catch (error) {
          console.error("Error adding catalog:", error);
          alert("Failed to add catalog");
        }
      };
      

    return (
        <div>
            <div className="flex items-center mb-6 p-4">
                <button onClick={() => navigate(-1)} className="mr-2">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-bold">Upload Catalog</h1>
                <div className="ml-auto">
                </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 mx-6">
                <div>
                    <label className="block mb-1 font-medium">Catalog Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 px-4 py-2 rounded-md"
                        placeholder="e.g., Stylish Saree"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-gray-300 px-4 py-2 rounded-md"
                        placeholder="Enter product details..."
                        rows="4"
                    ></textarea>
                </div>
                <div>
                    <label className="block mb-1 font-medium">Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full border border-gray-300 px-4 py-2 rounded-md"
                        placeholder="e.g., 799"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Upload Images (multiple)</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => setImageFiles(Array.from(e.target.files))}
                        className="w-full border border-gray-300 px-4 py-2 rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 w-full"
                >
                    Upload Catalog
                </button>
            </form>
        </div>
    );
};

export default AddCatalogs;
