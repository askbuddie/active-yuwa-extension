import React from 'react';
import ThemeToggleButton from './ui/ThemeToggleButton';

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 text-black dark:text-white">
      <h1 className="text-3xl font-bold transition-colors duration-300 ease-in-out">
        Active Yuwa Extension
      </h1>
      <ThemeToggleButton />
    </nav>
  );
};

export default Navbar;
