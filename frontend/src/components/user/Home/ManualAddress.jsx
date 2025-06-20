import React, { useRef, useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import PinLocation from "../../../assets/locationpin.png";
import { useNavigate } from "react-router-dom";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 22.3072, // Vadodara
  lng: 73.1812,
};

function ManuallyAddress() {
  const mapRef = useRef(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [address, setAddress] = useState("");
  const [autocomplete, setAutocomplete] = useState(null);
const navigate = useNavigate();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const fetchAddress = useCallback((lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        const addressComponents = results[0].address_components;

        let city = "", state = "", country = "", pinCode = "";

        for (const component of addressComponents) {
          const types = component.types;
          if (types.includes("locality")) city = component.long_name;
          if (types.includes("administrative_area_level_1")) state = component.long_name;
          if (types.includes("country")) country = component.long_name;
          if (types.includes("postal_code")) pinCode = component.long_name;
        }

        const formattedAddress = results[0].formatted_address;

        const locationData = {
          address: formattedAddress,
          city,
          state,
          country,
          pinCode,
        };

        sessionStorage.setItem("selectedAddressDetails", JSON.stringify(locationData));
        setAddress(formattedAddress);
      } else {
        setAddress("Address not found");
      }
    });
  }, []);

  const handleDragEnd = () => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      const newLat = center.lat();
      const newLng = center.lng();
      setMapCenter({ lat: newLat, lng: newLng });
      fetchAddress(newLat, newLng);
    }
  };

  const handlePlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const location = place.geometry.location;
        const lat = location.lat();
        const lng = location.lng();
        setMapCenter({ lat, lng });
        fetchAddress(lat, lng);
      }
    }
  };

  const handleConfirm = () => {
  const stored = sessionStorage.getItem("selectedAddressDetails");
  if (stored) {
    // Parse new address
    const newAddress = JSON.parse(stored);

    // Get existing addresses array or empty array
    const existing = sessionStorage.getItem("manualAddresses");
    let addressesArray = existing ? JSON.parse(existing) : [];

    // Optional: Remove duplicates by address
    addressesArray = addressesArray.filter(addr => addr.address !== newAddress.address);

    // Add new address to the end (latest)
    addressesArray.push(newAddress);

    // Save back only last 10 or so (optional)
    if (addressesArray.length > 10) {
      addressesArray = addressesArray.slice(addressesArray.length - 10);
    }

    sessionStorage.setItem("manualAddresses", JSON.stringify(addressesArray));

    alert("Location selected successfully!");
    navigate(-2);
  } else {
    alert("Please select a location first.");
  }
};



  return isLoaded ? (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-4">Manually Select Location</h2>

      <Autocomplete
        onLoad={(auto) => setAutocomplete(auto)}
        onPlaceChanged={handlePlaceChanged}
      >
        <input
          type="text"
          placeholder="Search for a location"
          className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700"
        />
      </Autocomplete>

      <div className="relative">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={16}
          onLoad={(map) => (mapRef.current = map)}
          onDragEnd={handleDragEnd}
          options={{ disableDefaultUI: true }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full pointer-events-none">
          <img src={PinLocation} alt="Pin" className="w-10 h-10" />
        </div>
      </div>

      <div className="mt-3 font-semibold text-gray-800">{address}</div>

      <button
        onClick={handleConfirm}
        className="mt-4 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg shadow transition"
      >
        Confirm & Continue
      </button>
    </div>
  ) : (
    <div className="p-5 text-center text-gray-600">Loading Map...</div>
  );
}

export default ManuallyAddress;
