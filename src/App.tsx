import { useState } from "react";
import { Header } from "./components/header";
import { Pill } from "./components/pill";
import { Settings } from "./components/settings";
import { Posts } from "./components/posts";
import { ErrorBoundary } from "./components/error-boundary";
import { DarkModeProvider } from "./providers/DarkModeProvider";
import ThemeToggleButton from "./components/ui/ThemeToggleButton";

function App() {

    const [activeTab, setActiveTab] = useState<'posts' | 'settings'>('posts');

    return (
        <DarkModeProvider>
            <div className="w-[640px] flex flex-col gap-4 p-4">
                <Header />

                <div className="flex flex-row gap-4 bg-gray-100 dark:bg-neutral-700 p-2 rounded-full justify-between items-centers">
                    <div className="flex flex-row gap-4">
                        <Pill active={activeTab === 'posts'} onClick={() => setActiveTab('posts')}>Posts</Pill>
                        <Pill active={activeTab === 'settings'} onClick={() => setActiveTab('settings')}>Settings</Pill>
                    </div>

                    <ThemeToggleButton />
                </div>

                <div className="px-2">
                    {activeTab === 'posts' && (
                        <ErrorBoundary>
                            <Posts />
                        </ErrorBoundary>
                    )}

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
