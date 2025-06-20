import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi";
import { motion } from "framer-motion";

const LocationSelection = () => {
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const [recentManualAddresses, setRecentManualAddresses] = useState([]);

  // Load recent manual addresses from sessionStorage on mount
  useEffect(() => {
    const savedAddresses = sessionStorage.getItem("manualAddresses");
    if (savedAddresses) {
      setRecentManualAddresses(JSON.parse(savedAddresses));
    }
  }, []);

  // Use current location and save address to sessionStorage
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
          );

          const data = await response.json();

          if (data.results && data.results.length > 0) {
            const result = data.results[0];
            const fullAddress = result.formatted_address || "Address not available";

            const cityComponent = result.address_components.find((component) =>
              component.types.includes("locality") || component.types.includes("administrative_area_level_2")
            );
            const city = cityComponent?.long_name || "City not available";

            // Save to sessionStorage
            sessionStorage.setItem("userAddress", fullAddress);
            sessionStorage.setItem("userCity", city);

            navigate("/"); // or back to previous page
          } else {
            alert("Unable to get address from location.");
          }
        } catch (err) {
          console.error("Geocoding error:", err);
          alert("Failed to fetch location.");
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to access location.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // When user selects a previous manual address
  const handleSelectRecent = (item) => {
    sessionStorage.setItem("selectedAddressDetails", JSON.stringify(item));
    alert(`Selected: ${item.address}`);
    navigate("/"); // Or wherever you want to go after selection
  };

  // Show only last 5 recent manual addresses, newest first
  const lastFiveAddresses = recentManualAddresses.slice(-5).reverse();

  return (
    <motion.div
      className="h-screen bg-white p-4"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-lg font-medium mb-4">Location selection</h2>

      {/* Use Current Location */}
      <div
        onClick={handleUseCurrentLocation}
        className="mb-2 flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-gray-100"
      >
        <span>📍 To use my current location</span>
        <HiChevronRight />
      </div>

      {/* Manual Address */}
      <div
        onClick={() => navigate("/manual-address")}
        className="mb-4 flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-gray-100"
      >
        <span>➕ Add manually address</span>
        <HiChevronRight />
      </div>

      {/* Recent Manual Addresses */}
      <div className="mt-6 text-sm text-gray-500 mb-2">Recent Searches</div>
      {lastFiveAddresses.length > 0 ? (
        <ul className="border border-gray-300 rounded-md p-2">
          {lastFiveAddresses.map((item, index) => (
            <li
              key={index}
              className="cursor-pointer text-xs hover:bg-gray-100 p-2 border-b last:border-b-0"
              onClick={() => handleSelectRecent(item)}
              title={item.address}
            >
              {item.address}
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-gray-400">No recent manual addresses found.</div>
      )}
    </motion.div>
  );
};

export default LocationSelection;
