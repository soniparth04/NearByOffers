import OfferManagement from './OfferManagement';
import BookingHistory from './Bookinghis';
import RedemptionTracker from './Redemption';
import ActiveAds from './ActiveSponser';

const Management = () => {

    return (
        <div className="px-4 pb-6 mt-4 mb-20">
            <OfferManagement />
            <BookingHistory/>
            <RedemptionTracker/>
            <ActiveAds />
            
        </div>
    );
};

export default Management;
