import { useDarkMode } from "../providers/dark-mode";

export const Header: React.FC = () => {
    const { darkMode } = useDarkMode();
    return (
        <header className="w-full flex flex-row justify-center gap-6 items-center">
            {darkMode && <img src="https://www.askbuddie.com/images/logo/ask-buddie-white.svg" alt="Ask Buddie Active Yuwa" className="h-16 w-16" />}
            {!darkMode && <img src="https://www.askbuddie.com/images/logo/ask-buddie.svg" alt="Ask Buddie Active Yuwa" className="h-16 w-16" />}
            <h1 className="text-xl font-roboto font-semibold"><span className="text-primary">Active</span> Yuwa</h1>
        </header>
    )
};
