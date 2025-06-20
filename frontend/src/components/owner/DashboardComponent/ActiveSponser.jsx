import { Ticket, Megaphone, ChevronRight, Sparkles, Plus, Search, Tag, Eye, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ActiveAds = () => {
    const navigate = useNavigate();
    const ownerId = sessionStorage.getItem("ownerId");

    return (
        <div>
            <div
                className="flex justify-between items-center py-3 cursor-pointer group"
                onClick={() => navigate(`/shop-owner/active-sponsored-Ads?ownerId=${ownerId}`)}
            >
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center">
                        <Megaphone size={22} className="text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">Active Sponsored Ads</h2>
                </div>
                <ChevronRight size={24} className="text-gray-400 group-hover:text-purple-600 transition-all" />
            </div>
            <div className="text-center  text-gray-500">No Active Sponsored Ads</div>
        </div>
    )
}

export default ActiveAds;