import {  User } from 'lucide-react';
import { Link } from "react-router-dom";

const StepOne = ({ formData,handleChange, nextStep}) => {
    
    return (
        <div className="w-full max-w-md" >
                    <div className="text-center mb-8 mt-20">
                        <h1 className="text-5xl font-bold mb-3 text-gray-800 tracking-tight">Get Started</h1>
                        <p className="text-gray-600 text-lg">by creating a free account.</p>
                    </div>
                    <div className="space-y-5">
                        <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-4 bg-transparent rounded-xl pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-100" required />
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                                <User size={20} strokeWidth={1.5} />
                            </div>
                        </div>
                        <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                            <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="w-full p-4 bg-transparent rounded-xl pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-100" required />
                        </div>
                        <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-4 bg-transparent rounded-xl pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-100" required />

                        </div>
                        <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-4 bg-transparent rounded-xl pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-100" required />
                        </div>
                        <button type="button" onClick={nextStep} className="w-full bg-blue-500 text-white py-2 rounded">Next</button>
                        <p className="text-center text-sm">
                            Already have an account?{" "}
                            <Link to="/shop-owner-login" className="text-blue-500 hover:underline">
                                Click here to login
                            </Link>
                        </p>
                    </div>
                </div>
    )
}

export default StepOne