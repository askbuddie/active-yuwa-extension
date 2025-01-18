import React from 'react';
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useDarkMode } from '../App';

const Navbar: React.FC = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <nav className="flex justify-between items-center p-4">
      <h1 className="text-3xl font-bold transition-colors duration-300 ease-in-out">
        Active Yuwa Extension
      </h1>
      <button
        onClick={toggleDarkMode}
        className="p-2 transition-colors duration-300 ease-in-out"
      >
        {darkMode ? (
          <MdLightMode size={24} className="text-white" />
        ) : (
          <MdDarkMode size={24} className="text-gray-900" />
        )}
      </button>
    </nav>
  );
};

export default Navbar;
