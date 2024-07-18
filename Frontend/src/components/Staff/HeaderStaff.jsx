import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBell,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { Menu, MenuHandler, MenuList, MenuItem, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

function HeaderStaff() {
  const [open, setOpen] = useState(false);

  const handleMenuToggle = () => {
    setOpen(!open);
  };

  return (
    <header className="bg-white shadow-md fixed w-full z-10 top-0 left-0">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center">
          <Link to="/dashboard"
                className="text-xl font-bold text-blue-800"
          >
            <h1 >Sport Shop</h1>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              className="bg-gray-200 text-gray-700 rounded-full py-2 px-4 pl-10 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
              placeholder="Search"
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-3 top-3 text-gray-500"
            />
          </div>
          <div className="relative">
            <FontAwesomeIcon icon={faBell} className="text-gray-600 text-xl cursor-pointer" />
            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
          </div>
          <div className="relative">
            <Menu open={open} handler={setOpen}>
              <MenuHandler>
                <Button
                  className="flex items-center text-gray-800 bg-transparent hover:bg-gray-200 focus:bg-gray-200 py-2 px-4 rounded-full"
                  onClick={handleMenuToggle}
                >
                  Staff
                  <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
                </Button>
              </MenuHandler>
              <MenuList>
                <MenuItem onClick={() => setOpen(false)}>Profile</MenuItem>
                <MenuItem onClick={() => setOpen(false)}>Settings</MenuItem>
                <MenuItem onClick={() => setOpen(false)}>Log out</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderStaff;
