import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Clock, Gift } from 'lucide-react';
import AddCommonOffer from './AddSpotlightOffer';
import AddOffer from './AddSpinOffer';
import CreateHappyOffer from './AddHappyOffer';
import BottomNavigation from '../Navbar/BottomNav';

const offerTypes = [
  { id: 'spotlight', icon: <Sparkles size={24} className="mx-auto" />, label: 'Spotlight' },
  { id: 'happyhours', icon: <Clock size={24} className="mx-auto" />, label: 'Happy Hours' },
  { id: 'spintowin', icon: <Gift size={24} className="mx-auto" />, label: 'Spin to Win' },
];

const CreateOfferPage = () => {
  const navigate = useNavigate();
  const [selectedOfferType, setSelectedOfferType] = useState('happyhours');


  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex items-center p-4">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-medium">What are you offering</h1>
      </div>

      <div className="relative z-10 bg-white bg-opacity-90 shadow-sm rounded-b-xl">
        <div className="flex justify-between px-8 py-3 mb-1 max-w-md mx-auto">
          {offerTypes.map((type) => (
            <button 
              key={type.id} 
              className={`flex flex-col items-center transition-all`}
              onClick={() => setSelectedOfferType(type.id)}
            >
              <div className={`p-3.5 flex items-center justify-center rounded-full mb-1 transition-all
                ${selectedOfferType === type.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-300'
                  : 'bg-gray-100 text-gray-500'}`
              }>
                {type.icon}
              </div>
              <span className={`text-sm text-center font-medium transition-colors
                ${selectedOfferType === type.id ? 'text-blue-600' : 'text-gray-500'}`
              }>
                {type.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Spotlight Offer Form */}
      {selectedOfferType === 'spotlight' && (
        <AddCommonOffer />
      )}

      {/* Spin to Win Form */}
      {selectedOfferType === 'spintowin' && (
        <AddOffer />
      )}

      {/* Happy Hours Offer Form */}
      {selectedOfferType === 'happyhours' && (
        <CreateHappyOffer />
      )}

      <BottomNavigation />
    </div>
  );
};

export default CreateOfferPage;