import React, { useState } from 'react';
import Offers from './Offers';
import Catalogs from './Catalogs';

const Tabs = ({ children }) => <div>{children}</div>;
const TabsList = ({ children }) => <div className="flex border-b mb-4">{children}</div>;
const TabsTrigger = ({ children, onClick, isActive }) => (
  <button
    className={`flex-1 py-2 text-center font-semibold ${isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
      }`}
    onClick={onClick}
  >
    {children}
  </button>
);

const Toggle = () => {

    const [activeTab, setActiveTab] = useState('available');
    
    return (
        <div className='max-w-md mx-auto'>
            <Tabs>
                <TabsList>
                    <TabsTrigger onClick={() => setActiveTab('available')} isActive={activeTab === 'available'}>
                        Available Offers
                    </TabsTrigger>
                    <TabsTrigger onClick={() => setActiveTab('catalogue')} isActive={activeTab === 'catalogue'}>
                        Store Catalogue
                    </TabsTrigger>
                </TabsList>

                {activeTab === 'available' ? (
                    <Offers/>
                ) : (
                    <Catalogs/>
                )}
            </Tabs>
        </div>
    )
}

export default Toggle;