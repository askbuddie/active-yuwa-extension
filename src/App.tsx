import Navbar from './components/Navbar';
import { DarkModeProvider } from './providers/DarkModeProvider';

function App() {
  return (
    <DarkModeProvider>
      <div className="min-h-screen transition-colors duration-300 ease-in-out bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Navbar />
        {/* Add your main content here */}
      </div>
    </DarkModeProvider>
  );
}

export default App;
