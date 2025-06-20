import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from "lucide-react";
import spinnerimage from "../../assets/spinner/spinner.png"
import { Link } from 'react-router-dom';


const Tabs = ({ children }) => <div>{children}</div>;
const TabsList = ({ children }) => <div className="flex border-b mb-4">{children}</div>;
const TabsTrigger = ({ children, onClick, isActive }) => (
  <button
    className={`flex-1 py-2 text-center font-semibold ${isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
      }`}
    onClick={onClick}
  >
    {children}
  </button>
);

const SwitchOffer = ({ shopId }) => {
  const [activeTab, setActiveTab] = useState('available');
  const [offers, setOffers] = useState([]);
  const [catalog, setCatalog] = useState([]);
  const [imageIndexes, setImageIndexes] = useState({}); // track current image index for each catalog item

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/owner/${shopId}`);
        setOffers(res.data);
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };

    const fetchCatalog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/catalog/${shopId}`);
        setCatalog(res.data);

        // Initialize image indexes to 0
        const indexes = {};
        res.data.forEach((item) => {
          indexes[item._id] = 0;
        });
        setImageIndexes(indexes);
      } catch (error) {
        console.error('Error fetching catalog:', error);
      }
    };

    if (shopId) {
      fetchOffers();
      fetchCatalog();
    }
  }, [shopId]);

  const handleNextImage = (id, images) => {
    setImageIndexes((prev) => ({
      ...prev,
      [id]: Math.min(prev[id] + 1, images.length - 1),
    }));
  };

  const handlePrevImage = (id, images) => {
    setImageIndexes((prev) => ({
      ...prev,
      [id]: Math.max(prev[id] - 1, 0),
    }));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <Tabs>
        <TabsList>
          <TabsTrigger onClick={() => setActiveTab('available')} isActive={activeTab === 'available'}>
            Available Offers
          </TabsTrigger>
          <TabsTrigger onClick={() => setActiveTab('catalogue')} isActive={activeTab === 'catalogue'}>
            Store Catalogue
          </TabsTrigger>
        </TabsList>

        {activeTab === 'available' ? (
          <div className="grid grid-cols-2 gap-4">
            {offers.map((offer) => (
              <div key={offer._id} className="rounded-lg overflow-hidden w-full max-w-[180px] mx-auto">
                <div className=" w-full h-40 rounded-xl flex items-center justify-center text-white text-xl overflow-hidden">
                  {offer.image ? (
                    <img src={offer.image} alt={offer.title} className="w-full" />
                  ) : (
                    <span>🎁</span>
                  )}
                </div>
                <div className="font-bold text-blue-900">{offer.title}</div>
                <span className="inline-flex items-center px-1.5 py-0.5 bg-gray-200 text-gray-700 text-xs font-medium rounded-full">
                  {offer.category}
                </span>
                <p className="text-sm">{offer.description}</p>
                <p className="text-gray-500 text-xs mt-1">
                  Valid Till: {new Date(offer.validTill).toLocaleDateString()}
                </p>
              </div>
            ))}
            <Link  to={`/spinner/${shopId}`}>
              <div className="rounded-lg overflow-hidden w-full max-w-[180px] mx-auto">
                <div className="bg-blue-700 w-full h-40 rounded-xl overflow-hidden">
                  <img
                    src={spinnerimage}
                    alt="Spin to Win"
                    className="w-full h-60 object-cover -mt-5"
                  />
                </div>
                <p className="text-sm text-center">Spin to win</p>
                <p className="text-sm text-center text-gray-600">Try your luck & win surprises!</p>
              </div>
            </Link>
          </div>

        ) : (
          <div className="grid grid-cols-2 gap-4">
            {catalog.map((item) => {
              const currentIndex = imageIndexes[item._id] || 0;
              return (
                <div key={item._id} className="rounded-xl flex flex-col">
                  <div className="relative bg-green-500 w-full h-40 rounded-xl flex items-center justify-center overflow-hidden">
                    {item.image?.length > 0 ? (
                      <>
                        <img
                          src={item.image[currentIndex]}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-0.5 rounded-full">
                          {currentIndex + 1}/{item.image.length}
                        </div>

                        {item.image.length > 1 && (
                          <>
                            {currentIndex > 0 && (
                              <button
                                onClick={() => handlePrevImage(item._id, item.image)}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 text-black px-1 py-1 rounded-full text-xs"
                              >
                                <ChevronLeft size={20} />
                              </button>
                            )}
                            {currentIndex < item.image.length - 1 && (
                              <button
                                onClick={() => handleNextImage(item._id, item.image)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 text-black px-1 py-1 rounded-full text-xs"
                              >
                                <ChevronRight size={20} />
                              </button>
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      <div className="text-white text-center text-2xl">🛍️</div>
                    )}
                  </div>
                  <div className="pl-2 pb-4">
                    <p className="text-sm text-green-700 font-bold mt-1">₹{item.price}</p>
                    <div className="text-sm font-semibold">{item.title}</div>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Tabs>
    </div>
  );
};

export default SwitchOffer;
