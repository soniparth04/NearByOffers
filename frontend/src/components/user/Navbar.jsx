import React from "react";
import { NavLink } from "react-router-dom";
import { Home, BadgePercent, RotateCw, Percent, User } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white p-2 flex items-center justify-center shadow-md z-20">
      <ul className="flex justify-between w-full max-w-md mx-auto">
        <li className="flex-1 text-center">
          <NavLink
            to="/home"
            end
            className="flex flex-col items-center text-[10px]"
          >
            {({ isActive }) => (
              <span
                className={`flex flex-col items-center gap-0.5 ${
                  isActive ? "text-black" : "text-gray-400"
                }`}
              >
                <Home className="w-5 h-5" />
                Home
              </span>
            )}
          </NavLink>
        </li>
        <li className="flex-1 text-center">
          <NavLink to="" className="flex flex-col items-center text-[10px]">
            {({ isActive }) => (
              <span
                className={`flex flex-col items-center gap-0.5 ${
                  isActive ? "text-black" : "text-gray-400"
                }`}
              >
                <BadgePercent className="w-5 h-5" />
                Offers
              </span>
            )}
          </NavLink>
        </li>
        <li className="flex-1 text-center">
          <NavLink to="" className="flex flex-col items-center text-[10px]">
            {({ isActive }) => (
              <span
                className={`flex flex-col items-center gap-0.5 ${
                  isActive ? "text-black" : "text-gray-400"
                }`}
              >
                <div className="relative inline-block w-5 h-5">
                  <RotateCw className="w-full h-full" />
                  <Percent
                    className="w-2.5 h-2.5 text-black absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
                Hourly
              </span>
            )}
          </NavLink>
        </li>
        <li className="flex-1 text-center">
          <NavLink to="/youraccount" className="flex flex-col items-center text-[10px]">
            {({ isActive }) => (
              <span
                className={`flex flex-col items-center gap-0.5 ${
                  isActive ? "text-black" : "text-gray-400"
                }`}
              >
                <User className="w-5 h-5" />
                Profile
              </span>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
