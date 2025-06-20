import { Ticket, ChevronRight, Sparkles, Plus, Search, Tag, Eye, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookingHistory = () => {
    const navigate = useNavigate();
      const ownerId = sessionStorage.getItem("ownerId");

    return (
        <div className='mt-4'>
            <div
                className="flex items-center mb-4 cursor-pointer group"
                onClick={() => navigate(`/shop-owner/booking-history?ownerId=${ownerId}`)}
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
                        <Ticket size={20} className="text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">Booking History</h2>
                </div>
                <ChevronRight size={20} className="ml-auto text-gray-500 group-hover:text-indigo-600 transform group-hover:translate-x-1 transition-all" />
            </div>
            <div className="text-center  text-gray-500">No Bookings</div>
        </div>
    )
}

export default BookingHistory;