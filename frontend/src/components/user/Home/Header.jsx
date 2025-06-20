import React, { useEffect, useState } from 'react';
import Markerpin from "../../../assets/Home/marker.png";
import ChevronDown from "../../../assets/Home/chevrondown.png";
import Heart from "../../../assets/Home/heart.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const manualData = sessionStorage.getItem("selectedAddressDetails");
    const cachedAddress = sessionStorage.getItem('userAddress');
    const cachedCity = sessionStorage.getItem('userCity');

    if (manualData) {
      // Priority 1: Use manual address if present
      const parsed = JSON.parse(manualData);
      setAddress(parsed.address || "Manual address");
      setCity(parsed.city || "Manual city");
      // Sync to userAddress/userCity sessionStorage keys so they remain consistent
      sessionStorage.setItem("userAddress", parsed.address);
      sessionStorage.setItem("userCity", parsed.city);
      setLoading(false);
      return;
    } 

    if (cachedAddress && cachedCity) {
      // Priority 2: Use cached current location address
      setAddress(cachedAddress);
      setCity(cachedCity);
      setLoading(false);
      return;
    }

    // Priority 3: Fetch location using Geolocation API
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    const geoOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
          );

          if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
          }

          const data = await response.json();

          if (data.results && data.results.length > 0) {
            const result = data.results[0];
            const fullAddress = result.formatted_address || 'Address not available';

            const cityComponent = result.address_components.find(component =>
              component.types.includes("locality") || component.types.includes("administrative_area_level_2")
            );

            const cityName = cityComponent?.long_name || 'City not available';

            setAddress(fullAddress);
            setCity(cityName);

            // Cache current location address separately so manual address can override it
            sessionStorage.setItem('userAddress', fullAddress);
            sessionStorage.setItem('userCity', cityName);
          } else {
            setAddress('No address found');
            setCity('No city found');
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
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location permission denied";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Request timed out";
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

  // Trim long addresses
  const trimmedAddress = address.length > 60 ? address.slice(0, 60) + '...' : address;

  return (
    <div className="bg-gradient-to-b from-orange-100 to-white px-4 pt-10 pb-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div>
            <p className="flex items-center">
              <span className="font-bold flex items-center">
                <img src={Markerpin} alt="Marker Icon" className="w-6 h-6 mr-2" />
                {city || "Current Location"}
                <img
                  src={ChevronDown}
                  alt="chevron down"
                  className="w-4 h-4 ml-1 cursor-pointer"
                  onClick={() => {
                    // Clear manual address first so geolocation or cached location shows up
                    sessionStorage.removeItem('selectedAddressDetails');
                    // Optionally clear userAddress and userCity or keep cached current location
                    sessionStorage.removeItem('userAddress');
                    sessionStorage.removeItem('userCity');
                    navigate("/location");
                  }}
                />
              </span>
            </p>
            <p className="text-xs text-gray-500 ml-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-[250px]">
              {loading ? 'Fetching location...' : error || trimmedAddress}
            </p>
          </div>
        </div>

        <div className="text-xl text-gray-700">
          <img src={Heart} alt="heart" className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default Header;
