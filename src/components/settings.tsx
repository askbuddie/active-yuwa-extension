import { useCallback } from "react";
import { defaultSettings, Settings as ISettings, useSettings } from "../hooks/settings";
import { Pill } from "./pill";
import { usePosts } from "../hooks/posts";

export const Settings: React.FC = () => {

    const [settings, setSettings] = useSettings();
    const [, setPosts] = usePosts();

    const hasChanged = useCallback((settings: ISettings, defaultSettings: ISettings) => {
        for (const key in settings) {
            if (settings[key as keyof typeof settings] !== defaultSettings[key as keyof ISettings]) {
                return true;
            }
        }
        return false;
    }, [settings]);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-6">

                <div className="flex flex-col gap-4">
                    <div className="pb-4 border-b border-gray-300">
                        <h2 className="text-lg font-roboto font-semibold">Post Selector</h2>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="postSelector" className="text-sm font-roboto font-medium">Post Selector</label>
                        <input type="text" id="postSelector" value={settings.postSelector} onChange={e => setSettings({ ...settings, postSelector: e.target.value })} className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:ring-offset-2" />
                        <p className="text-xs text-gray-500">CSS selector for the post element</p>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="pb-4 border-b border-gray-300">
                        <h2 className="text-lg font-roboto font-semibold">Post Element Selectors</h2>

                        <p className="text-xs text-gray-500">The selectors below are relative to the post element</p>
                    </div>


                    <div className="flex flex-col gap-2">
                        <label htmlFor="authorSelector" className="text-sm font-roboto font-medium">Author Selector</label>
                        <input type="text" id="authorSelector" value={settings.authorSelector} onChange={e => setSettings({ ...settings, authorSelector: e.target.value })} className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:ring-offset-2" />
                        <p className="text-xs text-gray-500">CSS selector for the author name</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="contentSelector" className="text-sm font-roboto font-medium">Content Selector</label>
                        <input type="text" id="contentSelector" value={settings.contentSelector} onChange={e => setSettings({ ...settings, contentSelector: e.target.value })} className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:ring-offset-2" />
                        <p className="text-xs text-gray-500">CSS selector for the post content</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="timestampSelector" className="text-sm font-roboto font-medium">Timestamp Selector</label>
                        <input type="text" id="timestampSelector" value={settings.timestampSelector} onChange={e => setSettings({ ...settings, timestampSelector: e.target.value })} className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:ring-offset-2" />
                        <p className="text-xs text-gray-500">CSS selector for the post timestamp</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="reactionsSelector" className="text-sm font-roboto font-medium">Reactions Selector</label>
                        <input type="text" id="reactionsSelector" value={settings.reactionsSelector} onChange={e => setSettings({ ...settings, reactionsSelector: e.target.value })} className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:ring-offset-2" />
                        <p className="text-xs text-gray-500">CSS selector for the post reactions</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="commentsSelector" className="text-sm font-roboto font-medium">Comments Selector</label>
                        <input type="text" id="commentsSelector" value={settings.commentsSelector} onChange={e => setSettings({ ...settings, commentsSelector: e.target.value })} className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:ring-offset-2" />
                        <p className="text-xs text-gray-500">CSS selector for the post comments</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="sharesSelector" className="text-sm font-roboto font-medium">Shares Selector</label>
                        <input type="text" id="sharesSelector" value={settings.sharesSelector} onChange={e => setSettings({ ...settings, sharesSelector: e.target.value })} className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:ring-offset-2" />
                        <p className="text-xs text-gray-500">CSS selector for the post shares</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="urlSelector" className="text-sm font-roboto font-medium">URL Selector</label>
                        <input type="text" id="urlSelector" value={settings.urlSelector} onChange={e => setSettings({ ...settings, urlSelector: e.target.value })} className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:ring-offset-2" />
                        <p className="text-xs text-gray-500">CSS selector for the post URL</p>
                    </div>
                </div>


                <div className="flex flex-col gap-4">
                    <div className="pb-4 border-b border-gray-300">
                        <h2 className="text-lg font-roboto font-semibold">Post Thresholds</h2>

                        <p className="text-xs text-gray-500">Following fields determine the criteria for displaying a post</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="maxReactions" className="text-sm font-roboto font-medium">Maximum Reactions</label>
                        <input type="number" id="maxReactions" value={settings.maxReactions} onChange={e => setSettings({ ...settings, maxReactions: parseInt(e.target.value) })} className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:ring-offset-2" />
                        <p className="text-xs text-gray-500">Posts exceeding this threshold will not be displayed</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="maxComments" className="text-sm font-roboto font-medium">Maximum Comments</label>
                        <input type="number" id="maxComments" value={settings.maxComments} onChange={e => setSettings({ ...settings, maxComments: parseInt(e.target.value) })} className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:ring-offset-2" />
                        <p className="text-xs text-gray-500">Posts exceeding this threshold will not be displayed</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="maxShares" className="text-sm font-roboto font-medium">Maximum Shares</label>
                        <input type="text" id="maxShares" value={settings.maxShares} onChange={e => setSettings({ ...settings, maxShares: parseInt(e.target.value) })} className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:ring-offset-2" />
                        <p className="text-xs text-gray-500">Posts exceeding this threshold will not be displayed</p>
                    </div>
                </div>

                {hasChanged(settings, defaultSettings) && (
                    <div className="flex flex-col gap-4 mt-8">
                        <Pill active={true} onClick={() => { setSettings(defaultSettings) }}>Reset to Default Settings</Pill>
                    </div>
                )}

                <div className="flex flex-col gap-4 mt-8">
                    <Pill active={false} onClick={() => { setPosts([]); }}>Clear Stored Posts</Pill>
                </div>
            </div>
        </div>
    )
};
