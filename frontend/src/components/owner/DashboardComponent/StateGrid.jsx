import React, { useEffect, useState } from 'react';
import StatCard from './StatCard';

const StatGrid = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
      <div className={`transition-all mx-4 duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="mb-5 mt-6">
        <h2 className="text-2xl font-extrabold text-gray-800 bg-gradient-to-r from-amber-600 to-indigo-600 bg-clip-text text-transparent">Business Insights</h2>
        <p className="text-gray-600 text-sm font-medium mt-1">Your performance at a glance</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className={`transition-all duration-300 delay-100 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <StatCard title="Active Offers"/>
        </div>
        <div className={`transition-all duration-300 delay-200 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <StatCard title="Total Offer Views" />
        </div>
        <div className={`transition-all duration-300 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <StatCard title="Store Visits" />
        </div>
        <div className={`transition-all duration-300 delay-400 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <StatCard title="Recent Redemptions"  />
        </div>
      </div>
    </div>
  );
};

export default StatGrid;
