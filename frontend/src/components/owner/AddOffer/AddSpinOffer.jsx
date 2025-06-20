import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddOffer = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        label: "",
        description: "",
        expiryDate: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/owner/add-offer", formData, {
                withCredentials: true
            });
            console.log("Offer added:", response.data);
            navigate("/owner-dashboard");
        } catch (error) {
            setError("Failed to add offer. Please try again.");
        }
    };

    // ✅ Ensure the return is inside the function
    return (
        <div className=" p-6 bg-white container mx-auto">
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="label" value={formData.label} onChange={handleChange} placeholder="Offer Label" required className="border p-2 w-full"/>
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required className="border p-2 w-full"></textarea>
                <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required className="border p-2 w-full"/>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Offer</button>
            </form>
        </div>
    );
};

// ✅ Ensure component is exported
export default AddOffer;
