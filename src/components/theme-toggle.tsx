import React from 'react';
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useDarkMode } from '../providers/dark-mode';

export const ThemeToggleButton: React.FC = () => {
    const { darkMode, toggleDarkMode } = useDarkMode();

    return (
        <button
            onClick={toggleDarkMode}
            className="p-2 transition-colors duration-300 ease-in-out"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
            {darkMode ? (
                <MdLightMode size={24} className="text-yellow-400" />
            ) : (
                <MdDarkMode size={24} className="text-gray-600" />
            )}
        </button>
    );
};

