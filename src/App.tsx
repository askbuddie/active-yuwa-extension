import { useCallback, useEffect, useState } from "react";
import { Header } from "./components/header";
import { Pill } from "./components/pill";
import { Settings } from "./components/settings";
import { ErrorBoundary } from "./components/error-boundary";
import { DarkModeProvider } from "./providers/dark-mode";
import { ThemeToggleButton } from "./components/theme-toggle";
import { useSettings } from "./hooks/settings";
import { commentPosts, start, stop } from "./utils/messages";


function App() {

    const [activeTab, setActiveTab] = useState<'settings'>('settings');
    const [settings] = useSettings();
    const [started, setStarted] = useState(false);

    const settingsFactory = useCallback(() => {
        return settings;
    }, [settings]);


    useEffect(() => {
        if (started) {
            start().catch(e => console.error(e));
        } else {
            stop().catch(e => console.error(e));
        }
    }, [started]);

    useEffect(() => {
        if (started) {
            commentPosts(settingsFactory).catch(e => console.error(e));
        }
    }, [settingsFactory, started]);

    return (
        <DarkModeProvider>
            <div className="w-[640px] flex flex-col gap-4 p-4">
                <Header />

                <div className="w-full py-8 flex flex-1">
                    <button onClick={() => setStarted(!started)} className={`px-4 py-2 rounded-full w-full text-center ${started ? 'bg-green-500 text-white' : 'bg-gray-300 dark:bg-gray-700 text-black dark:text-white'} transition-colors text-white`}>
                        {!started ? 'Start' : 'Stop'}
                    </button>
                </div>

                <div className="flex flex-row gap-4 bg-gray-100 transition-colors  dark:bg-gray-700 p-2 rounded-full justify-between items-centers">
                    <div className="flex flex-row gap-4">

                        <Pill active={activeTab === 'settings'} onClick={() => setActiveTab('settings')}>Settings</Pill>
                    </div>

                    <ThemeToggleButton />
                </div>

                <div className="px-2">
                    {activeTab === 'settings' && (
                        <ErrorBoundary>
                            <Settings />
                        </ErrorBoundary>
                    )}
                </div>
            </div>
        </DarkModeProvider>
    );
}

export default App;
