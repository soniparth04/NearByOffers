import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BottomNavigation from '../Navbar/BottomNav';

const RedemptionTracker = () => {
    const navigate = useNavigate();

    return (
        <div>
             <div >
            <div className="flex items-center mb-6 p-4">
                <button onClick={() => navigate(-1)} className="mr-2">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-bold">Redemption Tracker</h1>
                <div className="ml-auto">
                </div>
            </div>
            <div className="text-center p-4 text-gray-500">No Redemption found </div>
            <BottomNavigation/>
        </div>
        </div>
    )
}

export default RedemptionTracker;