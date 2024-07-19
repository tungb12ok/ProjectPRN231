import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBoxes,
  faShoppingCart,
  faUsers,
  faEnvelope,
  faBell,
  faTasks,
  faUser,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className=" min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800 w-2/12">
      <div className="fixed flex flex-col top-0 left-0 w-2/12  bg-white h-full border-r">
        <div className="flex items-center justify-center h-14 border-b">
          <div>Sidebar Navigation</div>
        </div>
        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">Menu</div>
              </div>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <FontAwesomeIcon icon={faHome} className="w-5 h-5" />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/product-management"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <FontAwesomeIcon icon={faBoxes} className="w-5 h-5" />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Manage Product</span>
              </Link>
            </li>
            <li>
              <Link
                to="/manage-order"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5" />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Manage Order</span>
              </Link>
            </li>
            <li>
              <Link
                to="/manage-user"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <FontAwesomeIcon icon={faUsers} className="w-5 h-5" />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Manage Customer</span>
              </Link>
            </li>
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">Tasks</div>
              </div>
            </li>
            <li>
              <Link
                to="/tasks"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <FontAwesomeIcon icon={faTasks} className="w-5 h-5" />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Available Tasks</span>
              </Link>
            </li>
            <li>
              <Link
                to="/notifications"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <FontAwesomeIcon icon={faBell} className="w-5 h-5" />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Notifications</span>
                <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">1.2k</span>
              </Link>
            </li>
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">Settings</div>
              </div>
            </li>
            <li>
              <Link
                to="/profile"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <FontAwesomeIcon icon={faCog} className="w-5 h-5" />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Settings</span>
              </Link>
            </li>
            <li>
              <Link
                to="/logout"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5" />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
