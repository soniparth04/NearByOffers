import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// TimePicker component (unchanged)
const TimePicker12Hour = ({ value, onChange }) => {
  const parseTime = (timeStr) => {
    if (!timeStr || typeof timeStr !== "string") {
      return { hour: "12", minute: "00", meridian: "AM" };
    }

    const [timePart, meridianPart] = timeStr.trim().split(" ");
    if (!timePart || !meridianPart) {
      return { hour: "12", minute: "00", meridian: "AM" };
    }

    const [hourRaw, minuteRaw] = timePart.split(":");
    const hour = hourRaw?.padStart(2, "0") || "12";
    const minute = minuteRaw?.padStart(2, "0") || "00";
    const meridian = meridianPart.toUpperCase() === "PM" ? "PM" : "AM";

    return { hour, minute, meridian };
  };

  const { hour, minute, meridian } = parseTime(value);

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));

  const handleHourChange = (e) => {
    onChange(`${e.target.value}:${minute} ${meridian}`);
  };

  const handleMinuteChange = (e) => {
    onChange(`${hour}:${e.target.value} ${meridian}`);
  };

  const handleMeridianChange = (e) => {
    onChange(`${hour}:${minute} ${e.target.value}`);
  };

  return (
    <div className="flex space-x-2">
      <select value={hour} onChange={handleHourChange} className="border px-2 py-1 rounded">
        {hours.map((h) => (
          <option key={h} value={h}>
            {h}
          </option>
        ))}
      </select>
      <span>:</span>
      <select value={minute} onChange={handleMinuteChange} className="border px-2 py-1 rounded">
        {minutes.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      <select value={meridian} onChange={handleMeridianChange} className="border px-2 py-1 rounded">
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  );
};

const EditHappyOffer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [offerTitle, setOfferTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [startTime, setStartTime] = useState("12:00 AM");
  const [endTime, setEndTime] = useState("12:00 AM");
  const [date, setDate] = useState("");
  const [offerImage, setOfferImage] = useState(null);
  const [imageURL, setImageURL] = useState(""); // Existing image preview

  // Convert 24-hour or ISO time to "hh:mm AM/PM" format
  const to12HourFormat = (time24) => {
    if (!time24) return "12:00 AM";

    // Handle ISO date-time string (e.g. "2025-05-26T15:00:00.000Z")
    if (time24.includes("T")) {
      // Extract the time part after T and before Z or end
      const timePart = time24.split("T")[1]?.split(".")[0] || "00:00:00";
      time24 = timePart;
    }

    const [hourStr, minuteStr] = time24.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr ? minuteStr.slice(0, 2) : "00"; // ignore seconds if present
    const meridian = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    if (hour === 0) hour = 12;
    return `${hour.toString().padStart(2, "0")}:${minute} ${meridian}`;
  };

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/owner/get-happy-hour/${id}`);
        const data = res.data;

        setOfferTitle(data.offerTitle);
        setDescription(data.description);
        setCategory(data.category);
        setStartTime(to12HourFormat(data.startTime));
        setEndTime(to12HourFormat(data.endTime));
        setDate(data.Date ? data.Date.split("T")[0] : "");
        setImageURL(data.offerImage);
      } catch (error) {
        console.error("Error fetching offer:", error);
      }
    };

    fetchOffer();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("offerTitle", offerTitle);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    formData.append("Date", date);
    if (offerImage) formData.append("offerImage", offerImage);

    try {
      await axios.put(
        `http://localhost:5000/api/owner/update-happy-offer/${id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Offer updated successfully!");
      navigate("/shop-owner-dashboard");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update offer");
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <form onSubmit={handleSubmit} className="space-y-4 mb-20">
        <h2 className="text-xl font-bold mb-4">Edit Happy Hours Offer</h2>

        <div>
          <label className="block mb-1 font-medium">Offer Title</label>
          <input
            type="text"
            value={offerTitle}
            onChange={(e) => setOfferTitle(e.target.value)}
            className="w-full border px-4 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-4 py-2 rounded-md"
            rows={3}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Start Time</label>
          <TimePicker12Hour value={startTime} onChange={setStartTime} />
        </div>

        <div>
          <label className="block mb-1 font-medium">End Time</label>
          <TimePicker12Hour value={endTime} onChange={setEndTime} />
        </div>

        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border px-4 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border px-4 py-2 rounded-md"
          >
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Salon">Salon</option>
            <option value="Property">Property</option>
            <option value="Vehicle">Vehicle</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setOfferImage(e.target.files[0])}
            className="w-full border px-4 py-2 rounded-md"
          />
          {imageURL && (
            <div className="mt-2">
              <img src={imageURL} alt="Offer" className="w-40 rounded shadow" />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 w-full"
        >
          Update Offer
        </button>
      </form>
    </div>
  );
};

export default EditHappyOffer;
