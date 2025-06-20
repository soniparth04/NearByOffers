import React, { useState } from 'react';
import SpotlightOfferIcon from '../../../assets/OwnerDash/spotlite.png';
import HappyhoursOfferIcon from '../../../assets/OwnerDash/hourlyoffer.png';
import SpintoWinIcon from '../../../assets/OwnerDash/spintowin.png';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ViewSpotlightOffer from './ViewSpotlight';
import SpinToWin from './SpintoWin';
import BottomNavigation from '../Navbar/BottomNav';
import GetAllHappyHours from './ViewHappy';

const YourOffer = () => {

    const offerTypes = [
        { id: 'spotlight', icon: <img src={SpotlightOfferIcon} alt="Spotlight" className="mx-auto" />, label: 'Spotlight Offer' },
        { id: 'happyhours', icon: <img src={HappyhoursOfferIcon} alt="Happy Hours" className="mx-auto w-[60px] h-[60px]" />, label: 'Happy Hours Offer' },
        { id: 'spintowin', icon: <img src={SpintoWinIcon} alt="Spin to Win" className="mx-auto" />, label: 'Spin to Win' },
    ];

    const [selectedOfferType, setSelectedOfferType] = useState('happyhours');
    const navigate = useNavigate();


    return (
        <div>
            <div className="min-h-screen bg-white flex flex-col">
                <div className="flex items-center p-4">
                    <button onClick={() => navigate(-1)} className="mr-2">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-lg font-medium">Recent Live Offer</h1>
                </div>

                {/* Offer Type Selection */}
                <div className="flex flex-row justify-around px-4 mt-2 mb-6">
                    {offerTypes.map((type) => (
                        <button
                            key={type.id}
                            className={`flex flex-col items-center w-16`}
                            onClick={() => setSelectedOfferType(type.id)}
                        >
                            <div className="p-2 flex items-center justify-center">
                                {React.cloneElement(type.icon, {
                                    className: `mx-auto ${selectedOfferType === type.id ? 'text-gray-800' : 'text-gray-400 opacity-60'}`
                                })}
                            </div>
                            <span className={`text-xs text-center mt-1 leading-tight ${selectedOfferType === type.id ? 'font-medium' : ''}`}>{type.label}</span>
                        </button>
                    ))}
                </div>

                {/* Spotlight Offer Form */}
                {selectedOfferType === 'spotlight' && (
                    <ViewSpotlightOffer/>
                )}

                {/* Spin to Win Form */}
                {selectedOfferType === 'spintowin' && (
                    <SpinToWin/>
                )}

                {/* Happy Hours Offer Form */}
                {selectedOfferType === 'happyhours' && (
                    <GetAllHappyHours/>
                )}

               
            </div>
            <BottomNavigation/>
        </div>
    )
}

export default YourOffer;