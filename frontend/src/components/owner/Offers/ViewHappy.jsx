import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OfferTimer from './OfferTimer';
import { Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GetAllHappyHours = () => {
  const [offers, setOffers] = useState([]);
  const [offerStatuses, setOfferStatuses] = useState({});
  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/owner/get-all-happy-hours", {
          withCredentials: true,
        });
        setOffers(res.data);
      } catch (error) {
        console.error("Error fetching happy hour offers:", error);
      }
    };

    fetchOffers();
  }, []);

   // Handle DELETE
  const handleDelete = async (offerId) => {
    if (!window.confirm("Are you sure you want to delete this offer?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/owner/delete-happy-hour/${offerId}`, {
        withCredentials: true,
      });
      // Refresh the list
      fetchOffers();
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };

  // Navigate to Edit Page
  const handleEdit = (offerId) => {
    navigate(`/edit-happy-hour/${offerId}`);
  };

  const handleStatusChange = (offerId, status) => {
    setOfferStatuses((prev) => ({ ...prev, [offerId]: status }));
  };

  return (
    <div className="px-4 space-y-6 pb-20">
      {offers.length === 0 ? (
        <p className="text-center text-gray-500">No Happy Hours offers added by you.</p>
      ) : (
        <div className="space-y-4">
          {offers.map((offer) => {
            const status = offerStatuses[offer._id];
            return (
              <div
                key={offer._id}
                className="flex flex-row sm:flex-row bg-white rounded-lg shadow overflow-hidden"
              >
                <img
                  src={offer.offerImage}
                  alt={offer.offerTitle}
                  className="w-32 h-36 object-cover"
                />
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-bold">{offer.offerTitle}</h2>
                    <span className="inline-block bg-gray-200 text-gray-700 text-xs font-medium rounded-full px-2 py-0.5 mt-1">
                      {offer.category}
                    </span>
                    <p className="text-sm mt-2">{offer.description}</p>
                  </div>

                  <OfferTimer
                    startTime={offer.startTime}
                    endTime={offer.endTime}
                    date={offer.Date}
                    onStatusChange={(status) => handleStatusChange(offer._id, status)}
                  />

                  {/* Conditional Status Display */}
                  {status === 'Starts In' && (
                    <p className="text-xs -mt-2 text-red-700 font-semibold">
                      {offer.startTime}
                    </p>
                  )}
                  {status === 'Time Remaining' && (
                    <p className="text-xs text-green-700 font-semibold">
                      Ends at {offer.endTime}
                    </p>
                  )}
                  {status === 'Expired' && (
                    <p className="text-xs text-gray-500 text-red-700 font-semibold">Expired</p>
                  )}
                </div>
                 {/* Action Icons */}
                  <div className="flex mt-4 space-x-3  mr-3">
                    <Pencil
                      size={18}
                      className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      onClick={() => handleEdit(offer._id)}
                      title="Edit Offer"
                    />
                    <Trash2
                      size={18}
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                      onClick={() => handleDelete(offer._id)}
                      title="Delete Offer"
                    />
                  </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GetAllHappyHours;
