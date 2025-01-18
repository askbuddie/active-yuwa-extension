import { createContext, useContext, useState, useEffect } from 'react';
import Navbar from './components/Navbar';

const DarkModeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

export const useDarkMode = () => useContext(DarkModeContext);

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className={`min-h-screen transition-colors duration-300 ease-in-out ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <Navbar />
        {/* Add your main content here */}
      </div>
    </DarkModeContext.Provider>
  );
}

export default App;
