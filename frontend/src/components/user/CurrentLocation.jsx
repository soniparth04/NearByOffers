import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';

const LocationCard = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;

  const getCityFromComponents = (components) => {
    return ( 
      components.city ||
      components.town ||
      components.village ||
      components.municipality ||
      components.county ||
      components.state ||
      components.country
    );
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    const geoOptions = {
      enableHighAccuracy: true,
      timeout: 10000, // 10 seconds
      maximumAge: 0 // Don't use cached position
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Geo Coordinates:", latitude, longitude);

        try {
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&no_annotations=1`
          );
          
          if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
          }

          const data = await response.json();
          console.log("OpenCage result:", data);

          if (data.results?.length > 0) {
            const result = data.results[0];
            setAddress(result.formatted || 'Address not available');
            
            const cityName = getCityFromComponents(result.components);
            setCity(cityName || 'City not available');
          } else {
            setAddress('No address found for this location');
            setCity('No city found for this location');
          }
        } catch (err) {
          console.error('Error:', err);
          setError('Failed to get location data');
          setAddress('Location service error');
          setCity('City detection error');
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        let errorMessage = 'Location access denied';
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location permission denied";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out";
            break;
          default:
            errorMessage = "Unknown location error";
        }
        setError(errorMessage);
        setAddress(errorMessage);
        setCity('');
        setLoading(false);
      },
      geoOptions
    );
  }, [apiKey]);

  return (
    <div className="flex items-center justify-between px-4 py-3 border rounded-xl shadow-sm bg-white w-full">
      <div className="flex items-center space-x-3">
        <MapPin size={20} className="text-black" />
        <div>
          <h2 className="text-base font-semibold text-black">Current Location</h2>
          <p className="text-sm text-gray-500 truncate w-64">
            {loading ? 'Fetching location...' : error || address}
          </p>
          {!loading && city && (
            <p className="text-sm text-gray-500 truncate w-64 mt-1">
              {`City: ${city}`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationCard;