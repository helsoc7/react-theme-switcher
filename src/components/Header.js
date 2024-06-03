import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-gray-200 dark:bg-gray-800 p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">React Grundlagen 6</h1>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-gray-300 dark:bg-gray-700"
      >
        {theme === 'light' ? <Sun className="text-yellow-500" /> : <Moon className="text-white" />}
      </button>
    </header>
  );
};

export default Header;
