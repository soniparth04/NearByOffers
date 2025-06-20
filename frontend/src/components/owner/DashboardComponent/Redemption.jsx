import { Ticket, BarChart2, ChevronRight, Sparkles, Plus, Search, Tag, Eye, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const RedemptionTracker = () => {
    const ownerId = sessionStorage.getItem("ownerId");
     const navigate = useNavigate();
    return (
        <div>
            <div
                className="flex items-center py-3 mb-1 cursor-pointer group"
                onClick={() => navigate(`/shop-owner/redemption-tracker?ownerId=${ownerId}`)}
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md">
                        <BarChart2 size={20} className="text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Redemption Tracker</h2>
                </div>
                <ChevronRight size={20} className="ml-auto text-gray-500 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all" />
            </div>
            <div className="text-center  text-gray-500">No Redemption</div>
        </div>
    )
}

export default RedemptionTracker;