import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, User, Plus } from 'lucide-react';
import QRCodeIcon from '../../../assets/OwnerDash/qrcode-scan.png'; // PNG image

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ownerId = sessionStorage.getItem("ownerId");

  const hidePlusButton = location.pathname === `/shop-owner/create-offers?ownerId=${ownerId}`;

  return (
    <div className="fixed bottom-0 w-full mx-auto z-50">
      <nav className="flex items-center justify-between bg-white border-t border-gray-200 px-2 h-14">
        <NavLink
          to={`/shop-owner-dashboard?ownerId=${ownerId}`}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-16 h-full ${isActive ? 'text-blue-800' : 'text-gray-600'
            }`
          }
        >
          <Home size={20} />
          <span className="text-xs mt-1">Home</span>
        </NavLink>

        <NavLink
          to={`/shop-owner/my-ads?ownerId=${ownerId}`}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-16 h-full ${isActive ? 'text-blue-800' : 'text-gray-600'
            }`
          }
        >
          <LayoutDashboard size={20} />
          <span className="text-xs mt-1">My Ads</span>
        </NavLink>

        {!hidePlusButton && (
          <div className="relative -top-5">
            <button
              onClick={() => navigate(`/shop-owner/create-offers?ownerId=${ownerId}`)}
              className="flex items-center justify-center w-16 h-16 rounded-full bg-[#001CD3] text-white shadow-lg hover:bg-[#226EDA] transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>

        )}

        <NavLink
          to={`/shop-owner/scan-qr?ownerId=${ownerId}`}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-16 h-full ${isActive ? 'text-blue-800' : 'text-gray-600'
            }`
          }
        >
          <img src={QRCodeIcon} alt="Scan QR" className="w-5 h-5" />
          <span className="text-xs mt-1">Scan QR</span>
        </NavLink>

        <NavLink
          to={`/shop-owner/account?ownerId=${ownerId}`}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-16 h-full ${isActive ? 'text-blue-800' : 'text-gray-600'
            }`
          }
        >
          <User size={20} />
          <span className="text-xs mt-1">Account</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default BottomNavigation;
