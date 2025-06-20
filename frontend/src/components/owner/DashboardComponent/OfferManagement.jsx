import { ChevronRight, Tag, Eye, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OfferManagement = () => {
    const ownerId = sessionStorage.getItem("ownerId");
    const navigate = useNavigate();
    return (
        <div>
            <div
                className="flex justify-between items-center mb-4"
            >
                <div
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => navigate(`/shop-owner/your-offer?ownerId=${ownerId}`)}
                >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-md">
                        <Tag size={20} className="text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-teal-600 transition-colors">Offer Management</h2>
                </div>
                <ChevronRight size={20} className="text-gray-500 group-hover:text-teal-600 transform group-hover:translate-x-1 transition-transform cursor-pointer" onClick={() => navigate(`/shop-owner/your-offer?ownerId=${ownerId}`)} />

            </div>
            <div className="flex bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 h-32">
                <div className="relative w-24 h-24">
                    <img
                        src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1000"
                        alt="Spotlight"
                        className="w-full h-full object-cover"
                    />
                    <span className="absolute top-1 left-1  text-[9px] bg-green-100 text-green-600 px-2  rounded shadow">
                        Active
                    </span>
                    <div className=" text-xs bg-amber-100 p-2 pl-4 text-yellow-700 font-semibold ">Spotlight</div>
                </div>
                <div className="flex-1 p-3 space-y-1">

                    <h3 className="text-sm font-semibold text-gray-900 truncate">Weekend Special: 25...</h3>
                    <p className="text-xs text-gray-500 truncate">Enjoy a special discount on all...</p>
                    <div className="flex items-center justify-between text-xs text-gray-600 pt-11">
                        <div className="flex items-center gap-1 ">
                            <Eye size={18} />
                            <span>68</span>
                        </div>
                        <div className="flex items-center ">
                            <Zap size={14} />
                            <span className='pl-1'>Boost</span>
                        </div>
                        <div>
                            <label className="relative inline-flex items-center cursor-pointer ml-1">
                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                <div className="w-9 h-4 bg-gray-200 rounded-full peer-checked:bg-indigo-600 transition"></div>
                                <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <button
                onClick={() => navigate(`/shop-owner/your-offer?ownerId=${ownerId}`)}
                className="w-full py-3 mt-2 text-teal-600 bg-teal-50 rounded-xl text-center font-medium transition-colors hover:bg-teal-100 shadow-sm flex items-center justify-center gap-2"
            >
                <span>View all offers</span>
                <ChevronRight size={20} />
            </button>
        </div>
    )
}

export default OfferManagement;