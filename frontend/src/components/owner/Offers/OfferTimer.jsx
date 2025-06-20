import React, { useEffect, useState } from 'react';

const OfferTimer = ({ startTime, endTime, date, onStatusChange }) => {
  const [timeRemaining, setTimeRemaining] = useState('');
  const [percentage, setPercentage] = useState(100);
  const [status, setStatus] = useState('Loading...');

  const parseTime = (timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    return { hours, minutes };
  };

  const calculateTimes = () => {
    const now = new Date();
    const offerDate = new Date(date);
    const start = new Date(offerDate);
    const end = new Date(offerDate);

    const { hours: startH, minutes: startM } = parseTime(startTime);
    const { hours: endH, minutes: endM } = parseTime(endTime);
    start.setHours(startH, startM, 0);
    end.setHours(endH, endM, 0);

    const totalDuration = end - start;

    if (now < start) {
      setStatus('Starts In');
      onStatusChange && onStatusChange('Starts In');
      setTimeRemaining(formatDuration(start - now));
      setPercentage(0);
    } else if (now >= start && now < end) {
      setStatus('Time Remaining');
      onStatusChange && onStatusChange('Time Remaining');
      const remaining = end - now;
      const elapsed = now - start;
      const percent = (elapsed / totalDuration) * 100;
      setTimeRemaining(formatDuration(remaining));
      setPercentage(100 - percent);
    } else {
      setStatus('Expired');
      onStatusChange && onStatusChange('Expired');
      setTimeRemaining('00:00:00');
      setPercentage(0);
    }
  };

  const formatDuration = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(1, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    calculateTimes();
    const interval = setInterval(calculateTimes, 1000);
    return () => clearInterval(interval);
  }, [startTime, endTime, date]);

  if (status === 'Expired') return null;

  return (
    <div className="rounded-lg mt-2 w-full max-w-xs">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-red-700 font-semibold">{status}:</span>
        <span className="text-lg font-bold text-red-600">{timeRemaining}</span>
      </div>

      {status === 'Time Remaining' && (
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-red-500 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default OfferTimer;
