import { useState } from "react";
import { Header } from "./components/header";
import { Pill } from "./components/pill";
import { Settings } from "./components/settings";
import { Posts } from "./components/posts";
import { ErrorBoundary } from "./components/error-boundary";

function App() {

    const [activeTab, setActiveTab] = useState<'posts' | 'settings'>('posts');

    return (
        <div className="w-[640px] flex flex-col gap-4 p-4">
            <Header />

            <div className="flex flex-row gap-4 bg-gray-100 p-2 rounded-full">
                <Pill active={activeTab === 'posts'} onClick={() => setActiveTab('posts')}>Posts</Pill>
                <Pill active={activeTab === 'settings'} onClick={() => setActiveTab('settings')}>Settings</Pill>
            </div>


            <div className="px-2">
                <ErrorBoundary>
                    {activeTab === 'posts' && (
                        <Posts />
                    )}
                </ErrorBoundary>

                <ErrorBoundary>
                    {activeTab === 'settings' && (
                        <Settings />
                    )}
                </ErrorBoundary>
            </div>

        </div>
    );
}

export default App;
