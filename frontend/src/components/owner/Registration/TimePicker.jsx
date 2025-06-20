import { useState } from "react";

const TimePicker12Hour = ({ value, onChange }) => {
    const [show, setShow] = useState(false);

    const parseTime = (timeStr) => {
        if (!timeStr) return { hour: "12", minute: "00", meridian: "AM" };
        const [time, meridian] = timeStr.split(" ");
        const [hour, minute] = time.split(":");
        return { hour, minute, meridian };
    };

    const { hour, minute, meridian } = parseTime(value);
    const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));

    const updateTime = (h = hour, m = minute, mer = meridian) => {
        onChange(`${h}:${m} ${mer}`);
    };

    
    return (
        <div className="relative w-full max-w-xs">
            <div
                onClick={() => setShow(!show)}
                className="flex justify-between items-center bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer"
            >
                <span className="text-gray-800 font-medium">{hour}:{minute} {meridian}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {show && (
                <div className="absolute z-10 bg-white border border-gray-300 shadow-md rounded-lg mt-1 p-2 flex gap-2 items-center">
                    <select
                        value={hour}
                        onChange={(e) => updateTime(e.target.value, minute, meridian)}
                        className="border px-2 py-1 rounded text-sm"
                    >
                        {hours.map(h => <option key={h} value={h}>{h}</option>)}
                    </select>

                    <span className="text-lg font-medium">:</span>

                    <select
                        value={minute}
                        onChange={(e) => updateTime(hour, e.target.value, meridian)}
                        className="border px-2 py-1 rounded text-sm"
                    >
                        {minutes.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>

                    <select
                        value={meridian}
                        onChange={(e) => updateTime(hour, minute, e.target.value)}
                        className="border px-2 py-1 rounded text-sm"
                    >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                </div>
            )}
        </div>
    );
};
export default TimePicker12Hour;