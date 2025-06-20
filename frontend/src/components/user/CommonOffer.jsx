import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CommonOffers = () => {
  const { ownerId } = useParams();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/common-offers/${ownerId}`);
        setOffers(res.data);
      } catch (err) {
        console.error("Failed to load offers", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [ownerId]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Common Offers</h2>
      {offers.length === 0 ? (
        <p>No common offers available for this shop.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {offers.map((offer) => (
            <li key={offer._id} className="p-4 bg-white shadow rounded-lg">
              <h3 className="text-lg font-semibold">{offer.title}</h3>
              <p>{offer.description}</p>
              <p className="text-sm text-gray-500">Valid till: {new Date(offer.validTill).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommonOffers;
