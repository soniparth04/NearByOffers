import { useState } from 'react';

export default function Notification({ onBack }) {
  // Mock data — replace with [] to test no-notifications
  const [notifications] = useState(
    Array.from({ length: 
      10 }).map((_, i) => ({
      id: i,
      title: 'New Deal Nearby!',
      description: '[Store Name] is offering 20% off — limited time only! Tap to view.',
      time: '1d',
    }))
  );

  return (
    <div className="bg-gray-900 flex flex-col w-full h-full">

      {/* Header */}
      <div className="bg-white w-full flex items-center p-4 shadow">
        <button onClick={onBack} className="mr-4">
          
        </button>
       <div className="text-base font-semibold text-gray-800 text-left">
   Notification          </div>
      </div>

      {/* Body */}
      <div className="bg-white w-full flex-1 overflow-y-auto">
        {notifications.length === 0 ? (
          // Empty state
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <img 
              src="https://static.thenounproject.com/png/4549790-200.png" 
              alt="No Notifications" 
              className="w-32 h-32 mb-4 opacity-70" 
            />
            <h2 className="text-lg font-semibold text-black">No notification</h2>
            <p className="text-gray-500 text-sm mt-2">Check back here for updates!</p>
          </div>
        ) : (
          // Notifications list
          notifications.map((note) => (
            <div key={note.id} className="flex items-start p-4 ">
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-4"></div>
              <div className="flex-1">
                <h2 className="font-semibold text-sm mb-1">{note.title}</h2>
                <p className="text-gray-600 text-xs">{note.description}</p>
              </div>
              <div className="text-gray-400 text-xs ml-2">{note.time}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
