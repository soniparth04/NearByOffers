import { useState } from "react";
import { Link} from 'react-router-dom';
import { Search } from "lucide-react";

const OwnerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="p-4 ">
      {/* Navigation Panel */}
      <div className="flex items-center justify-center p-4 rounded-md relative">
        <Search className="w-6 h-6 absolute left-4" />
        <h1 className="text-xl font-semibold">OW Admin Dashboard</h1>

      </div>
      {/* Search Box */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-white shadow-md p-4 text-center font-semibold rounded-lg">Total Users</div>
        <div className="bg-white shadow-md p-4 text-center font-semibold rounded-lg">Total Offers</div>
        <div className="bg-white shadow-md p-4 text-center font-semibold rounded-lg">Active Users</div>
        <div className="bg-white shadow-md p-4 text-center font-semibold rounded-lg">Active Offers</div>
      </div>

      <p className="mt-4 font-semibold">Quick actions</p>
      {/* View Links */}
      <div className="flex flex-col gap-4 mt-4">
      <Link to="/Offeerwhisky-admin/viewshopowner" className="group block p-6 bg-blue-200 rounded-lg shadow-md hover:shadow-lg transition">
        <div className="text-center">
          <h5 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">View All Shop Owners</h5>
        </div>
        </Link>
        <Link to="" className="group block p-6 bg-blue-200 rounded-lg shadow-md hover:shadow-lg transition">
        <div className="text-center">
          <h5 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">View All Users</h5>
        </div>
        </Link>
        
      </div>
    </div>
  );
};

export default OwnerDashboard;
