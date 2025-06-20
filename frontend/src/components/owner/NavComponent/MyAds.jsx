import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BottomNavigation from '../Navbar/BottomNav';

const MyAds = () => {
    const navigate = useNavigate();


    return (
        <div >
            <div className="flex items-center mb-6 p-4">
                <button onClick={() => navigate(-1)} className="mr-2">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-bold">My Ads</h1>
                <div className="ml-auto">
                </div>
            </div>
            <div className="text-center p-4 text-gray-500">No Ads found </div>
            <BottomNavigation/>
        </div>
    )
}

export default MyAds;

 